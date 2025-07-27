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

The `ar-hoverable` component adds an interactive hover effect to any A‑Frame entity. When a hand intersects the entity’s oriented bounding box (via the companion `obb-collider` component), the entity is visually highlighted either by changing its **color** or drawing an **outline/border** around its mesh.

## Example

This component is mainly prepared for hand gestures. You should use it with the `hands` component and test it on XR devices, that support hand gestures (e.g. Meta Quest Pro).

<ComponentExample :fixed="true">

<template #code>

```js
import 'spatial-design-system/components/ar-hoverable.js';
```

```html
<a-scene>
  <a-entity id="rig" hands></a-entity>
  <a-box
    position="0 1.5 -2"
    ar-hoverable="hoverEffect: color; hoverColor: #fc0000;"
  ></a-box>
  <!-- or -->
  <a-ar-button
    content="Click Me"
    ar-hoverable="hoverEffect: border; hoverColor:#fc0000;"
    position="1 2 -2"
  ></a-ar-button>
</a-scene>
```

</template>

</ComponentExample>

## Props

| Property      | Type   | Default   | Description                                                                                          |
| ------------- | ------ | --------- | ---------------------------------------------------------------------------------------------------- |
| _hoverEffect_ | string | "border"  | Visual style when hovered: `border` draws an outline; `color` temporarily changes the material color |
| _hoverColor_  | color  | `#545454` | Color used for the border or material tint while the entity is hovered                               |

## How It Works

1. On init, the component adds `obb-collider` (centerModel mode) and the CSS class `interactable`, so the entity becomes a target for A‑Frame’s raycaster.
2. It listens for `obbcollisionstarted` and `obbcollisionended` events to detect hover state.
3. When the hover starts (`obbcollisionstarted`):

   - **Color mode** – stores the original material color, then sets it to `hoverColor`.
   - **Border mode** – builds a `THREE.LineSegments` outline (if not cached) around the entity’s geometry and shows it.

4. When the hover ends (`obbcollisionended`):

   - **Color mode** – restores the saved original color.
   - **Border mode** – hides the outline.

5. Property updates at runtime (`update` lifecycle) instantly refresh the active effect if the entity is currently hovered.
6. On `remove`, listeners and any created outline geometry/material are cleaned up to avoid memory leaks.

## Events

The component itself does not emit custom events, but you can use the `obbcollisionstarted/ended` events fired by `obb-collider` for further logic:

```javascript
const box = document.querySelector('[ar-hoverable]');

box.addEventListener('obbcollisionstarted', () => {
  console.log('Entity hovered');
});

box.addEventListener('obbcollisionended', () => {
  console.log('Hover left');
});
```

## Notes

- Requires the `obb-collider` component to be available (included automatically in the example import above).
- Works with 2D hand gestures.
- The border outline is rendered slightly in front of the mesh (`z = 0.001`) to avoid z‑fighting.
- Default hover color is `#545454` which is Spatial Design System's primary color.
- Tested on Meta Quest Pro and desktop browsers.
