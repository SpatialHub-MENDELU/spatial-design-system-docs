---
title: auto-vr
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    // await import("spatial-design-system/components/autoVr.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The `auto-vr` component simplifies VR mode entry by automatically detecting VR capability and providing options to enter VR mode without user interaction. It also creates a customizable VR button and handles VR session state management.

## Example

Below is an example of using the auto-vr component to automatically enter VR mode when available:

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
  <a-scene auto-vr="autoEnter: true; createButton: true; buttonText: Enter VR">
  </a-scene>
</template>

<template #code>

```js
import "spatial-design-system/components/autoVr.js";
```
```html
<!-- Set up controllers directly on the scene -->
<a-scene auto-vr="autoEnter: true">
    <a-camera></a-camera>
</a-scene>

```

</template>

</ComponentExample>

## Props

| Property      | Type    | Default    | Description                                                 |
|---------------|---------|------------|-------------------------------------------------------------|
| _autoEnter_   | boolean | true       | Whether to automatically enter VR mode when available       |
| _createButton_| boolean | true       | Whether to create a custom VR button                        |
| _buttonText_  | string  | "Enter VR" | Text displayed on the VR button                             |
| _pollInterval_| number  | 2000       | Polling interval in milliseconds to check for VR support    |
| _maxAttempts_ | number  | 10         | Maximum number of attempts to enter VR mode                 |

## How It Works

1. The component detects VR capabilities using both WebXR and older WebVR APIs
2. If `autoEnter` is enabled, it attempts to enter VR mode when the scene loads
3. If VR is not initially available, it polls at regular intervals up to `maxAttempts`
4. If `createButton` is enabled, it creates a floating VR button that users can click
5. The component handles VR display connection/disconnection events
6. When exiting VR mode, the button text changes back to the specified `buttonText`

## Events

The component works with standard A-Frame VR events that you can listen for:

```javascript
// Listen for VR mode entry
document.querySelector('a-scene').addEventListener('enter-vr', ()=>{
    // Perform actions based on the interaction
});

// Listen for VR mode exit
document.querySelector('a-scene').addEventListener('exit-vr', ()=>{
    // Perform actions based on the interaction
});
```
