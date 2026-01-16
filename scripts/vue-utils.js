// scripts/vue-utils.js
import { createApp } from 'vue';
import { installPrimeVueLike } from './primevue-config.js';

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
