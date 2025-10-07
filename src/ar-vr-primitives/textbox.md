---
title: Textbox
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-textbox");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

Textbox component is an interactive elements used to collect user input. It is commonly used in forms and search bars and it is designed for seamless interaction.

## Example

Below is an example of the textbox component.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity id="mouseRaycaster" raycaster="objects: .clickable"
          cursor="rayOrigin: mouse; fuse: false;">
</a-entity>
<a-ar-textbox
    position="0 1.6 -3"
    isactivated="true"
    label="Label"
    size="extra-large">
</a-ar-textbox>
</template>

<template #code>

```js
import 'spatial-design-system/primitives/ar-textbox.js';
```

```html
<a-ar-textbox
  position="0 1.6 -3"
  isactivated="true"
  label="Label"
  size="extra-large"
></a-ar-textbox>
```

</template>

</ComponentExample>

## Props

| Property            | Type                                     | Default   | Description                                                                                         |
| ------------------- | ---------------------------------------- | --------- | --------------------------------------------------------------------------------------------------- |
| _visible_           | boolean                                  | `true`    | Controls the textbox's visibility. When `true`, the textbox is visible; when `false`, it is hidden. |
| _size_              | enum (small, medium, large, extra-large) | `medium`  | Sets the textbox's size, adjusting padding, font size, and layout compactness accordingly.          |
| _position_          | number[]                                 | `0 0 0`   | Specifies the textbox's position.                                                                   |
| _primary_           | string (blue, #fff)                      | `#000000` | Defines the primary color of the textbox (affecting text, background, icon background).             |
| _variant_           | string (light, dark)                     | `""`      | Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.        |
| _isactivated_       | boolean                                  | `false`   | Specifies whether the textbox is activated.                                                         |
| _bordercolor_       | string                                   | `black`   | Specifies the color of the textbox's border.                                                        |
| _textcolor_         | string                                   | `black`   | Specifies the color of the textbox's text.                                                          |
| _label_             | string                                   | `""`      | Specifies the text of the textbox's label.                                                          |
| _useSystemKeyboard_ | boolean                                  | `false`   | Specifies whether to use the system keyboard.                                                       |
