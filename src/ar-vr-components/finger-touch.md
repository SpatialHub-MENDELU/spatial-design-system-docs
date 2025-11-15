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

The `finger-touch` component turns a **pointing finger gesture** into `click` and `click-ended` events on an entity.  
It works together with the `hands` component by adding an OBB collider and listening for hand-hover events emitted when a hand enters or leaves the object’s bounds.

## Example

Add the `finger-touch` component to any entity that should respond to hand touch interaction:

<ComponentExample :fixed="true" :hideOutput="true">

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
import 'spatial-design-system/primitives/ar-textbox.js';
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

## Events

The `finger-touch` component emits the following events when interacting with a pointing finger:

| Event         | Parameters                                       | Description                                                      |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| `click`       | `{ hand: HTMLElement, side: "left" \| "right" }` | Emitted when a pointing finger begins hovering over the entity.  |
| `click-ended` | `{ hand: HTMLElement, side: "left" \| "right" }` | Emitted when the pointing finger stops hovering over the entity. |

## Features

- Applies `obb-collider` for accurate collision detection.
- Adds the `clickable` class to the entity to mark it as an interactive target.
- Listens for:
  - `hand-hover-started`
  - `hand-hover-ended`

## Usage Tips

- Combine `finger-touch` with other interaction components like `textbox` or `clickable` to respond to `click` events.

```html
<a-scene auto-xr>
  <a-entity id="rig" hands> </a-entity>
  <a-ar-textbox position="0 1.6 -3" label="Label" finger-touch></a-ar-textbox>
</a-scene>
```

- You can listen for `click` events emitted from the `hands` component. Then you can set attributes and style to the entity based on the click event:

```js
el.addEventListener('click', (e) => {
  console.log('Touched by:', e.detail.side);
});
```

## Limitations

- Does not provide visuals on its own; it only emits gesture-based events.
- Requires the `hands` component to supply `hand-hover-started` and `hand-hover-ended` events.
- Works only with WebXR devices that support hand tracking (e.g., Meta Quest Pro).
- Not supported on mobile browsers; use a cursor-based fallback there.
