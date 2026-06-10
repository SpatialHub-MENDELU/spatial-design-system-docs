---
title: List
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
    try {
        await import("spatial-design-system/primitives/ar-list");
        renderScene.value = true;
    } catch (e) {
        console.error(e);
    }
});
</script>

# {{ $frontmatter.title }}
The list component is used to display a vertical collection of structured text items in 3D space.

It organizes information into clearly separated entries, each containing a title and optional supporting text, making it easier to scan and read content in spatial interfaces.

## Examples

### Basic List
This example demonstrates the simplest usage of the list component. It renders a vertical list of text items using the default layout (`type="text"`), with only `textcolor` and `items` customized.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-ar-list 
    position="-0.3 1.6 -1"
    textcolor="white"
    items='[{"title": "First Item", "subtitle": "This is the first item"}, {"title": "Second Item", "subtitle": "This is the second item"}, {"title": "Third Item", "subtitle": "This is the third item"}]'
></a-ar-list>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-list.js";
```

```html
<a-ar-list 
    position="-0.3 1.6 -1"
    textcolor="white"
    items='[{"title": "First Item", "subtitle": "This is the first item"}, {"title": "Second Item", "subtitle": "This is the second item"}, {"title": "Third Item", "subtitle": "This is the third item"}]'
></a-ar-list>
```

</template>

</ComponentExample>

<br>

### Custom Styling and Sizing
This example shows how to customize the visual appearance of the list using the `card` type, along with `color`, `width`, and `size` adjustments.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
                cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-list 
        position="0 1.6 -1"
        type="card"
        color="#a4ffeb"
        size="small"
        width="1"
        items='[
            {"title": "Home", "subtitle": "Go to dashboard"},
            {"title": "Profile", "subtitle": "View and edit your profile"},
            {"title": "Settings", "subtitle": "Adjust your preferences"},
            {"title": "Help", "subtitle": "Get support and documentation"}
        ]'
    ></a-ar-list>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-list.js";
```

```html
<a-ar-list 
    position="0 1.6 -1"
    type="card"
    color="#a4ffeb"
    size="small"
    width="1"
    items='[
        {"title": "Home", "subtitle": "Go to dashboard"},
        {"title": "Profile", "subtitle": "View and edit your profile"},
        {"title": "Settings", "subtitle": "Adjust your preferences"},
        {"title": "Help", "subtitle": "Get support and documentation"}
    ]'
></a-ar-list>
```

</template>

</ComponentExample>

</br>

### Multi-line and Width Behavior
This example demonstrates how the list handles _long subtitles and varying widths_. The left list uses a wider layout, allowing text to occupy fewer lines. The right list is narrower, forcing content to wrap across multiple lines

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-list 
        position="-1 1.56 -1"
        textcolor="white"
        size="small"
        width="1"
        items='[
            { "title": "Server Status", "subtitle": "No reported outages or degraded performance in the last 24 hours." },
            { "title": "Database Load", "subtitle": "Current utilization is at 68%, with slightly increased query times observed during peak traffic intervals."},
            { "title": "Last Backup", "subtitle": "The most recent backup was successfully completed at 02:30 AM."}
        ]'
    ></a-ar-list>
    <a-ar-list 
        position="0.2 1.57 -1"
        textcolor="white"
        size="small"
        width="0.5"
        items='[
            { "title": "Server Status", "subtitle": "No reported outages or degraded performance in the last 24 hours." },
            { "title": "Database Load", "subtitle": "Current utilization is at 68%, with slightly increased query times observed during peak traffic intervals."},
            { "title": "Last Backup", "subtitle": "The most recent backup was successfully completed at 02:30 AM."}
        ]'
    ></a-ar-list>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-list.js";
```

```html
<a-ar-list 
    position="-1 1.5r -1"
    textcolor="white"
    size="small"
    width="1"
    items='[
        { "title": "Server Status", "subtitle": "All core services are running normally with no reported outages or degraded performance in the last 24 hours." },
        { "title": "Database Load", "subtitle": "Current utilization is at 68%, with slightly increased query times observed during peak traffic intervals."},
        { "title": "Last Backup", "subtitle": "The most recent backup was successfully completed at 02:30 AM with no errors or missing data."}
    ]'
></a-ar-list>
<a-ar-list 
    position="0.2 1.57 -1"
    textcolor="white"
    size="small"
    width="0.5"
    items='[
        { "title": "Server Status", "subtitle": "All core services are running normally with no reported outages or degraded performance in the last 24 hours." },
        { "title": "Database Load", "subtitle": "Current utilization is at 68%, with slightly increased query times observed during peak traffic intervals."},
        { "title": "Last Backup", "subtitle": "The most recent backup was successfully completed at 02:30 AM with no errors or missing data."}
    ]'
></a-ar-list>
```

</template>
</ComponentExample>
<br>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Determines whether the list is visible in the scene. |
| _position_  | number[]                    | 0 0 0   | Defines the 3D position of the list in the format `[x, y, z]`. |
| _size_      | enum (small, medium, large) | medium  | Controls overall scaling, including text size, spacing, and item proportions.|
| _width_     | number                      | 1       | Sets the width of the list in __meters__. Affects text wrapping and layout density. |
| _opacity_   | number                      | 1       | Specifies the opacity of the component. |
| _textcolor_ | string                      | "black" | Sets the color of the text content (titles and subtitles). |
| _color_     | string                      | "#ECECEC" | Defines the background color used in the `card` layout. The highlight color of a selected item is automatically derived from this value. |
| _items_     | array                       |  []     | Array of objects representing list items. |
| _type_      | enum (text, card)           | text    | Determines the visual style of the list. `text` is minimal, `card` adds background containers. |

## Events

The list component emits the following events when interacted with:

| Event         | Parameters                                       | Description                                                      |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| _selected_      | `{ item: object, index: number }` | Emitted when a list item is selected. Returns the selected item data and its index in the array. |
