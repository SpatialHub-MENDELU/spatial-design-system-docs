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
    <a-ar-button
        position="0 1.5 -3"
        content="Button"
        primary="#018A6C"
        textcolor="white"
        size="large"
    ></a-ar-button>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-button.js";
```

```html
<a-ar-button
    position="0 1.5 -3"
    content="Button"
    primary="#018A6C"
    textcolor="white"
    size="large"
></a-ar-button>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the button's visibility. When `true`, the button is visible; when `false`, it is hidden. |
| _size_      | enum (small, medium, large) | medium  | Sets the button's size, adjusting padding, font size, and layout compactness accordingly.         |
| _position_  | number[]                    | 0 0 0   | Specifies the button's position.                                                                  |
| _primary_   | string (blue, #fff)         | #00BA92 | Defines the primary color of the button (affecting text, background, icon background).            |
| _text_      | string                      | ""      | Sets the button's label text, such as "Open dialog" or "Close".                                   |
| _textcolor_ | string                      | black   | Specifies the color of the button's text.                                                         |
| _uppercase_ | boolean                     | false   | When `true`, displays the button text in uppercase letters.                                       |
| _rounded_   | boolean                     | false   | When `true`, gives the button rounded corners.                                                    |
| _textonly_  | boolean                     | false   | When `true`, renders the button as a text-only button with no background.                         |                               
| _outline_   | boolean                     | false   | When `true`, displays the button with an outline.                                                 |
| _variant_   | string (light, dark)        | ""      | Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.      |
