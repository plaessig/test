import { createOptimizedPicture } from '../../../scripts/aem.js';
import { extractConfigRows, filterContentRows } from '../../utils/block-config.ts';

interface CardData {
  picture: string;
  body: string;
}

interface CardsProps {
  cards: CardData[];
  [key: string]: any; // For dynamic config props like borderColor, theme, etc.
}

/**
 * Extract card data from the block element
 */
export function extractCardData(block: Element): CardsProps {
  // Extract config rows (rows without images in first cell)
  const config = extractConfigRows(block);

  // Filter to get only content rows (rows with images in first cell)
  const contentRows = filterContentRows(block);

  // Extract card data from content rows only
  const cardData: CardData[] = contentRows.map((row) => {
    const cells = [...row.children];

    // First cell is the image
    const imageDiv = cells[0] as HTMLElement;
    let pictureHTML = '';

    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        pictureHTML = optimizedPicture.outerHTML;
      }
    }

    // Second cell is the body
    const bodyDiv = cells[1] as HTMLElement;

    return {
      picture: pictureHTML,
      body: bodyDiv?.innerHTML || '',
    };
  });

  return {
    cards: cardData,
    ...config, // Spread config props (borderColor, theme, etc.)
  };
}

