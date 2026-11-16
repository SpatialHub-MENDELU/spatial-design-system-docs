# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Documentation website for [Spatial Design System](https://github.com/SpatialHub-MENDELU/spatial-design-system)
(SDS), a library of A-Frame components for AR/VR. Built with [VitePress](https://vitepress.dev) + Vue 3,
Tailwind and SCSS, published at https://sds.spatialhub.cz. It also contains an in-browser Playground
(`src/playground/`, `src/vue/playground/`) running on WebContainers.

The library source lives in the separate `spatial-design-system` repository. This site uses the published
npm package (`spatial-design-system` in `package.json`), so docs for unreleased library features only work
in live examples after a new library version is published and the dependency is bumped.

## Commands

```bash
npm install
npm run dev            # dev server at http://localhost:5174
npm run build          # Tailwind build + vitepress build into .vitepress/dist
npm run build-preview  # build and serve the production build
```

Pushing to `main` deploys the site to GitHub Pages (`.github/workflows/deploy.yml`).

## Layout

- `.vitepress/config.mts` – site config: sidebar/nav, `<head>` scripts and the Vite config.
  A-Frame, aframe-extras and the physics system are loaded from CDNs via `<script>` tags in `head`;
  `import "aframe"` is aliased to `.vitepress/aframe-shim.js`, which returns the global `AFRAME`
  (never bundle a second copy of A-Frame).
- `src/getting-started/`, `src/guidelines/` – prose pages.
- `src/ar-vr-components/` – one page per SDS component (e.g. `grid.md`, `flexbox.md`).
- `src/ar-vr-primitives/` – one page per SDS primitive (e.g. `menu.md`, `button.md`).
- `src/game-components/` – game components and demo games.
- `src/vue/ComponentExample.vue` – the tabbed "Output / Code" block used on almost every page.
- `src/public/` – static assets served from `/`.

## Writing a component page

Follow the existing pages (see `README.md` for the full pattern):

1. Frontmatter `title`, then a `<script setup lang="ts">` that dynamically imports the needed SDS files in
   `onMounted` (e.g. `await import("spatial-design-system/components/menu.js")`) and sets `renderScene`.
2. Examples use `<ComponentExample>` with a `#output` template (live A-Frame markup, guarded by
   `v-if="renderScene"`) and a `#code` template with fenced `js`/`html` blocks. Keep both in sync.
   Fenced code blocks nested in HTML tags must be separated by blank lines.
3. End with a `## Props` table: `| Property | Type | Default | Description |`, property names in
   `_italics_`, enums written as `` enum(`a`, `b`) ``.
4. New pages must be added to the sidebar in `.vitepress/config.mts`.

Keep prop names, defaults and behaviour consistent with the library source; check the component's
`schema` in `spatial-design-system` when in doubt.

## Verifying changes

Run `npm run build` to catch broken markdown/Vue, and check the page in `npm run dev`. Live examples
need network access to the A-Frame CDN.
