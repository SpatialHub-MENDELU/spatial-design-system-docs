---
title: Divider
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-divider");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The Divider component is used to visually separate sections of content or layouts. It provides a clean, minimal way to organize information into distinct groups, helping improve readability and structure.

## Example

Below is an example of the divider component.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-ar-divider
    position="0 1.6 -1"
    vertical="false"
    opacity="1"
    length="medium"
    thickness="0.003"
    color="#ECECEC"
></a-ar-divider>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-divider.js";
```

```html
<a-ar-divider
    position="0 1.6 -1"
    vertical="false"
    opacity="1"
    length="medium"
    thickness="0.003"
    color="#ECECEC"
></a-ar-divider>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default  | Description                                                                                       |
|-------------|-----------------------------|----------|--------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true     | Controls whether the divider is visible. |
| _position_  | number[]                    | 0 0 0    | Sets the divider’s position in 3D space. |
| _opacity_   | number                      | 1        | Specifies the opacity of the component.  |
| _color_     | string (blue, #fff)         | #545454| Defines the color of the divider.        |
| _length_    | enum (small, medium, large) or number | medium  | Specifies the length of the divider. You can use one of the predefined sizes (`small`, `medium`, or `large`) or provide a custom numeric value. The default unit is meters.|
| _thickness_ | number | 0  | Specifies the thickness of the divider in meters. If set to 0, a default thickness is applied based on the current `length` value.|
| _vertical_  | boolean                     | false    | When set to  `true`, displays divider vertically.|