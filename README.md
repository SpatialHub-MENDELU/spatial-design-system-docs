# Spatial Design System Docs

<img src="src/public/spatial-design-system-logo-dark.png" alt="Spatial Design System logo" height="100" />

This repository contains code for [Spatial Design System](https://github.com/SpatialHub-MENDELU/spatial-design-system) documentation website. It's built with [VitePress](https://vitepress.dev/guide/what-is-vitepress), a static site generator powered by Vite.

## How to contribute?

Fork and download repository copy. Create a new branch and install required dependencies

```bash
npm install
```

Then run this project by

```bash
npm run dev
```

In project root directory navigate to `src/`. Most folders here contain markdown files that represent docs pages. Open the one that you want to edit, select a file and edit. Then commit your changes and submit a pull request. Below are useful notes on how to embed interactive examples.

VitePress allows to use [Vue components in markdown files](https://vitepress.dev/guide/using-vue). Basic component that is used in almost every docs page is `ComponentExample.vue` in `src/vue/`. Visually it looks like two tabs, where one is an interactive A-Frame scene and the other is a code snippet for that scene. For these two tabs the component has two slots. Before using the component you need to import it, and also _dynamically_ import Spatial Design System components that you need. Here is an example of a script:

```html
<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ComponentExample from "../vue/ComponentExample.vue";

  const renderScene = ref(false);

  onMounted(async () => {
    try {
      // Here import Spatial Design System components that you need
      await import("spatial-design-system/components/position.js");
      renderScene.value = true;
    } catch (e) {
      console.error(e);
    }
  });
</script>
```

This is a minimal script setup. Reuse its structure across the documentation. Below example shows how to use the component inside of a markdown file:

````
<ComponentExample>

<!-- Real code that will be rendered as an A-Frame embedded scene. Place your content inside of the template tag -->

<template #output v-if="renderScene">
  <a-box color="#8A8A8A" position="-0.6 1.5 -2.5"></a-box>
  <a-box color="#03FCC6" position="0.6 1.5 -2.5" auto-scale></a-box>
  <a-box position="0 0.95 -2.5" width="5" height="0.1" depth="1" src="../grid-light-1850w.png"></a-box>
</template>

<!-- Code that will be used for snippet. Use markdown code blocks -->

<template #code>

```js
import "spatial-design-system/components/position.js";
```

```html
<a-box color="#03FCC6" position="0 1.5 -2.5" auto-scale></a-box>
```

</template>

</ComponentExample>
````

**NOTE**: markdown code blocks (whenever is nested in html tag) should be separated by one line. To see more examples open any markdown file in `src/ar-vr-primitives/` or `src/ar-vr-components/`.

If you want to add a new page or a folder with new files, you first need to add it to the [sidebar](https://vitepress.dev/reference/default-theme-sidebar#sidebar). Navigate to `.vitepress/config.mts` and search for `sidebar`, when add a link as shown below:

```js
sidebar: [
      {
        // This is the section title
        text: 'Getting started',
        items: [
          // Link for one page
          { text: 'Introduction', link: '/getting-started/introduction' },
        ]
      },
    {
// Rest of the sidebar
```

VitePress also supports [YAML frontmatter](https://vitepress.dev/guide/frontmatter).
