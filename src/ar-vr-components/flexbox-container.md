---
title: flexbox-container
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/components/flexbox.js");
    renderScene.value = true;
  } catch(e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `flexbox` component creates a flexible one-dimensional layout container, similar to [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/flex). It allows you to arrange child elements in rows or columns with advanced alignment and spacing options.

## Examples

### Basic Row Layout

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
import "spatial-design-system/components/flexbox.js";
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

### Column Layout with Wrapping

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="1.2"
height="1.2"
material="color: #018A6C"
flexbox="
direction: column;
justify: space-around;
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
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox.js";
```

```html
<a-plane
  position="0 1.6 -3"
  width="1.2"
  height="1.2"
  material="color: #018A6C"
  flexbox="
      direction: column;
      justify: space-around;
      items: center;
      wrap: true;
      gap: 20 20;
  "
>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
  <a-box color="white" width="0.25" height="0.25" depth="0.1"></a-box>
</a-plane>
```

</template>

</ComponentExample>

## Props

| Property    | Type                                                | Default  | Description                                                                                                          |
| ----------- | --------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| _direction_ | enum(row, column)                                   | row      | Sets main layout direction (horizontal or vertical)                                                                   |
| _justify_   | enum(start, end, center, between, around)           | start    | Aligns items along the main axis                                                                                     |
| _items_     | enum(start, end, center)                            | start    | Aligns items along the cross axis                                                                                    |
| _wrap_      | boolean                                             | false    | Enables wrapping of items to new lines when they exceed container dimensions                                          |
| _gap_       | vec2                                                | 0 0      | Sets spacing between items. First value is main axis gap, second is cross axis gap          |

## Justify Values Explained

- **start**: Items are positioned at the beginning of the container
- **end**: Items are positioned at the end of the container
- **center**: Items are centered in the container
- **between**: Items are evenly distributed with the first item at the start and the last item at the end
- **around**: Items are evenly distributed with equal space around them

## Items Alignment Values Explained

- **start**: Items are aligned to the start of the cross axis
- **end**: Items are aligned to the end of the cross axis
- **center**: Items are centered along the cross axis

## How Gap Works

The `gap` property adds spacing between items in the flexbox container. It creates consistent spacing between each element without affecting their size.

When you set `gap: 10 20`:
- The first value (`10`) adds horizontal spacing between elements
- The second value (`20`) adds vertical spacing between elements

In row layouts with wrapping, the vertical gap affects the space between rows.
In column layouts with wrapping, the horizontal gap affects the space between columns.

## Notes

- The flexbox container must be a primitive that has width and height (box, plane, entity with geometry)
