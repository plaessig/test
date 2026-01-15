import { createOptimizedPicture } from '../../../scripts/aem.js';
import { extractConfigRows, filterContentRows } from '../../utils/block-config.js';

/**
 * Extract card data from the block element
 * @param {Element} block - The block element
 * @returns {Object} Props for the Cards component
 */
export function extractCardData(block) {
  // Extract config rows (rows without images in first cell)
  const config = extractConfigRows(block);

  // Filter to get only content rows (rows with images in first cell)
  const contentRows = filterContentRows(block);

  // Extract card data from content rows only
  const cardData = contentRows.map((row) => {
    const cells = [...row.children];

    // First cell is the image
    const imageDiv = cells[0];
    let pictureHTML = '';

    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        pictureHTML = optimizedPicture.outerHTML;
      }
    }

    // Second cell is the body
    const bodyDiv = cells[1];

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

