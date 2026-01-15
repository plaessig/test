/**
 * Type declarations for Vue utilities
 */

import type { Component } from 'vue';

/**
 * Create a Vue block decorator function
 */
export function createVueBlockDecorator<T = any>(
  component: Component,
  dataExtractor: (block: Element) => T
): (block: Element) => void;

