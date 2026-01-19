---
title: touch-raycaster
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

The `touch-raycaster` component enables **touch-based interaction** on mobile devices by converting screen taps into raycast-driven `click` events on scene entities.

It acts as a lightweight fallback interaction system for platforms **without hand-tracking** (e.g., iOS, Android), allowing UI elements such as buttons or text inputs to be activated through simple screen touches.

## Example

Add the `touch-raycaster` component to the `<a-scene>` to enable touch gesture support:

<ComponentExample :fixed="true" :hideOutput="true">

<template #output v-if="renderScene">
</template>

<template #code>

```js
import 'spatial-design-system/components/autoXr.js';
import 'spatial-design-system/components/touch-raycaster.js';
import 'spatial-design-system/primitives/ar-button.js';
```

```html
<a-scene auto-xr touch-raycaster>
  <!-- This button will be clickable by touch gestures -->
  <a-ar-button position="0 1.5 -1" content="Button"></a-ar-button>
</a-scene>
```

</template>

</ComponentExample>

## How It Works

1. The component listens for `pointerup` events (screen taps) on the document.
2. When a tap occurs, the touch position is converted into normalized device coordinates.
3. A ray is cast from the camera through the tap position into the scene.
4. The first visible intersected entity is identified.
5. That entity receives a `click` event.
6. The component can be enabled or disabled at runtime using the event `toggle-touch-raycaster-disable-state`.

## Events

| Event   | Parameters            | Description                                                                                                        |
| ------- | --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `click` | `{ el: HTMLElement }` | Emitted on the first visible intersected entity when a screen tap occurs. The `el` is the entity that was clicked. |

## Features

- Enables touch-based interaction across the entire scene.
- Emits `click` on the first intersected visible object.
- Works as a fallback for devices without hand-tracking support.
- Invisible interaction layer (no visual cursor).
- Can be globally toggled on/off using a custom event.

## Limitations

- Intended mainly for mobile browsers without WebXR hand-tracking.
- Does not emit hover events (`mouseenter`, `mouseleave`).
- Does not provide visual feedback like `<a-cursor>`.
- No `click-ended` event, only a single `click`.
- Depends on raycasting accuracy, which may vary with camera angle and object size.
