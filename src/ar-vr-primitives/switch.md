---
title: Switch
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

The switch component is an UI element designed to allow users to toggle between two states, such as on/off or enabled/disabled. Its visual and intuitive representation of state changes makes it well-suited for settings, preferences and simillar dual options.
## Example

Below is an example of the switch component.

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
<a-ar-switch
    position="0 1.6 -3"
    size="large"
    value="true"
    inset="true"
></a-ar-switch>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the switch's visibility. When `true`, the switch is visible; when `false`, it is hidden. |
| _size_      | enum (small, medium, large, extra-large) | medium  | Sets the switch's size, adjusting padding, font size, and layout compactness accordingly.|
| _position_  | number[]                    | 0 0 0   | Specifies the switch's position.                                                                  |
| _primary_   | string (blue, #fff)         | #00BA92 | Defines the primary color of the switch (affecting text, background, icon background).            |
| _value_     | boolean                     | false   | Indicates whether the switch is in the "on" state.                                   |
| _variant_   | string (light, dark)        | ""      | Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.      |
| _opacity_   | number   | 1       | Sets switch's opacity.|
| _inset_     | boolean   | false       | Controls the appearance of the switch. When set to `true`, the the thumb (toggle handle) is contained within the bar. When `false`, the thumb extends beyond the bar, creating a larger, overlapping effect.|
