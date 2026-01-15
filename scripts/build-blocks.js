#!/usr/bin/env node

/**
 * Build script for Vue-based AEM Edge Delivery Services blocks
 *
 * This script compiles Vue components from src/blocks/ into AEM-compatible
 * decorators in blocks/. The generated files should not be committed to git.
 *
 * Usage:
 *   node scripts/build-blocks.js
 *   npm run build
 *   npm run build:watch
 */

import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readdir, readFile, writeFile, mkdir, copyFile, rm } from 'fs/promises';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const srcBlocksDir = resolve(projectRoot, 'src/blocks');
const distBlocksDir = resolve(projectRoot, 'blocks');

const IMPORT_REGEX = /import\s+.*?from\s+['"].*?['"];?\s*\n?/g;
const EXPORT_DEFAULT_REGEX = /export\s*\{\s*(\w+)\s+as\s+default\s*\};?/;
const EXPORT_FUNCTION_REGEX = /export\s+function\s+(\w+)/;

/**
 * Get all block directories from src/blocks
 */
async function getBlockDirectories() {
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
async function findBlockFiles(blockSrcDir) {
  const files = await readdir(blockSrcDir);
  return {
    vueFile: files.find((f) => f.endsWith('.vue')),
    cssFile: files.find((f) => f.endsWith('.css')),
    configFile: files.find((f) => f.endsWith('.config.js')),
  };
}

/**
 * Compile Vue component to JavaScript
 */
async function compileVueComponent(blockName, vueFile, blockSrcDir, blockDistDir) {
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
      rollupOptions: {
        external: ['vue'],
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
 * Extract imports from config file content
 */
function extractImports(configContent) {
  const imports = [];
  let match;
  while ((match = IMPORT_REGEX.exec(configContent)) !== null) {
    imports.push(match[0].trim());
  }
  return imports;
}

/**
 * Generate the decorator file that AEM EDS will load
 */
async function generateDecoratorFile(blockName, blockSrcDir, blockDistDir, configFile) {
  const configPath = join(blockSrcDir, configFile);
  const configContent = await readFile(configPath, 'utf-8');

  const tempJsFile = join(blockDistDir, `${blockName}.temp.js`);
  const finalJsFile = join(blockDistDir, `${blockName}.js`);

  // Read compiled Vue component
  let compiledVueContent = await readFile(tempJsFile, 'utf-8');

  // Extract the Vue component variable name from the default export
  compiledVueContent = compiledVueContent.replace(
    EXPORT_DEFAULT_REGEX,
    'const VueComponent = $1;'
  );

  // Extract the data extractor function name
  const extractorMatch = configContent.match(EXPORT_FUNCTION_REGEX);
  const extractorFunctionName = extractorMatch ? extractorMatch[1] : 'extractData';

  // Hoist imports from config to top of file
  const configImports = extractImports(configContent);
  const configContentWithoutImports = configContent.replace(IMPORT_REGEX, '').trim();

  // Generate final decorator file
  const decoratorContent = `import { createVueBlockDecorator } from '../../scripts/vue-utils.js';
${configImports.length > 0 ? configImports.join('\n') + '\n' : ''}
// Vue component (compiled)
${compiledVueContent}

// Data extractor
${configContentWithoutImports}

// Export the decorator function
export default createVueBlockDecorator(VueComponent, ${extractorFunctionName});
`;

  await writeFile(finalJsFile, decoratorContent);
  await rm(tempJsFile);
  console.log(`Generated decorator`);
}

/**
 * Copy CSS file from src to dist
 */
async function copyCssFile(cssFile, blockSrcDir, blockDistDir) {
  const cssSrc = join(blockSrcDir, cssFile);
  const cssDest = join(blockDistDir, cssFile);
  await copyFile(cssSrc, cssDest);
  console.log(`Copied ${cssFile}`);
}

/**
 * Build a single Vue block
 */
async function buildBlock(blockName) {
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
async function cleanBlocks() {
  console.log(' Cleaning blocks directory...');

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
async function buildAll() {
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

