---
title: Quick Start
---

# {{ $frontmatter.title }}

Assuming you have [installed](/getting-started/installation) Spatial Design System library, this section explains the basic use of the library.

::: tip Note
We will demonstrate library features in both vanilla JavaScript (no framework) and [Vue.js](https://vuejs.org), but feel free to use any other framework you prefer.
:::

## Building blocks

Spatial Design System library is based on [A-Frame](https://aframe.io/docs/1.5.0/introduction/#what-is-a-frame) and use its core principles. Likewise, our library consists of two parts: primitives and components.

**Primitives** are basically library pre-designed peaces, offering ready-made foundations for your projects. They're just HTML elements.

**Components**, on the other hand, offer more freedom, allowing you to craft your own solutions. They're similar to element attributes, where you specify [properties and values](https://aframe.io/docs/1.5.0/core/component.html#multi-property-component).

Components can be easily combined with primitives, as demonstrated in the next section.

## Running first app (without framework)

::: tip Note
This section is for those who prefer to use vanilla JavaScript without any framework. If you are using Vue.js or a similar reactive framework, you can skip to the next section.
:::

In your `main.js` replace everything with the following code:

```js
import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/components/position.js";
import { stringifyForHTML } from "spatial-design-system/utils/utils.js";

const app = document.getElementById("app");
const scene = document.createElement("a-scene");
const items = [
  { color: "white", title: "Games", textColor: "black" },
  { color: "white", title: "Films", textColor: "black" },
  { color: "white", title: "Books", textColor: "black" },
  { color: "white", title: "Paintings", textColor: "black" },
];
const menu = `
<a-ar-menu
        position="0 1.5 -3"
        visible="true"
        primary="lightblue"
        items="${stringifyForHTML(items)}"
        variant="filled"
        layout="circle"
        fit-info-fov
        follow-camera="angle: 20"
        billboard
></a-ar-menu>
`;

scene.innerHTML = menu;
app.appendChild(scene);
```

Then in your terminal run the following command to start the server:

```bash
npm run dev
```

Open the server address in your browser and you should now see a [circular](/ar-vr-components/circle) menu with four 'pie slices', each with a text corresponding to the name of the item.

## Running first app with Vue.js

In your `App.vue`, replace the existing code with the following:

```vue
<script setup>
import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/components/position.js";
import { stringifyForHTML } from "spatial-design-system/utils/utils.js";

const items = [
  { color: "white", title: "Games", textColor: "black" },
  { color: "white", title: "Films", textColor: "black" },
  { color: "white", title: "Books", textColor: "black" },
  { color: "white", title: "Paintings", textColor: "black" },
];
</script>

<template>
  <a-scene>
    <a-ar-menu
      position="0 1.5 -3"
      visible="true"
      primary="lightblue"
      :items="stringifyForHTML(items)"
      variant="filled"
      layout="circle"
      fit-info-fov
      follow-camera="angle: 20"
      billboard
    ></a-ar-menu>
  </a-scene>
</template>

<!-- Globally scoped! -->
<style>
  /* Make sure the scene fills the entire viewport and has a transparent background to see AR camera on mobile devices. */
  #app {
    width: 100%;
    height: 100%;
  }
  html, body {
    background-color: transparent !important;
  }
</style>
```

Then in your terminal run the following command to start the server:

```bash
npm run dev
```

Open the server address in your browser and you should now see a [circular](/ar-vr-components/circle) menu with four 'pie slices', each with a text corresponding to the name of the item.

## Code Breakdown

Let's explain some code parts.

The first thing we do is importing the library modules. Here we include our menu primitive module, position module and utils to convert items:

```js
import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/components/position.js";
import { stringifyForHTML } from "spatial-design-system/utils/utils.js";
```

Then we create an A-Frame scene that renders 3D objects and some dummy data for our menu. We then use a template string for the actual menu. Note that in backticks it's just an HTML element, or more precisely a _primitive_.

Now the menu has some attributes (aka _components_). Some of them are parts of the `a-ar-menu`, like `layout`. Others, like the [billboard](/ar-vr-components/billboard), are separate components that you can attach to any element.

Also note this line:

```js{6}
const menu = `
<a-ar-menu
        position="0 1.5 -3"
        visible="true"
        primary="lightblue"
        items="${stringifyForHTML(items)}"
        variant="filled"
        layout="circle"
        fit-info-fov
        follow-camera="angle: 20"
        billboard
></a-ar-menu>
`;
```

Here we convert our items to JSON using `stringifyForHTML` and pass it to our menu so that it can be used by the menu to construct the layout.

You can achieve the same result with Vue by using `a-scene` and `a-ar-menu` directly in the template. You can also use data bindings, as we have done here:

```js
:items="stringifyForHTML(items)"
```

## Wrap Up

In this quick start guide, we've introduced Spatial Design System library and explained its basic usage.

We've talked about primitives, which offer ready-made blocks for your projects and components, which provide more flexibility. You can easily combine them and build your own solution.

To deepen your knowledge, consider reading the documentation and experiment with our primitives and components!
