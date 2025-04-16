---
title: controllers
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    // await import("spatial-design-system/components/controllers.js");
    // await import("spatial-design-system/components/vrInteractive.js");

    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `controllers` component provides a complete system for VR controller interaction in A-Frame scenes. It automatically creates and manages left and right hand controllers with raycasters, visual cursors, and event handling for all controller buttons.

## Example

Below is an example of adding controllers to a scene. The controllers will automatically appear when using a compatible VR headset with controllers.

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
import "spatial-design-system/components/controllers.js";
const scene = document.createElement("a-scene");

// Either set up controllers directly on the scene
scene.setAttribute("controllers", {
  leftColor: "#FF0000",
  rightColor: "#018A6C"
})
```

```html
<a-scene>
  <!-- Or add them to a rig entity -->
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
</a-scene>
```
</template>

</ComponentExample>

## Props

| Property        | Type     | Default   | Description                                                   |
|-----------------|----------|-----------|---------------------------------------------------------------|
| _leftEnabled_   | boolean  | true      | Whether to enable the left controller                         |
| _rightEnabled_  | boolean  | true      | Whether to enable the right controller                        |
| _leftColor_     | color    | #cfc7c6   | Color of the left controller ray and cursor                   |
| _rightColor_    | color    | #cfc7c6   | Color of the right controller ray and cursor                  |
| _cursorSize_    | number   | 0.01      | Size of the cursor sphere at the end of the ray (in meters)   |
| _raycastLength_ | number   | 10        | Maximum length of the controller raycast (in meters)          |

## Controller Events

The component forwards controller button events to intersected objects. Any object with class "interactive" or "clickable" can receive these events:

| Event        | Description                                 |
|--------------|---------------------------------------------|
| _triggerdown_| Fired when trigger button is pressed        |
| _triggerup_  | Fired when trigger button is released       |
| _gripdown_   | Fired when grip button is pressed           |
| _gripup_     | Fired when grip button is released          |
| _abuttondown_| Fired when A button is pressed (right hand) |
| _abuttonup_  | Fired when A button is released             |
| _bbuttondown_| Fired when B button is pressed (right hand) |
| _bbuttonup_  | Fired when B button is released             |
| _xbuttondown_| Fired when X button is pressed (left hand)  |
| _xbuttonup_  | Fired when X button is released             |
| _ybuttondown_| Fired when Y button is pressed (left hand)  |
| _ybuttonup_  | Fired when Y button is released             |

## Usage Tips

### Making Objects Interactive

For advanced interactivity with visual feedback and custom event handling, consider using the [vr-interactive](/ar-vr-components/vr-interactive) component:

```html
<!-- Basic vr-interactive usage -->
<a-entity 
  geometry="primitive: box" 
  material="color: blue"
  vr-interactive
></a-entity>

<!-- Customized vr-interactive with specific button handling -->
<a-entity
  geometry="primitive: sphere"
  material="color: green"
  vr-interactive="
    enabledButtons: trigger, grip;
    highlightColor: #FFFF00;
    scaleOnClick: 0.8;
  "
></a-entity>
```

For more basic event handling, you can use A-Frame's event system:
```html
<a-entity id="myObject" class="interactive" 
          geometry="primitive: box" 
          material="color: blue"
          event-set__triggerdown="_event: triggerdown; material.color: yellow"
          event-set__triggerup="_event: triggerup; material.color: blue">
</a-entity>
```