/**
 * @file This script provides utility functions for creating and managing Vue blocks within an AEM environment.
 * It includes a decorator function that handles the lifecycle of a Vue application within a block,
 * including mounting, unmounting, and data extraction.
 */

import { createApp } from 'vue';
import { installPrimeVueLike } from './primevue-config.js';

/**
 * Creates a decorator function for a Vue-based AEM block.
 * This function manages the lifecycle of the Vue application within the block element.
 * It handles unmounting any existing Vue app, extracting data, and mounting a new app.
 *
 * @param {import('vue').Component} VueComponent The Vue component to be rendered in the block.
 * @param {(block: HTMLElement) => Record<string, any>} dataExtractor A function that extracts properties for the Vue component from the block's DOM.
 * @returns {(block: HTMLElement) => import('vue').App} A decorator function that, when applied to a block element, renders the Vue component inside it.
 */
export function createVueBlockDecorator(VueComponent, dataExtractor) {
  return function decorate(block) {
    if (block.__vueApp) {
      try {
        block.__vueApp.unmount();
      } catch (e) {
        console.warn('Vue unmount failed', e);
      }
      delete block.__vueApp;
    }

    let props = {};
    try {
      props = dataExtractor?.(block) ?? {};
    } catch (e) {
      console.error('Block dataExtractor failed:', e);
    }

    block.innerHTML = '';

    const app = createApp(VueComponent, props);

    installPrimeVueLike(app);

    app.mount(block);

    block.__vueApp = app;
    return app;
  };
}
