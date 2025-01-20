import { defineConfig } from "vitepress";

import crossOriginIsolation from "vite-plugin-cross-origin-isolation";
import { fileURLToPath } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Spatial Design System",
  description:
    "AR/VR Design System with detailed guidelines and ready to use components",
  srcDir: "./src",
  themeConfig: {
    logo: {
      dark: "/spatial-design-system-logo-dark.png",
      light: "/spatial-design-system-logo-dark.png",
      alt: "logo",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Playground", link: "/playground/editor" },
      { text: "Docs", link: "/getting-started/introduction" },
      { text: "Contact", link: "/contact" },
    ],

    sidebar: [
      {
        text: "Getting started",
        items: [
          { text: "Introduction", link: "/getting-started/introduction" },
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Quick Start", link: "/getting-started/quick-start" },
        ],
      },
      {
        text: "Primitives",
        items: [
          { text: "Menu", link: "/ar-vr-primitives/menu" },
          { text: "Row, column", link: "/ar-vr-primitives/rowcolumn" },
        ],
      },
      {
        text: "Components",
        items: [
          { text: "auto-position", link: "/ar-vr-components/auto-position" },
          { text: "auto-scale", link: "/ar-vr-components/auto-scale" },
          { text: "billboard", link: "/ar-vr-components/billboard" },
          { text: "circle", link: "/ar-vr-components/circle" },
          { text: "fit-into-fov", link: "/ar-vr-components/fit-into-fov" },
          { text: "flexbox", link: "/ar-vr-components/flexbox" },
          { text: "follow-camera", link: "/ar-vr-components/follow-camera" },
          { text: "grid", link: "/ar-vr-components/grid" },
        ],
      },
      {
        text: "Guidelines",
        items: [
          { text: "Overview", link: "/guidelines/overview" },
          {
            text: "Appearance",
            link: "/guidelines/appearance",
            items: [
              { text: "Size", link: "/guidelines/size" },
              { text: "Transparency", link: "/guidelines/transparency" },
              { text: "Color Mode", link: "/guidelines/color-mode" },
            ],
          },
          {
            text: "Behavior",
            link: "/guidelines/behavior",
            items: [
              { text: "Stable", link: "/guidelines/stable" },
              { text: "Adaptive", link: "/guidelines/adaptive" },
              { text: "Follow", link: "/guidelines/follow" },
            ],
          },
          {
            text: "Menu Type",
            link: "/guidelines/menu-type",
            items: [
              { text: "3D menu", link: "/guidelines/3d-menu" },
              { text: "Bottom sheet", link: "/guidelines/bottom-sheet" },
              {
                text: "Floating buttons",
                link: "/guidelines/floating-buttons",
              },
              { text: "Hybrid menu", link: "/guidelines/hybrid-menu" },
              { text: "2D menu", link: "/guidelines/2d-menu" },
            ],
          },
        ],
      },
    ],

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ]
  },
  vite: {
    plugins: [
      crossOriginIsolation(),
    ],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    }
  },
});
