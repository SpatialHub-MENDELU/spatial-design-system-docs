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
<a-entity id="mouseRaycaster" raycaster="objects: .clickable"
          cursor="rayOrigin: mouse; fuse: false;">
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
import "spatial-design-system/primitives/ar-switch.js";
```

```html
<a-entity id="mouseRaycaster" raycaster="objects: .clickable"
        cursor="rayOrigin: mouse; fuse: false;">
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
