---
title: grabbable
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `grabbable` component adds an interactive grab effect to any A‑Frame entity. When a hand intersects the entity’s oriented bounding box (via the companion `obb-collider` component) and create pinch gesture (grabs the object), user is able to move the object around and drop it elsewhere.

### Disclaimer

This components comes from [A‑Frame](https://aframe.io/docs/1.7.0/components/hand-tracking-grab-controls.html) and is not part of Spatial Design System. This page only demonstrates how to use it with SDS component `hands`.

## Example

This component is mainly prepared for hand gestures. You should use it with the `hands` component and test it on XR devices, that support hand gestures (e.g. Meta Quest Pro).

<ComponentExample :fixed="true" :hideOutput="true">

<template #code>

```js
import 'spatial-design-system/components/hands.js';
```

```html
<a-scene>
  <a-entity id="rig" hands></a-entity>
  <a-box position="0 1.5 -2" grabbable></a-box>
</a-scene>
```

</template>

</ComponentExample>

## How It Works

Component `hands`uses under the hood [A‑Frame](https://aframe.io/docs/1.7.0/components/hand-tracking-grab-controls.html) component `hand-tracking-grab-controls` to detect pinch gesture and grab the object.

## Limitations

- Must be used in conjunction with the `hands` component and a hand-tracking-enabled XR device. It is not supported in mobile browsers.
