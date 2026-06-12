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

The `flexbox` component creates a flexible one-dimensional layout container, similar to [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/flex). It arranges child elements in rows or columns with configurable alignment, spacing, wrapping, and growth behaviour.

The Flexbox family consists of three pieces that work together:

- **`flexbox`** – the container component that lays out its children.
- **`flex-grow`** – marks a child to expand and fill remaining space.
- **`flex-col`** – gives a child a responsive 12-column width per breakpoint.

## Basic row layout

The simplest case: a row of three items distributed evenly with space between them.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="
direction: row;
justify: space-between;
items: center;
">

  <a-box color="white" width="0.3" height="0.3" depth="0.3"></a-box>
  <a-box color="white" width="0.3" height="0.3" depth="0.3"></a-box>
  <a-box color="white" width="0.3" height="0.3" depth="0.3"></a-box>
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
      justify: space-between;
      items: center;
  "
>
  <a-box color="white" width="0.3" height="0.3" depth="0.3"></a-box>
  <a-box color="white" width="0.3" height="0.3" depth="0.3"></a-box>
  <a-box color="white" width="0.3" height="0.3" depth="0.3"></a-box>
</a-plane>
```

</template>

</ComponentExample>

## Justify variants

The `justify` property controls how items are distributed along the main axis. Each row below uses the same five boxes; only `justify` differs.

### `justify: start`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: center; gap: 10 0;">

  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: start; items: center; gap: 10 0;">
  <!-- 5 boxes -->
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
flexbox="direction: row; justify: center; items: center; gap: 10 0;">

  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: center; items: center; gap: 10 0;">
  <!-- 5 boxes -->
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
flexbox="direction: row; justify: end; items: center; gap: 10 0;">

  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: end; items: center; gap: 10 0;">
  <!-- 5 boxes -->
</a-plane>
```

</template>

</ComponentExample>

### `justify: space-around`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: space-around; items: center;">

  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.2" height="0.2" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: space-around; items: center;">
  <!-- 4 boxes -->
</a-plane>
```

</template>

</ComponentExample>

## Cross-axis alignment

The `items` property controls alignment along the cross axis. Below, items of different heights are aligned to the top, centre, and bottom of the container.

### `items: start`

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.8"
material="color: #018A6C"
flexbox="direction: row; justify: space-around; items: start;">

  <a-box color="white" width="0.25" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.4" depth="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.3" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: space-around; items: start;">
  <a-box color="white" width="0.25" height="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.4"></a-box>
  <a-box color="white" width="0.25" height="0.3"></a-box>
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
flexbox="direction: row; justify: space-around; items: center;">

  <a-box color="white" width="0.25" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.4" depth="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.3" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: space-around; items: center;">
  <a-box color="white" width="0.25" height="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.4"></a-box>
  <a-box color="white" width="0.25" height="0.3"></a-box>
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
flexbox="direction: row; justify: space-around; items: end;">

  <a-box color="white" width="0.25" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.4" depth="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.3" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: space-around; items: end;">
  <a-box color="white" width="0.25" height="0.2"></a-box>
  <a-box color="white" width="0.25" height="0.4"></a-box>
  <a-box color="white" width="0.25" height="0.3"></a-box>
</a-plane>
```

</template>

</ComponentExample>

## Column direction

Switching `direction: column` arranges items along the vertical axis. The `justify` property then controls vertical distribution, and `items` controls horizontal alignment.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="0.8"
height="1.5"
material="color: #018A6C"
flexbox="
direction: column;
justify: space-between;
items: center;
">

  <a-box color="white" width="0.3" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.3" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.3" height="0.2" depth="0.2"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane
  position="0 1.6 -3"
  width="0.8"
  height="1.5"
  material="color: #018A6C"
  flexbox="
      direction: column;
      justify: space-between;
      items: center;
  "
>
  <a-box color="white" width="0.3" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.3" height="0.2" depth="0.2"></a-box>
  <a-box color="white" width="0.3" height="0.2" depth="0.2"></a-box>
</a-plane>
```

</template>

</ComponentExample>

## Wrapping with many items

When `wrap: true` is set, items that don't fit on one line continue on the next. The `gap` property's second value controls the spacing between wrapped lines.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="1.6"
height="1.2"
material="color: #018A6C"
flexbox="
direction: row;
justify: center;
items: center;
wrap: true;
gap: 20 20;
">

  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
</a-plane>
</template>

<template #code>

```html
<a-plane
  position="0 1.6 -3"
  width="1.6"
  height="1.2"
  material="color: #018A6C"
  flexbox="
      direction: row;
      justify: center;
      items: center;
      wrap: true;
      gap: 20 20;
  "
>
  <!-- 8 boxes -->
</a-plane>
```

</template>

</ComponentExample>

## `flex-grow` — expanding items

Attach `flex-grow` to a child to make it expand into any remaining space along the main axis. Here, the middle plane stretches between two fixed-width siblings.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="
direction: row;
justify: start;
items: center;
">

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
  position="0 1.6 -3"
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

When multiple items have `flex-grow`, the remaining space is split equally among them.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="
direction: row;
justify: start;
items: center;
">

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

## `flex-col` — responsive 12-column grid

`flex-col` gives a child a width expressed as a fraction of a 12-column grid, with different values per viewport breakpoint. Resize your browser to see the layout adapt.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="1"
material="color: #018A6C"
flexbox="
direction: row;
justify: start;
items: start;
wrap: true;
gap: 10 10;
">

  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 12; md: 12; lg: 4"></a-plane>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox/flexbox.js";
import "spatial-design-system/components/flexbox/Properties/flex-col.js";
```

```html
<a-plane
  position="0 1.6 -3"
  width="2"
  height="1"
  material="color: #018A6C"
  flexbox="
      direction: row;
      justify: start;
      items: start;
      wrap: true;
      gap: 10 10;
  "
>
  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 12; md: 12; lg: 4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

In the example above:

- On small screens, each item takes the full width (12 columns).
- On medium screens, the first two items share a row (6 columns each) and the third takes a full row.
- On large screens, all three items fit on a single row (4 columns each).

## `flexbox` props

| Property    | Type                                                | Default  | Description                                                                                                          |
| ----------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| _direction_ | enum(row, column)                                   | row      | Main layout direction (horizontal or vertical).                                                                      |
| _justify_   | enum(start, end, center, space-between, space-around) | start  | Alignment along the main axis.                                                                                       |
| _items_     | enum(start, end, center)                            | start    | Alignment along the cross axis.                                                                                      |
| _wrap_      | boolean                                             | false    | Wrap items to new lines when they exceed the container's main-axis size.                                             |
| _gap_       | vec2                                                | 0 0      | Spacing between items. First value is main-axis gap, second is cross-axis (between-line) gap.                        |

## `flex-grow` props

| Property | Type    | Default | Description                                            |
| -------- | ------- | ------- | ------------------------------------------------------ |
| –        | boolean | true    | When present (or `true`), the item expands into free space. |

## `flex-col` props

| Property | Type   | Default | Description                                                  |
| -------- | ------ | ------- | ------------------------------------------------------------ |
| _sm_     | number | 12      | Columns (out of 12) at small viewport widths.                |
| _md_     | number | –       | Columns (out of 12) at medium viewport widths.               |
| _lg_     | number | –       | Columns (out of 12) at large viewport widths.                |
| _xl_     | number | –       | Columns (out of 12) at extra-large viewport widths.          |
| _2xl_    | number | –       | Columns (out of 12) at 2x-large viewport widths.             |
| _3xl_    | number | –       | Columns (out of 12) at 3x-large viewport widths.             |

### Breakpoints

| Breakpoint | Screen width |
| ---------- | ------------ |
| sm         | <640px       |
| md         | ≥640px       |
| lg         | ≥768px       |
| xl         | ≥1024px      |
| 2xl        | ≥1280px      |
| 3xl        | ≥1536px      |

## Notes

- The flexbox container must be a primitive with explicit width and height (e.g. `a-box`, `a-plane`, or an `a-entity` with a geometry).
- `gap` adds spacing between items without changing their size. In wrapped layouts, the second value controls the spacing between lines.
- `flex-grow` works in both row and column directions and reacts to container resizes.
- For predictable layouts, give non-growing items a fixed size and combine `flex-col` with `wrap: true`.
