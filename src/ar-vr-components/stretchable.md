---
title: stretchable
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    // Component itself
    // await import("spatial-design-system/components/stretchable.js");
    // (Optional) Your gesture source that emits `stretch-*` events
    // e.g. "hands" / "controllers" / "super-hands" wrapper in your project.
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ \$frontmatter.title }}

Interactive resizing of objects using a "stretch" gesture (pinch) from **hands** or **controllers**. The component reacts to `stretch-start`, `stretch-move` and `stretch-end` events, which must be provided by a **gesture source** (e.g., your hand-tracking or controller system).  
It supports two modes:

- **`mode: "scale"`** – **uniform** scaling (keeps proportions). Activation is **restricted to corners** of the object to avoid accidental scaling.
- **`mode: "dimensions"`** – **non-uniform** scaling (independently along X/Y/Z axes) based on the direction of the gesture relative to the object’s center. Activated for the closest `stretchable` object to the contact point.

> Tested on **Meta Quest Pro** (hands/controllers).

## Example

Below is an example showing how to use the `stretchable` component in a scene. Try this demo with hand tracking enabled AR hardware (e.g., Meta Quest Pro) or with controllers.

<ComponentExample :fixed="true" :hideOutput="true">

<template #code>

```js
import 'spatial-design-system/components/auto-xr.js';
import 'spatial-design-system/components/hands.js';
import 'spatial-design-system/components/controllers.js';
import 'spatial-design-system/components/stretchable.js';
```

```html
document.querySelector("#app").innerHTML = `
<a-scene auto-xr>
  <!-- This line enables hand tracking for both hands -->
  <a-entity id="rig" hands> </a-entity>
  <!-- or with controllers -->
  <a-entity id="rig" controllers> </a-entity>

  <!-- This enables stretchable interaction on the box -->
  <a-box stretchable="mode: dimensions" position="0 1.5 -1"></a-box>
</a-scene>
>`;
```

</template>

</ComponentExample>

## Features

- Automatically applies `obb-collider` to the entity for accurate bounding box detection.
- Adds the `interactable` class to the entity so that it can be targeted by the `hands` component.

## Usage Tips

- Using **hands**: Press the index finger of the dominant hand in the corner of the object to activate the stretchable and pull to the side.
- Using **controllers**: Press the trigger button of the controller pointing at the object corner to activate the stretchable and pull to the side.

## Limitations

- Component has set default values for `minScaleFactor` and `maxScaleFactor` based on the object's size to avoid accidental infinite scaling.
- The `stretchable` should not be combined with another component using pinch gesture (e.g., `grabbable`). It can cause conflicts and one of the components might not work as expected.
- Must be used in conjunction with the `hands` component and a hand-tracking-enabled XR device.
