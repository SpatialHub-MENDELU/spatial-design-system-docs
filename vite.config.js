import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const allowedOrigins = [
  "http://localhost:5174",
  "https://sds.spatialhub.cz",
];

export default defineConfig({
    plugins: [vue()],
    root: "./src/vue/playground",
    server: {
        cors: {
          origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
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
      },
});
