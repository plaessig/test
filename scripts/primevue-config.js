// scripts/primevue.js

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

const primevueObject = {
    config: primeVueConfig,
    changeTheme: () => {},
};

export function installPrimeVueLike(app) {
    app.provide('$primevue', primevueObject);
    app.provide('$primevueConfig', primeVueConfig);

    app.config.globalProperties.$primevue = primevueObject;
    app.config.globalProperties.$primevueConfig = primeVueConfig;
}
