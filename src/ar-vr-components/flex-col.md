---
title: flex-col
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/components/flexbox/flexbox.js");
    renderScene.value = true;
  } catch(e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `flex-col` component enables responsive grid layouts within the flexbox system. It's inspired by Bootstrap's grid system, allowing you to specify how many columns an element should span at different viewport breakpoints.

## Example

This example demonstrates a responsive layout that changes based on viewport width:

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

  <a-plane color="#03FCC6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" flex-col="sm: 12; md: 12; lg: 4"></a-plane>
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

  <a-plane color="#03FCC6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" flex-col="sm: 12; md: 6; lg: 4"></a-plane>
  <a-plane color="#03FCC6" flex-col="sm: 12; md: 12; lg: 4"></a-plane>
</a-plane>
```

</template>

</ComponentExample>

In the example above:
- On small screens, each item takes the full width (12 columns)
- On medium screens, the first two items share a row (6 columns each), and the third item takes a full row
- On large screens, all three items fit on a single row (4 columns each)

## Props

| Property | Type   | Default | Description                                                 |
| -------- | ------ | ------- | ----------------------------------------------------------- |
| _sm_     | number | 12      | Number of columns (out of 12) at small viewport widths      |
| _md_     | number | -       | Number of columns (out of 12) at medium viewport widths     |
| _lg_     | number | -       | Number of columns (out of 12) at large viewport widths      |
| _xl_     | number | -       | Number of columns (out of 12) at extra large viewport widths |
| _2xl_    | number | -       | Number of columns (out of 12) at 2x large viewport widths   |
| _3xl_    | number | -       | Number of columns (out of 12) at 3x large viewport widths   |

## Breakpoints

The responsive breakpoints are defined as follows:

| Breakpoint | Screen Width  |
| ---------- | ------------- |
| sm         | <640px        |
| md         | ≥640px        |
| lg         | ≥768px        |
| xl         | ≥1024px       |
| 2xl        | ≥1280px       |
| 3xl        | ≥1536px       |

## How It Works

1. The `flex-col` component uses a 12-column grid system (similar to Bootstrap)
2. Each element can span a specified number of columns (from 1 to 12)
3. The component automatically listens for window resize events and updates column spans based on the current viewport width
4. When calculating the column value to use, the component follows this fallback sequence:
   - Current detected breakpoint value
   - md breakpoint value
   - lg breakpoint value
   - xl breakpoint value
   - 2xl breakpoint value
   - 3xl breakpoint value
   - sm breakpoint value (default)
5. The element's width is calculated as: `(container_width / 12) * column_value`

## Usage Notes

- Always set at least the `sm` value to ensure layout works at all viewport sizes
- For consistent spacing, use with the `wrap: true` property on the parent flexbox
- `flex-col` works best with the `direction: row` setting on the parent flexbox
- You can combine `flex-col` with `flex-grow` for more complex layouts
