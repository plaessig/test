import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Extract card data from the block element
 * @param {Element} block - The block element
 * @returns {Object} Props for the Cards component
 */
export function extractCardData(block) {
  const config = {};
  const rows = [...block.children];

  // Separate config rows from content rows
  // Config rows: first cell has NO image (just text) - these are author props
  // Content rows: first cell has an image - these are the cards
  const contentRows = rows.filter((row, index) => {
    const cells = [...row.children];
    if (cells.length < 2) return false;

    const firstCell = cells[0];
    const hasImage = firstCell.querySelector('img') !== null;

    if (!hasImage) {
      // This is a config row - extract the prop
      const key = firstCell.textContent.trim();
      const value = cells[1].textContent.trim();
      if (key && value) {
        // Convert to camelCase for Vue props (e.g., "Border Color" -> "borderColor")
        const propKey = key
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s(.)/g, (_, char) => char.toUpperCase())
          .replace(/^(.)/, (_, char) => char.toLowerCase());
        config[propKey] = value;
      }
      return false; // Exclude from content rows
    }

    return true; // Include in content rows
  });

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

