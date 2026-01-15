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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const srcBlocksDir = resolve(projectRoot, 'src/blocks');
const distBlocksDir = resolve(projectRoot, 'blocks');

const EXPORT_DEFAULT_REGEX = /export\s*\{\s*(\w+)\s+as\s+default\s*\};?/;
const EXPORT_FUNCTION_REGEX = /export\s+function\s+(\w+)/;

/**
 * Get all block directories from src/blocks
 */
async function getBlockDirectories(): Promise<string[]> {
  if (!existsSync(srcBlocksDir)) {
    return [];
  }

  const entries = await readdir(srcBlocksDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
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
  const vueFilePath = join(blockSrcDir, vueFile);

  await build({
    configFile: false,
    plugins: [vue()],
    build: {
      lib: {
        entry: vueFilePath,
        name: `${blockName}Component`,
        fileName: () => `${blockName}.temp.js`,
        formats: ['es'],
      },
      outDir: blockDistDir,
      emptyOutDir: false,
      minify: true, // Minify for production performance
      rollupOptions: {
        // External: only Vue and scripts/ directory (runtime dependencies)
        external: (id) => {
          if (id === 'vue') return true;
          if (id.includes('/scripts/')) return true;
          // Bundle everything else (utilities from src/utils, src/services, etc.)
          return false;
        },
        output: {
          format: 'es',
          inlineDynamicImports: true,
          preserveModules: false,
        },
      },
    },
    logLevel: 'warn',
  });
}

/**
 * Bundle any JavaScript file (config, utils, etc.) with dependencies inlined
 * This uses the same bundling strategy as Vue components
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
      minify: false, // Must be false to avoid variable collision with Vue imports
      rollupOptions: {
        // External: things that exist at runtime (scripts directory)
        external: (id) => {
          // Keep scripts/* external (runtime dependencies)
          if (id.includes('/scripts/')) return true;
          // Bundle everything else (utilities from src/utils, services, etc.)
          return false;
        },
        output: {
          format: 'es',
          inlineDynamicImports: true,
          preserveModules: false,
        },
      },
    },
    logLevel: 'warn',
  });
}

/**
 * Generate the decorator file that AEM EDS will load
 */
async function generateDecoratorFile(blockName: string, blockSrcDir: string, blockDistDir: string, configFile: string): Promise<void> {
  const tempJsFile = join(blockDistDir, `${blockName}.temp.js`);
  const bundledConfigFile = join(blockDistDir, `${blockName}.config.bundled.js`);
  const finalJsFile = join(blockDistDir, `${blockName}.js`);

  // Read compiled Vue component
  let compiledVueContent = await readFile(tempJsFile, 'utf-8');

  // Extract the Vue component variable name from the default export
  compiledVueContent = compiledVueContent.replace(
    EXPORT_DEFAULT_REGEX,
    'const VueComponent = $1;'
  );

  // Read bundled config file (includes all utilities inlined)
  let bundledConfigContent = await readFile(bundledConfigFile, 'utf-8');

  // Extract the data extractor function name from the original config
  const configPath = join(blockSrcDir, configFile);
  const originalConfigContent = await readFile(configPath, 'utf-8');
  const extractorMatch = originalConfigContent.match(EXPORT_FUNCTION_REGEX);
  const extractorFunctionName = extractorMatch ? extractorMatch[1] : 'extractData';

  // Remove the export statement from bundled config
  bundledConfigContent = bundledConfigContent.replace(/export\s*\{[^}]+\}\s*;?\s*$/m, '');

  // Generate final decorator file - simple concatenation!
  const decoratorContent = `import { createVueBlockDecorator } from '../../scripts/vue-utils.js';

// Vue component (compiled)
${compiledVueContent}

// Data extractor with bundled utilities
${bundledConfigContent}

// Export the decorator function
export default createVueBlockDecorator(VueComponent, ${extractorFunctionName});
`;

  await writeFile(finalJsFile, decoratorContent);

  // Clean up temp files
  await rm(tempJsFile);
  await rm(bundledConfigFile);

  console.log(`Generated decorator`);
}

/**
 * Copy CSS file from src to dist
 */
async function copyCssFile(cssFile: string, blockSrcDir: string, blockDistDir: string): Promise<void> {
  const cssSrc = join(blockSrcDir, cssFile);
  const cssDest = join(blockDistDir, cssFile);
  await copyFile(cssSrc, cssDest);
  console.log(`Copied ${cssFile}`);
}

/**
 * Build a single Vue block
 */
async function buildBlock(blockName: string): Promise<void> {
  const blockSrcDir = join(srcBlocksDir, blockName);
  const blockDistDir = join(distBlocksDir, blockName);

  const { vueFile, cssFile, configFile } = await findBlockFiles(blockSrcDir);

  if (!vueFile) {
    console.log(`No Vue file found, skipping`);
    return;
  }

  // Create output directory
  await mkdir(blockDistDir, { recursive: true });

  // Compile Vue component
  await compileVueComponent(blockName, vueFile, blockSrcDir, blockDistDir);

  // Copy CSS if exists
  if (cssFile) {
    await copyCssFile(cssFile, blockSrcDir, blockDistDir);
  }

  // Generate decorator with config if exists
  if (configFile) {
    // Bundle config file (inlines utilities) using the same logic as everything else
    const configPath = join(blockSrcDir, configFile);
    await bundleJavaScript(configPath, `${blockName}.config.bundled.js`, blockDistDir);
    // Generate final decorator
    await generateDecoratorFile(blockName, blockSrcDir, blockDistDir, configFile);
  } else {
    // No config - just use the compiled component
    const tempFile = join(blockDistDir, `${blockName}.temp.js`);
    const finalFile = join(blockDistDir, `${blockName}.js`);
    const content = await readFile(tempFile, 'utf-8');
    await writeFile(finalFile, content);
    await rm(tempFile);
  }

  console.log(`  ✓ Built ${blockName}.js`);
}

/**
 * Clean the blocks directory
 */
async function cleanBlocks(): Promise<void> {
  console.log('Cleaning blocks directory...');

  if (existsSync(distBlocksDir)) {
    const entries = await readdir(distBlocksDir, { withFileTypes: true });
    for (const entry of entries) {
      await rm(join(distBlocksDir, entry.name), { recursive: true, force: true });
    }
  }
}

/**
 * Main build function
 */
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

