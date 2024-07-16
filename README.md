# Spatial Design System Docs

This repository contains code for Spatial Design System documentation website. It's built with [Vitepress](https://vitepress.dev/guide/what-is-vitepress).

## Project setup

Install required dependencies

```bash
npm install
```

Compiles and hot-reloads for development

```bash
npm run dev
```

## How to contribute?

In project root directory navigate to `src/`. Most of folders contain markdown files that represent docs pages. Open the one that you want to edit, select file and edit. Then commit and push (if owner/dev) or submit a pull request. Below are useful notes when editing docs.

Vitepress allows to use [Vue components in markdown files](https://vitepress.dev/guide/using-vue). Basic component that is used in almost every docs page is `ComponentExample.vue` in `src/vue/`. It has two tabs: one is an A-Frame scene and the other is a code snippet (for that scene). For these two tabs component has two slots. To see an example open any md file in `src/ar-vr-primitives/` or `src/ar-vr-components/`. 

**NOTE**: markdown code blocks (whenever is nested in html tag) should be separated by one line.


````
<template #code>  

```html
<a-scene>
    <a-ar-row width="3" position="0 1.5 -3">
        <a-box color="red"></a-box>
        <a-box color="blue"></a-box>
        <a-box color="yellow"></a-box>
    </a-ar-row>
    <a-sky color="#ECECEC"></a-sky>
</a-scene>
```

</template>
````

If you want to add a new page or a folder with a new file, you also need to add it to the [sidebar](https://vitepress.dev/reference/default-theme-sidebar#sidebar). Navigate to `.vitepress/config.mts` and search for `sidebar`, when add a link as below:
```js
sidebar: [
      {
        // This is the section title
        text: 'Getting started',
        items: [
          // Link for one page
          { text: 'Introduction', link: '/getting-started/introduction' }
        ]
      },
    {
// rest of sidebar
```

Vitepress also support [YAML frontmatter](https://vitepress.dev/guide/frontmatter).



