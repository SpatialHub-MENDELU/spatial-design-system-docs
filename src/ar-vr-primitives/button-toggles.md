---
title: Button Toggles
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-button-toggle");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

## Example

### Basic Button Toggle

This example demonstrates a simple button toggle component with two text-based options.
The component uses the `mandatory` property to ensure that one option is always selected.
`Rounded` corners are applied and a custom `color` are used to highlight the selected state.
This setup is useful for basic binary choices such as theme switching or mode selection.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-buttontoggle
        position="0 1.6 -1"
        buttons='[
            {"label": "LIGHT"},
            {"label": "DARK"}
        ]'
        rounded="true"
        size="medium"
        mandatory="true"
        color="#03FCC6"
    ></a-ar-buttontoggle>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-button-toggle.js";
```

```html
<a-ar-buttontoggle
    position="0 1.6 -1"
    buttons='[
        {"label": "LIGHT"},
        {"label": "DARK"}
    ]'
    rounded="true"
    size="medium"
    mandatory="true"
    color="#03FCC6"
></a-ar-buttontoggle>
```

</template>

</ComponentExample>

### Icon Options Button Toggle

This example shows a button toggle component that uses icons instead of text labels.
Each button is defined with an icon reference, creating a compact and visually driven control suitable for toolbars or alignment actions.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-buttontoggle
        position="0 1.6 -1"
        buttons='[
            {"icon": "/align-left.png"},
            {"icon": "/align-center.png"},
            {"icon": "/align-right.png"}
        ]'
        size="medium"
        color="#018A6C"
        multiple="true"
    ></a-ar-buttontoggle>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-button-toggle.js";
```

```html
<a-ar-buttontoggle
    position="0 1.6 -1"
    buttons='[
        {"icon": "/align-left.png"},
        {"icon": "/align-center.png"},
        {"icon": "/align-right.png"}
    ]'
    size="medium"
    color="#018A6C"
    multiple="true"
></a-ar-buttontoggle>
```

</template>

</ComponentExample>

### Text & Icon Options Button Toggle

This example demonstrates an advanced button toggle configuration combining both text labels and icons with custom actions.
Each button includes a label, an icon positioned on the right side, and an associated action that is emitted when selected.
The component uses a `tile` shape, resulting in square edges instead of rounded corners.
The `mandatory` property ensures that at least one button remains selected at all times, with the first button selected by default.
Because `multiple` is set to false, only one button can be active at a time. Selecting another option automatically switches the active state.


<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-buttontoggle
        position="0 1.6 -1"
        buttons='[
            {"label": "LEFT", "icon": "/align-left.png", "iconpos": "right", "action": "aligntoleft"},
            {"label": "CENTER", "icon": "/align-center.png", "iconpos": "right", "action": "aligncenter"},
            {"label": "RIGHT", "icon": "/align-right.png", "iconpos": "right", "action": "aligntoright"}
        ]'
        tile="true"
        size="medium"
        mandatory="true"
        multiple="false"
        color="#03FCC6"
    ></a-ar-buttontoggle>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-button-toggle.js";
```

```html
<a-ar-buttontoggle
    position="0 1.6 -1"
    buttons='[
        {"label": "LEFT", "icon": "/align-left.png", "iconpos": "right", "action": "aligntoleft"},
        {"label": "CENTER", "icon": "/align-center.png", "iconpos": "right", "action": "aligncenter"},
        {"label": "RIGHT", "icon": "/align-right.png", "iconpos": "right", "action": "aligntoright"}
    ]'
    tile="true"
    size="medium"
    mandatory="true"
    multiple="false"
    color="#03FCC6"
></a-ar-buttontoggle>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Determines whether the button toggle group is displayed. |
| _position_  | number[]                    | 0 0 0   | Specifies the component's position.Defines the component’s position in 3D space as an array of coordinates.
| _size_      | enum (small, medium, large, extra-large) | medium  | Controls the size of all toggle buttons, including padding, font size, and spacing. |
| _opacity_   | number                      | 1       | Sets the transparency level of the component. |
| _color_     | string (blue, #fff)       | #00BA92 | Defines the color applied to selected buttons. Unselected buttons use a neutral style by default (white background and black text color). |
| _mode_      | string (light, dark)        | ""      | Applies a `light` or `dark` visual theme to selected buttons for consistent styling. |
| _buttons_   | array                       | [{ label: "Close", icon: "", iconpos: "left", action: "close" }] | Defines the buttons displayed in the toggle group. Each button may include a label, icon, icon position, and action. When selected, a buttonAction event is emitted with the associated action value. |
| _mandatory_ | boolean                     | false   | Ensures that at least one button remains selected at all times. |
| _multiple_  | boolean                     | false   | Allows multiple buttons to be selected simultaneously when enabled. |
| _rounded_   | boolean                     | false   | Applies rounded corners to the entire toggle group. Takes precedence over the tile property. |
| _tile_      | boolean                     | false   | Renders the toggle group with square edges instead of rounded corners. | 
