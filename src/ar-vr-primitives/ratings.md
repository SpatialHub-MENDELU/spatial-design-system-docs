---
title: Ratings
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
    try {
        await import("spatial-design-system/primitives/ar-ratings");
        renderScene.value = true;
    } catch (e) {
        console.error(e);
    }
});
</script>

# {{ $frontmatter.title }}
The ratings component allows users to provide or display a rating using a row of stars. It is commonly used for evaluating products, services, or content.

The component supports both **interactive ratings**, where users can select a value, and **read-only ratings**, where the rating is only displayed.

## Examples

### Basic Ratings
The first example demonstrates a basic interactive ratings component with the default configuration. The stars are interactive, allowing users to choose a rating directly within the component.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity id="mouseRaycaster" raycaster="objects: .clickable"
            cursor="rayOrigin: mouse; fuse: false;">
</a-entity>
<a-ar-ratings 
    position="0 1.6 -1"
    color="#ECECEC"
></a-ar-ratings>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-ratings.js";
```

```html
<a-ar-ratings 
    position="0 1.6 -1"
    color="#ECECEC"
></a-ar-ratings>
```

</template>

</ComponentExample>

<br>

### Readonly Ratings
The second example demonstrates a `read-only` ratings component.
The rating is displayed but cannot be changed by the user. This is useful for showing previously submitted ratings or aggregated scores. Custom `colors` are also applied to highlight the selected stars.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-ratings 
        position="0 1.6 -1" 
        activecolor="#FFD700" 
        color="#CCCCCC"
        readonly="true"
    ></a-ar-ratings>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-ratings.js";
```

```html
<a-ar-ratings 
    position="0 1.6 -1" 
    activecolor="#FFD700" 
    color="#CCCCCC"
    readonly="true"
></a-ar-ratings>
```

</template>

</ComponentExample>

<br>

### Custom Size & Length
This example demonstrates customization of the ratings component, including adjusting the `number of rating items`, modifying the star `size`, and setting an initial rating `value`. The `clearable` option is disabled, so clicking the currently selected rating will not reset the value, unlike the previous examples.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
                cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-ratings 
        position="0 1.6 -1" 
        activecolor="#FFD700" 
        color="#CCCCCC"
        clearable="false"
        size="small"
        length="10"
        value="7"
    ></a-ar-ratings>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-ratings.js";
```

```html
<a-ar-ratings 
    position="0 1.6 -1" 
    activecolor="#FFD700" 
    color="#CCCCCC"
    clearable="false"
    size="small"
    length="10"
    value="7"
></a-ar-ratings>
```

</template>
</ComponentExample>
<br>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Determines whether the ratings component is visible in the scene. |
| _position_  | number[]                    | 0 0 0   | Defines the 3D position of the ratings component in the format `[x, y, z]`. |
| _opacity_   | number                      | 1       | Controls the transparency of the ratings component (0 = fully transparent, 1 = fully visible). |
| _color_     | string                      | 1       | Defines the color of **inactive (unselected)** stars. |
| _activecolor_ | string                    | 1       | Defines the color of __active (selected)__ stars. |
| _size_      | enum (small, medium, large) | medium  | Specifies the size of the rating stars. |
| _length_    | number                      | 5       | Specifies the total number of stars displayed in the ratings component. |
| _value_     | number                      | 3       | Specifies the currently selected rating value. |
| _readonly_  | boolean                     | false   | If enabled, the rating cannot be changed by the user and is displayed for informational purposes only. |
| _clearable_ | boolean                     | false   | Allows the user to clear the selected rating by clicking the currently selected value again. |


