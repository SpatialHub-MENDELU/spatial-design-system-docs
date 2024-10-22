import DefaultTheme from "vitepress/theme";
import "./custom.css";
import PrimeVue from 'primevue/config';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ComponentExample")
    app.use(PrimeVue)
  }
}