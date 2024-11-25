---
title: follow-camera
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import ("spatial-design-system/components/position.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

Element _follows_ the user (camera) so it doesn't matter where the camera's located/watching, the element will be always in camera's FOV.
See [follow behavior guidelines](/guidelines/follow) for more information.

## Example

Drag (rotate) the scene using your mouse or touch and see the effect. The sphere is always in the camera's FOV.

<ComponentExample>

<template #output v-if="renderScene">
<a-sphere color="#03FCC6" position="0 1.5 -2.5" radius="0.8" follow-camera="angle: 1"></a-sphere>
<a-box position="0 0.65 -2.5" width="5" height="0.1" depth="2" src="../grid-light-1850w.png"></a-box>
</template>

<template #code>

```js
import "spatial-design-system/components/position.js";
```

```html
<a-sphere
  color="#03FCC6"
  position="0 1.5 -2"
  radius="0.8"
  follow-camera="angle: 1"
></a-sphere>
```

</template>

</ComponentExample>

## Props

| Property   | Type   | Default           | Description                                                                                                                                                                                                                                                                               |
| ---------- | ------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _angle_    | number | horizontalFOV / 2 | In degrees. Determines the threshold after which the element's position changed (with smooth animation). <br/><br/> If angle is not specified or is zero, the threshold is computed as half of the horizontal FOV, meaning the object starts moving once it is at the edge of the screen. |
| _distance_ | number | 2.0               | Distance offset sets initial element's z-coordinate.                                                                                                                                                                                                                                      |
