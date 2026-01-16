import { extractConfigRows, filterContentRows, cellPictureHtml, cellHtml, optionalCellText } from '../../utils/block-config.ts';

interface CardData {
  picture: string;
  body: string;
  title?: string;
  buttonText?: string;
}

export function extractCardData(block: Element) {
  const config = extractConfigRows(block);
  const contentRows = filterContentRows(block);

  const cards: CardData[] = contentRows.map((row, _idx) => {
    const cells = [...row.children] as HTMLElement[];

    return {
      picture: cellPictureHtml(cells[0], { width: 750 }),
      body: cellHtml(cells[1]),
      title: optionalCellText(cells[2]),
      buttonText: optionalCellText(cells[3]),
    };
  });

  return { ...config, cards };
}
