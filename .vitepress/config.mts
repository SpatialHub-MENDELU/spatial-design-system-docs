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
        text: 'UI elements',
        items: [
          { text: 'avatar', link: '/ar-vr-primitives/avatar' },
          { text: 'button', link: '/ar-vr-primitives/button' },
          { text: 'chip', link: '/ar-vr-primitives/chip' },
          { text: 'checkbox', link: '/ar-vr-primitives/checkbox' },
          { text: 'divider', link: '/ar-vr-primitives/divider' },
          { text: 'dialog', link: '/ar-vr-primitives/dialog' },
          { text: 'menu', link: '/ar-vr-primitives/menu' },
          { text: 'progress bar', link: '/ar-vr-primitives/progressbar' },
          { text: 'row, column', link: '/ar-vr-primitives/rowcolumn' },
          { text: 'switch', link: '/ar-vr-primitives/switch' },
          { text: 'textbox', link: '/ar-vr-primitives/textbox' },
        ],
      },
      {
        text: 'Layout',
        items: [
          { text: 'circle', link: '/ar-vr-components/circle' },
          {
            text: 'Flexbox components',
            link: '/ar-vr-components/flexbox-introduction',
            items: [
              {
                text: 'flexbox',
                link: '/ar-vr-components/flexbox',
              },
              { text: 'flex-col', link: '/ar-vr-components/flex-col' },
              { text: 'flex-grow', link: '/ar-vr-components/flex-grow' },
            ],
          },
          { text: 'grid', link: '/ar-vr-components/grid' },
        ],
      },
      {
        text: 'Behavior',
        items: [
          { text: 'auto-position', link: '/ar-vr-components/auto-position' },
          { text: 'auto-scale', link: '/ar-vr-components/auto-scale' },
          { text: 'billboard', link: '/ar-vr-components/billboard' },
          { text: 'fit-into-fov', link: '/ar-vr-components/fit-into-fov' },
          { text: 'follow-element', link: '/ar-vr-components/follow-element' },
          { text: 'follow-camera', link: '/ar-vr-components/follow-camera' },
        ],
      },
      {
        text: "Game components",
        items: [
          {text: 'fly', link: '/game-components/fly'},
          {text: 'game-view', link: '/game-components/game-view'},
          {text: 'npc-walk', link: '/game-components/npc-walk'},
          {text: 'walk', link: '/game-components/walk'},
        ]
      },
      {
        text: 'AR/VR',
        items: [
          { text: 'auto-vr', link: '/ar-vr-components/auto-vr' },
          { text: 'auto-xr', link: '/ar-vr-components/auto-xr' },
          { text: 'controllers', link: '/ar-vr-components/controllers' },
          { text: 'hands', link: '/ar-vr-components/hands' },
          { text: 'vr-interactive', link: '/ar-vr-components/vr-interactive' },
          { text: 'finger-touch', link: '/ar-vr-components/finger-touch' },
          {
            text: 'touch-raycaster',
            link: '/ar-vr-components/touch-raycaster',
          },
          { text: 'grabbable', link: '/ar-vr-components/grabbable' },
          {
            text: 'hands-hoverable',
            link: '/ar-vr-components/hands-hoverable',
          },
          {
            text: 'stretchable',
            link: '/ar-vr-components/stretchable',
          },
          {
            text: 'controller-attach',
            link: '/ar-vr-components/controller-attach',
          },
          {
            text: 'controller-teleport',
            link: '/ar-vr-components/controller-teleport',
          },
          {
            text: 'controller-movement',
            link: '/ar-vr-components/controller-movement',
          },
          {
            text: 'Placing objects in AR',
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
