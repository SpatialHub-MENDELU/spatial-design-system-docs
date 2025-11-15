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

The `stretchable` component enables interactive resizing of objects using a pinch gesture from **hand tracking** or trigger-based gestures from **VR controllers**.  
It supports both **uniform** and **non-uniform** scaling and automatically determines whether the user is manipulating a corner of the object's bounding box.

The component listens to global gesture events such as `hand-pinch-started`, `hand-pinch-moved`, `hand-pinch-ended`, and their controller equivalents (`controller-triggerdown`, `controller-move`, `controller-triggerup`).  
When a gesture begins, the component checks if the interaction point is close enough to one of the object's corners. Only the nearest valid corner activates the stretch interaction to prevent accidental resizing.

Two scaling modes are supported:

- **`mode: "scale"`** – uniform scaling that preserves proportions, based on distance change from the object's center.
- **`mode: "dimensions"`** – non-uniform scaling, allowing independent resizing along selected axes (`dimensionAxes: ["x","y","z"]`).

Scaling respects the configured minimum and maximum size limits, and works with both hands and controllers.

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

  <!-- This enables stretchable interaction on the box when using dimensions mode -->
  <a-box
    position="-0.5 1.2 -0.7"
    width="0.5"
    height="0.5"
    depth="0.5"
    color="#03FCC6"
    stretchable="dimensionAxes: x, z"
  ></a-box>

  <!-- This enables stretchable interaction on the box when using scale mode -->
  <a-box
    position="0.5 1.2 -0.7"
    width="0.5"
    height="0.5"
    depth="0.5"
    color="#2196F3"
    stretchable="mode: scale; maxSize: 2; minSize: 0.5"
  ></a-box>
</a-scene>
>`;
```

</template>

</ComponentExample>

## Props

| Property                  | Type   | Default         | Description                                                                                                 |
| ------------------------- | ------ | --------------- | ----------------------------------------------------------------------------------------------------------- |
| `mode`                    | string | `"dimensions"`  | Stretch mode: `"scale"` for uniform scaling, `"dimensions"` for axis-specific scaling.                      |
| `dimensionAxes`           | array  | `["x","y","z"]` | Axes allowed for non-uniform scaling when `mode: "dimensions"`.                                             |
| `maxSize`                 | number | `1.5`           | Maximum allowed size multiplier applied to the original scale of the object.                                |
| `minSize`                 | number | `0.5`           | Minimum allowed size multiplier applied to the original scale of the object.                                |
| `maxBoxTouchDistance`     | number | `0.03`          | Distance (in meters) within which a gesture must be to consider the object’s bounding box as “touching.”    |
| `maxCornerSelectDistance` | number | `0.06`          | Distance threshold for selecting the nearest corner of the bounding box. Looser than `maxBoxTouchDistance`. |

## Features

- Automatically applies `obb-collider` to the entity for accurate bounding box detection.
- Adds the `interactable` class to the entity so that it can be targeted by the `hands` component.

## Usage Tips

- Using **hands**: Press the index finger of the dominant hand in the corner of the object to activate the stretchable and pull to the side.
- Using **controllers**: Press the trigger button of the controller pointing at the object corner to activate the stretchable and pull to the side.

## Limitations

- Component has fixed default values for `minScaleFactor` (0.5) and `maxScaleFactor` (1.5) that constrain scaling relative to the object's initial scale to prevent accidental infinite scaling. These factors are applied to each axis independently in both modes.
- The `stretchable` can be combined with another component using pinch gesture (e.g., `grabbable`, `hands-hoverable`).
- Must be used in conjunction with the `hands` component and a hand-tracking-enabled XR device or `controllers` component. It is not supported in mobile browsers.
