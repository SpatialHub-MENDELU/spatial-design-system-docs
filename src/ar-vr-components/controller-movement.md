---
title: controller-movement
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    // await import("spatial-design-system/components/controllers.js");
    // await import("spatial-design-system/components/controllerMovement.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `controller-movement` component enables smooth locomotion in VR using controller thumbsticks, allowing users to navigate through virtual environments with intuitive dual-controller movement.

## Example

Below is an example of setting up controller movement in a basic scene. Test this demo by opening this page in a VR headset and clicking on the "VR" button.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
  <a-sky color="#ECECEC"></a-sky>
  <a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" color="#7BC8A4"></a-plane>
  
  <a-entity id="rig" position="0 1.6 0" controllers>
    <a-camera></a-camera>
    <a-entity controller-movement="
      mainHand: left;
      speed: 2;
      rotationSpeed: 60;
      mode: controller;
      smoothing: 0.1;
      deadzone: 0.2
    "></a-entity>
  </a-entity>
</template>

<template #code>

```js
import "spatial-design-system/components/controllers.js";
import "spatial-design-system/components/controllerMovement.js";
```

```html
<a-scene>
  <!-- Simple environment -->
  <a-sky color="#ECECEC"></a-sky>
  <a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" color="#7BC8A4"></a-plane>
  
  <!-- Camera rig with controllers and movement -->
  <a-entity id="rig" position="0 1.6 0" controllers>
    <a-camera></a-camera>
    <a-entity controller-movement="
      mainHand: left;
      speed: 2;
      rotationSpeed: 60;
      mode: controller;
      smoothing: 0.1;
      deadzone: 0.2
    "></a-entity>
  </a-entity>
</a-scene>
```

</template>

</ComponentExample>

## Props

| Property       | Type    | Default      | Description                                                 |
|----------------|---------|--------------|-------------------------------------------------------------|
| _mainHand_     | string  | "left"       | Controller used for movement ("left" or "right")            |
| _speed_        | number  | 2            | Movement speed in meters per second                         |
| _rotationSpeed_| number  | 60           | Rotation speed in degrees per second                        |
| _mode_         | string  | "controller" | Movement direction mode ("head" or "controller")            |
| _smoothing_    | number  | 0.1          | Movement smoothing factor (0-1, higher = more smoothing)    |
| _deadzone_     | number  | 0.2          | Thumbstick deadzone (0-1, ignores small stick movements)    |

## How It Works

1. The component uses a dual-controller approach for VR locomotion:
   - The main hand (typically left) controls forward/backward movement and strafing
   - The off hand (opposite of main hand) controls rotation
2. Movement is determined by thumbstick direction:
   - Forward/backward: Up/down on the main hand thumbstick
   - Strafing: Left/right on the main hand thumbstick
   - Rotation: Left/right on the off hand thumbstick
3. The movement direction can be based on either:
   - Head direction (where you're looking)
   - Controller direction (where the main controller is pointing)
4. Movement is applied to the camera rig entity, with smooth acceleration and deceleration

## Movement Controls

| Thumbstick        | Direction | Action                |
|-------------------|-----------|----------------------|
| Main Hand         | Up        | Move forward         |
| Main Hand         | Down      | Move backward        |
| Main Hand         | Left      | Strafe left          |
| Main Hand         | Right     | Strafe right         |
| Off Hand          | Left      | Rotate left          |
| Off Hand          | Right     | Rotate right         |

## Combining with Other Movement Options
For maximum accessibility, combine smooth locomotion with teleportation using the controller-teleport component:
```html
<a-entity id="rig" position="0 1.6 0" controllers>
  <a-camera></a-camera>
  <!-- Smooth movement with left hand -->
  <a-entity controller-movement="mainHand: left"></a-entity>
  <!-- Teleportation with right hand -->
  <a-entity controller-teleport="hand: right"></a-entity>
</a-entity>
```
This gives users options for both smooth locomotion and teleportation, accommodating different preferences and comfort levels. Smooth movement is often preferred for precision navigation, while teleportation can reduce motion sickness for some users.