---
title: grid
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/components/menu.js");
    renderScene.value = true;
  } catch(e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

In any application, you always have to deal with the correct alignment of objects in the scene. Grid is a classic two-dimensional layout that can be used not only in 2D, but also in 3D space.

The grid works in two modes. On an entity **without** geometry (e.g. `a-entity`), the items keep their own
size and are arranged in a centred grid; the cell size is given by the largest item. On an entity **with**
geometry (e.g. `a-plane`), the items are fitted into the area of that geometry, see
[Grid with its own geometry](#grid-with-its-own-geometry).

## Example

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity grid position="0 1.5 -3">
<a-box color="#8A8A8A"></a-box>
<a-box color="#018A6C"></a-box>
<a-box color="#00C170"></a-box>
<a-box color="#03FCC6"></a-box>
</a-entity>
</template>

<template #code>

```js
import "spatial-design-system/components/menu.js";
```

```html
<a-entity grid position="0 1.5 -3">
  <a-box color="#8A8A8A"></a-box>
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-entity>
```

</template>

</ComponentExample>

## Grid with its own geometry

When the grid entity has its own geometry (e.g. `a-plane` or `a-box`), the grid splits that area into
equally sized cells and fits every item into its cell. The gaps between cells are set by `padding`
(in percent of the grid size). This is the mode the [menu](/ar-vr-primitives/menu) primitive uses.

How the items are fitted is set by `sizing`:

- `geometry` (default) – sets the `width` and `height` of the item's geometry. The primitive is kept, so a
  box stays a box with its depth. Items without geometry get a plane. The x/y scale of the item is reset to 1.
- `scale` – keeps the item's geometry and scales the item (with its children) in x/y to fit its cell
  while keeping its aspect ratio. Useful for composed primitives such as `a-ar-button`.
- `none` – only positions the items, their size is not changed.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane grid="columns: 2; sizing: geometry" width="2" height="1" color="#ECECEC" position="0 1.5 -3">
<a-box depth="0.2" color="#8A8A8A"></a-box>
<a-box depth="0.2" color="#018A6C"></a-box>
<a-box depth="0.2" color="#00C170"></a-box>
<a-box depth="0.2" color="#03FCC6"></a-box>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/menu.js";
```

```html
<a-plane grid="columns: 2; sizing: geometry" width="2" height="1" color="#ECECEC" position="0 1.5 -3">
  <a-box depth="0.2" color="#8A8A8A"></a-box>
  <a-box depth="0.2" color="#018A6C"></a-box>
  <a-box depth="0.2" color="#00C170"></a-box>
  <a-box depth="0.2" color="#03FCC6"></a-box>
</a-plane>
```

</template>

</ComponentExample>

::: tip
If an item must not be resized at all, use `sizing: none`, or wrap it in an `a-entity` and let the grid size
the wrapper instead. Children marked with the `data-layout-excluded` attribute are ignored by the grid.
:::

## Props

| Property  | Type                                  | Default    | Description                                                                                                  |
| --------- | ------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------ |
| _columns_ | number                                | 2          | Number of grid columns.                                                                                      |
| _rows_    | number                                | 2          | Number of grid rows. The layout currently derives the rows from `columns` and the number of items.           |
| _spacing_ | number                                | 0          | Spacing between items in metres. Used only when the grid entity has no geometry.                             |
| _padding_ | vec2                                  | `10 10`    | Total gaps between and around the cells in percent of the grid width and height. Used only when the grid entity has a geometry. |
| _sizing_  | enum(`geometry`, `scale`, `none`)     | `geometry` | How items are fitted into their cells when the grid entity has a geometry. See [Grid with its own geometry](#grid-with-its-own-geometry). |
