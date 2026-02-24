---
title: Alert
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-alert");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}
The Alert component is used to display feedback messages in the AR/VR environment. It communicates important information without interrupting the user’s spatial experience.

Alert can be styled using semantic states (success, warning, error, info) or customized manually through color and theme properties. It supports optional titles, icons, and dismiss functionality, making them suitable for both passive notifications and interactive feedback scenarios.

## Examples

### Basic Alert
This example demonstrates the default usage of the alert component. It displays a simple alert with a light theme and a content message.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-alert 
        position="0 1.6 -1.5"
        mode="light"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!" 
    ></a-ar-alert>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-alert.js";
```

```html
<a-ar-alert 
    position="0 1.6 -1.5"
    mode="light"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!" 
></a-ar-alert>
```

</template>

</ComponentExample>
<br>

### Closable Alert
This example shows an alert with a title, outlined style, and close button enabled. When _closable_ is set to true, a dismiss icon appears in the top-right corner, allowing the user to manually hide the alert. The _outlined_ prop switches the appearance from a solid background to a bordered style, making it visually lighter and less intrusive.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-alert 
        position="0 1.6 -1.5"
        title="Alert Title"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!" 
        closable="true"
        outlined="true"
    ></a-ar-alert>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-alert.js";
```

```html
<a-ar-alert 
    position="0 1.6 -1.5"
    title="Alert Title"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!" 
    closable="true"
    outlined="true"
></a-ar-alert>
```

</template>

</ComponentExample>
<br>

### Customized State
This example demonstrates how different states affect the alert’s visual styling. The _state_ prop automatically applies predefined colors and styling for specific contexts:
- error – indicates a critical problem
- warning – highlights a potential issue

When state is defined, it overrides manual color configuration (_color_, _mode_) to ensure visual consistency across the design system.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-alert 
        position="0 1.2 -1.5"
        title="Alert Title"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!" 
        state="error"
        outlined="true"
        closable="true"
    ></a-ar-alert>
        <a-ar-alert 
        position="0 1.9 -1.5"
        title="Alert Title"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!" 
        state="warning"
        outlined="true"
        closable="true"
    ></a-ar-alert>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-alert.js";
```

```html
<a-ar-alert 
    position="0 1.2 -1.5"
    title="Alert Title"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!" 
    state="error"
    outlined="true"
    closable="true"
></a-ar-alert>
    <a-ar-alert 
    position="0 1.9 -1.5"
    title="Alert Title"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!" 
    state="warning"
    outlined="true"
    closable="true"
></a-ar-alert>
```

</template>
</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the visibility of the alert. When `false`, the component is hidden. |
| _position_  | number[]                    | 0 0 0   | Specifies the alert's position.            |
| _opacity_   | number                      | 1       | Specifies the opacity of the component.    |
| _state_      | string (success, warning, error, info)        | ""      | Indicates the current state of the component by appling predefined styling. When set, it overrides other appearance-related properties (_color_, _mode_) to reflect important statuses such as `errors` or `warnings`. |
| _mode_      | string (light, dark)        | ""      | Specifies the color scheme of the alert, supporting either a `light` or `dark` theme. |
| _color_     | string (blue, #fff)       | #00BA92 | Defines the primary color of the alert, affecting elements such as text and background.   |
| _textcolor_ | string                      | black   | Specifies the color of the alert's text. If the contrast with the background is insufficient, the text color will __not__ be applied. |
| _title_     | string                      | ""      | Defines the title displayed at the top of the alert. |
| _content_   | string                      | ""      | Defines the main message content of the alert. |
| _prependicon_ | string                    | ""      | Defines the icon to be displayed within the alert. If set, the icon appears before the alert’s title. |
| _closable_  | string                      | ""      | When `true`, displays a close icon in the top-right corner that allows the alert to be dismissed. |
| _outlined_  | boolean                     | false   | When enabled, the alert is displayed with an outline instead of a solid background. |
