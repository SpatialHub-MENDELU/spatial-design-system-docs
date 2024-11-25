---
title: auto-scale
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

Scales the element so it has always the appropriate size in the scene based on the distance between the element and the camera. See [adaptive guidelines](/guidelines/adaptive) for more information.

## Example

Move back (S key) and see the effect. The left box is static and the right box has `auto-scale` applied.

<ComponentExample>

<template #output v-if="renderScene">
<a-box color="#8A8A8A" position="-0.6 1.5 -2.5"></a-box>
<a-box color="#03FCC6" position="0.6 1.5 -2.5" auto-scale></a-box>
<a-box position="0 0.95 -2.5" width="5" height="0.1" depth="1" src="../grid-light-1850w.png"></a-box>
</template>

<template #code>

```js
import "spatial-design-system/components/position.js";
```

```html
<a-box color="#03FCC6" position="0 1.5 -2.5" auto-scale></a-box>
```

</template>

</ComponentExample>

## Props

| Property | Type   | Default | Description                                                      |
| -------- | ------ | ------- | ---------------------------------------------------------------- |
| _factor_ | number | 1.0     | A scaling factor to control the rate at which the entity scales. |
