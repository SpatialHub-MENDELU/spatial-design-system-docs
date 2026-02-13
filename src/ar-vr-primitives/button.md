---
title: Button
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-button");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The button represents the foundational HTML button, enhanced with a cohesive design theme and additional customizable options.
## Example

Below is an example of the button component.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-button
        position="0 1.6 -1"
        content="Button"
        color="#03FCC6"
        textcolor="white"
        size="medium"
    ></a-ar-button>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-button.js";
```

```html
<a-ar-button
    position="0 1.6 -1"
    content="Button"
    color="#03FCC6"
    textcolor="white"
    size="medium"
></a-ar-button>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Determines whether the button is rendered. If `false`, the button is hidden from the interface.|
| _position_  | number[]                    | 0 0 0   | Defines the button’s position in 3D space as an array of coordinates.           | 
| _size_      | enum (small, medium, large, extra-large) | medium  | Controls the overall button size, including padding, font size, and layout density. | 
| _opacity_   | number                      | 1       | Specifies the button's opacity. |      
| _color_     | string (blue, #fff)       | #00BA92 | Defines the primary button color, affecting the background, text, and icon styling. |
| _mode_      | string (light, dark)        | ""      | Applies a light or dark visual theme to the button for consistent appearance within different UI themes.  |
| _content_   | string                      | ""      | Specifies the label text displayed inside the button (e.g., “Open dialog”, “Close”). |
| _icon_      | string                      | ""      | Defines the icon displayed within the button. |
| _iconpos_   | string(left, right)         | "left"  | Determines whether the icon is displayed to the left or right of the button text. |
| _textcolor_ | string                      | black   | Sets the color of the button's text. If the contrast with the background is insufficient, the text color will __not__ be applied. |
| _textonly_  | boolean                     | false   | When set to `true`, it renders the button as text-only, removing the background. |  
| _uppercase_ | boolean                     | false   | Displays the button label in uppercase letters when enabled. |
| _elevated_  | boolean                     | true    | Adds a shadow effect to create a raised, three-dimensional appearance. |
| _rounded_   | boolean                     | false   | Applies rounded corners to the button. |
| _roundedsides_ | string(full, left, right)| "full"  | Defines which sides of the button are `rounded` when rounded is enabled (full, left, or right). |
| _tile_      | boolean                     | false   | Removes rounded styling and renders the button with square edges. |                             
| _outlined_  | boolean                     | false   | When `true`, displays the button with an outline. |
