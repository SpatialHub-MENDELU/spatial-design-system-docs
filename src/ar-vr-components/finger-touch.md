---
title: finger-touch
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

# {{ \$frontmatter.title }}

The `finger-touch` component is a simple utility component that marks an entity as interactable with hand gestures in AR scenes. It works together with the `hands` component by setting up a collider and adding the appropriate class for interaction.

## Example

Add the `finger-touch` component to any entity that should respond to hand touch interaction:

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity id="rig" position="0 1.6 0" controllers="
    leftColor: #03FCC6;
    rightColor: #018A6C;
    cursorSize: 0.01;
    raycastLength: 10
  ">
<a-camera></a-camera>
</a-entity>

  <!-- Interactive objects will respond to controller events -->

<a-box position="0 1.5 -5" color="#03FCC6" vr-interactive></a-box>
</template>

<template #code>

```js
import 'spatial-design-system/components/auto-xr.js';
import 'spatial-design-system/components/hands.js';
import 'spatial-design-system/components/finger-touch.js';
import 'spatial-design-system/primitives/ar-button.js';
```

```html
document.querySelector("#app").innerHTML = `
<a-scene auto-xr>
  <!-- This line enables hand tracking for both hands -->
  <a-entity id="rig" hands> </a-entity>

  <!-- This button will be clickable by hand gestures -->
  <a-ar-button finger-touch position="0 1.5 -1" content="Button"></a-ar-button>
</a-scene>
>`;
```

</template>

</ComponentExample>

This will ensure the object is recognized as a potential interactive target for hand-tracked gestures, such as finger taps.

## Features

- Automatically applies `obb-collider` to the entity for accurate bounding box detection.
- Adds the `interactable` class to the entity so that it can be targeted by the `hands` component.

## Usage Tips

- Combine `finger-touch` with other interaction components like `button` or `clickable` to respond to `click` events.

```html
<a-scene auto-xr>
  <a-entity id="rig" hands> </a-entity>
  <a-entity button="text: Confirm" finger-touch></a-entity>
</a-scene>
```

- You can listen for `click` events emitted from the `hands` component. Then you can set attributes and style to the entity based on the click event:

```js
el.addEventListener('click', (e) => {
  console.log('Touched by:', e.detail.side);
});
```

## Limitations

- The `finger-touch` component does not handle click logic itself. It only prepares the entity to be clickable using hand gestures.
- Must be used in conjunction with the `hands` component and a hand-tracking-enabled XR device.
