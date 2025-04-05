---
title: flexbox
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

Flexbox is a powerful one-dimensional layout system inspired by [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/flex). It helps you create flexible layouts that can adapt to different sizes and arrangements in your AR/VR scenes.

## Overview

The Flexbox component family consists of several components that work together:

- [**flexbox**](/ar-vr-components/flexbox-container) - Main container component
- [**flex-col**](/ar-vr-components/flex-col) - Bootstrap style column size specification
- [**flex-grow**](/ar-vr-components/flex-grow) - Dynamic space distribution

## Basic Usage

Flexbox uses a container/item pattern - you apply the `flexbox` component to a parent element, then place child elements inside it.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane
position="0 1.6 -3"
width="2"
height="2"
material="color: #018A6C"
flexbox="
direction: row;
justify: center;
items: center;
gap: 50 50;
wrap: true;
">

  <a-plane color="white"></a-plane>
  <a-plane color="white"></a-plane>
  <a-plane color="white"></a-plane>
  <a-plane color="white"></a-plane>
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

## Advanced Features

### Responsive Layout with flex-col

You can create responsive grid-based layouts using the `flex-col` component:

```html





```

This will create a layout that adapts based on viewport size:
- On small screens (sm): Each child takes up full width (12 columns)
- On medium screens (md): First two children share a row (6 columns each), third child is on its own row
- On large screens (lg): All three children fit on one row (4 columns each)

### Flexible Item Sizing with flex-grow

Use `flex-grow` to make items fill available space:

```html





```

The middle element will automatically expand to fill the remaining space.

## Component Documentation

For detailed information about each component in the Flexbox family, see:

- [flexbox-container](/ar-vr-components/flexbox-container) - Container properties and layout control
- [flex-col](/ar-vr-components/flex-col) - Responsive grid column system
- [flex-grow](/ar-vr-components/flex-grow) - Dynamic space allocation
