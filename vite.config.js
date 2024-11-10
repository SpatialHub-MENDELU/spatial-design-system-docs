import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    root: "src/vue/playground",
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/app.scss";`,
            },
        },
    },
});
