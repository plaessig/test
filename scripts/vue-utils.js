import { createApp } from 'vue';

/**
 * Creates a block decorator for Vue components in AEM Edge Delivery Services
 *
 * @param {Object} VueComponent - The Vue component to mount
 * @param {Function} dataExtractor - Function that extracts props from the block DOM
 * @returns {Function} The decorator function that AEM will call
 *
 * @example
 * import MyComponent from './MyComponent.vue';
 *
 * function extractData(block) {
 *   return { items: [...block.children].map(row => row.textContent) };
 * }
 *
 * export default createVueBlockDecorator(MyComponent, extractData);
 */
export function createVueBlockDecorator(VueComponent, dataExtractor) {
  return function decorate(block) {
    const props = dataExtractor(block);
    block.innerHTML = '';

    const app = createApp(VueComponent, props);
    app.mount(block);

    // Store app instance for potential cleanup
    block.__vueApp = app;

    return app;
  };
}



