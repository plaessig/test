# Vue Components in AEM Edge Delivery Services

Complete guide for developing Vue.js components as AEM EDS blocks.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Creating a New Vue Block](#creating-a-new-vue-block)
- [Development Workflow](#development-workflow)
- [Authoring in Google Docs/Word](#authoring-in-google-docsword)
- [How It Works](#how-it-works)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project uses Vue 3 components to build AEM Edge Delivery Services blocks. Vue components are written in `src/blocks/`, compiled to JavaScript, and deployed as standard EDS blocks.

**Key Benefits:**
- ✅ Write modern Vue 3 components with full reactivity
- ✅ Author-configurable props via Google Docs/Word
- ✅ Automatic image optimization
- ✅ Clean separation: source code in `src/`, generated files in `blocks/`
- ✅ Standard AEM EDS compatibility

---

## Architecture

### Directory Structure

```
project/
├── src/
│   ├── blocks/                    # Source Vue components (committed to git)
│   │   └── cards/
│   │       ├── Cards.vue          # Vue component
│   │       ├── cards.css          # Component styles
│   │       └── cards.config.js    # Data extractor
│   │
│   └── utils/                     # Shared utilities (committed to git)
│       └── block-config.js        # Reusable block helpers
│
├── blocks/                        # Generated blocks (gitignored, built in CI)
│   └── cards/
│       ├── cards.js               # Compiled decorator (utils bundled inline)
│       └── cards.css              # Copied styles
│
├── scripts/
│   ├── build-blocks.js            # Build script
│   ├── vue-utils.js               # Vue mounting utilities
│   ├── aem.js                     # AEM EDS core
│   └── scripts.js                 # Project scripts
│
├── head.html                      # Includes Vue CDN import map
├── package.json                   # Dependencies and build scripts
└── nodemon.json                   # Watch mode configuration
```

### How Blocks Are Generated

1. **Author creates content** in Google Docs/Word
2. **AEM generates HTML** for the block
3. **Block decorator loads** (`blocks/cards/cards.js`)
4. **Data extractor** parses HTML → extracts props
5. **Vue component** mounts with props
6. **Original HTML replaced** with Vue-rendered content

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- AEM CLI installed (`npm install -g @adobe/aem-cli`)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <project-name>

# Install dependencies
npm install

# Build blocks
npm run build

# Start AEM dev server
aem up
```

Open `http://localhost:3000` in your browser.

---

## Creating a New Vue Block

### Step 1: Create Block Directory

```bash
mkdir -p src/blocks/myblock
```

### Step 2: Create the Vue Component

**File:** `src/blocks/myblock/MyBlock.vue`

```vue
<template>
  <div class="myblock-container">
    <h2>{{ title }}</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ processText(item.text) }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { capitalize } from '../../utils/string-utils.js';

defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: 'My Block',
  },
  theme: {
    type: String,
    default: 'default',
  },
});

// You can import and use utilities in Vue components!
const processText = (text) => capitalize(text);
</script>
```

**Important Notes:**
- ❌ Don't use scoped styles (`<style scoped>`)
- ✅ Put all CSS in a separate `.css` file
- ✅ Always provide default values for optional props
- ✅ Use camelCase for prop names
- ✅ You can import utilities from `src/utils/` - they'll be bundled automatically!

### Step 3: Create the CSS File

**File:** `src/blocks/myblock/myblock.css`

```css
.myblock-container {
  padding: 20px;
  background: var(--background-color);
}

.myblock-container h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.myblock-container ul {
  list-style: none;
  padding: 0;
}

.myblock-container li {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

/* Theme variations */
.myblock.dark {
  background: #333;
  color: #fff;
}
```

**CSS Best Practices:**
- Prefix all classes with block name (`.myblock-*`)
- Use CSS variables for theme colors
- Don't rely on scoped styles
- Support theme variations via classes

### Step 4: Create the Config File

**File:** `src/blocks/myblock/myblock.config.js`

```javascript
import { createOptimizedPicture } from '../../scripts/aem.js';
import { extractConfigRows, filterContentRows } from '../../utils/block-config.js';

/**
 * Extract data from the block element
 * @param {Element} block - The block DOM element
 * @returns {Object} Props for the Vue component
 */
export function extractMyBlockData(block) {
  // Extract config rows (rows without images in first cell)
  const config = extractConfigRows(block);

  // Get only content rows (rows with images in first cell)
  const contentRows = filterContentRows(block);

  // Extract content data from content rows
  const items = contentRows.map((row) => {
    const cells = [...row.children];
    
    return {
      text: cells[0]?.textContent || '',
    };
  });

  return {
    items,
    ...config, // Spread author-defined config props
  };
}
```

**Config Pattern:**
1. **Import utilities** (e.g., `createOptimizedPicture`)
2. **Export function** named `extract[BlockName]Data`
3. **Separate config rows** (no images) from content rows (has content)
4. **Extract config** → Convert to camelCase props
5. **Extract content** → Map to data array
6. **Return object** with all props

**For images:**
```javascript
const img = imageDiv.querySelector('img');
if (img) {
  const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  pictureHTML = picture.outerHTML;
}
```

### Step 5: Build the Block

```bash
npm run build
```

Output:
```
🚀 Starting block build process...
📦 Building block: myblock
  ✓ Copied myblock.css
  ✓ Generated decorator
  ✓ Built myblock.js
✅ Build complete!
```

### Step 6: Test in AEM

```bash
aem up
```

Create content in Google Docs (see [Authoring](#authoring-in-google-docsword) section).

---

## Development Workflow

### Daily Development

**Option 1: Watch Mode (Auto-rebuild)**

```bash
# Terminal 1: Watch and auto-rebuild
npm run build:watch

# Terminal 2: AEM dev server
aem up
```

Now edit files in `src/blocks/` and they'll auto-rebuild on save.

**Option 2: Manual Build**

```bash
# Make changes to src/blocks/
npm run build

# Refresh browser (Ctrl+Shift+R)
```

### Using Shared Utilities

The `src/utils/` directory contains reusable utilities that can be imported **anywhere** in your block code:

**Example: `src/utils/block-config.js`**

This provides common helpers for extracting configuration and content from block tables:
- `extractConfigRows(block)` - Extracts config props from rows without images
- `filterContentRows(block)` - Returns only content rows (with images)
- `toCamelCase(str)` - Converts "Border Color" → "borderColor"

**How it works:**
- Import utilities in **Vue components** or **config files**: 
  ```javascript
  // In Cards.vue
  import { myHelper } from '../../utils/my-helper.js';
  
  // In cards.config.js
  import { extractConfigRows } from '../../utils/block-config.js';
  ```
- During build, Vite **automatically bundles** the utility code into the block's output
- Works for both Vue components AND config files
- Each block becomes self-contained with no external dependencies (except Vue and scripts/)
- No utils directory is created at the project root - everything is inlined

**Universal Bundling:**
The build system automatically bundles:
- ✅ Utilities imported in Vue components → bundled into compiled component
- ✅ Utilities imported in config files → bundled into config
- ✅ Services from `src/services/` → bundled
- ✅ Any other imports from `src/` → bundled
- ❌ Imports from `scripts/` → kept external (runtime dependencies)
- ❌ Vue imports → kept external

**Advantages:**
- ✅ Clean project root - no generated directories
- ✅ Each block is self-contained and portable
- ✅ Works consistently everywhere - Vue components, config files, anywhere
- ✅ No runtime dependency issues
- ✅ Utilities are automatically minified and optimized

**Adding new utilities:**
1. Create files in `src/utils/` (or `src/services/`, `src/helpers/`, etc.)
2. Import them anywhere in your block code
3. Run build - utilities are automatically bundled into the block output

### Development Checklist

1. ✅ Edit source files in `src/blocks/` or `src/utils/`
2. ✅ Run `npm run build` (or use watch mode)
3. ✅ Hard refresh browser (`Ctrl+Shift+R`)
4. ✅ Test in browser
5. ✅ Commit only `src/` files (not `blocks/`)

### Browser Cache Issues

If changes don't appear:

1. **Hard refresh:** `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. **Disable cache:** Open DevTools (F12) → Network tab → Check "Disable cache"
3. **Clear cache:** DevTools → Right-click refresh → "Empty Cache and Hard Reload"

---

## Authoring in Google Docs/Word

### Basic Block Table

Authors create a table in Google Docs/Word:

```
| My Block |  |
|----------|--|
| Item 1   |  |
| Item 2   |  |
| Item 3   |  |
```

**Key points:**
- First row: Block name (e.g., "My Block" → `myblock`)
- Separator row (`|---|---|`) is ignored
- Each row becomes content

### Configurable Props

Authors can add config rows (text-only, no images):

```
| Cards |  |
|-------|--|
| Title | My Custom Title |
| Theme | dark |
| ![image1.jpg] | Card 1 content |
| ![image2.jpg] | Card 2 content |
```

**How it works:**
1. Rows without images in first cell = **config props**
2. "Title" → `title` prop
3. "Theme" → `theme` prop
4. Rows with images = **content data**

**Naming conversion:**
- "Border Color" → `borderColor`
- "Max Items" → `maxItems`
- "Show Header" → `showHeader`

### Image Blocks

For blocks with images:

```
| Cards |  |
|-------|--|
| ![card1.jpg] | **Card Title**<br>Card description |
| ![card2.jpg] | **Another Card**<br>More text |
```

Images in the first cell trigger content row detection.

### Multi-Column Blocks

```
| My Block |  |  |
|----------|--|--|
| Column 1 | Column 2 | Column 3 |
| Data 1   | Data 2   | Data 3   |
```

Access via `cells[0]`, `cells[1]`, `cells[2]` in config.

---

## How It Works

### The Build Process

```
src/blocks/cards/Cards.vue
         ↓
   [Vite + Vue Plugin]
         ↓
   Compiled JavaScript
         ↓
  + cards.config.js
         ↓
blocks/cards/cards.js (decorator)
```

**Generated decorator file:**
```javascript
// Built: 2026-01-14T10:30:00.000Z
import { createVueBlockDecorator } from '../../scripts/vue-utils.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

// Vue component (compiled)
const VueComponent = { /* compiled component */ };

// Data extractor
export function extractCardData(block) { /* ... */ }

// Export decorator
export default createVueBlockDecorator(VueComponent, extractCardData);
```

### Runtime Flow

1. **AEM loads page** with block HTML
2. **AEM calls decorator** (`blocks/cards/cards.js`)
3. **Decorator extracts data** via `extractCardData(block)`
4. **Vue component mounts** with extracted props
5. **Original HTML replaced** with Vue-rendered content
6. **CSS applies** (loaded by AEM automatically)

### Vue Integration

Vue is loaded from CDN via import map in `head.html`:

```html
<script type="importmap">
{
  "imports": {
    "vue": "https://cdn.jsdelivr.net/npm/vue@3.5.26/dist/vue.esm-browser.prod.js"
  }
}
</script>
```

This allows compiled blocks to `import { ... } from "vue"`.

---

## Deployment

### CI/CD Setup

**GitHub Actions example:**

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build blocks
        run: npm run build
      
      - name: Deploy
        run: |
          # Your deployment commands here
```

### What to Deploy

**Include:**
- ✅ `blocks/` (generated files)
- ✅ `scripts/`
- ✅ `styles/`
- ✅ `head.html`
- ✅ Content files

**Exclude:**
- ❌ `src/` (source files)
- ❌ `node_modules/`
- ❌ `.git/`

### Git Configuration

The `.gitignore` already excludes generated files:

```gitignore
# Generated blocks - built from src/blocks
blocks/*
```

**Important:** Never commit `blocks/` to git. It's generated in CI.

---

## Troubleshooting

### Build Issues

**Problem:** Build fails with Vue errors

**Solution:** 
- Check Vue component syntax
- Ensure `<template>` and `<script setup>` are present
- Run `npm run build` to see full error

**Problem:** CSS not copied

**Solution:**
- Ensure `.css` file exists in `src/blocks/[blockname]/`
- Check file naming: `blockname.css` (lowercase)
- Rebuild: `npm run build`

### Runtime Issues

**Problem:** "Failed to resolve module specifier 'vue'"

**Solution:**
- Check `head.html` has the import map
- Clear browser cache
- Verify Vue CDN is accessible

**Problem:** CSS not applying

**Solution:**
1. Hard refresh browser (`Ctrl+Shift+R`)
2. Check DevTools → Network → verify `cards.css` loads
3. Inspect element → verify classes match CSS selectors
4. Rebuild: `npm run build`

**Problem:** Props not working

**Solution:**
- Check config.js exports correct function name
- Verify function returns object with props
- Console.log the extracted data
- Check Vue component prop definitions

### Watch Mode Issues

**Problem:** Watch mode not detecting changes

**Solution:**
- Restart watch mode: `Ctrl+C` then `npm run build:watch`
- Check `nodemon.json` configuration
- Use manual build instead: `npm run build`

**Problem:** Infinite rebuild loop

**Solution:**
- Already fixed in `nodemon.json` (ignores `blocks/`)
- Restart watch mode if it happens

---

## Examples

### Example 1: Simple List Block

**Vue Component:**
```vue
<template>
  <ul class="list-block">
    <li v-for="(item, index) in items" :key="index">
      {{ item }}
    </li>
  </ul>
</template>

<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>
```

**Config:**
```javascript
export function extractListData(block) {
  const items = [...block.children].map(row => 
    row.textContent.trim()
  );
  return { items };
}
```

**Authoring:**
```
| List |
|------|
| Item 1 |
| Item 2 |
| Item 3 |
```

### Example 2: Cards with Images

**Vue Component:**
```vue
<template>
  <ul>
    <li v-for="(card, index) in cards" :key="index">
      <div class="cards-card-image" v-html="card.picture"></div>
      <div class="cards-card-body" v-html="card.body"></div>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  cards: { type: Array, required: true },
  borderColor: { type: String, default: '#dadada' },
});
</script>
```

**Config:**
```javascript
export function extractCardData(block) {
  const config = {};
  const rows = [...block.children];

  const contentRows = rows.filter((row) => {
    const cells = [...row.children];
    const hasImage = cells[0].querySelector('img') !== null;
    
    if (!hasImage && cells.length >= 2) {
      const key = cells[0].textContent.trim();
      const value = cells[1].textContent.trim();
      const propKey = key.replace(/\s(.)/g, (_, c) => c.toUpperCase())
                         .replace(/^(.)/, (_, c) => c.toLowerCase());
      config[propKey] = value;
      return false;
    }
    return true;
  });

  const cards = contentRows.map((row) => {
    const cells = [...row.children];
    const img = cells[0].querySelector('img');
    const picture = createOptimizedPicture(img.src, img.alt);
    
    return {
      picture: picture.outerHTML,
      body: cells[1].innerHTML,
    };
  });

  return { cards, ...config };
}
```

**Authoring:**
```
| Cards |  |
|-------|--|
| Border Color | #3498db |
| ![img1.jpg] | Card content 1 |
| ![img2.jpg] | Card content 2 |
```

---

## Best Practices

### Vue Components

1. ✅ Keep components simple and focused
2. ✅ Use semantic HTML
3. ✅ Provide sensible defaults for all props
4. ✅ Use `v-html` sparingly (security risk)
5. ✅ Test with various content lengths
6. ❌ Don't use scoped styles
7. ❌ Don't import CSS in Vue files

### CSS

1. ✅ Prefix all classes with block name
2. ✅ Use CSS variables for theming
3. ✅ Make responsive by default
4. ✅ Test on mobile devices
5. ❌ Don't use `!important` unless necessary
6. ❌ Don't rely on specific HTML structure

### Config Files

1. ✅ Handle missing data gracefully
2. ✅ Validate input before processing
3. ✅ Use `createOptimizedPicture()` for images
4. ✅ Document expected structure in comments
5. ✅ Return consistent prop structure
6. ❌ Don't assume data exists
7. ❌ Don't mutate the DOM

### Development

1. ✅ Build frequently during development
2. ✅ Test with real AEM content
3. ✅ Hard refresh browser after builds
4. ✅ Use browser DevTools for debugging
5. ✅ Commit only source files
6. ❌ Don't commit `blocks/` directory
7. ❌ Don't edit generated files directly

---

## Quick Reference

### Commands

```bash
# Build once
npm run build

# Watch mode
npm run build:watch

# Start AEM dev server
aem up

# Lint code
npm run lint

# Fix lint errors
npm run lint:fix
```

### File Naming

- Vue component: `PascalCase.vue` (e.g., `Cards.vue`)
- CSS file: `lowercase.css` (e.g., `cards.css`)
- Config file: `lowercase.config.js` (e.g., `cards.config.js`)
- Block name in AEM: `lowercase` (e.g., `cards`)

### Prop Naming Conversion

| Author Input | Vue Prop Name |
|--------------|---------------|
| Title | `title` |
| Border Color | `borderColor` |
| Max Items | `maxItems` |
| Show Header | `showHeader` |
| Background Color | `backgroundColor` |

---

## Support

For issues or questions:
1. Check this README
2. Review example blocks in `src/blocks/`
3. Check browser console for errors
4. Review AEM EDS documentation

---

**Version:** 1.0.0  
**Last Updated:** January 14, 2026

