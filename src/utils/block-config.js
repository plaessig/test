/**
 * Convert string to camelCase
 */
export function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s(.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
}

/**
 * Extract config rows from block (rows without images in first cell)
 */
export function extractConfigRows(block) {
  const config = {};
  const rows = [...block.children];

  rows.forEach(row => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const firstCell = cells[0];
    const hasImage = firstCell.querySelector('img') !== null;

    if (!hasImage) {
      const key = toCamelCase(firstCell.textContent.trim());
      const value = cells[1].textContent.trim();
      if (key && value) {
        config[key] = value;
      }
    }
  });

  return config;
}

/**
 * Filter out config rows, return only content rows
 */
export function filterContentRows(block) {
  return [...block.children].filter(row => {
    const firstCell = row.children[0];
    return firstCell?.querySelector('img') !== null;
  });
}

