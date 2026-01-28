#!/usr/bin/env node
/// <reference types="node" />

import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
    readdir,
    readFile,
    writeFile,
    mkdir,
    copyFile,
    rm,
    rename,
    stat,
} from "node:fs/promises";
import { existsSync } from "node:fs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Source + output dirs
const srcBlocksDir = resolve(projectRoot, "src/blocks");
const distBlocksDir = resolve(projectRoot, "blocks"); // EDS expects /blocks
const tmpBlocksDir = resolve(projectRoot, "blocks_tmp");
const tmpEntriesDir = resolve(tmpBlocksDir, "__entries");

const VUE_UTILS_IMPORT: string = "../../scripts/vue-utils.js"; // keep your separation-of-concerns

/**
 * Defines the expected file structure within a block's source directory.
 * Each block can have a Vue file, a CSS file, and a configuration file.
 */
interface BlockFiles {
    vueFile?: string;
    cssFile?: string;
    configFile?: string;
}

/**
 * Defines the parameters required to write a temporary entry file for a block.
 * This includes the block's name, source directory, Vue file, and optional config file.
 */
interface WriteTempEntryParams {
    blockName: string;
    blockSrcDir: string;
    vueFile: string;
    configFile?: string;
}

/**
 * Checks if a given path is a directory.
 * @param p The path to check.
 * @returns A promise that resolves to true if the path is a directory, false otherwise.
 */
async function isDirectory(p: string): Promise<boolean> {
    try {
        const s = await stat(p);
        return s.isDirectory();
    } catch {
        return false;
    }
}

/**
 * Retrieves a list of all block directories within the source blocks directory.
 * @returns A promise that resolves to an array of block directory names.
 */
async function getBlockDirectories(): Promise<string[]> {
    if (!existsSync(srcBlocksDir)) return [];
    const entries = await readdir(srcBlocksDir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

/**
 * Finds the main files for a block (Vue, CSS, and config) within its source directory.
 * @param blockSrcDir The source directory of the block.
 * @returns A promise that resolves to an object containing the paths to the block's files.
 */
async function findBlockFiles(blockSrcDir: string): Promise<BlockFiles> {
    const files = await readdir(blockSrcDir);
    return {
        vueFile: files.find((f) => f.endsWith(".vue")),
        cssFile:
            files.find((f) => f === `${path.basename(blockSrcDir)}.css`) ||
            files.find((f) => f.endsWith(".css")),
        configFile: files.find(
            (f) => f.endsWith(".config.ts") || f.endsWith(".config.js")
        ),
    };
}

/**
 * Extracts the name of the exported function from a block's configuration file.
 * This is used to properly import the data extractor function.
 * @param source The source code of the configuration file.
 * @returns The name of the extractor function.
 */
function extractFunctionNameFromSource(source: string): string {
    // Accept: export function extractNavData(...) OR export const extractNavData = (...)
    const fnMatch = source.match(/export\s+function\s+(\w+)\s*\(/);
    if (fnMatch?.[1]) return fnMatch[1];

    const constMatch = source.match(/export\s+const\s+(\w+)\s*=\s*\(/);
    if (constMatch?.[1]) return constMatch[1];

    // fallback
    return "extractData";
}

/**
 * Cleans the temporary build directory by removing all its contents.
 */
async function cleanTmp(): Promise<void> {
    if (!existsSync(tmpBlocksDir)) return;
    const entries = await readdir(tmpBlocksDir, { withFileTypes: true });
    await Promise.all(
        entries.map((e) =>
            rm(join(tmpBlocksDir, e.name), { recursive: true, force: true })
        )
    );
}

/**
 * Writes a temporary entry file for a block. This file imports the Vue component
 * and the data extractor, then uses a utility to create a Vue block decorator.
 * @param params The parameters needed to generate the entry file.
 * @returns A promise that resolves to an object containing the path to the new entry file.
 */
async function writeTempEntryFile({ blockName, blockSrcDir, vueFile, configFile }: WriteTempEntryParams): Promise<{ entryPath: string }> {
    let extractorName: string | undefined;

    if (configFile) {
        const configSource = await readFile(join(blockSrcDir, configFile), "utf-8");
        extractorName = extractFunctionNameFromSource(configSource);
    }

    const entryCode = `
import VueComponent from ${JSON.stringify(join(blockSrcDir, vueFile))};
import { createVueBlockDecorator } from ${JSON.stringify(VUE_UTILS_IMPORT)};
${configFile ? `import { ${extractorName} } from ${JSON.stringify(join(blockSrcDir, configFile))};` : ""}

const extractor = ${configFile ? extractorName : "(block) => ({})"};

export default createVueBlockDecorator(VueComponent, extractor);
`.trimStart();

    await mkdir(tmpEntriesDir, { recursive: true });
    const entryPath = join(tmpEntriesDir, `${blockName}.entry.ts`);
    await writeFile(entryPath, entryCode, "utf-8");

    return { entryPath };
}

/**
 * Copies the CSS file for a block from the source to the temporary build directory.
 * It ensures the CSS file follows the AEM naming convention.
 * @param params The block's name and source directory.
 * @returns A promise that resolves to true if a CSS file was copied, false otherwise.
 */
async function copyCssAsIs({ blockName, blockSrcDir }: { blockName: string; blockSrcDir: string; }): Promise<boolean> {
    const { cssFile } = await findBlockFiles(blockSrcDir);
    if (!cssFile) return false;

    const blockTmpDir = join(tmpBlocksDir, blockName);
    await mkdir(blockTmpDir, { recursive: true });

    // Ensure EDS naming convention: blocks/<name>/<name>.css
    const srcCssPath = join(blockSrcDir, cssFile);
    const distCssPath = join(blockTmpDir, `${blockName}.css`);

    await copyFile(srcCssPath, distCssPath);
    return true;
}

/**
 * Bundles all block entry files using Vite.
 * It configures Vite to output ES modules and handle chunks and assets.
 * @param entriesMap A map of entry names to their file paths.
 */
async function bundleAllBlocks(entriesMap: Record<string, string>): Promise<void> {
    await build({
        configFile: false,
        plugins: [vue()],
        build: {
            outDir: tmpBlocksDir,
            emptyOutDir: false,
            minify: true,
            rollupOptions: {
                input: entriesMap,
                preserveEntrySignatures: "strict",
                external: (id: string) => id === "vue" || id.includes("/scripts/") || id.includes("\\scripts\\"),
                output: {
                    format: "es",
                    entryFileNames: `[name].js`,
                    chunkFileNames: `__chunks/[name]-[hash].js`,
                    assetFileNames: `__assets/[name]-[hash][extname]`,
                },
            },
        },
        logLevel: "warn",
    });
}

/**
 * Swaps the existing `blocks` directory with the temporary build directory.
 * This is an atomic operation on most filesystems, ensuring a clean update.
 */
async function swapBlocksDir(): Promise<void> {
    await rm(distBlocksDir, { recursive: true, force: true });
    await mkdir(tmpBlocksDir, { recursive: true });
    await rename(tmpBlocksDir, distBlocksDir);
}

/**
 * The main build function. It orchestrates the entire block build process:
 * 1. Finds all block directories.
 * 2. Cleans the temporary directory.
 * 3. For each block, creates a temporary entry file and copies its CSS.
 * 4. Bundles all blocks using Vite.
 * 5. Swaps the old `blocks` directory with the newly built one.
 */
async function buildAll(): Promise<void> {
    try {
        console.log("Starting block build...\n");

        const blocks = await getBlockDirectories();
        if (blocks.length === 0) {
            console.log("⚠️ No blocks found in src/blocks");
            process.exit(0);
        }

        console.log(`Found ${blocks.length} block(s): ${blocks.join(", ")}\n`);

        // Clean and prepare temporary directory
        await cleanTmp();
        await mkdir(tmpBlocksDir, { recursive: true });

        const entriesMap: Record<string, string> = {};
        const cssCopied: string[] = [];

        // Generate entry points for each block
        for (const blockName of blocks) {
            const blockSrcDir = join(srcBlocksDir, blockName);
            const { vueFile, configFile } = await findBlockFiles(blockSrcDir);

            if (!vueFile) {
                console.log(`- ${blockName}: no .vue found, skipping`);
                continue;
            }

            const { entryPath } = await writeTempEntryFile({
                blockName,
                blockSrcDir,
                vueFile,
                configFile,
            });

            entriesMap[`${blockName}/${blockName}`] = entryPath;

            const copied = await copyCssAsIs({ blockName, blockSrcDir });
            if (copied) cssCopied.push(blockName);
        }

        const entryCount = Object.keys(entriesMap).length;
        if (entryCount === 0) {
            console.log("⚠️ No buildable blocks found (missing .vue files?)");
            process.exit(0);
        }

        console.log(`\nBundling ${entryCount} block entry(s) in one Vite run...\n`);
        // Bundle all blocks with Vite
        await bundleAllBlocks(entriesMap);

        if (await isDirectory(tmpEntriesDir)) {
            await rm(tmpEntriesDir, { recursive: true, force: true });
        }

        // Publish the built blocks to the final directory
        const builtBlocks = Object.keys(entriesMap).map(
            (key) => key.split("/")[0]
        );
        await publishBuiltBlocks(builtBlocks);

        console.log(
            `\n✅ Build complete! Output: ${distBlocksDir}\n` +
            (cssCopied.length ? `CSS copied for: ${cssCopied.join(", ")}\n` : "")
        );

        // In watch mode, we don't want to exit
        if (process.env.npm_lifecycle_event !== "build:watch") {
            process.exit(0);
        }
    } catch (err) {
        console.error("❌ Build failed:", err);
        // In watch mode, we don't want to exit
        if (process.env.npm_lifecycle_event !== "build:watch") {
            process.exit(1);
        }
    }
}

/**
 * Moves the built blocks from the temporary directory to the final `blocks` directory.
 * It only removes the subdirectories that it's about to replace.
 * @param builtBlocks The names of the blocks that were built.
 */
async function publishBuiltBlocks(builtBlocks: string[]): Promise<void> {
    // Remove only the built block directories from the final destination
    await Promise.all(
        builtBlocks.map((blockName) =>
            rm(join(distBlocksDir, blockName), { recursive: true, force: true })
        )
    );

    // Move the newly built blocks from tmp to the final destination
    await Promise.all(
        builtBlocks.map(async (blockName) => {
            const src = join(tmpBlocksDir, blockName);
            const dest = join(distBlocksDir, blockName);
            if (await isDirectory(src)) {
                await mkdir(dest, { recursive: true });
                await rename(src, dest);
            }
        })
    );

    // Also move any shared chunks or assets
    const tmpEntries = await readdir(tmpBlocksDir);
    await Promise.all(
        tmpEntries.map(async (entry) => {
            const src = join(tmpBlocksDir, entry);
            const dest = join(distBlocksDir, entry);
            if (await isDirectory(src)) {
                await rm(dest, { recursive: true, force: true }); // Overwrite existing shared dirs
                await rename(src, dest);
            }
        })
    );

    // Clean up the tmp directory
    await rm(tmpBlocksDir, { recursive: true, force: true });
}


void buildAll();
