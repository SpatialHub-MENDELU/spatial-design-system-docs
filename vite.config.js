import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:8081",
  "https://sds.spatialhub.cz",
];

export default defineConfig({
    base: "/",  
    plugins: [],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/app.scss";`,
          quietDeps: true
        },
    },
  },
    root: "./.vitepress/theme",
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
    preview: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Resource-Policy": "same-site"
      }
    },
    vue: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('a-') 
        }
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
        assetsDir: "assets",
      },
      exclude: ['vitepress'],
      resolve: {
        alias: {
          global: 'global',
        },
      },
});
