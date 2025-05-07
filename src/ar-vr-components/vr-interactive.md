---
title: vr-interactive
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    // await import("spatial-design-system/components/controllers.js");
    // await import("spatial-design-system/components/vr-interactive.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `vr-interactive` component adds enhanced interactivity to A-Frame entities when using VR controllers. It provides visual feedback through highlighting, handles controller button events, and animates elements on interaction.

## Example

Below is an example of using the vr-interactive component with objects in a VR scene. Test this demo by opening this page in a VR headset and clicking on the "VR" button.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
  <a-entity id="rig" position="0 1.6 0" controllers>
    <a-camera></a-camera>
  </a-entity>
  
  <a-box position="-1 3 -3" color="#03FCC6" vr-interactive="
    highlightColor: #ffff00;
    enabledButtons: trigger, grip;
  "></a-box>
  
  <a-sphere position="1 3 -3" color="#03FCC6" vr-interactive="
    highlightEnabled: false;
    scaleOnClick: 0.8;
  "></a-sphere>
</template>

<template #code>

```js
import "spatial-design-system/components/controllers.js";
import "spatial-design-system/components/vr-interactive.js";
```

```html
<a-scene>
  <a-entity id="rig" position="0 1.6 0" controllers>
    <a-camera></a-camera>
  </a-entity>
  
  <!-- Interactive objects with custom highlighting and controller buttons -->
  <a-box position="-1 3 -3" color="#03FCC6" vr-interactive="
    highlightColor: #ffff00;
    enabledButtons: trigger, grip;
  "></a-box>
  
  <a-sphere position="1 3 -3" color="#03FCC6" vr-interactive="
    highlightEnabled: false;
    scaleOnClick: 0.8;
  "></a-sphere>
</a-scene>
```

</template>

</ComponentExample>

## Props

| Property          | Type            | Default                                  | Description                                                        |
|-------------------|-----------------|------------------------------------------|--------------------------------------------------------------------|
| _enabledButtons_  | array           | ["trigger", "grip", "a", "b", "x", "y"] | Controller buttons that will trigger interaction with the object    |
| _clickAnimation_  | boolean         | true                                     | Whether to animate the object when clicked                          |
| _highlightEnabled_| boolean         | true                                     | Whether to show visual highlighting when pointing at the object     |
| _highlightColor_  | color           | #666666                                  | Color of the highlight effect                                       |
| _highlightOpacity_| number          | 1.0                                      | Opacity of the highlight effect (0.0-1.0)                           |
| _borderWidth_     | number          | 2                                        | Width of the highlight border                                       |
| _scaleOnClick_    | number          | 0.9                                      | Scale factor applied to the object when clicked (0.9 = 90% of size) |

## Events

| Event    | Properties                                           | Description                                             |
|----------|----------------------------------------------------- |--------------------------------------------------------|
| _click_  | `{ source: "vr-controller", button: "trigger" }`     | Emitted when the object is clicked with a VR controller |


## Usage with Controllers
This component is designed to work with the [controllers](/ar-vr-components/controllers) component. The controllers create the raycasters and button events, while vr-interactive handles the interaction response.

### Controller Button Types

The `enabledButtons` property accepts the following button names:

- **trigger**: Main trigger button (index finger)
- **grip**: Side grip button (middle finger)
- **a/b**: Primary buttons on right controller
- **x/y**: Primary buttons on left controller

For example, to only allow interaction with the trigger button:

```html
<a-box vr-interactive="enabledButtons: trigger"></a-box>
```

### Customizing Highlighting

The highlight effect creates an outlined edge around the object. You can customize its appearance:

```html
<a-sphere vr-interactive="
  highlightColor: #ff0000;
  highlightOpacity: 0.8;
  borderWidth: 3
"></a-sphere>
```

### Handling Click Events

You can listen for click events from your component:

```html
<script>
  yourElement.addEventListener('click', () => {
    // Perform actions based on the interaction
  });
</script>
```