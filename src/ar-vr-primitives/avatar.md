---
title: Avatar
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-avatar");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

The Avatar component displays an image, icon, or text in a flexible, scalable container. It is designed to easily integrate with other components, making it ideal for profile pictures, initials, or symbolic icons.

## Example

### Basic Avatar

This example demonstrates the basic usage of the Avatar component, displaying a custom background color and a single initial.
Although the default text color of the avatar is black, it is automatically changed to white in this case to ensure sufficient contrast against the selected background color. This guarantees that the text remains readable without requiring manual adjustment.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-avatar
        position="0 1.5 -1"
        size="medium"
        color="#018A6C"
        initial="A"
    ></a-ar-avatar>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-avatar.js";
```

```html
<a-ar-avatar
    position="0 1.5 -1"
    size="medium"
    color="#018A6C"
    initial="A"
></a-ar-avatar>
```

</template>

</ComponentExample>

</br>

### Avatar with Icon

This example shows the Avatar component displaying an icon. Even though the _initial_ property is set, the _icon_ is rendered instead because it has a higher display priority. If the _image_ property were also provided, the image would take precedence and be displayed instead of both the icon and the initial.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-avatar
        position="0 1.5 -1"
        size="medium"
        color="#03FCC6"
        initial="B"
        icon="/settings.png"
    ></a-ar-avatar>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-avatar.js";
```

```html
<a-ar-avatar
    position="0 1.5 -1"
    size="medium"
    color="#03FCC6"
    initial="B"
    icon="/settings.png"
></a-ar-avatar>
```

</template>

</ComponentExample>

</br>

### Tile Shape Avatar

This example demonstrates the usage of the _tile_ property, which allows the avatar to be displayed as a square rather than the default circular shape.
The first avatar uses only the tile property, producing a fully square appearance without any corner rounding. The second avatar additionally uses the _rounded_ property with a medium (`md`) value, resulting in a tile shape with rounded corners. 

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-avatar
        position="0 1.7 -1"
        size="small"
        initial="SP"
        tile="true"
    ></a-ar-avatar>
    <a-ar-avatar
        position="0 1.4 -1"
        size="small"
        initial="SP"
        tile="true"
        rounded="md"
    ></a-ar-avatar>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-avatar.js";
```

```html
<a-ar-avatar
    position="0 1.7 -1"
    size="small"
    initial="SP"
    tile="true"
></a-ar-avatar>
<a-ar-avatar
    position="0 1.4 -1"
    size="small"
    initial="SP"
    tile="true"
    rounded="md"
></a-ar-avatar>
```

</template>

</ComponentExample>


## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls whether the avatar is visible. |
| _position_  | number[]                    | 0 0 0   | Sets the avatar’s position in 3D space. |
| _size_      | enum (small, medium, large) | medium  | Specifies the size of the component.    |
| _opacity_   | number                      | 1       | Specifies the opacity of the component. |
| _color_     | string (blue, #fff)         | #00BA92 | Defines the background color of the avatar.|
| _textcolor_ | string                      | black   | Specifies the color of the text displayed within the avatar. If the contrast with the background is insufficient, the text color will __not__ be applied.|
| _text_      | string                      | ""      | Specifies the text to be displayed inside the avatar.|
| _icon_      | string                      | ""      | Specifies the icon to be displayed inside the avatar.|
| _image_     | string                      | ""      | Specifies the image to be displayed inside the avatar.|
| _tile_      | boolean                     | false   | If `true`, removes the circular shape and makes the avatar square. Can be used with the `rounded` property for custom border radius.|
| _rounded_   | enum (sm, md, lg)           | ""      | Applies rounded corners to the avatar. Uses predefined sizes (`sm`, `md`, `lg`)|
