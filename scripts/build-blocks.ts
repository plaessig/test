#!/usr/bin/env node
/// <reference types="node" />

import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcBlocksDir = resolve(projectRoot, 'src/blocks');
const distBlocksDir = resolve(projectRoot, 'blocks');
const tmpBlocksDir = resolve(projectRoot, 'blocks_tmp');

type BlockFiles = {
  vueFile?: string;
  cssFile?: string;
  configFile?: string;
};

async function getBlockDirectories(): Promise<string[]> {
  if (!existsSync(srcBlocksDir)) return [];
  const entries = await readdir(srcBlocksDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function findBlockFiles(blockSrcDir: string): Promise<BlockFiles> {
  const files = await readdir(blockSrcDir);
  return {
    vueFile: files.find((f) => f.endsWith('.vue')),
    cssFile: files.find((f) => f.endsWith('.css')),
    configFile: files.find((f) => f.endsWith('.config.ts') || f.endsWith('.config.js')),
  };
}

function extractFunctionNameFromSource(source: string): string {
  // Accept: export function extractNavData(...) OR export const extractNavData = (...)
  // Prefer explicit named exports
  const fnMatch = source.match(/export\s+function\s+(\w+)\s*\(/);
  if (fnMatch?.[1]) return fnMatch[1];

  const constMatch = source.match(/export\s+const\s+(\w+)\s*=\s*\(/);
  if (constMatch?.[1]) return constMatch[1];

  // fallback
  return 'extractData';
}

async function writeTempEntryFile(params: {
  blockName: string;
  blockSrcDir: string;
  blockDistDir: string;
  vueFile: string;
  configFile?: string;
}): Promise<{ entryPath: string; extractorName?: string }> {
  const { blockName, blockSrcDir, blockDistDir, vueFile, configFile } = params;

  let extractorName: string | undefined;

  if (configFile) {
    const configSource = await readFile(join(blockSrcDir, configFile), 'utf-8');
    extractorName = extractFunctionNameFromSource(configSource);
  }

  // Important:
  // - Keep imports relative to THIS entry file location (in dist dir).
  // - Your decorator import path: blocks/<block>/<entry> -> ../../scripts/vue-utils.js
  //
  // We import the .vue directly from src to avoid copying sources around.
  const entryCode = `
import VueComponent from ${JSON.stringify(join(blockSrcDir, vueFile))};
import { createVueBlockDecorator } from '../../scripts/vue-utils.js';
${configFile ? `import { ${extractorName} } from ${JSON.stringify(join(blockSrcDir, configFile))};` : ''}

const extractor = ${configFile ? extractorName : '(block) => ({})'};

export default createVueBlockDecorator(VueComponent, extractor);
`.trimStart();

  const entryPath = join(blockDistDir, `.${blockName}.entry.ts`);
  await writeFile(entryPath, entryCode, 'utf-8');

  return { entryPath, extractorName };
}

async function bundleBlock(params: {
  blockName: string;
  entryPath: string;
  blockDistDir: string;
}): Promise<void> {
  const { blockName, entryPath, blockDistDir } = params;

  await build({
    configFile: false,
    plugins: [vue()],
    build: {
      lib: {
        entry: entryPath,
        fileName: () => `${blockName}.js`,
        formats: ['es'],
      },
      outDir: blockDistDir,
      emptyOutDir: false,
      minify: true,
      rollupOptions: {
        // Keep Vue external so EDS can load it once (your existing approach)
        external: (id) => id === 'vue' || id.includes('/scripts/'),
        output: {
          format: 'es',
          // Keep it single-file for EDS blocks
          inlineDynamicImports: true,
        },
      },
    },
    logLevel: 'warn',
  });
}

async function cleanTmpBlocks(): Promise<void> {
  if (!existsSync(tmpBlocksDir)) return;
  const entries = await readdir(tmpBlocksDir, { withFileTypes: true });
  await Promise.all(entries.map((e) => rm(join(tmpBlocksDir, e.name), { recursive: true, force: true })));
}


async function buildBlock(blockName: string): Promise<void> {
  const blockSrcDir = join(srcBlocksDir, blockName);
  const blockDistDir = join(tmpBlocksDir, blockName);

  const { vueFile, cssFile, configFile } = await findBlockFiles(blockSrcDir);

  if (!vueFile) {
    console.log(`- ${blockName}: no .vue found, skipping`);
    return;
  }

  await mkdir(blockDistDir, { recursive: true });

  // Copy CSS as-is (EDS expects same-name css in block folder)
  if (cssFile) {
    await copyFile(join(blockSrcDir, cssFile), join(blockDistDir, cssFile));
  }

  // Generate temporary entry file and bundle it straight to <block>.js
  const { entryPath } = await writeTempEntryFile({
    blockName,
    blockSrcDir,
    blockDistDir,
    vueFile,
    configFile,
  });

  try {
    await bundleBlock({ blockName, entryPath, blockDistDir });
    console.log(`  ✓ Built ${blockName}/${blockName}.js${cssFile ? ` (+ ${cssFile})` : ''}`);
  } finally {
    // Clean up temp entry file
    await rm(entryPath, { force: true });
  }
}

async function swapBlocksDir(): Promise<void> {
  // remove old blocks
  await rm(distBlocksDir, { recursive: true, force: true });

  // rename tmp -> blocks (atomic on same filesystem)
  // ensure tmp exists
  await mkdir(tmpBlocksDir, { recursive: true });
  await rm(distBlocksDir, { recursive: true, force: true });
  await (await import('node:fs/promises')).rename(tmpBlocksDir, distBlocksDir);
}


async function buildAll(): Promise<void> {
  try {
    console.log('Starting block build...\n');

    const blocks = await getBlockDirectories();
    if (blocks.length === 0) {
      console.log('⚠️ No blocks found in src/blocks');
      process.exit(0);
    }

    console.log(`Found ${blocks.length} block(s): ${blocks.join(', ')}\n`);


    await cleanTmpBlocks();

    for (const blockName of blocks) {
      await buildBlock(blockName);
    }
    await swapBlocksDir();

    console.log('\n✅ Build complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
}

buildAll();
