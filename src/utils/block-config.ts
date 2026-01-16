import { createOptimizedPicture } from '../../scripts/aem.js';

export function text(el: Element | null | undefined): string {
  return (el?.textContent || '').trim();
}

export function lower(el: Element | null | undefined): string {
  return text(el).toLowerCase();
}

export function cellHtml(cell: HTMLElement | null | undefined): string {
  return (cell?.innerHTML || '').trim();
}

export function cellLink(cell: HTMLElement | null | undefined): string {
  if (!cell) return '';
  const a = cell.querySelector('a');
  return a?.href ? a.href : text(cell);
}

export function cellPictureHtml(cell: HTMLElement | null | undefined, opts: { width: number; alt?: string } ): string {
  if (!cell) return '';
  const img = cell.querySelector('img') || cell.querySelector('picture img');
  if (!img?.getAttribute('src')) return '';
  const src = img.getAttribute('src')!;
  const alt = opts.alt ?? img.getAttribute('alt') ?? '';
  return createOptimizedPicture(src, alt, false, [{ width: String(opts.width) }]).outerHTML;
}

export function cellPictureOrHtml(cell: HTMLElement | null | undefined, opts: { width: number; alt?: string }): string {
  // Prefer picture if present, else fallback to innerHTML (for emoji or formatted text)
  return cellPictureHtml(cell, opts) || cellHtml(cell);
}

export function cellIconHtml(cell: HTMLElement | null | undefined, opts: { width: number }): string {
  if (!cell) return '';
  const img = cell.querySelector('img');
  if (img?.getAttribute('src')) {
    return createOptimizedPicture(img.getAttribute('src')!, img.getAttribute('alt') ?? '', false, [{ width: String(opts.width) }]).outerHTML;
  }
  const svg = cell.querySelector('svg');
  if (svg) return svg.outerHTML;
  return text(cell);
}

export function findHeaderRowIndex(rows: Element[], headerFirstCell: string | string[]): number {
  const headers = Array.isArray(headerFirstCell) ? headerFirstCell : [headerFirstCell];
  return rows.findIndex((row) => {
    const cells = [...row.children] as HTMLElement[];
    if (cells.length < 1) return false;
    const first = lower(cells[0]);
    return headers.includes(first);
  });
}

export function findRowByLabel(rows: Element[], label: string): { row: Element; cells: HTMLElement[] } | null {
  const lbl = label.toLowerCase();
  for (const row of rows) {
    const cells = [...row.children] as HTMLElement[];
    if (cells.length < 2) continue;
    if (lower(cells[0]) === lbl) return { row, cells };
  }
  return null;
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

export function cellText(cell: HTMLElement | null | undefined): string {
  return (cell?.textContent || '').trim();
}

export function optionalCellText(cell: HTMLElement | null | undefined): string | undefined {
  const t = cellText(cell);
  return t ? t : undefined;
}


export function filterContentRows(block: Element): Element[] {
  return [...block.children].filter(row => {
    const firstCell = row.children[0] as HTMLElement;
    return firstCell?.querySelector('img') !== null;
  });
}

export function toCamelCase(str: string): string {
  return str
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s(.)/g, (_, char) => char.toUpperCase())
      .replace(/^(.)/, (_, char) => char.toLowerCase());
}