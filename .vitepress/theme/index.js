import DefaultTheme from "vitepress/theme";
import "./custom.css";
import PrimeVue from "primevue/config";
import { onMounted } from "vue";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Aura from '@primeuix/themes/aura';

import { WebContainerService } from "../../src/vue/playground/services/webContainersService";
import { FileSystemService } from "../../src/vue/playground/services/fileSystemService";
import { SessionService } from "../../src/vue/playground/services/sessionService";
import playgroundStore from "../../src/vue/playground/stores/PlaygroundStore";
import ConfirmationService from 'primevue/confirmationservice';

import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        if (typeof window !== "undefined") {
            onMounted(async () => {
                await import("aframe");
            });
        }

        app.component("ComponentExample");
        app.use(PrimeVue, {
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'system',
                    cssLayer: false
                }
            }}
        );
        app.use(ConfirmationService)
        app.provide("webContainersService", new WebContainerService());
        app.provide("fileSystemService", new FileSystemService());
        app.provide("sessionService", new SessionService())
        app.use(ToastService)
        app.use(playgroundStore)
        app.directive('tooltip', Tooltip);
    },
};
