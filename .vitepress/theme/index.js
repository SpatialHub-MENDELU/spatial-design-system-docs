import DefaultTheme from "vitepress/theme";
import "./custom.css";
import PrimeVue from "primevue/config";
import { WebContainerService } from "../../src/vue/playground/services/webContainersService";
import { FolderService } from "../../src/vue/playground/services/folderService";
import { SessionService } from "../../src/vue/playground/services/sessionService";

import Tooltip from 'primevue/tooltip';

/** @type {import('vitepress').Theme} */
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component("ComponentExample");
        app.use(PrimeVue);
        app.provide("webContainersService", new WebContainerService());
        app.provide("folderService", new FolderService());
        app.provide("sessionService", new SessionService())
        app.directive('tooltip', Tooltip);
    },
};
