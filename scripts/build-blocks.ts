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
 * Expected per block directory:
 * src/blocks/<blockName>/
 *   - *.vue   (required)
 *   - <blockName>.css or any *.css (optional)
 *   - *.config.ts|js (optional) exporting extractor function
 */
interface BlockFiles {
    vueFile?: string;
    cssFile?: string;
    configFile?: string;
}

interface WriteTempEntryParams {
    blockName: string;
    blockSrcDir: string;
    vueFile: string;
    configFile?: string;
}

async function isDirectory(p: string): Promise<boolean> {
    try {
        const s = await stat(p);
        return s.isDirectory();
    } catch {
        return false;
    }
}

async function getBlockDirectories(): Promise<string[]> {
    if (!existsSync(srcBlocksDir)) return [];
    const entries = await readdir(srcBlocksDir, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

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

function extractFunctionNameFromSource(source: string): string {
    // Accept: export function extractNavData(...) OR export const extractNavData = (...)
    const fnMatch = source.match(/export\s+function\s+(\w+)\s*\(/);
    if (fnMatch?.[1]) return fnMatch[1];

    const constMatch = source.match(/export\s+const\s+(\w+)\s*=\s*\(/);
    if (constMatch?.[1]) return constMatch[1];

    // fallback
    return "extractData";
}

async function cleanTmp(): Promise<void> {
    if (!existsSync(tmpBlocksDir)) return;
    const entries = await readdir(tmpBlocksDir, { withFileTypes: true });
    await Promise.all(
        entries.map((e) =>
            rm(join(tmpBlocksDir, e.name), { recursive: true, force: true })
        )
    );
}

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

async function swapBlocksDir(): Promise<void> {
    // Replace /blocks entirely with blocks_tmp (atomic if same filesystem)
    await rm(distBlocksDir, { recursive: true, force: true });
    await mkdir(tmpBlocksDir, { recursive: true });
    await rename(tmpBlocksDir, distBlocksDir);
}

async function buildAll(): Promise<void> {
    try {
        console.log("Starting block build...\n");

        const blocks = await getBlockDirectories();
        if (blocks.length === 0) {
            console.log("⚠️ No blocks found in src/blocks");
            process.exit(0);
        }

        console.log(`Found ${blocks.length} block(s): ${blocks.join(", ")}\n`);

        await cleanTmp();
        await mkdir(tmpBlocksDir, { recursive: true });

        const entriesMap: Record<string, string> = {};
        const cssCopied: string[] = [];

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
        await bundleAllBlocks(entriesMap);

        if (await isDirectory(tmpEntriesDir)) {
            await rm(tmpEntriesDir, { recursive: true, force: true });
        }

        await swapBlocksDir();

        console.log(
            `\n✅ Build complete! Output: ${distBlocksDir}\n` +
            (cssCopied.length ? `CSS copied for: ${cssCopied.join(", ")}\n` : "")
        );

        process.exit(0);
    } catch (err) {
        console.error("❌ Build failed:", err);
        process.exit(1);
    }
}

void buildAll();
