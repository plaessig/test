import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $primevue: any;
        $primevueConfig: any;
    }
}
