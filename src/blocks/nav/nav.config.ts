import { cellIconHtml, cellLink, findHeaderRowIndex, findRowByLabel, cellPictureOrHtml, extractConfigRows } from '../../utils/block-config';

export function extractNavData(block: Element) {
  const config = extractConfigRows(block);
  const rows = [...block.children];

  const brandRow = findRowByLabel(rows, 'brand logo');
  const brandLogo = brandRow ? cellPictureOrHtml(brandRow.cells[1], { width: 200 }) : '';

  const headerIdx = findHeaderRowIndex(rows, ['icon', 'name', 'link']);
  const start = headerIdx >= 0 ? headerIdx + 1 : 0;

  const items = rows
      .slice(start)
      .map((row) => [...row.children] as HTMLElement[])
      .filter((cells) => cells.length >= 2)
      .filter((cells) => !['brand logo', 'icon'].includes((cells[0].textContent || '').trim().toLowerCase()))
      .map((cells) => {
        const icon = cells.length >= 3 ? cellIconHtml(cells[0], { width: 56 }) : '';
        const name = cells.length >= 3 ? (cells[1].textContent || '').trim() : (cells[0].textContent || '').trim();
        const link = cells.length >= 3 ? cellLink(cells[2]) : cellLink(cells[1]);
        return { icon: icon || undefined, name, link };
      })
      .filter((it) => it.name && it.link);

  return {
    items,
    title: config.title,
    defaultCollapsed: config.defaultCollapsed === 'true',
    brandName: config.brandName,
    brandLogo,
  };
}
