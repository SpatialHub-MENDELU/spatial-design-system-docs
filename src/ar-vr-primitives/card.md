---
title: Card
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-card");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

Card component is a content container used to display information in a structured format. It supports titles, subtitles, body text, icons, and interactive buttons, making it ideal for UI panels and information callouts in spatial environments.

## Examples

### Basic Card
The first example shows a basic card with a title, subtitle, and content. It uses the standard color theme and includes a "Details" button.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-card 
        position="0 1.5 -1.5" 
        title="Team Meeting"
        subtitle="Today 14:00"
        content="Sprint planning session in Meeting Room B."
        buttons='[{"label": "Details", "action": "details"}]'
    ></a-ar-card>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-card.js";
```

```html
<a-ar-card 
    position="0 1.5 -1.5" 
    title="Team Meeting"
    subtitle="Today • 14:00"
    content="Sprint planning session in Meeting Room B."
    buttons='[{"label": "Details", "action": "details"}]'
></a-ar-card>
```

</template>

</ComponentExample>
<br>

### Customized Style
This example demonstrates the _outlined_ mode and the use of _icons_. The card uses a custom color. The component automatically calculates text contrast to ensure readability, by adjusting _textcolor_.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-card 
        position="0 1.5 -1.5" 
        title="Informations"
        subtitle="Important Notice"
        content="Please read the instructions carefully before proceeding." 
        buttons='[{"label": "cancel", "action": "cancel"}, {"label": "procede", "action": "procede"}]'
        outlined="true"
        prependicon="/public/info.png"
        color="#2196F3"
        textcolor="white"
    ></a-ar-card>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-card.js";
```

```html
<a-ar-card 
    position="0 1.5 -1.5" 
    title="Informations"
    subtitle="Important Notice"
    content="Please read the instructions carefully before proceeding." 
    buttons='[{"label": "cancel", "action": "cancel"}, {"label": "procede", "action": "procede"}]'
    outlined="true"
    prependicon="/info.png"
    color="#2196F3"
    textcolor="white"
></a-ar-card>
```

</template>
</ComponentExample>
<br>

### Card with Image
The final example showcases the _image_ property and _dark_ mode. When an image is provided, it is applied as a texture to the card background.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-card 
        position="0 1.5 -1.5" 
        title="Demo Card"
        subtitle="Example Subtitle"
        content="This is an example of an AR Card component." 
        buttons='[{"label": "cancel", "action": "cancel"}, {"label": "continue", "action": "continue"}]'
        mode="dark"
        image="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg"
    ></a-ar-card>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-card.js";
```

```html
<a-ar-card 
    position="0 1.5 -1.5" 
    title="Demo Card"
    subtitle="Example Subtitle"
    content="This is an example of an AR Card component." 
    buttons='[{"label": "cancel", "action": "cancel"}, {"label": "continue", "action": "continue"}]'
    mode="dark"
    image="https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg"
></a-ar-card>
```

</template>
</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the card's visibility. When `true`, the card is visible; when `false`, it is hidden. |
| _position_  | number[]                    | 0 0 0   | Specifies the card's position.             |
| _opacity_   | number                      | 1       | Specifies the opacity of the component.    |
| _mode_      | string (light, dark)        | ""      | Specifies the color scheme of the card, supporting either a `light` or `dark` theme. |
| _color_     | string (blue, #fff)       | #00BA92 | Defines the primary color of the card, affecting elements such as text and background.   |
| _textcolor_ | string                      | black   | Specifies the color of the card's text. If the contrast with the background is insufficient, the text color will __not__ be applied.                                              |
| _title_     | string                     | "" | Sets the card's title text.            |
| _subtitle_  | string                     | ""   | Sets the card's subtitle text.         |
| _content_   | string                     | ""     | Sets the card's main text. |
| _prependicon_ | string                   | ""       | Defines the icon to be displayed within the card. If set, the icon appears before the card’s title. |
| _appendicon_  | string                   | ""       | Defines the icon to be displayed in upper right corner of the card.     |
| _buttons_   | array                      | [{ "label": "Close", "action": "close" }]  | Defines the action buttons displayed at the bottom of the card. Supports up to two buttons. Buttons emit a `cardAction` event containing their action string. | 
| _outlined_  | boolean                    | false    | When enabled, the card is displayed with an outline instead of a solid background.  |
| _image_     | string                     | ""       | Applies a specific background image to the card.     |
