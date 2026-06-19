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

`direction: row` lays children horizontally (main axis = X). `direction: column` lays them vertically (main axis = Y). `justify` always controls the main axis and `items` always controls the cross axis, so swapping `direction` swaps which property reads as "horizontal".

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0 1.6 -3">

<a-text value="direction: column" position="-0.7 0.95 0" align="center" color="white" width="3"></a-text>
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

<a-text value="direction: row" position="0.7 0.95 0" align="center" color="white" width="3"></a-text>
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
<a-plane flexbox="direction: column; justify: between; items: center;">
  <a-plane color="white" width="0.4" height="0.2"></a-plane>
  <a-plane color="white" width="0.4" height="0.2"></a-plane>
  <a-plane color="white" width="0.4" height="0.2"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: between; items: center;">
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Main-axis alignment (`justify`)

`justify` controls how items are positioned and spaced along the main axis. The five accepted values mirror their CSS counterparts (note the shorter `between` / `around` spelling). `between` places items flush to the container edges with even gaps in between; `around` surrounds each item with an equal amount of free space (edge gaps end up half the size of the gaps between items).

The five rows below share the same three child boxes — only `justify` changes.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0.5 1.6 -3">

<a-text value="justify: start"   position="-1.1 0.775 0.01"  align="right" color="white" width="3" anchor="right"></a-text>
<a-text value="justify: center"  position="-1.1 0.3875 0.01" align="right" color="white" width="3" anchor="right"></a-text>
<a-text value="justify: end"     position="-1.1 0 0.01"      align="right" color="white" width="3" anchor="right"></a-text>
<a-text value="justify: between" position="-1.1 -0.3875 0.01" align="right" color="white" width="3" anchor="right"></a-text>
<a-text value="justify: around"  position="-1.1 -0.775 0.01"  align="right" color="white" width="3" anchor="right"></a-text>

<a-plane
width="2"
height="1.8"
material="color: #018A6C"
flexbox="direction: column; justify: between; items: center;">

  <a-plane width="2" height="0.25" material="color: #036852"
    flexbox="direction: row; justify: start; items: center;">
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
  </a-plane>

  <a-plane width="2" height="0.25" material="color: #036852"
    flexbox="direction: row; justify: center; items: center;">
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
  </a-plane>

  <a-plane width="2" height="0.25" material="color: #036852"
    flexbox="direction: row; justify: end; items: center;">
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
  </a-plane>

  <a-plane width="2" height="0.25" material="color: #036852"
    flexbox="direction: row; justify: between; items: center;">
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
  </a-plane>

  <a-plane width="2" height="0.25" material="color: #036852"
    flexbox="direction: row; justify: around; items: center;">
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
    <a-plane color="white" width="0.2" height="0.2"></a-plane>
  </a-plane>
</a-plane>
</a-entity>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: start; items: center;">
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: center; items: center;">
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: end; items: center;">
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: between; items: center;">
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: around; items: center;">
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
  <a-plane color="white" width="0.2" height="0.2"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Cross-axis alignment (`items`)

`items` controls where children sit along the cross axis. The composite below puts three sub-containers side by side, each holding the same three items of varying height so the difference between `start`, `center`, and `end` reads at a glance.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0 1.6 -3">

<a-text value="items: start"  position="-0.925 0.55 0.01" align="center" color="white" width="3"></a-text>
<a-text value="items: center" position="0 0.55 0.01"      align="center" color="white" width="3"></a-text>
<a-text value="items: end"    position="0.925 0.55 0.01"  align="center" color="white" width="3"></a-text>

<a-plane
width="2.6"
height="0.9"
material="color: #018A6C"
flexbox="direction: row; justify: between; items: center;">

  <a-plane width="0.75" height="0.8" material="color: #036852"
    flexbox="direction: row; justify: around; items: start;">
    <a-plane color="white" width="0.12" height="0.15"></a-plane>
    <a-plane color="white" width="0.12" height="0.3"></a-plane>
    <a-plane color="white" width="0.12" height="0.22"></a-plane>
  </a-plane>

  <a-plane width="0.75" height="0.8" material="color: #036852"
    flexbox="direction: row; justify: around; items: center;">
    <a-plane color="white" width="0.12" height="0.15"></a-plane>
    <a-plane color="white" width="0.12" height="0.3"></a-plane>
    <a-plane color="white" width="0.12" height="0.22"></a-plane>
  </a-plane>

  <a-plane width="0.75" height="0.8" material="color: #036852"
    flexbox="direction: row; justify: around; items: end;">
    <a-plane color="white" width="0.12" height="0.15"></a-plane>
    <a-plane color="white" width="0.12" height="0.3"></a-plane>
    <a-plane color="white" width="0.12" height="0.22"></a-plane>
  </a-plane>
</a-plane>
</a-entity>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: around; items: start;">
  <a-plane color="white" width="0.12" height="0.15"></a-plane>
  <a-plane color="white" width="0.12" height="0.3"></a-plane>
  <a-plane color="white" width="0.12" height="0.22"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: around; items: center;">
  <a-plane color="white" width="0.12" height="0.15"></a-plane>
  <a-plane color="white" width="0.12" height="0.3"></a-plane>
  <a-plane color="white" width="0.12" height="0.22"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: around; items: end;">
  <a-plane color="white" width="0.12" height="0.15"></a-plane>
  <a-plane color="white" width="0.12" height="0.3"></a-plane>
  <a-plane color="white" width="0.12" height="0.22"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Spacing (`gap`)

`gap` is a `vec2` value. The first number adds spacing between items along the main axis; the second adds spacing between wrapped lines along the cross axis. Both are expressed in metres. A single-row layout only uses the first component; the second only matters when `wrap: true`.

The example shows both at once — a single-row container on the left (only `gap.x`) and a wrapping container on the right (both `gap.x` and `gap.y`).

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0.15 1.6 -3">

<a-text value="gap: 0.1 0" position="-1.1 0.45 0.01" align="center" color="white" width="3"></a-text>
<a-plane
position="-1.1 0 0"
width="1.6"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; gap: 0.1 0;">

  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
</a-plane>

<a-text value="gap: 0.1 0.2; wrap: true" position="1 0.8 0.01" align="center" color="white" width="3"></a-text>
<a-plane
position="1 0 0"
width="1.4"
height="1.2"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0.1 0.2;">

  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
</a-plane>
</a-entity>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: start; items: start; gap: 0.1 0;">
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
  <a-plane color="white" width="0.2" height="0.3"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0.1 0.2;">
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
  <a-plane color="white" width="0.3" height="0.3"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Wrapping

With `wrap: true`, items that don't fit on the current main-axis line continue on the next one. Combine with `gap` to control spacing both within and between lines.

The four mini containers below show the most common variants together:

- **top-left** — equal items wrap onto multiple rows (`direction: row`);
- **top-right** — items of varying widths still wrap greedily, row by row;
- **bottom-left** — `direction: column; wrap: true;` flows items top-to-bottom and into a second column;
- **bottom-right** — `justify: between` applies per line, so each wrapped row distributes its items to the container edges.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0 1.6 -3">

<a-text value="equal items" position="-1 1.45 0.01" align="center" color="white" width="3"></a-text>
<a-plane
position="-1 0.8 0"
width="1.4"
height="1.1"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0.05 0.05;">

  <a-plane color="white" width="0.25" height="0.25"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.25" height="0.25"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.25" height="0.25"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.25" height="0.25"><a-text value="4" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.25" height="0.25"><a-text value="5" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.25" height="0.25"><a-text value="6" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.25" height="0.25"><a-text value="7" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

<a-text value="varying widths" position="1 1.45 0.01" align="center" color="white" width="3"></a-text>
<a-plane
position="1 0.8 0"
width="1.6"
height="1.1"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0.05 0.05;">

  <a-plane color="white" width="0.4" height="0.25"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.7" height="0.25"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.25"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.5" height="0.25"><a-text value="4" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.6" height="0.25"><a-text value="5" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

<a-text value="direction: column" position="-1 0.05 0.01" align="center" color="white" width="3"></a-text>
<a-plane
position="-1 -0.6 0"
width="1.4"
height="1.1"
material="color: #018A6C"
flexbox="direction: column; justify: start; items: start; wrap: true; gap: 0.05 0.05;">

  <a-plane color="white" width="0.3" height="0.22"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.22"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.22"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.22"><a-text value="4" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.22"><a-text value="5" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.22"><a-text value="6" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.22"><a-text value="7" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

<a-text value="justify: between (per line)" position="1 0.05 0.01" align="center" color="white" width="3"></a-text>
<a-plane
position="1 -0.6 0"
width="1.6"
height="1.1"
material="color: #018A6C"
flexbox="direction: row; justify: between; items: start; wrap: true; gap: 0 0.05;">

  <a-plane color="white" width="0.35" height="0.32"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.35" height="0.32"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.35" height="0.32"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.35" height="0.32"><a-text value="4" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.35" height="0.32"><a-text value="5" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.35" height="0.32"><a-text value="6" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

</a-entity>
</template>

<template #code>

```html
<a-plane flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0.05 0.05;">
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
  <a-plane color="white" width="0.25" height="0.25"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0.05 0.05;">
  <a-plane color="white" width="0.4" height="0.25"></a-plane>
  <a-plane color="white" width="0.7" height="0.25"></a-plane>
  <a-plane color="white" width="0.3" height="0.25"></a-plane>
  <a-plane color="white" width="0.5" height="0.25"></a-plane>
  <a-plane color="white" width="0.6" height="0.25"></a-plane>
</a-plane>

<a-plane flexbox="direction: column; justify: start; items: start; wrap: true; gap: 0.05 0.05;">
  <a-plane color="white" width="0.3" height="0.22"></a-plane>
  <a-plane color="white" width="0.3" height="0.22"></a-plane>
  <a-plane color="white" width="0.3" height="0.22"></a-plane>
  <a-plane color="white" width="0.3" height="0.22"></a-plane>
  <a-plane color="white" width="0.3" height="0.22"></a-plane>
  <a-plane color="white" width="0.3" height="0.22"></a-plane>
  <a-plane color="white" width="0.3" height="0.22"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: between; items: start; wrap: true; gap: 0 0.05;">
  <a-plane color="white" width="0.35" height="0.32"></a-plane>
  <a-plane color="white" width="0.35" height="0.32"></a-plane>
  <a-plane color="white" width="0.35" height="0.32"></a-plane>
  <a-plane color="white" width="0.35" height="0.32"></a-plane>
  <a-plane color="white" width="0.35" height="0.32"></a-plane>
  <a-plane color="white" width="0.35" height="0.32"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Growing

Add the `flex-grow` attribute to a child to let it expand and consume the remaining main-axis space. Use this to build, 
for example, a toolbar with a fixed icon on each side and a stretchable centre region. In the example below, green items have `flex-grow` applied. 
When multiple children carry `flex-grow`, the leftover space is divided equally among them (bottom row).

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0 1.6 -3">

<a-plane
position="0 0.35 0"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: center;">

  <a-plane color="white" width="0.3" height="0.4"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.4"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

<a-plane
position="0 -0.35 0"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: center;">

  <a-plane color="white" width="0.3" height="0.4"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#00C170" height="0.4" flex-grow><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" width="0.3" height="0.4"><a-text value="4" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>
</a-entity>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox/flexbox.js";
import "spatial-design-system/components/flexbox/Properties/flex-grow.js";
```

```html
<a-plane flexbox="direction: row; justify: start; items: center;">
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow></a-plane>
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
</a-plane>

<a-plane flexbox="direction: row; justify: start; items: center;">
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-grow></a-plane>
  <a-plane color="#00C170" height="0.4" flex-grow></a-plane>
  <a-plane color="white" width="0.3" height="0.4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

### Combining `flex-grow` with `flex-col`

When `flex-grow` sits on a child that also has `flex-col`, the grow item claims all unused columns on its line of the 12-column grid. Below, the two outer items take 3 columns each (`sm: 3`) and the middle item — also declared as `sm: 3` but with `flex-grow` — expands to fill the remaining 6.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.5"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: center; wrap: true; gap: 0;">

  <a-plane color="white" height="0.4" flex-col="sm: 3"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 3" flex-grow><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" height="0.4" flex-col="sm: 3"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane
  width="2"
  height="0.5"
  flexbox="direction: row; justify: start; items: center; wrap: true; gap: 0;"
>
  <a-plane color="white" height="0.4" flex-col="sm: 3"></a-plane>
  <a-plane color="#03FCC6" height="0.4" flex-col="sm: 3" flex-grow></a-plane>
  <a-plane color="white" height="0.4" flex-col="sm: 3"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

## Responsive grid

`flex-col` gives a child a width expressed as a fraction of a 12-column grid. You can declare a different column count per breakpoint, and the component picks the largest matching one based on the **container's 3D width** (see [Breakpoints](#breakpoints) below).

Note: column widths are computed from the container's width without subtracting any `gap`, so a row where the column counts add up to exactly 12 will overflow and wrap as soon as you add a non-zero `gap.x`. Use `gap: 0` (or smaller column counts) when you want the items to fit on one row.

### Basic 12-column layouts

Three common splits, stacked top-to-bottom: thirds (`sm: 4`, 4 + 4 + 4 = 12), halves (`sm: 6`, 6 + 6 = 12), and an over-12 case (`sm: 5`, 5 + 5 + 5 = 15) where the third item wraps because the next column count would overflow.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="0.5 1.6 -3">

<a-text value="thirds (sm: 4)"  position="-1.2 0.55 0.01" align="right" color="white" width="3" anchor="right"></a-text>
<a-plane
position="0 0.55 0"
width="2"
height="0.4"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">

  <a-plane color="#03FCC6" height="0.3" flex-col="sm: 4"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#00C170" height="0.3" flex-col="sm: 4"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" height="0.3" flex-col="sm: 4"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

<a-text value="halves (sm: 6)"  position="-1.2 0 0.01" align="right" color="white" width="3" anchor="right"></a-text>
<a-plane
position="0 0 0"
width="2"
height="0.4"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">

  <a-plane color="#03FCC6" height="0.3" flex-col="sm: 6"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#00C170" height="0.3" flex-col="sm: 6"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

<a-text value="wrapping (sm: 5)" position="-1.2 -0.65 0.01" align="right" color="white" width="3" anchor="right"></a-text>
<a-plane
position="0 -0.65 0"
width="2"
height="0.7"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">

  <a-plane color="#03FCC6" height="0.25" flex-col="sm: 5"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#00C170" height="0.25" flex-col="sm: 5"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" height="0.25" flex-col="sm: 5"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>

</a-entity>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox/flexbox.js";
import "spatial-design-system/components/flexbox/Properties/flex-col.js";
```

```html
<a-plane width="2" height="0.4" flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">
  <a-plane color="#03FCC6" height="0.3" flex-col="sm: 4"></a-plane>
  <a-plane color="#00C170" height="0.3" flex-col="sm: 4"></a-plane>
  <a-plane color="white"   height="0.3" flex-col="sm: 4"></a-plane>
</a-plane>

<a-plane width="2" height="0.4" flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">
  <a-plane color="#03FCC6" height="0.3" flex-col="sm: 6"></a-plane>
  <a-plane color="#00C170" height="0.3" flex-col="sm: 6"></a-plane>
</a-plane>

<a-plane width="2" height="0.7" flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">
  <a-plane color="#03FCC6" height="0.25" flex-col="sm: 5"></a-plane>
  <a-plane color="#00C170" height="0.25" flex-col="sm: 5"></a-plane>
  <a-plane color="white"   height="0.25" flex-col="sm: 5"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

### Responsive across breakpoints

Each of the three containers below holds the **same children** with `flex-col="sm: 12; md: 6; lg: 4"`. As container width crosses the breakpoints, the same markup reflows from a stack into a half-grid into a one-row layout.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity position="1.8 1.6 -8">

<a-text value="3 m → sm" position="-2.5 3.4 0.01" align="center" color="white" width="8"></a-text>
<a-plane
position="-2.5 2 0"
width="3"
height="2"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">

  <a-plane color="#03FCC6" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="1" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
  <a-plane color="#00C170" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="2" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
  <a-plane color="white" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="3" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
</a-plane>

<a-text value="6 m → md" position="-2.5 0.5 0.01" align="center" color="white" width="8"></a-text>
<a-plane
position="-2.5 -0.5 0"
width="6"
height="1.4"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">

  <a-plane color="#03FCC6" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="1" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
  <a-plane color="#00C170" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="2" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
  <a-plane color="white" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="3" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
</a-plane>

<a-text value="8 m → lg" position="-2.5 -1.9 0.01" align="center" color="white" width="8"></a-text>
<a-plane
position="-2.5 -2.7 0"
width="8"
height="0.8"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0;">

  <a-plane color="#03FCC6" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="1" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
  <a-plane color="#00C170" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="2" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
  <a-plane color="white" height="0.6" flex-col="sm: 12; md: 6; lg: 4"><a-text value="3" position="0 0 0.01" align="center" color="black" width="6"></a-text></a-plane>
</a-plane>
</a-entity>
</template>

<template #code>

```html
<!-- Same three children in containers of 3 m, 6 m, and 8 m width. -->
<a-plane width="3" flexbox="direction: row; wrap: true; gap: 0;">
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
</a-plane>

<a-plane width="6" flexbox="direction: row; wrap: true; gap: 0;">
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
</a-plane>

<a-plane width="8" flexbox="direction: row; wrap: true; gap: 0;">
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane height="0.6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

The 3 m container falls below the `md` threshold (4 m), so each child uses its `sm` value of 12 columns and they stack. The 6 m container matches `md`, so each child takes 6 columns (two per row, third wraps). The 8 m container matches `lg`, so each child takes 4 columns and all three fit on one row.

### Custom breakpoints

The named breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`, `3xl`) use fixed default thresholds, but you can override those thresholds on the **container** with `customBreakpoints`. It accepts 1–6 numbers (metres) that are assigned to the named breakpoints in order: the first to `sm`, the second to `md`, and so on. Children keep using the named breakpoints in `flex-col`.

Below the container sets `customBreakpoints: 0 1 1.7`, so `sm` = 0 m, `md` = 1 m and `lg` = 1.7 m. At the 2 m container width the `lg` threshold applies, so each child takes its `lg` value of 4 columns and all three fit on one row.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="0.4"
material="color: #018A6C"
flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0; customBreakpoints: 0 1 1.7">
  <a-plane color="#03FCC6" height="0.3" flex-col="sm: 12; md: 6; lg: 4"><a-text value="1" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="#00C170" height="0.3" flex-col="sm: 12; md: 6; lg: 4"><a-text value="2" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
  <a-plane color="white" height="0.3" flex-col="sm: 12; md: 6; lg: 4"><a-text value="3" position="0 0 0.01" align="center" color="black" width="3"></a-text></a-plane>
</a-plane>
</template>

<template #code>

```html
<a-plane width="2" height="0.4" flexbox="direction: row; justify: start; items: start; wrap: true; gap: 0; customBreakpoints: 0 1 1.7">
  <a-plane color="#03FCC6" height="0.3" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#00C170" height="0.3" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="white"   height="0.3" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

If the same container were 1.2 m wide, the `md` threshold (1 m) would apply (6 columns each, two per row); below 1 m the `sm` threshold (0 m) would stack them at 12 columns each.

## `flexbox` props

| Property    | Type                                              | Default | Description                                                                                       |
| ----------- | ------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| _direction_ | enum(`row`, `column`)                             | `row`   | Main layout axis. `row` is horizontal, `column` is vertical.                                      |
| _justify_   | enum(`start`, `end`, `center`, `between`, `around`) | `start` | Distribution along the main axis.                                                                |
| _items_     | enum(`start`, `end`, `center`)                    | `start` | Alignment along the cross axis.                                                                   |
| _wrap_      | boolean                                           | `false` | If `true`, items that don't fit on the main axis continue on the next line.                       |
| _gap_       | vec2                                              | `0 0`   | Spacing between items in metres. First value = main-axis gap, second = cross-axis (line) gap.     |
| _customBreakpoints_ | array (1–6 numbers)                       | `[]`    | Overrides the metre thresholds of the named breakpoints (`sm md lg xl 2xl 3xl`) in order, e.g. `customBreakpoints: 0 1 1.7`. |

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

Breakpoints are based on the parent container's **width in metres**, not on the browser viewport. The default thresholds are:

| Breakpoint | Container width |
| ---------- | --------------- |
| `sm`       | ≥ 0 m           |
| `md`       | ≥ 4 m           |
| `lg`       | ≥ 7 m           |
| `xl`       | ≥ 10 m          |
| `2xl`      | ≥ 12 m          |
| `3xl`      | ≥ 15 m          |

You can override these thresholds per container with the `customBreakpoints` property on the `flexbox` component. It takes 1–6 numbers assigned to `sm`, `md`, `lg`, `xl`, `2xl`, `3xl` in order. For example, `flexbox="… ; customBreakpoints: 3 6"` makes `sm` apply above 3&nbsp;m and `md` above 6&nbsp;m, so `flex-col="sm: 12; md: 6"` yields 12 columns above 3&nbsp;m and 6 columns above 6&nbsp;m. See [Custom breakpoints](#custom-breakpoints) above.

## Notes

- The flexbox container must be a primitive with explicit width and height (e.g. `a-plane`, `a-box`, or an `a-entity` with a geometry). Children with no bounding box are placed using a 0.1&nbsp;m fallback size.
- `gap` adds spacing without changing item sizes. The second value only matters when `wrap: true`.
- `flex-col` widths are calculated from the raw container width (gaps are not subtracted), so set `gap: 0` when the column counts on a row already add up to exactly 12.
- `flex-grow` works in both row and column directions and recomputes when the container resizes.
- With `wrap: true`, `justify` applies per line — useful when laying out grid cells with `flex-col`.
- For predictable responsive layouts, combine `flex-col` with `wrap: true` so wrapped lines flow naturally as the container width crosses breakpoints.
