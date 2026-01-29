---
title: Chip
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-chip");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The chip component presents information in a compact, visually distinct format. It can display text, icons, or both and supports various styles, including outlined, elevated, and text-only appearances.
## Example

### Basic Chip

The following example demonstrates a simple, _outlined_ chip with default label.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-chip
      position="0 1.5 -3"
      size="medium"
      outlined="true"
      color="#03FCC6"
    ></a-ar-chip>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-chip.js";
```

```html
<a-ar-chip
  position="0 1.5 -3"
  size="medium"
  outlined="true"
  color="#03FCC6"
></a-ar-chip>
```

</template>

</ComponentExample>

</br>

### Chip with Icon

This example demonstrates a chip with an icon. By default, if the _iconpos_ property is not specified, the icon is positioned to the left of the label. Here, the chip uses the _elevated_ style and a custom color.


<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-chip
      position="0 1.5 -3"
      size="medium"
      color="#03FCC6"
      elevated="true"
      label="Save"
      icon="/content-save.png"
    ></a-ar-chip>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-chip.js";
```

```html
<a-ar-chip
  position="0 1.5 -3"
  size="medium"
  color="#03FCC6"
  elevated="true"
  label="Save"
  icon="/content-save.png"
></a-ar-chip>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|--------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the chip's visibility.           |
| _position_  | number[]                    | 0 0 0   | Specifies the chip's position.            |
| _size_      | enum (small, medium, large, extra-large) | medium  | Specisies the size of the component.|
| _opacity_   | number                      | 1       | Specifies the opacity of the component.   |
| _color_     | string (blue, #fff)         | #00BA92 | Defines the primary color of the chip, affecting elements such as text and background.|
| _mode_      | string (light, dark)        | ""      | Specifies the color scheme of the chip, supporting either a `light` or `dark` mode.|
| _label_     | string                      | "Chip"  | Sets the chip's label text.               |
| _textcolor_ | string                      | black   | Specifies the color of the chip's text. If the contrast with the background is insufficient, the text color will __not__ be applied.   |
| _icon_      | string                      | ""      | Defines the icon to be displayed within the chip. If set, the icon appears alongside the label, with its position controlled by the ***iconpos*** property.|
| _iconpos_   | string (left, right)        | left    | Determines the position of the icon relative to the text. `"left"` places the icon before the text, while `"right"` places it after the text.|
| _rounded_   | boolean                     | true    | Determines whether the chip has rounded edges.|
| _outlined_  | boolean                     | false   | When enabled, the chip is displayed with an outline instead of a solid background.|                               
| _elevated_  | boolean                     | false   | Elevates chip with a shadow.           |
| _textonly_  | boolean                     | false   | Removes the background and shadow, displaying the chip as plain text.|                               

