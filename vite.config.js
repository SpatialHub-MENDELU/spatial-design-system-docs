import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    root: "src/vue/playground",
    server: {
        cors: {
          origin: "http://localhost:5174",
          methods: ['GET', 'POST'], 
        },
      },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/styles/app.scss";`,
            },
        },
    },
    vue: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('a-')
        }
      }
});
