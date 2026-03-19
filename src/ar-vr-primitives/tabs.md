---
title: Tabs
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
    try {
        await import("spatial-design-system/primitives/ar-tabs");
        renderScene.value = true;
    } catch (e) {
        console.error(e);
    }
});
</script>

# {{ $frontmatter.title }}
The tabs component is an interactive UI element that allows users to switch between multiple pieces of content within the same space. Each tab acts as a trigger that reveals its associated content while hiding the others, helping organize information in a clear and structured way.

## Examples

### Basic Tabs
The first example demonstrates a simple usage of the tabs component. Each tab is linked to a separate content entity containing an image. The component uses default dimensions, styling, and built-in navigation, making it ideal for quick setups or simple image galleries in AR scenes.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
                cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-entity id="tab-content-1" position="0 1.45 -1" visible="false">
        <a-image src="/first-slide.jpg" width="1.25" height="0.8"></a-image>
    </a-entity>
    <a-entity id="tab-content-2" position="0 1.45 -1" visible="false">
        <a-image src="/second-slide.jpg" width="1.25" height="0.8"></a-image>
    </a-entity>
    <a-entity id="tab-content-3" position="0 1.45 -1" visible="false">
        <a-image src="/third-slide.jpg" width="1.25" height="0.8"></a-image>
    </a-entity>
    <a-ar-tabs
        position="0 2 -1"
        tabitems='[
            {"label": "First", "content": "#tab-content-1"},
            {"label": "Second", "content": "#tab-content-2"},
            {"label": "Third", "content": "#tab-content-3"}
        ]'
    ></a-ar-tabs>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-tabs.js";
```

```html
<a-entity id="tab-content-1" position="0 1.4 -1" visible="false">
    <a-image src="/first-slide.jpg" width="1.25" height="0.8"></a-image>
</a-entity>
<a-entity id="tab-content-2" position="0 1.4 -1" visible="false">
    <a-image src="/second-slide.jpg" width="1.25" height="0.8"></a-image>
</a-entity>
<a-entity id="tab-content-3" position="0 1.4 -1" visible="false">
    <a-image src="/third-slide.jpg" width="1.25" height="0.8"></a-image>
</a-entity>
<a-ar-tabs
    position="0 2 -1"
    tabitems='[
        {"label": "First", "content": "#tab-content-1"},
        {"label": "Second", "content": "#tab-content-2"},
        {"label": "Third", "content": "#tab-content-3"}
    ]'
></a-ar-tabs>
```

</template>
</ComponentExample>
<br>

### Custom Content
The second example showcases how the tabs component can be used with fully custom 3D content instead of images. Each tab displays a different 3D primitive (sphere, box, cylinder), demonstrating flexibility in content rendering.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
                cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-entity id="tab-content-4" position="0 1.2 -1" visible="false">
        <a-sphere color="#6bec6f" position="0 0 -2" radius="0.8"></a-sphere>
    </a-entity>
    <a-entity id="tab-content-5" position="0 1.2 -1" visible="false">
        <a-box color="#f3ff4c" position="0 0 -2" rotation="0 45 0"></a-box>
    </a-entity>
    <a-entity id="tab-content-6" position="0 1.2 -1" visible="false">
        <a-cylinder color="#56a8eb" position="0 0 -2" radius="0.5" height="1" rotation="30 0 0"></a-cylinder>
    </a-entity>
    <a-ar-tabs
        position="0 1.9 -1"
        tabitems='[
            {"label": "Sphere", "content": "#tab-content-4"},
            {"label": "Cube", "content": "#tab-content-5"},
            {"label": "Cylinder", "content": "#tab-content-6"}
        ]'
        activecolor="#03FCC6"
    ></a-ar-tabs>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-tabs.js";
```

```html
    <!-- Tabs Content -->
    <a-entity id="tab-content-4" position="0 1.2 -1" visible="false">
        <a-sphere color="#6bec6f" position="0 0 -2" radius="0.8"></a-sphere>
    </a-entity>
    <a-entity id="tab-content-5" position="0 1.2 -1" visible="false">
        <a-box color="#f3ff4c" position="0 0 -2" rotation="0 45 0"></a-box>
    </a-entity>
    <a-entity id="tab-content-6" position="0 1.2 -1" visible="false">
        <a-cylinder color="#56a8eb" position="0 0 -2" radius="0.5" height="1" rotation="30 0 0"></a-cylinder>
    </a-entity>

    <a-ar-tabs
        position="0 1.9 -1"
        tabitems='[
            {"label": "Sphere", "content": "#tab-content-4"},
            {"label": "Cube", "content": "#tab-content-5"},
            {"label": "Cylinder", "content": "#tab-content-6"}
        ]'
        activecolor="#03FCC6"
    ></a-ar-tabs>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Determines whether the tabs component is visible in the scene. |
| _position_  | number[]                    | 0 0 0   | Defines the 3D position of the tabs in the format `[x, y, z]`. |
| _opacity_   | number                      | 1       | Defines the transparency of the entire tabs component (0 = fully transparent, 1 = fully visible). |
| _size_      | enum (small, medium, large, extra-large) | medium | Adjusts the overall size of the tabs component. |
| _color_     | string (blue, #fff)       | #ECECEC  | Sets the default background or inactive tab color. |
| _activecolor_ | string                    |  #00BA92 | Defines the color of the currently active tab, helping users identify the selected state. |
| _mode_      | string (light, dark)        | ""      | Controls the visual theme of the component, supporting either a `light` or `dark` mode. |
| _tabitems_  | array (`[{ "label": "Label", "content": "#content" }]`) | [] | Defines the tabs. Each item includes a `label` (tab title) and `content` (selector referencing the content entity to display). |
