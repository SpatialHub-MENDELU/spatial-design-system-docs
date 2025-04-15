---
title: Checkbox
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-checkbox");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

A checkbox is an essential user interface component that enables users to make binary choices, such as selecting or deselecting options. It is commonly used for tasks like toggling settings, selecting multiple items, or confirming agreements within an application.
## Example

Below is an example showcasing two checkbox components. The checkbox on the left is in its initial, unchecked state, while the one on the right displays a checked checkbox.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
  <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
            cursor="rayOrigin: mouse; fuse: false;">
  </a-entity>
  <a-ar-checkbox
      position="0 1.6 -3"
      size="extra-large"
  ></a-ar-checkbox>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-checkbox.js";
```

```html
<a-ar-checkbox
    position="-0.5 1.6 -3"
    size="extra-large"
></a-ar-checkbox>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the checkbox's visibility. When `true`, the checkbox is visible; when `false`, it is hidden. |
| _size_      | enum (small, medium, large, extra-large) | medium  | Sets the checkbox's size, adjusting padding, font size, and layout compactness accordingly.         |
| _position_  | number[]                    | 0 0 0   | Specifies the checkbox's position.                                                                  |
| _primary_   | string (blue, #fff)         | #00BA92 | Defines the primary color of the checkbox (affecting text, background, icon background).            |
| _value_      | boolean                      | false      | Specifies whether the checkbox is checked.                                   |
| _variant_   | string (light, dark)        | ""      | Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.      |
