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
>`;
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

The `hands` component emits the following custom event:

| Event   | Parameters                                         | Description                                                                                            |
| ------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `click` | \`{ hand: HTMLElement, side: "left" \| "right" }\` | Emitted when the user's index fingertip touches a clickable/interactable object with pointing gesture. |

## Usage Tips

### Making Elements Clickable

It is also possible to allow an object to react to hand-based interaction, add the `interactable` class. For example:

```html
<a-entity
  class="interactable"
  geometry="primitive: box"
  material="color: #03A9F4"
></a-entity>
```

The `click` event will be triggered when the user's index finger approaches and touches the object. You can listen to it in your component:

```js
el.addEventListener('click', (e) => {
  console.log('Clicked by hand side:', e.detail.side);
});
```

## Limitations

- Objects must use components that supports hands gestures (e.g., `finger-touch`, `hands-hoverable`, `grabbable`, `stretchable`).
- This component relies on the `hand-tracking-controls` and `hand-tracking-grab-controls` provided by A-Frame.
- To use this component, your XR device must support `hand-tracking` (e.g., Meta Quest).
- Objects must have proper bounding boxes for collision detection to work reliably.
