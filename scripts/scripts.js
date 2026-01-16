import {
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  decorateBlock,
  loadBlock,
} from './aem.js';

async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch {
    // ignore
  }
}

/**
 * Optional: Load sidebar/nav from /nav.plain.html (EDS convention)
 */
async function loadNav() {
  try {
    const resp = await fetch('/nav.plain.html');
    if (!resp.ok) return;

    const html = await resp.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const navBlock = doc.querySelector('.nav');
    if (!navBlock) return;

    navBlock.remove();
    document.body.prepend(navBlock);

    decorateBlock(navBlock);
    await loadBlock(navBlock);
  } catch (e) {
    console.error('Failed to load nav:', e);
  }
}

export function decorateMain(main) {
  decorateButtons(main);
  decorateIcons(main);
  decorateSections(main);
  decorateBlocks(main);
}

async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();

  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');

    // Load first section early to hit LCP quickly
    const firstSection = main.querySelector('.section');
    if (firstSection) {
      await loadSection(firstSection, waitForFirstImage);
    }
  }

  try {
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch {
    // ignore
  }
}

async function loadLazy(doc) {
  // Pick ONE navigation strategy:
  // - either header contains nav (loadHeader)
  // - or you load sidebar from /nav (loadNav)
  await loadNav();
  loadHeader(doc.querySelector('header'));

  const main = doc.querySelector('main');
  if (main) await loadSections(main);

  const { hash } = window.location;
  const el = hash ? doc.getElementById(hash.substring(1)) : null;
  if (el) el.scrollIntoView();

  loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

function loadDelayed() {
  window.setTimeout(() => import('./delayed.js'), 3000);
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();
