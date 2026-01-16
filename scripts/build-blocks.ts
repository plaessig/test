#!/usr/bin/env node

/// <reference types="node" />

/**
 * Build script for Vue-based AEM Edge Delivery Services blocks
 *
 * This script compiles Vue components from src/blocks/ into AEM-compatible
 * decorators in blocks/. The generated files should not be committed to git.
 *
 * Usage:
 *   tsx scripts/build-blocks.ts
 *   npm run build
 *   npm run build:watch
 */

import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdir, readFile, writeFile, mkdir, copyFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcBlocksDir = resolve(projectRoot, 'src/blocks');
const distBlocksDir = resolve(projectRoot, 'blocks');


/**
 * Get all block directories from src/blocks
 */
async function getBlockDirectories(): Promise<string[]> {
  if (!existsSync(srcBlocksDir)) return [];

  const entries = await readdir(srcBlocksDir, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

/**
 * Find block files in a directory
 */
async function findBlockFiles(blockSrcDir: string) {
  const files = await readdir(blockSrcDir);
  return {
    vueFile: files.find((f) => f.endsWith('.vue')),
    cssFile: files.find((f) => f.endsWith('.css')),
    configFile: files.find((f) => f.endsWith('.config.ts') || f.endsWith('.config.js')),
  };
}

/**
 * Compile Vue component to JavaScript
 */
async function compileVueComponent(blockName: string, vueFile: string, blockSrcDir: string, blockDistDir: string): Promise<void> {
  await build({
    configFile: false,
    plugins: [vue()],
    build: {
      lib: {
        entry: join(blockSrcDir, vueFile),
        name: `${blockName}Component`,
        fileName: () => `${blockName}.component.js`,
        formats: ['es'],
      },
      outDir: blockDistDir,
      emptyOutDir: false,
      minify: true,
      rollupOptions: {
        external: (id) => id === 'vue' || id.includes('/scripts/'),
        output: {
          format: 'es',
          inlineDynamicImports: true,
        },
      },
    },
    logLevel: 'warn',
  });
}

/**
 * Bundle any JavaScript file (config, utils, etc.) with dependencies inlined
 */
async function bundleJavaScript(entryPath: string, outputFileName: string, outputDir: string): Promise<void> {
  await build({
    configFile: false,
    build: {
      lib: {
        entry: entryPath,
        name: 'Bundle',
        fileName: () => outputFileName,
        formats: ['es'],
      },
      outDir: outputDir,
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        external: (id) => id.includes('/scripts/'),
        output: {
          format: 'es',
          inlineDynamicImports: true,
        },
      },
    },
    logLevel: 'warn',
  });
}

function extractVueComponent(content: string): string {
  return content.replace(/export\s*\{\s*(\w+)\s+as\s+default\s*};?/, 'const VueComponent = $1;');
}

function extractFunctionName(content: string): string {
  const match = content.match(/export\s+function\s+(\w+)/);
  return match ? match[1] : 'extractData';
}

function removeExportStatement(content: string): string {
  return content.replace(/export\s*\{[^}]+\}\s*;?\s*$/m, '');
}

function extractImports(content: string): { imports: string; rest: string } {
  const importLines: string[] = [];
  const otherLines: string[] = [];

  const lines = content.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('import ')) {
      importLines.push(line);
    } else {
      otherLines.push(line);
    }
  }

  return {
    imports: importLines.join('\n'),
    rest: otherLines.join('\n')
  };
}

async function generateDecoratorFile(blockName: string, blockSrcDir: string, blockDistDir: string, configFile: string): Promise<void> {
  const componentFile = join(blockDistDir, `${blockName}.component.js`);
  const configBundledFile = join(blockDistDir, `${blockName}.config.js`);
  const finalJsFile = join(blockDistDir, `${blockName}.js`);

  const compiledVueContent = extractVueComponent(await readFile(componentFile, 'utf-8'));
  const rawConfigContent = removeExportStatement(await readFile(configBundledFile, 'utf-8'));
  const extractorFunctionName = extractFunctionName(await readFile(join(blockSrcDir, configFile), 'utf-8'));

  const { imports: configImports, rest: configCode } = extractImports(rawConfigContent);

  const decoratorContent = `import { createVueBlockDecorator } from '../../scripts/vue-utils.js';
${configImports}

// Vue component (compiled)
${compiledVueContent}

// Data extractor with bundled utilities
${configCode}

// Export the decorator function
export default createVueBlockDecorator(VueComponent, ${extractorFunctionName});
`;

  await writeFile(finalJsFile, decoratorContent);

  await rm(componentFile);
  await rm(configBundledFile);

  console.log(`Generated decorator`);
}

async function buildBlock(blockName: string): Promise<void> {
  const blockSrcDir = join(srcBlocksDir, blockName);
  const blockDistDir = join(distBlocksDir, blockName);

  const { vueFile, cssFile, configFile } = await findBlockFiles(blockSrcDir);

  if (!vueFile) {
    console.log(`No Vue file found, skipping`);
    return;
  }

  await mkdir(blockDistDir, { recursive: true });
  await compileVueComponent(blockName, vueFile, blockSrcDir, blockDistDir);

  if (cssFile) {
    await copyFile(join(blockSrcDir, cssFile), join(blockDistDir, cssFile));
    console.log(`Copied ${cssFile}`);
  }

  if (configFile) {
    await bundleJavaScript(join(blockSrcDir, configFile), `${blockName}.config.js`, blockDistDir);
    await generateDecoratorFile(blockName, blockSrcDir, blockDistDir, configFile);
  } else {
    const componentFile = join(blockDistDir, `${blockName}.component.js`);
    const finalFile = join(blockDistDir, `${blockName}.js`);
    await writeFile(finalFile, await readFile(componentFile, 'utf-8'));
    await rm(componentFile);
  }

  console.log(`  ✓ Built ${blockName}.js`);
}

async function cleanBlocks(): Promise<void> {
  console.log('Cleaning blocks directory...');

  if (!existsSync(distBlocksDir)) return;

  const entries = await readdir(distBlocksDir, { withFileTypes: true });
  await Promise.all(entries.map((entry) => rm(join(distBlocksDir, entry.name), { recursive: true, force: true })));
}

async function buildAll(): Promise<void> {
  try {
    console.log('Starting block build process...\n');

    await cleanBlocks();

    const blocks = await getBlockDirectories();

    if (blocks.length === 0) {
      console.log('⚠️ No blocks found in src/blocks');
      return;
    }

    console.log(`Found ${blocks.length} block(s): ${blocks.join(', ')}\n`);

    for (const block of blocks) {
      await buildBlock(block);
    }

    console.log('\n✅ Build complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildAll();

