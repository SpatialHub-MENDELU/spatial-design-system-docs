---
title: flex-grow
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

The `flex-grow` component allows an item to expand and fill available space within a flexbox container. This is especially useful for creating flexible layouts where some elements need to take up remaining space.

## Example

In this example, the middle element expands to fill all available space:

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

  <a-plane color="white" width="0.3"></a-plane>
  <a-plane color="#03FCC6" flex-grow></a-plane>
  <a-plane color="white" width="0.3"></a-plane>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox.js";
```

```html





```

</template>

</ComponentExample>

## Multiple Growing Elements

You can apply `flex-grow` to multiple elements. Available space will be distributed evenly among all growing elements:

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

  <a-plane color="white" width="0.3"></a-plane>
  <a-plane color="#03FCC6" flex-grow></a-plane>
  <a-plane color="#00C170" flex-grow></a-plane>
  <a-plane color="white" width="0.3"></a-plane>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/flexbox.js";
```

```html






```

</template>

</ComponentExample>

## Props

| Property | Type    | Default | Description                                        |
| -------- | ------- | ------- | -------------------------------------------------- |
| -        | boolean | true    | When present (or set to true), enables flex-grow   |

## How It Works

1. The `flex-grow` component stores the original dimension of the element
2. When layout is applied, it:
   - Calculates remaining free space in the flexbox container
   - Distributes that space among all elements with `flex-grow`
   - Adjusts positions of elements to maintain proper spacing

## Usage Tips

- `flex-grow` works in both row and column directions
- When the flexbox container changes size (e.g., due to viewport changes), growing elements automatically adjust
- You can disable growing by setting `flex-grow="false"`
- For predictable layouts, fix the size of non-growing elements
- Combine with `flex-col` for responsive, flexible layouts:

```html




```

In this example, the second element takes up 9/12 of the width but can still grow to fill any additional space.
