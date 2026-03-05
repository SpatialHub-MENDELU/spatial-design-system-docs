---
title: Carousel
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
    if (typeof window !== 'undefined') {
    try {
        await import("spatial-design-system/primitives/ar-carousel");
        renderScene.value = true;
    } catch (e) {
    console.error(e);
    }
    }
});
</script>

# {{ $frontmatter.title }}
The Carousel component is an interactive AR container for displaying a sequence of images in 3D space. It allows users to navigate between slides using arrows or fully customizable navigation buttons.

## Examples

### Basic Carousel
The first example demonstrates the simplest setup of the carousel. The component uses default width, height, and navigation arrows.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity id="mouseRaycaster" raycaster="objects: .clickable"
            cursor="rayOrigin: mouse; fuse: false;">
</a-entity>
<a-ar-carousel
    position="0 1.6 -1"
    images="/first-slide.jpg, /second-slide.jpg, /third-slide.jpg"
></a-ar-carousel>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-carousel.js";
```

```html
<a-ar-carousel
    position="0 1.6 -1"
    images="/first-slide.jpg, /second-slide.jpg, /third-slide.jpg"
></a-ar-carousel>
```

</template>

</ComponentExample>

<br>

### Customized Sizing
The second example demonstrates how to control the physical size of the carousel in the AR scene. By modifying the `width` and `height` properties, you can scale the component to better fit your layout.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
                cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-assets>
        <img id="first" src="https://images.unsplash.com/photo-1772306105684-4ec41e099a47?w=600&auto=format&fit=crop&q=60">
        <img id="second" src="https://images.unsplash.com/photo-1771512200461-fcea2f15aa5c?w=600&auto=format&fit=crop&q=60">
        <img id="third" src="https://images.unsplash.com/photo-1772306105241-fc51849ab40d?w=600&auto=format&fit=crop&q=60">
    </a-assets>
    <a-ar-carousel
        position="0 1.6 -1"
        width="1.5"
        height="1"
        images="#first, #second, #third"
    ></a-ar-carousel>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-carousel.js";
```

```html
<a-assets>
    <img id="first" src="https://images.unsplash.com/photo-1772306105684-4ec41e099a47?w=600&auto=format&fit=crop&q=60">
    <img id="second" src="https://images.unsplash.com/photo-1771512200461-fcea2f15aa5c?w=600&auto=format&fit=crop&q=60">
    <img id="third" src="https://images.unsplash.com/photo-1772306105241-fc51849ab40d?w=600&auto=format&fit=crop&q=60">
</a-assets>
<a-ar-carousel
    position="0 1.6 -1"
    width="1.5"
    height="1"
    images="#first, #second, #third"
></a-ar-carousel>
```
::: tip Note
Since this example uses asset IDs, the `images` property can be defined either as a simple comma-separated list or as a JSON array.
:::

</template>

</ComponentExample>

<br>

### Customized Buttons
This example shows how to replace the default arrow navigation with fully customizable buttons. By enabling `custombuttons` the carousel uses the configuration provided in the `previous` and `next` properties.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
                cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-carousel 
        position="0 1.6 -1" 
        width="1.5"
        height="1"
        images="/first-slide.jpg, /second-slide.jpg, /third-slide.jpg"
        custombuttons="true"
        previous='{"label": "Back", "color": "#e65b5b"}'
        next='{"label": "Next", "color": "#03FCC6"}'
    ></a-ar-carousel>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-carousel.js";
```

```html
<a-ar-carousel 
    position="0 1.6 -3" 
    width="1.5"
    height="1"
    images="/first-slide.jpg, /second-slide.jpg, /third-slide.jpg"
    custombuttons="true"
    previous='{"label": "Back", "color": "#e65b5b"}'
    next='{"label": "Next", "color": "#03FCC6"}'
></a-ar-carousel>
```

</template>
</ComponentExample>
<br>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Determines whether the carousel is visible in the scene. |
| _position_  | number[]                    | 0 0 0   | Defines the 3D position of the carousel in the format `[x, y, z]`. |
| _width_     | number                      | 1       | Defines the horizontal size of the carousel in __meters__ within the 3D scene. This value determines how wide each slide appears in real-world scale. |
| _height_    | number                      | 1       | Defines the vertical size of the carousel in __meters__ within the 3D scene. This controls how tall each slide appears. Adjust this value to maintain proper image proportions or to match surrounding AR components. |
| _opacity_   | number                      | 1       | Specifies the opacity of the component. |
| _images_    | array                       | []      | Specifies the list of images displayed in the carousel. Accepts external URLs or local asset references (e.g., #asset-id). |
| _arrows_    | boolean                     | true    | Controls whether navigation arrows are displayed. |
| _custombuttons_ | boolean                 | false   | Enables or disables custom-styled navigation buttons. When set to `true`, the carousel uses the button configuration defined in the `previous` and `next` properties instead of default arrows. |
| _previous_  | object ({"label": "Previous", "color": "white"}) | { "label": "Previous", "color": “#00BA92”} | Customizes the “Previous” navigation button, including its text label and color.|
| _next_  | object ({"label": "Next", "color": "black"}) | { "label": "Next", "color": “#00BA92”} | Customizes the “Next” navigation button, including its text label and color. |
