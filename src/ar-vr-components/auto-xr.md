---
title: auto-xr
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    // await import("spatial-design-system/components/autoXr.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ \$frontmatter.title }}

The `auto-xr` component streamlines entering immersive WebXR sessions—whether augmented reality (AR) or virtual reality (VR)—by automatically detecting the best‑supported mode and switching the scene accordingly. It can also generate a fully customizable floating button for manual entry/exit and manages the XR session life‑cycle for you.

## Example

Open the demo below on a WebXR‑capable device (e.g. Meta Quest Pro, iPhone + XRViewer). The component will decide whether to start in AR, VR, or stay inline.

<ComponentExample :fixed="true" :hideOutput="true">

<template #code>

```js
import 'spatial-design-system/components/autoXr.js';
```

```html
<a-scene auto-xr="autoEnter: true; sessionMode: auto">
  <!-- Here goes the scene content -->
</a-scene>
```

</template>

</ComponentExample>

## Props

| Property       | Type    | Default    | Description                                                                     |
| -------------- | ------- | ---------- | ------------------------------------------------------------------------------- |
| _autoEnter_    | boolean | true       | Automatically enter XR as soon as a session is available                        |
| _createButton_ | boolean | true       | Create a floating button that lets users manually toggle XR                     |
| _buttonText_   | string  | "Enter XR" | Text displayed on the button while no XR session is active                      |
| _sessionMode_  | string  | "auto"     | Desired mode: `auto`, `ar`, `vr`, or `inline`                                   |
| _pollInterval_ | number  | 2000       | Interval, in milliseconds, between polling attempts when looking for XR support |
| _maxAttempts_  | number  | 10         | Maximum number of polling attempts before giving up                             |

## How It Works

1. The component checks for AR and VR support using both the modern WebXR API and the legacy WebVR fallback.
2. If `autoEnter` is enabled, it tries to start the chosen `sessionMode` as soon as the scene is loaded.
3. If XR is not immediately available, it polls every `pollInterval` ms—up to `maxAttempts` times—until support is detected.
4. If `createButton` is true, a floating button is injected into the page so the user can manually enter or exit XR at any time.
5. The component listens for system‑level display connection and disconnection events to update its internal state.
6. When the session ends, the button label reverts to the original `buttonText`.

## Events

The component emits its own convenience events and also hooks into A‑Frame’s standard ones:

```javascript
const scene = document.querySelector('a-scene');

// Custom event – XR session successfully started
scene.addEventListener('xr-entered', (e) => {
  console.log('XR started in', e.detail.mode);
  // e.detail.session is the XRSession object
});

// Custom event – XR session ended
scene.addEventListener('xr-exited', (e) => {
  console.log('XR exited, mode was', e.detail.mode);
});

// Standard A-Frame events (AR/VR)
scene.addEventListener('enter-vr', () => {
  // Handle entering AR/VR
});

scene.addEventListener('exit-vr', () => {
  // Handle exiting AR/VR
});
```

## Notes

- `sessionMode: inline` guarantees the scene will never request an XR session; it stays in traditional 2D rendering.
- Forcing `sessionMode: vr` or `ar` will try that mode first. If the device does not support the requested mode, the component silently falls back to inline and shows an information banner.
- Tested on Meta Quest Pro, iPhone (XRViewer), and desktop browsers.
