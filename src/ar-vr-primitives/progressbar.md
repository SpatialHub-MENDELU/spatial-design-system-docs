---
title: Progress bar
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-progressbar");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

Progress-bar component visually represents the progression of a task or process. It informs the user about occuring action and offers multiple variations.

## Example

Below is an example of the progress bar component.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-progressbar
        position="0 1.5 -3"
        value="60"
        textvisibility="true"
    ></a-ar-progressbar>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-progressbar.js";
```

```html
<a-ar-progressbar
    position="0 1.5 -3"
    value="60"
    textvisibility="true"
></a-ar-progressbar>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the progress bar's visibility. When `true`, the progress bar is visible; when `false`, it is hidden. |
| _position_  | number[]                    | 0 0 0   | Specifies the progress bar's position.                                                                  |
| _size_      | enum (small, medium, large) | medium  | Sets the progress bar's size, adjusting padding, font size, and layout compactness accordingly.         |
| _value_      | number                      | 100      | Represents the current progress as a percentage. This determines how much of the bar is filled.                                   |
| _textvisibility_      | boolean                      | false      | Controls whether the current progress percentage is displayed. If true, the value is shown (e.g., 60%).                                   |
| _textcolor_ | string                      | black   | Specifies the color of the progress bar's text.                                                         |
| _color_   | string (blue, #fff)         | #00BA92 | Defines the primary color of the progress bar, affecting elements such as text and background.          |
| _mode_   | string (light, dark)        | ""      | Specifies the color scheme of the progress bar, supporting either a `light` or `dark` theme.      |
| _state_   | string (success, warning, error, disabled, indicating)        | ""      | Indicates the current state of the component. This property has priority over other appearance-related properties to reflect important statuses such as errors or warnings.      |
| _rounded_   | boolean                     | false   | 	Specifies whether the progress bar has rounded edges.                                                    |
| _reversed_   | boolean                     | false   | 	When `true`, the progress direction is reversed (right-to-left mode).  |
