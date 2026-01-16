import type { Component } from 'vue';

export type BlockExtractor<Props = any> = (block: Element) => Props;

export type BlockDecorator = (block: Element) => any;

/**
 * Creates a decorator function for EDS blocks using Vue
 */
export function createVueBlockDecorator<Props>(
    component: Component,
    extractor: BlockExtractor<Props>
): BlockDecorator;
