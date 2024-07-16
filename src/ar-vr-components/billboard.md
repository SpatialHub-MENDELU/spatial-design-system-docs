---
title: billboard
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/components/position.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

Creates a _billboard effect_ so element is always watching towards camera (user). See [adaptive guidelines](/guidelines/adaptive) for more information.

## Example

Move to the right (D key) and see the effect. The left plane is static and the right plane has billboard (always facing the camera). 

<ComponentExample>

<template #output v-if="renderScene">
    <a-plane
        position="-0.6 1.5 -2"
        color="#8A8A8A"
        text="value: STATIC; width: 3; align: center; color: black;"
    ></a-plane>
    <a-plane
        position="0.6 1.5 -2"
        color="#03FCC6"
        text="value: BILLBOARD; width: 3; align: center; color: black;"
        billboard
    ></a-plane>
    <a-box position="0 0.9 -2.5" width="5" height="0.1" depth="2" src="../grid-light-1850w.png"></a-box>
</template>

<template #code>

```js
import "spatial-design-system/components/position.js";
```

```html
<a-plane
  position="0 1.5 -2"
  color="#03FCC6" 
  text="value: BILLBOARD; width: 3; align: center; color: black;" 
  billboard
></a-plane>
```

</template>

</ComponentExample>

## Props

| Property | Type      | Default | Description                    |
|----------|-----------|---------|--------------------------------|
| -   | -    | -       | -