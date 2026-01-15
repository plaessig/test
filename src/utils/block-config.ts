/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s(.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
}

/**
 * Extract config rows from block (rows without images in first cell)
 */
export function extractConfigRows(block: Element): Record<string, string> {
  const config: Record<string, string> = {};
  const rows = [...block.children];

  rows.forEach(row => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const firstCell = cells[0] as HTMLElement;
    const hasImage = firstCell.querySelector('img') !== null;

    if (!hasImage) {
      const key = toCamelCase(firstCell.textContent?.trim() || '');
      const value = (cells[1] as HTMLElement).textContent?.trim() || '';
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
export function filterContentRows(block: Element): Element[] {
  return [...block.children].filter(row => {
    const firstCell = row.children[0] as HTMLElement;
    return firstCell?.querySelector('img') !== null;
  });
}

