import { createApp } from 'vue';

/**
 * Creates a block decorator for Vue components in AEM Edge Delivery Services
 *
 * @param {Object} VueComponent - The Vue component to mount
 * @param {Function} dataExtractor - Function that extracts props from the block DOM
 * @returns {Function} The decorator function that AEM will call
 */
export function createVueBlockDecorator(VueComponent, dataExtractor) {
  return function decorate(block) {
    const props = dataExtractor(block);
    block.innerHTML = '';

    const app = createApp(VueComponent, props);

    // PrimeVue configuration object
    const primeVueConfig = {
      ripple: false,
      inputStyle: 'outlined',
      locale: {
        accept: 'Yes',
        reject: 'No',
        choose: 'Choose',
        upload: 'Upload',
        cancel: 'Cancel',
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        weekHeader: 'Wk',
        firstDayOfWeek: 0,
        dateFormat: 'mm/dd/yy',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        passwordPrompt: 'Enter a password',
      },
      pt: undefined,
      ptOptions: {
        mergeSections: true,
        mergeProps: false,
      },
      unstyled: false,
      csp: {
        nonce: undefined
      },
      zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100,
      },
    };

    const primevueObject = {
      config: primeVueConfig,
      changeTheme: () => {},
    };

    // Provide PrimeVue configuration for components (for inject)
    app.provide('$primevue', primevueObject);
    app.provide('$primevueConfig', primeVueConfig);

    // Also set as global properties (for direct access on component instances)
    app.config.globalProperties.$primevue = primevueObject;
    app.config.globalProperties.$primevueConfig = primeVueConfig;

    app.mount(block);

    // Store app instance for cleanup
    block.__vueApp = app;

    return app;
  };
}

