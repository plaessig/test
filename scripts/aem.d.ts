/**
 * Type declarations for AEM Edge Delivery Services utilities
 */

/**
 * Create an optimized picture element
 */
export function createOptimizedPicture(
  src: string,
  alt: string,
  eager?: boolean,
  breakpoints?: Array<{ media?: string; width: string; format?: string }>
): HTMLPictureElement;

/**
 * Decorate block with additional features
 */
export function decorateBlock(block: Element): void;

/**
 * Decorate all blocks on the page
 */
export function decorateBlocks(main: Element): void;

/**
 * Decorate all buttons on the page
 */
export function decorateButtons(main: Element): void;

/**
 * Decorate all icons on the page
 */
export function decorateIcons(main: Element): void;

/**
 * Decorate all sections on the page
 */
export function decorateSections(main: Element): void;

/**
 * Load blocks
 */
export function loadBlocks(main: Element): Promise<void>;

/**
 * Load CSS for a block
 */
export function loadCSS(href: string): void;

/**
 * Read block configuration from the block element
 */
export function readBlockConfig(block: Element): Record<string, string>;

/**
 * Get metadata value
 */
export function getMetadata(name: string): string;

