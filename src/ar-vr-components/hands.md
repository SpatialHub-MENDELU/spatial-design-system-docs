---
title: hands
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

The `hands` component enables full hand tracking interaction in AR scenes using A-Frame and WebXR. It supports both left and right hands and allows detection of gestures, including pointing and pinch interactions, as well as triggering `click` events on interactive elements.

## Example

Below is an example showing how to use the `hands` component in a scene. Try this demo with hand tracking enabled AR hardware (e.g., Meta Quest Pro).

<ComponentExample :fixed="true" :hideOutput="true">

<template #code>

```js
import 'spatial-design-system/components/auto-xr.js';
import 'spatial-design-system/components/hands.js';
import 'spatial-design-system/components/finger-touch.js';
import 'spatial-design-system/primitives/ar-button.js';
```

```html
<a-scene auto-xr>
  <!-- This line enables hand tracking for both hands -->
  <a-entity id="rig" hands> </a-entity>

  <!-- This button shows how to add interactive component to the scene -->
  <a-ar-button
    finger-touch
    position="0 1.5 -1"
    content="Button"
    primary="#018A6C"
    textcolor="white"
    size="large"
  ></a-ar-button>
</a-scene>
```

</template>

</ComponentExample>

## Props

| Property         | Type    | Default   | Description                                |
| ---------------- | ------- | --------- | ------------------------------------------ |
| `leftEnabled`    | boolean | true      | Whether to create and track the left hand  |
| `rightEnabled`   | boolean | true      | Whether to create and track the right hand |
| `leftHandColor`  | color   | `#edccb6` | Color for the left hand model              |
| `rightHandColor` | color   | `#edccb6` | Color for the right hand model             |

## Events

The `hands` component emits the following custom events:

#### Pinch gesture events (global)

These events are emitted to the whole scene, so it can be used to detect pinch gestures on all entities in the scene.

| Event                | Parameters                                                                                  | Description                                       |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `hand-pinch-started` | `{ hand, handId: "left" \| "right", pinchPointWorld: { x: number, y: number, z: number } }` | Emitted when a pinch gesture begins.              |
| `hand-pinch-moved`   | `{ hand, handId: "left" \| "right", pinchPointWorld: { x: number, y: number, z: number } }` | Emitted continuously while a pinch gesture moves. |
| `hand-pinch-ended`   | `{ hand, handId: "left" \| "right" }`                                                       | Emitted when a pinch gesture ends.                |

#### Hover collision events (object-level)

These events are emitted directly to the target element.

| Event                | Parameters                                       | Description                                         |
| -------------------- | ------------------------------------------------ | --------------------------------------------------- |
| `hand-hover-started` | `{ hand: HTMLElement, side: "left" \| "right" }` | Emitted when a hand starts hovering over an object. |
| `hand-hover-ended`   | `{ hand: HTMLElement, side: "left" \| "right" }` | Emitted when a hand stops hovering over an object.  |

## Usage Tips

#### Using the component on mobile devices

Mobile WebXR currently does **not** support `hand-tracking`. So you are not able to detect hand gestures on mobile devices.

However, you can still interact with UI elements by using the standard A-Frame cursor:

```html
<a-camera>
  <a-cursor></a-cursor>
</a-camera>
```

When using a cursor:

- The cursor behaves like a virtual pointer in the center of the screen.
- Interactive components such as `ar-button`, `vr-interactive`, or entities with `interactable` will respond to cursor events.
- Interactions are triggered by tapping the screen.

## Limitations

- Objects must use components that supports hands gestures (e.g., `finger-touch`, `hands-hoverable`, `grabbable`, `stretchable`).
- This component relies on the `hand-tracking-controls` and `hand-tracking-grab-controls` provided by A-Frame.
- To use this component, your XR device must support `hand-tracking` (e.g., Meta Quest). It is not supported in mobile browsers.
- Objects must have proper bounding boxes for collision detection to work reliably.
