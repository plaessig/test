interface HeaderProps {
  // No props needed for now - static header
}

/**
 * Extract header data from the block element
 * 
 * Header is static for now, no configuration needed
 */
export function extractHeaderData(_block: Element): HeaderProps {
  // Header doesn't need any data extraction
  // Just return empty object
  return {};
}

