---
title: controller-attach
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

function waitForAframe(timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      if (typeof window !== "undefined" && window.AFRAME) return resolve(undefined);
      if (Date.now() - start > timeoutMs) return reject(new Error("AFRAME global not loaded"));
      setTimeout(check, 50);
    };
    check();
  });
}

onMounted(async () => {
  try {
    await waitForAframe();
    await import("spatial-design-system/components/controllerAttach.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `controller-attach` component attaches entities to VR controllers, allowing you to create controller-mounted UI panels, tools, or visual elements that follow the controller's movements and orientation in 3D space.

## Example

Below is an example of attaching a UI panel to the right controller. The preview below uses a stand-in controller so you can see the attachment on desktop; in VR the same code attaches to your real controller — open this page in a VR headset and click the "VR" button.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
  <!-- Stand-in for the right VR controller (desktop preview only) -->
  <a-entity
    id="rightHand"
    position="0.25 1.3 -0.8"
    rotation="0 0 0"
    animation__rotation="property: rotation; from: 0 0 0; to: 0 25 15; dir: alternate; loop: true; dur: 3000; easing: easeInOutSine"
    animation__position="property: position; from: 0.25 1.3 -0.8; to: 0.15 1.5 -0.4; dir: alternate; loop: true; dur: 3000; easing: easeInOutSine"
  >
    <a-box depth="0.06" height="0.05" width="0.09" color="#3a3a3a" position="0 0 0"></a-box>
    <a-cylinder radius="0.018" height="0.09" color="#2a2a2a" position="0 -0.06 0.03" rotation="-20 0 0"></a-cylinder>
  </a-entity>

  <!-- UI panel attached to right controller -->
  <a-entity
    geometry="primitive: plane; width: 0.25; height: 0.15"
    material="color: #2196F3; opacity: 0.8"
    controller-attach="hand: right; offset: 0.15 0.1 0; rotation: 0 -30 0;">
    <a-text value="Right Hand" align="center" position="0 0 0.001" scale="0.1 0.1 0.1" color="white"></a-text>
  </a-entity>

  <!-- Reference ground for spatial context -->
  <a-box position="0 0.9 -1" width="2" height="0.05" depth="1.2" src="../grid-light-1850w.png"></a-box>
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
    controller-attach="hand: right; offset: 0.15 0.1 0; rotation: 0 -30 0;">
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
