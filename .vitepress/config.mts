import { defineConfig } from 'vitepress';
import * as path from 'node:path';
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
    // Enables cross-origin isolation on static hosts (e.g. GitHub Pages) that
    // cannot set COOP/COEP response headers. Required by @webcontainer/api in
    // the Playground. No-op when the server already sends the headers.
    ['script', { src: '/coi-serviceworker.min.js' }],
    ['script', { type: 'text/javascript' }, handlePlaygroundPageClass],
    [
      'script',
      {
        src: 'https://aframe.io/releases/1.7.0/aframe.min.js',
        crossorigin: 'anonymous',
      },
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@7.5.4/dist/aframe-extras.min.js',
        crossorigin: 'anonymous',
      },
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/gh/MozillaReality/ammo.js@8bbc0ea/builds/ammo.wasm.js',
        crossorigin: 'anonymous',
      },
    ],
    [
      'script',
      {
        src: 'https://cdn.jsdelivr.net/gh/c-frame/aframe-physics-system@v4.2.3/dist/aframe-physics-system.min.js',
        crossorigin: 'anonymous',
      },
    ],
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
          {
            text: 'XR setup',
            link: '/ar-vr-components/auto-xr.md',
          },
          { text: 'Interactivity', link: '/getting-started/interactivity' },
          {
            text: 'Running on devices',
            link: '/getting-started/running-on-devices',
          },
          { text: 'Testing', link: '/getting-started/testing' },
        ],
      },
      {
        text: 'UI elements',
        collapsed: true,
        items: [
          { text: 'alert', link: '/ar-vr-primitives/alert' },
          { text: 'avatar', link: '/ar-vr-primitives/avatar' },
          { text: 'button', link: '/ar-vr-primitives/button' },
          { text: 'button toggles', link: '/ar-vr-primitives/button-toggles' },
          { text: 'card', link: '/ar-vr-primitives/card' },
          { text: 'carousel', link: '/ar-vr-primitives/carousel' },
          { text: 'chip', link: '/ar-vr-primitives/chip' },
          { text: 'checkbox', link: '/ar-vr-primitives/checkbox' },
          { text: 'divider', link: '/ar-vr-primitives/divider' },
          { text: 'dialog', link: '/ar-vr-primitives/dialog' },
          { text: 'list', link: '/ar-vr-primitives/list' },
          { text: 'menu', link: '/ar-vr-primitives/menu' },
          { text: 'progress bar', link: '/ar-vr-primitives/progressbar' },
          { text: 'ratings', link: '/ar-vr-primitives/ratings' },
          { text: 'row, column', link: '/ar-vr-primitives/rowcolumn' },
          { text: 'switch', link: '/ar-vr-primitives/switch' },
          { text: 'table', link: '/ar-vr-primitives/table' },
          { text: 'tabs', link: '/ar-vr-primitives/tabs' },
          { text: 'textbox', link: '/ar-vr-primitives/textbox' },
        ],
      },
      {
        text: 'Layout',
        collapsed: true,
        items: [
          { text: 'auto-position', link: '/ar-vr-components/auto-position' },
          { text: 'auto-scale', link: '/ar-vr-components/auto-scale' },
          { text: 'billboard', link: '/ar-vr-components/billboard' },
          { text: 'circle', link: '/ar-vr-components/circle' },
          { text: 'fit-into-fov', link: '/ar-vr-components/fit-into-fov' },
          {
            text: 'Flexbox components',
            link: '/ar-vr-components/flexbox-introduction',
            items: [
              { text: 'flexbox', link: '/ar-vr-components/flexbox' },
              { text: 'flex-col', link: '/ar-vr-components/flex-col' },
              { text: 'flex-grow', link: '/ar-vr-components/flex-grow' },
            ],
          },
          { text: 'grid', link: '/ar-vr-components/grid' },
        ],
      },
      {
        text: 'Interactivity',
        collapsed: true,
        items: [
          {
            text: 'Controllers',
            items: [
              {
                text: 'Setup controllers',
                link: '/ar-vr-components/controllers',
              },
              {
                text: 'controller-teleport',
                link: '/ar-vr-components/controller-teleport',
              },
              {
                text: 'controller-movement',
                link: '/ar-vr-components/controller-movement',
              },
            ],
          },
          {
            text: 'Hands',
            items: [
              { text: 'Setup hands', link: '/ar-vr-components/hands' },
              {
                text: 'hands-hoverable',
                link: '/ar-vr-components/hands-hoverable',
              },
              { text: 'finger-touch', link: '/ar-vr-components/finger-touch' },
              { text: 'grabbable', link: '/ar-vr-components/grabbable' },
            ],
          },
          {
            text: 'Shared',
            items: [
              {
                text: 'vr-interactive',
                link: '/ar-vr-components/vr-interactive',
              },
              { text: 'stretchable', link: '/ar-vr-components/stretchable' },
            ],
          },
          {
            text: 'Touchscreen',
            items: [
              {
                text: 'touch-raycaster',
                link: '/ar-vr-components/touch-raycaster',
              },
            ],
          },
        ],
      },
      {
        text: 'Spatial anchors',
        collapsed: true,
        items: [
          {
            text: 'Attaching to physical world',
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
          {
            text: 'Attaching to camera',
            link: '/ar-vr-components/follow-camera',
          },
          {
            text: 'Attaching to controller',
            link: '/ar-vr-components/controller-attach',
          },
          {
            text: 'Attaching to element',
            link: '/ar-vr-components/follow-element',
          },
        ],
      },
      {
        text: 'Game components',
        collapsed: true,
        items: [
          { text: 'Setup game project', link: '/game-components/setup' },
          { text: 'walk', link: '/game-components/walk' },
          { text: 'fly', link: '/game-components/fly' },
          { text: 'game-view', link: '/game-components/game-view' },
          { text: 'npc-walk', link: '/game-components/npc-walk' },
        ],
      },
      {
        text: 'Guidelines',
        collapsed: true,
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
  vue: {
    template: {
      compilerOptions: {
        hoistStatic: false,
      },
    },
  },
  vite: {
    plugins: [crossOriginIsolation],
    // Route every `import ... from "aframe"` (including those inside
    // spatial-design-system) to a shim that re-exports the global AFRAME
    // loaded synchronously via the CDN <script> tag in head. Prevents a
    // second copy of aframe from being bundled, which would re-register
    // <a-node> and throw NotSupportedError.
    resolve: {
      alias: {
        aframe: path.resolve(__dirname, 'aframe-shim.js'),
      },
      dedupe: ['aframe'],
    },
    server: {
      cors: true,
    },
    preview: {
      cors: true,
    },
  },
});
