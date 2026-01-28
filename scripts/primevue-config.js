/**
 * @file This script configures and installs a mock version of PrimeVue for use in the application.
 * It provides a default configuration and a function to install a simplified PrimeVue-like object
 * into a Vue application instance. This is useful for environments where the full PrimeVue library
 * is not needed or available.
 */

/**
 * The default configuration for the mock PrimeVue instance.
 * This object mimics the structure of a real PrimeVue configuration.
 * @type {import('primevue/config').PrimeVueConfiguration}
 */
export const primeVueConfig = {
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

/**
 * A mock PrimeVue object that provides a simplified version of the $primevue global property.
 * It includes the configuration and a no-op `changeTheme` function.
 */
const primevueObject = {
    config: primeVueConfig,
    changeTheme: () => {},
};

/**
 * Installs the mock PrimeVue object and its configuration into a Vue application.
 * This function provides the `$primevue` and `$primevueConfig` properties to all components
 * in the application, both through `provide` and as global properties.
 * @param {import('vue').App} app The Vue application instance.
 */
export function installPrimeVueLike(app) {
    app.provide('$primevue', primevueObject);
    app.provide('$primevueConfig', primeVueConfig);

    app.config.globalProperties.$primevue = primevueObject;
    app.config.globalProperties.$primevueConfig = primeVueConfig;
}
