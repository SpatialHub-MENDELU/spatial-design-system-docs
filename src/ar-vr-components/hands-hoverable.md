---
title: ar-hoverable
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

The `hands-hoverable` component adds an interactive hover effect to any A‑Frame entity. When a hand intersects the entity’s oriented bounding box (via the companion `obb-collider` component), the entity is visually highlighted by rendering a 3D overlay box around it or a wireframe.

## Example

This component is mainly prepared for hand gestures. You should use it with the `hands` component and test it on XR devices, that support hand gestures (e.g. Meta Quest Pro).

<ComponentExample :fixed="true" :hideOutput="true">

<template #code>

```js
import 'spatial-design-system/components/hands.js';
import 'spatial-design-system/components/hands-hoverable.js';
```

```html
<a-scene>
  <a-entity id="rig" hands></a-entity>
  <a-box
    position="0 1.5 -2"
    hands-hoverable="useWireframe: true; hoverColor:#fc0000;"
  ></a-box>
  <!-- or this component will use overlay geometry by default -->
  <a-ar-button
    content="Click Me"
    hands-hoverable="hoverColor: #fc0000;"
    position="1 2 -2"
  ></a-ar-button>
</a-scene>
```

</template>

</ComponentExample>

## Props

| Property             | Type    | Default              | Description                                                                             |
| -------------------- | ------- | -------------------- | --------------------------------------------------------------------------------------- |
| `useOverlayGeometry` | boolean | true                 | Whether to render a 3D overlay box around the hovered object.                           |
| `useWireframe`       | boolean | false                | Whether the hover overlay should be rendered as a wireframe instead of a colored box.   |
| `overlaySizeRatio`   | number  | 0.005                | Additional padding applied to the overlay box to make the hover highlight more visible. |
| `hoverColor`         | color   | `VARIANT_DARK_COLOR` | Color of the overlay geometry or wireframe when the element is hovered.                 |

## How It Works

- On init, the component adds `obb-collider` (centerModel mode) and the CSS class `interactable`, so the entity becomes a target for A‑Frame’s raycaster.
- It listens for `hand-hover-started` and `obbcollisionended` events from `hands` component to detect hover state.

## Events

The component itself does not emit custom events, but you can use the `obbcollisionstarted/ended` events fired by `obb-collider` for further logic:

```javascript
const box = document.querySelector('[hands-hoverable]');

box.addEventListener('obbcollisionstarted', () => {
  console.log('Entity hovered');
});

box.addEventListener('obbcollisionended', () => {
  console.log('Hover left');
});
```

## Notes

- Requires the `obb-collider` component to be available (included automatically in the example import above).
- Works with 2D hand gestures and other components such as `finger-touch`, `grabbable`, `stretchable`, etc.
- The overlay geometry is rendered slightly in front of the mesh with small padding `.overlaySizeRatio` (default is 0.005).
- Default hover color is `VARIANT_DARK_COLOR=#545454` which is Spatial Design System's primary color.
- Tested on Meta Quest Pro and desktop browsers.

## Limitations

- Must be used in conjunction with the `hands` component and a hand-tracking-enabled XR device. It is not supported in mobile browsers or using controllers.
