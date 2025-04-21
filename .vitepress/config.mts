import { defineConfig } from 'vitepress';
import { handlePlaygroundPageClass } from '../src/vue/playground/utils/HandlePlaygroundPageClass';

function crossOriginIsolationMiddleware(_, response, next) {
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
}

const crossOriginIsolation = {
  name: 'cross-origin-isolation',
  configureServer: (server) => {
    server.middlewares.use(crossOriginIsolationMiddleware);
  },
  // configurePreviewServer: server => { server.middlewares.use(crossOriginIsolationMiddleware); },
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Spatial Design System',
  description:
    'AR/VR Design System with detailed guidelines and ready to use components',
  srcDir: './src',
  head: [
    [
      'link',
      { rel: 'stylesheet', href: '../../../.vitepress/theme/tailwind.css' },
    ],
    ['script', { type: 'text/javascript' }, handlePlaygroundPageClass],
  ],
  themeConfig: {
    logo: {
      dark: '/spatial-design-system-logo-dark.png',
      light: '/spatial-design-system-logo-dark.png',
      alt: 'logo',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/getting-started/introduction' },
      { text: 'Playground', link: '/playground/editor' },
      { text: 'Contact', link: '/contact' },
    ],

    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Introduction', link: '/getting-started/introduction' },
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Interactivity', link: '/getting-started/interactivity' },
        ],
      },
      {
        text: 'Primitives',
        items: [
          { text: 'Button', link: '/ar-vr-primitives/button' },
          { text: 'Checkbox', link: '/ar-vr-primitives/checkbox' },
          { text: 'Menu', link: '/ar-vr-primitives/menu' },
          { text: 'Row, column', link: '/ar-vr-primitives/rowcolumn' },
          { text: 'Switch', link: '/ar-vr-primitives/switch' },
          { text: 'Textbox', link: '/ar-vr-primitives/textbox' },
        ],
      },
      {
        text: 'Components',
        items: [
          { text: 'auto-position', link: '/ar-vr-components/auto-position' },
          { text: 'auto-scale', link: '/ar-vr-components/auto-scale' },
          { text: 'billboard', link: '/ar-vr-components/billboard' },
          { text: 'circle', link: '/ar-vr-components/circle' },
          { text: 'fit-into-fov', link: '/ar-vr-components/fit-into-fov' },
          {
            text: 'flexbox',
            link: '/ar-vr-components/flexbox',
            items: [
              {
                text: 'flexbox-container',
                link: '/ar-vr-components/flexbox-container',
              },
              { text: 'flex-col', link: '/ar-vr-components/flex-col' },
              { text: 'flex-grow', link: '/ar-vr-components/flex-grow' },
            ],
          },
          {
            text: 'place-object-components',
            link: '/ar-vr-components/place-object-components',
            items: [
              {
                text: 'place-object',
                link: '/ar-vr-components/place-object',
              },
              {
                text: 'place-object-manager',
                link: '/ar-vr-components/place-object-manager',
              },
              {
                text: 'ar-placement-utils',
                link: '/ar-vr-components/ar-placement-utils',
              },
            ],
          },
          { text: 'follow-element', link: '/ar-vr-components/follow-element' },
          { text: 'follow-camera', link: '/ar-vr-components/follow-camera' },
          { text: 'grid', link: '/ar-vr-components/grid' },
        ],
      },
      {
        text: 'Guidelines',
        items: [
          { text: 'Overview', link: '/guidelines/overview' },
          {
            text: 'Appearance',
            link: '/guidelines/appearance',
            items: [
              { text: 'Size', link: '/guidelines/size' },
              { text: 'Transparency', link: '/guidelines/transparency' },
              { text: 'Color Mode', link: '/guidelines/color-mode' },
            ],
          },
          {
            text: 'Behavior',
            link: '/guidelines/behavior',
            items: [
              { text: 'Stable', link: '/guidelines/stable' },
              { text: 'Adaptive', link: '/guidelines/adaptive' },
              { text: 'Follow', link: '/guidelines/follow' },
            ],
          },
          {
            text: 'Menu Type',
            link: '/guidelines/menu-type',
            items: [
              { text: '3D menu', link: '/guidelines/3d-menu' },
              { text: 'Bottom sheet', link: '/guidelines/bottom-sheet' },
              {
                text: 'Floating buttons',
                link: '/guidelines/floating-buttons',
              },
              { text: 'Hybrid menu', link: '/guidelines/hybrid-menu' },
              { text: '2D menu', link: '/guidelines/2d-menu' },
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
    plugins: [crossOriginIsolation],
    server: {
      cors: true,
    },
    preview: {
      cors: true,
    },
  },
});
