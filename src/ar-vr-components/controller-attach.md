---
title: controller-attach
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    // await import("spatial-design-system/components/controllers.js");
    // await import("spatial-design-system/components/controllerAttach.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `controller-attach` component attaches entities to VR controllers, allowing you to create controller-mounted UI panels, tools, or visual elements that follow the controller's movements and orientation in 3D space.

## Example

Below is an example of attaching UI panel to the right controller. Test this demo by opening this page in a VR headset and clicking on the "VR" button.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
  <a-entity id="rig" position="0 1.6 0" controllers>
    <a-camera></a-camera>
  </a-entity>
  
  <!-- UI panel attached to right controller -->
  <a-entity
    geometry="primitive: plane; width: 0.25; height: 0.15"
    material="color: #2196F3; opacity: 0.8"
    controller-attach="hand: right; offset: 0.15 0.05 -0.1; rotation: 0 -30 0;">
    <a-text value="Right Hand" align="center" position="0 0 0.001" scale="0.1 0.1 0.1" color="white"></a-text>
  </a-entity>
</template>

<template #code>

```js
import "spatial-design-system/components/controllers.js";
import "spatial-design-system/components/controllerAttach.js";
```

```html
<a-scene>
  <a-entity id="rig" position="0 1.6 0" controllers>
    <a-camera></a-camera>
  </a-entity>
  <!-- UI panel attached to right controller -->
  <a-entity
    geometry="primitive: plane; width: 0.25; height: 0.15"
    material="color: #2196F3; opacity: 0.8"
    controller-attach="hand: right; offset: 0.15 0.05 -0.1; rotation: 0 -30 0;">
    <a-text value="Right Hand" align="center" position="0 0 0.001" 
            scale="0.1 0.1 0.1" color="white"></a-text>
  </a-entity>
</a-scene>
```

</template>

</ComponentExample>

## Props

| Property    | Type    | Default    | Description                                            |
|-------------|---------|------------|--------------------------------------------------------|
| _hand_      | string  | "right"    | Which controller to attach to ("left" or "right")      |
| _offset_    | vec3    | "0 0 0"    | Position offset from the controller in meters          |
| _rotation_  | vec3    | "0 0 0"    | Rotation offset in degrees (x, y, z Euler angles)      |
| _faceCamera_| boolean | false      | Makes the attached object always face the camera       |
## Usage Tips

### Ensured visibility
For UI elements that need to be readable from any angle, combine with the [billboard](/ar-vr-components/billboard) component to make the attached UI always face the user:
```html
<a-entity
  geometry="primitive: plane; width: 0.25; height: 0.15"
  material="color: #2196F3; opacity: 0.8"
  controller-attach="hand: right; offset: 0.15 0.05 -0.1;"
  billboard
>
  <a-text value="Always Visible" align="center" position="0 0 0.001" scale="0.1 0.1 0.1"></a-text>
</a-entity>
```
