/**
 * String utility functions for testing
 */

/**
 * Truncate string to specified length
 */
export function truncate(str, maxLength) {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

/**
 * Convert string to slug format
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

