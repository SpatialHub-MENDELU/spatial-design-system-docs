---
title: flexbox
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/components/flexbox/flexbox.js");
    await import("spatial-design-system/components/flexbox/Properties/flex-grow.js");
    await import("spatial-design-system/components/flexbox/Properties/flex-col.js");
    renderScene.value = true;
  } catch(e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `flexbox` component arranges children of a 3D primitive in a one-dimensional row or column, similar to [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/flex). It works on any primitive with a defined width and height (`a-plane`, `a-box`, `a-entity` with a geometry) and positions its children inside the container's bounding box.

The Flexbox family consists of three components that work together:

- **`flexbox`** – the container that lays out its children along a main axis.
- **`flex-grow`** – marks a child as flexible so it expands into the remaining space.
- **`flex-col`** – gives a child a width expressed as a fraction of a 12-column grid, with values per breakpoint based on the container's size.

## Basic usage

A `flexbox` container distributes its children along the main axis (`direction`) and aligns them along the cross axis (`items`). The example below shows three boxes in a row, evenly spaced and vertically centred inside the container.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: between; items: center;">

  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox/flexbox.js";
```

```html
<a-plane
  position="0 1.6 -3"
  width="2"
  height="0.5"
  material="color: #018A6C"
  flexbox="
      direction: row;
      justify: between;
      items: center;
  "
>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Direction

`direction: row` lays children horizontally (main axis = X). `direction: column` lays them vertically (main axis = Y). The `justify` property always controls the main axis, `items` always controls the cross axis.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0 1.6 -3">
<a-plane
position="-0.7 0 0"
width="0.8"
height="1.4"
material="color: #018A6C"
flexbox="direction: column; justify: between; items: center;">

  <a-plane color="white" width="0.4" height="0.2"></a-plane>
  <a-plane color="white" width="0.4" height="0.2"></a-plane>
  <a-plane color="white" width="0.4" height="0.2"></a-plane>
</a-plane>
<a-plane
position="0.7 0 0"
width="1.4"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: between; items: center;">

  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
</a-plane>
</a-entity>
</template>

<template #code>

```html
<!-- column -->
<a-plane flexbox="direction: column; justify: between; items: center;">
  <a-plane width="0.4" height="0.2"></a-plane>
  <a-plane width="0.4" height="0.2"></a-plane>
  <a-plane width="0.4" height="0.2"></a-plane>
</a-plane>

<!-- row -->
<a-plane flexbox="direction: row; justify: between; items: center;">
  <a-plane width="0.2" height="0.3"></a-plane>
  <a-plane width="0.2" height="0.3"></a-plane>
  <a-plane width="0.2" height="0.3"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Main-axis alignment (`justify`)

`justify` controls how items are positioned and spaced along the main axis. The five accepted values mirror their CSS counterparts (note the shorter `between` / `around` spelling).

### `justify: start`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: center; gap: 0.05 0;">

  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: start; items: center; gap: 0.05 0;">
  <!-- 3 boxes -->
</a-plane>
```

</template>

</ComponentExample>

### `justify: center`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: center; items: center; gap: 0.05 0;">

  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: center; items: center; gap: 0.05 0;">
  <!-- 3 boxes -->
</a-plane>
```

</template>

</ComponentExample>

### `justify: end`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: end; items: center; gap: 0.05 0;">

  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: end; items: center; gap: 0.05 0;">
  <!-- 3 boxes -->
</a-plane>
```

</template>

</ComponentExample>

### `justify: between`

Items sit flush against the container edges; remaining space is divided equally between them.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: between; items: center;">

  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: between; items: center;">
  <!-- 4 boxes -->
</a-plane>
```

</template>

</ComponentExample>

### `justify: around`

Each item is surrounded by an equal amount of free space, so the gaps at the edges are half the size of the gaps between items.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: around; items: center;">

  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: around; items: center;">
  <!-- 4 boxes -->
</a-plane>
```

</template>

</ComponentExample>

## Cross-axis alignment (`items`)

`items` controls where children sit along the cross axis. The example below uses items of varying height so the difference between `start`, `center` and `end` is visible at a glance.

### `items: start`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.8"
material="color: #018A6C"
flexbox="direction: row; justify: around; items: start;">

  <a-plane color="white" width="0.25" height="0.2"></a-plane>
  <a-plane color="white" width="0.25" height="0.4"></a-plane>
  <a-plane color="white" width="0.25" height="0.3"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: around; items: start;">
  <a-plane width="0.25" height="0.2"></a-plane>
  <a-plane width="0.25" height="0.4"></a-plane>
  <a-plane width="0.25" height="0.3"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

### `items: center`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.8"
material="color: #018A6C"
flexbox="direction: row; justify: around; items: center;">

  <a-plane color="white" width="0.25" height="0.2"></a-plane>
  <a-plane color="white" width="0.25" height="0.4"></a-plane>
  <a-plane color="white" width="0.25" height="0.3"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: around; items: center;">
  <!-- items of varying height -->
</a-plane>
```

</template>

</ComponentExample>

### `items: end`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.8"
material="color: #018A6C"
flexbox="direction: row; justify: around; items: end;">

  <a-plane color="white" width="0.25" height="0.2"></a-plane>
  <a-plane color="white" width="0.25" height="0.4"></a-plane>
  <a-plane color="white" width="0.25" height="0.3"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: around; items: end;">
  <!-- items of varying height -->
</a-plane>
```

</template>

</ComponentExample>

## Spacing (`gap`)

`gap` is a `vec2` value. The first number adds spacing between items along the main axis, the second adds spacing between wrapped lines along the cross axis. Both are expressed in metres.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: center; items: center; gap: 0.1 0;">

  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: center; items: center; gap: 0.1 0;">
  <!-- gap.x = 0.1 m between items -->
</a-plane>
```

</template>

</ComponentExample>

## Wrapping

With `wrap: true`, items that don't fit on the current main-axis line continue on the next one. Combine with `gap` to control spacing both within and between lines.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="1.6"
height="1.2"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0.05 0.05;">

  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane
  width="1.6"
  height="1.2"
  flexbox="
      direction: row;
      justify: start;
      items: start;
      wrap: true;
      gap: 0.05 0.05;
  "
>
  <!-- 8 boxes -->
</a-plane>
```

</template>

</ComponentExample>

## `flex-grow` — expanding items

Add the `flex-grow` attribute to a child to let it expand and consume the remaining main-axis space. Use this to build, for example, a toolbar with a fixed icon on each side and a stretchable centre region.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: center;">

  <a-plane color="white" width="0.3" height="0.4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow></a-plane>
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox/flexbox.js";
import "spatial-design-system/components/flexbox/Properties/flex-grow.js";
```

```html
<a-plane
  width="2"
  height="0.5"
  material="color: #018A6C"
  flexbox="direction: row; justify: start; items: center;"
>
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow></a-plane>
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

When multiple children carry `flex-grow`, the leftover space is divided equally among them.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: center;">

  <a-plane color="white" width="0.3" height="0.4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow></a-plane>
  <a-plane color="#00C170" height="0.4" flex-grow></a-plane>
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: start; items: center;">
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow></a-plane>
  <a-plane color="#00C170" height="0.4" flex-grow></a-plane>
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## `flex-col` — 12-column responsive grid

`flex-col` gives a child a width expressed as a fraction of a 12-column grid. You can declare a different column count per breakpoint, and the component picks the largest matching one based on the **container's 3D width** (see [Breakpoints](#breakpoints) below).

In the example below the container is 8&nbsp;m wide, which matches the `lg` breakpoint, so each item takes 4 of 12 columns and all three fit on a single row.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -10"
width="8"
height="2"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">

  <a-plane color="#03FCC6" height="0.8" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.8" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.8" flex-col="sm: 12; md: 12; lg: 4"></a-plane>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox/flexbox.js";
import "spatial-design-system/components/flexbox/Properties/flex-col.js";
```

```html
<a-plane
  width="8"
  height="2"
  material="color: #018A6C"
  flexbox="
      direction: row;
      justify: start;
      items: start;
      wrap: true;
      gap: 0.2 0.2;
  "
>
  <a-plane color="#03FCC6" height="0.8" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.8" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.8" flex-col="sm: 12; md: 12; lg: 4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

For the same children:

- in a container narrower than 4&nbsp;m (`sm`), each item takes the full row (12 columns);
- in a 4–7&nbsp;m container (`md`), the first two share a row (6 columns each) and the third takes a full row (12 columns);
- in a container of at least 7&nbsp;m (`lg`), all three fit on one row (4 columns each).

## `flexbox` props

| Property    | Type                                              | Default | Description                                                                                       |
| ----------- | ------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| _direction_ | enum(`row`, `column`)                             | `row`   | Main layout axis. `row` is horizontal, `column` is vertical.                                      |
| _justify_   | enum(`start`, `end`, `center`, `between`, `around`) | `start` | Distribution along the main axis.                                                                |
| _items_     | enum(`start`, `end`, `center`)                    | `start` | Alignment along the cross axis.                                                                   |
| _wrap_      | boolean                                           | `false` | If `true`, items that don't fit on the main axis continue on the next line.                       |
| _gap_       | vec2                                              | `0 0`   | Spacing between items in metres. First value = main-axis gap, second = cross-axis (line) gap.     |

## `flex-grow` props

| Property | Type    | Default | Description                                                              |
| -------- | ------- | ------- | ------------------------------------------------------------------------ |
| –        | boolean | `true`  | When present (or set to `true`), the item expands into the free main-axis space. |

## `flex-col` props

Each property declares the column count (out of 12) to use at the corresponding breakpoint.

| Property | Type   | Default | Description                                              |
| -------- | ------ | ------- | -------------------------------------------------------- |
| _sm_     | number | –       | Columns when the container is at least the `sm` width.   |
| _md_     | number | –       | Columns when the container is at least the `md` width.   |
| _lg_     | number | –       | Columns when the container is at least the `lg` width.   |
| _xl_     | number | –       | Columns when the container is at least the `xl` width.   |
| _2xl_    | number | –       | Columns when the container is at least the `2xl` width.  |
| _3xl_    | number | –       | Columns when the container is at least the `3xl` width.  |

Only breakpoints you set are considered; the component picks the largest one whose threshold is less than or equal to the parent container's 3D width.

### Breakpoints

Breakpoints are based on the parent container's **width in metres**, not on the browser viewport.

| Breakpoint | Container width |
| ---------- | --------------- |
| `sm`       | ≥ 0 m           |
| `md`       | ≥ 4 m           |
| `lg`       | ≥ 7 m           |
| `xl`       | ≥ 10 m          |
| `2xl`      | ≥ 12 m          |
| `3xl`      | ≥ 15 m          |

You can also declare custom numeric breakpoints, e.g. `flex-col="3: 12; 6: 6"` (12 columns above 3&nbsp;m, 6 columns above 6&nbsp;m).

## Notes

- The flexbox container must be a primitive with explicit width and height (e.g. `a-plane`, `a-box`, or an `a-entity` with a geometry). Children with no bounding box are placed using a 0.1&nbsp;m fallback size.
- `gap` adds spacing without changing item sizes. The second value only matters when `wrap: true`.
- `flex-grow` works in both row and column directions and recomputes when the container resizes.
- For predictable responsive layouts, combine `flex-col` with `wrap: true` so wrapped lines flow naturally as the container width crosses breakpoints.
