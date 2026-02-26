---
title: Interactivity
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-switch");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

This section explains how to enable interactivity for components in the Spatial Design System. Most UI elements, such as buttons, switches, and text fields, should be interactive and respond to user actions with animations and visual feedback. Below, you will find the necessary setup and an explanation of how interaction works in the AR/VR environment.

## Enabling interactivity

To enable interactivity, a mechanism must be set up to detect user interactions. This is achieved using a raycaster and a cursor. The following code snippet enables this functionality:

```html
<a-entity
  id="mouseRaycaster"
  raycaster="objects: .clickable"
  cursor="rayOrigin: mouse; fuse: false;"
>
</a-entity>
```

### Explanation

- `<a-entity id="mouseRaycaster">`— Defines an entity in the scene that will handle interaction.
- `raycaster="objects: .clickable"` — Activates a raycasting system that continuously checks for interactions with objects tagged as interactive.
- `cursor="rayOrigin: mouse; fuse: false;"` — Adds a cursor that follows the mouse. The `fuse: false` setting means interactions will only happen on click rather than after a delay.

This setup ensures that only components designed for interaction (those with assigned animations or behaviors) will respond to user actions. If an object has no defined animations or interaction logic, it will remain inactive, preventing unintended behavior.

## Example: Interactive Switch

Once interactivity is set up, you can use predefined components that include animations and interactions. Here’s an example of an interactive switch:

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity id="mouseRaycaster" raycaster="objects: .clickable"
            cursor="rayOrigin: mouse; fuse: false;">
</a-entity>
<a-ar-switch
        position="0 1.6 -3"
        size="large"
        value="true"
        inset="true"
    ></a-ar-switch>
</template>

<template #code>

```js
import 'spatial-design-system/primitives/ar-switch.js';
```

```html
<a-entity
  id="mouseRaycaster"
  raycaster="objects: .clickable"
  cursor="rayOrigin: mouse; fuse: false;"
>
</a-entity>
<a-ar-switch
  position="0 1.6 -3"
  size="large"
  value="true"
  inset="true"
></a-ar-switch>
```

</template>

</ComponentExample>

By default, this switch will respond to user clicks, triggering animations and changes in state to create a smooth and interactive experience.

In the next section, **Primitives**, you will find more details on using interactive elements within your projects.

## Enabling interactivity using hands

You can interact with objects using hand gestures. This section explains how to properly set up the environment to enable gestures such as `pinch` for stretching or moving objects, and `finger touch` for pressing primitives with your hand.

Since these components are made for AR/VR apps, the `autoXr` component provides the option to set the app to the desired mode. Additionally, you must insert an entity with the `rig` ID and assign the `hands` component to it. Without this initial setup, hand-based interactions will not work.

Once the basic setup is complete, you can insert objects into the scene according to your needs and assign components such as `finger-touch` (which emits `click` events), `stretchable` (which emits `stretch-*` events), or `hands-hoverable` (which provides a hovering effect and emits `hover-*` events). If you want to grab and drop objects, you can use the `grabbable` component, which is provided by A-Frame and has a different API than the other components.

<ComponentExample :fixed="true" :hideOutput="true">
<template #code>

```js
import 'spatial-design-system/components/autoXr.js';
import 'spatial-design-system/components/ar/hands.js';
import 'spatial-design-system/components/hands-hoverable.js';
import 'spatial-design-system/components/stretchable.js';
import 'spatial-design-system/components/finger-touch.js';
```

```html
<a-scene auto-xr>
  <a-entity id="rig" hands></a-entity>
  <!-- Objects to interact with -->

  <!-- Applying interactive components to basic box -->
  <a-box
    position="0.5 1.2 -0.8"
    depth="0.5"
    height="0.5"
    width="0.5"
    opacity="0.5"
    grabbable
    stretchable="mode: scale"
    hands-hoverable
  >
  </a-box>

  <!-- Applying finger-touch to button -->
  <a-ar-button
    id="submitButton"
    position="0 1.2 -0.8"
    size="small"
    content="Submit"
    opacity="0.5"
    finger-touch
  >
  </a-ar-button>
</a-scene>
```

</template>
</ComponentExample>

## Enabling interactivity on mobile devices

To enable interaction on mobile devices, you must apply the `touch-raycaster` component to the scene element. This allows you to press buttons by touching elements on the screen.

<ComponentExample :fixed="true" :hideOutput="true">
<template #code>

```js
import 'spatial-design-system/components/autoXr.js';
import 'spatial-design-system/components/ar/touch-raycaster.js';
import 'spatial-design-system/primitives/ar-button.js';
```

```html
<a-scene auto-xr touch-raycaster>
  <!-- This button will be clickable by touch gestures -->
  <a-ar-button position="0 1.5 -1" content="Button"></a-ar-button>
</a-scene>
```

</template>
</ComponentExample>
