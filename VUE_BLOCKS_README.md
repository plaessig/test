# Vue Blocks – Quick Start

This repo lets you build Vue 3 components as AEM Edge Delivery Services (EDS) blocks. Source code lives in `src/blocks`, the build outputs to `blocks/`.

## Setup
- Node 18+
- Install dependencies: `npm install`

## Daily Development
- Watch and rebuild on save:
  - `npm run build:watch`
- Start the AEM dev server in another terminal:
  - `aem up`
- Edit files in `src/blocks/**` and refresh the browser.

Tips:
- Hard refresh if changes don’t show (Ctrl+Shift+R).
- The watcher ignores `blocks/` to avoid loops.

## Creating a Block
1. Create a folder: `src/blocks/myblock/`
2. Add a Vue component (PascalCase): `src/blocks/myblock/MyBlock.vue`
3. Add styles: `src/blocks/myblock/myblock.css`
4. Optional: add a config extractor (lowercase): `src/blocks/myblock/myblock.config.js` or `.ts`

Conventions:
- Don’t use `<style scoped>`; keep styles in the CSS file.
- Use camelCase prop names and provide defaults for optional props.
- You can import utilities from `src/utils/**`; they’ll be bundled into the block.

## Build
- One-off build: `npm run build`
- Output: `blocks/<name>/<name>.js` and `blocks/<name>/<name>.css`

Notes:
- `blocks/` is generated, but has to be committed.
- Build replaces `blocks/` entirely.

## Authoring (Docs/Word)
- Authors create block tables; config rows (no image in first cell) become props.
- Content rows typically include images/text.
- Config extractor should export `extract<MyBlock>Data(block)` and return an object of props.

## Quick Commands
- Build once: `npm run build`
- Watch: `npm run build:watch`
- AEM dev server: `aem up`
