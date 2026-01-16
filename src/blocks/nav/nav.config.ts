import { createOptimizedPicture } from '../../../scripts/aem.js';
import { extractConfigRows } from '../../utils/block-config.ts';

interface NavItem {
  icon?: string;
  name: string;
  link: string;
  active?: boolean;
}

interface NavProps {
  items: NavItem[];
  title?: string;
  defaultCollapsed?: boolean;
  brandName?: string;
  brandLogo?: string;
}

/**
 * Extract navigation data from the block element
 * 
 * Expected document structure in Google Docs/Word:
 * 
 * | Brand Logo | [insert image here] |
 * | Icon | Name | Link |
 * | 🏠 | Home | / |
 * | 📄 | Docs | /docs |
 * | ⚙️ | Settings | /settings |
 *
 * Insert image directly in the Brand Logo cell using Insert → Image
 */
export function extractNavData(block: Element): NavProps {
  // Extract config rows
  const config = extractConfigRows(block);

  // Process brand logo from Brand Logo row
  let brandLogo = '';

  const rows = [...block.children];

  // Look for Brand Logo row and extract image from it
  rows.forEach(row => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const firstCell = cells[0] as HTMLElement;
      const secondCell = cells[1] as HTMLElement;

      if (firstCell.textContent?.trim().toLowerCase() === 'brand logo') {
        // Look for image in second cell
        let img = secondCell.querySelector('img');
        if (!img) {
          const picture = secondCell.querySelector('picture');
          if (picture) img = picture.querySelector('img');
        }

        if (img) {
          const optimizedPicture = createOptimizedPicture(
            img.src,
            img.alt || 'Brand Logo',
            false,
            [{ width: '200' }]  // Larger size for logo
          );
          brandLogo = optimizedPicture.outerHTML;
        } else {
          // Fallback to emoji or text content
          const content = secondCell.innerHTML.trim();
          if (content && content !== '<p></p>' && content !== '<p>\n              \n            </p>') {
            brandLogo = content;
          }
        }
      }
    }
  });
  const items: NavItem[] = [];
  let isHeaderRow = true;

  rows.forEach(row => {
    const cells = [...row.children];
    if (cells.length < 2) return;

    const firstCell = cells[0] as HTMLElement;
    const hasImage = firstCell.querySelector('img, svg') !== null;
    
    // Skip config rows
    if (!hasImage && cells.length >= 2) {
      const firstText = firstCell.textContent?.trim().toLowerCase() || '';
      if (firstText === 'icon' || firstText === 'brand logo') {
        return;
      }
    }

    // Skip the header row (Icon | Name | Link)
    if (isHeaderRow && cells.length === 3) {
      const headerText = firstCell.textContent?.trim().toLowerCase() || '';
      if (headerText === 'icon') {
        isHeaderRow = false;
        return;
      }
    }

    // Parse navigation items
    if (cells.length >= 2) {
      let iconHTML = '';
      let name = '';
      let link = '';

      if (cells.length === 3) {
        // Format: Icon | Name | Link
        const iconCell = cells[0] as HTMLElement;
        const nameCell = cells[1] as HTMLElement;
        const linkCell = cells[2] as HTMLElement;

        // Extract icon - handle images inserted in Google Docs
        const imgElement = iconCell.querySelector('img');
        const svgElement = iconCell.querySelector('svg');

        if (imgElement) {
          // Image inserted in Google Docs - use AEM's optimized picture
          const optimizedPicture = createOptimizedPicture(
            imgElement.src,
            imgElement.alt || '',
            false,
            [{ width: '56' }]  // Small size for icon
          );
          iconHTML = optimizedPicture.outerHTML;
        } else if (svgElement) {
          iconHTML = svgElement.outerHTML;
        } else {
          // Fallback to emoji or text
          iconHTML = iconCell.textContent?.trim() || '';
        }

        name = nameCell.textContent?.trim() || '';

        // Extract link (could be a link or plain text)
        const linkElement = linkCell.querySelector('a');
        link = linkElement ? linkElement.href : (linkCell.textContent?.trim() || '');
      } else if (cells.length === 2) {
        // Format: Name | Link (no icon)
        const nameCell = cells[0] as HTMLElement;
        const linkCell = cells[1] as HTMLElement;

        name = nameCell.textContent?.trim() || '';
        const linkElement = linkCell.querySelector('a');
        link = linkElement ? linkElement.href : (linkCell.textContent?.trim() || '');
      }

      if (name && link) {
        // Check if this is the current page
        const isActive = typeof window !== 'undefined' && 
                        (window.location.pathname === link || 
                         window.location.pathname === link + '/' ||
                         window.location.pathname + '/' === link);

        items.push({
          icon: iconHTML,
          name,
          link,
          active: isActive,
        });
      }
    }
  });

  return {
    items,
    title: config.title,
    defaultCollapsed: config.defaultCollapsed === 'true',
    brandName: config.brandName,
    brandLogo: brandLogo,
  };
}

