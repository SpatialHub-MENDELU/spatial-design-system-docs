---
title: Menu
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
    try {
        await import("spatial-design-system/primitives/ar-menu.js");
        renderScene.value = true;
    } catch (e) {
        console.error(e);
    }
});
</script>

# {{ $frontmatter.title }}

The menu component is a core navigation element for AR/VR applications. It provides users with a clear and accessible way to move between different sections or trigger actions within your experience.

## Examples

### Basic Menu

This example demonstrates a default menu using a `grid` layout with custom background and item colors. Each item includes an icon, title, and text color, allowing you to fully customize the visual appearance.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-menu
        position="0 1.6 -1"
        color="#ECECEC"
        items="[
                    {'color':'#FF3333','icon':'/home.png','title':'Home','textColor':'white'},
                    {'color':'#efbf30','icon':'/info.png','title':'About','textColor':'white'},
                    {'color':'#33658A','icon':'/profile.png','title':'Profile','textColor':'white'},
                    {'color':'#9966CC','icon':'/contact.png','title':'Contact','textColor':'white'}
                ]"
    ></a-ar-menu>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-menu.js";
```

```html
<a-ar-menu
    position="0 1.6 -1"
    color="#ECECEC"
    items="[
                {'color':'#FF3333','icon':'/home.png','title':'Home','textColor':'white'},
                {'color':'#efbf30','icon':'/info.png','title':'About','textColor':'white'},
                {'color':'#33658A','icon':'/profile.png','title':'Profile','textColor':'white'},
                {'color':'#9966CC','icon':'/contact.png','title':'Contact','textColor':'white'}
            ]"
></a-ar-menu>
```

</template>

</ComponentExample>

</br>

### Circle Layout
This example demonstrates the menu in a [circular layout](/ar-vr-components/circle), which is well-suited for immersive AR/VR interactions where radial navigation feels more natural and intuitive.

A central `logoicon` is displayed to provide visual context or branding. When the logo is clicked, the component emits a `logo` event, allowing user to handle custom actions such as navigation, closing a main menu, or triggering other application logic.

When the number of menu items exceeds six, the component automatically switches to displaying __icons only__ to maintain clarity and prevent visual clutter in the circular arrangement.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-menu
        position="0 1.6 -1"
        color="#ECECEC"
        items="[
                    {'color':'#0091E3','icon':'/home.png','title':'Home','textColor':'white'},
                    {'color':'#efbf30','icon':'/info.png','title':'About','textColor':'white'},
                    {'color':'#33658A','icon':'/profile.png','title':'Profile','textColor':'white'},
                    {'color':'#9966CC','icon':'/settings.png','title':'Settings','textColor':'white'},
                    {'color':'#FF3333','icon':'/help.png','title':'Help','textColor':'white'},
                    {'color':'#00BA92','icon':'/contact.png','title':'Contact','textColor':'white'}
                ]"
        layout="circle"
        logoicon="/spatial-design-system-logo-light.png"
    ></a-ar-menu>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-menu.js";
```

```html
<a-ar-menu
    position="0 1.6 -1"
    color="#ECECEC"
    items="[
                {'color':'#0091E3','icon':'/home.png','title':'Home','textColor':'white'},
                {'color':'#efbf30','icon':'/info.png','title':'About','textColor':'white'},
                {'color':'#33658A','icon':'/profile.png','title':'Profile','textColor':'white'},
                {'color':'#9966CC','icon':'/settings.png','title':'Settings','textColor':'white'},
                {'color':'#FF3333','icon':'/help.png','title':'Help','textColor':'white'},
                {'color':'#00BA92','icon':'/contact.png','title':'Contact','textColor':'white'}
            ]"
    layout="circle"
    logoicon="/spatial-design-system-logo-light.png"
></a-ar-menu>
```

</template>

</ComponentExample>

</br>

### Custom Grid Layout

This example shows how the [grid layout](/ar-vr-components/grid) can be customized by changing the number of columns using the menu's `gridcolumns` property.

The first menu uses three columns (gridcolumns="3"), resulting in a horizontal layout with individually styled items. The second menu uses a single column (gridcolumns="1"), creating a vertical list with a unified color theme. It also demonstrates the use of `activecolor` for interaction feedback.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-menu
        position="-0.3 1.6 -1"
        color="#ECECEC"
        items="[
                    {'color':'#efbf30','icon':'/info.png','title':'About','textColor':'white'},
                    {'color':'#0091E3','icon':'/contact.png','title':'Contact','textColor':'white'},
                    {'color':'#00BA92','icon':'/home.png','title':'Home','textColor':'white'}
                ]"
        size="small"
        layout="grid"
        gridcolumns="3"
    ></a-ar-menu>
    <a-ar-menu
        position="0.29 1.6 -1"
        color="#00BA92"
        activecolor="#03FCC6"
        items="[
                {'color':'#006c54','icon':'/settings.png','title':'Settings'},
                {'color':'#006c54','icon':'/info.png','title':'About'},
                {'color':'#006c54','icon':'/profile.png','title':'Profile'}
            ]"
        size="small"
        layout="grid"
        gridcolumns="1"
    ></a-ar-menu>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-menu.js";
```

```html
<a-ar-menu
    position="-0.3 1.6 -1"
    color="#ECECEC"
    items="[
                {'color':'#efbf30','icon':'/info.png','title':'About','textColor':'white'},
                {'color':'#0091E3','icon':'/contact.png','title':'Contact','textColor':'white'},
                {'color':'#00BA92','icon':'/home.png','title':'Home','textColor':'white'}
            ]"
    size="small"
    layout="grid"
    gridcolumns="3"
></a-ar-menu>
<a-ar-menu
    position="0.29 1.6 -1"
    color="#00BA92"
    activecolor="#03FCC6"
    items="[
            {'color':'#006c54','icon':'/settings.png','title':'Settings'},
            {'color':'#006c54','icon':'/info.png','title':'About'},
            {'color':'#006c54','icon':'/profile.png','title':'Profile'}
        ]"
    size="small"
    layout="grid"
    gridcolumns="1"
></a-ar-menu>
```

</template>

</ComponentExample>


## Props

| Property      | Type                           | Default | Description                                                                                                                                                         |
| ------------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _visible_     | boolean                        | true    | Controls whether the menu is visible in the scene. |
| _size_        | enum (small, medium, large)    | medium  | Defines the overall size of the menu, affecting spacing, icon size, and text scaling. |
| _position_    | number[]                       | 0 0 0   | Sets the position of the menu in 3D space (x, y, z). |
| _color_       | string (blue, #fff)          | #0091E3 | Base color of the menu, applied to background and elements. |
| _activecolor_ | string(red, #fff)            | #C1080C | Color applied to an item when it is active or selected. |
| _itemopacity_ | number                         | 1       | Controls the opacity of individual menu items. |
| _menuopacity_ | number                         | 1       | Controls the transparency of the entire menu, including its background. |
| _items_       | string (JSON)                  | ""      | Defines menu items. Each item can include icon, title, color, and textColor. Example: `[{ "icon": "home.svg", "title": "Home", "color": "red", "textcolor": "white" }]`. |
| _clickable_    | boolean                       | true    | Enables or disables interaction with menu items. |
| _layout_      | enum (`circle`, `grid`)          | grid    | Determines how menu items are arranged (grid or circle). |
| _gridcolumns_ | number                         | 2   | Specifies the number of columns in grid layout. |
| _backbutton_  | boolean                        | false   | Displays a back button in the center of the menu (useful for navigation hierarchies). |
| _logoicon_    | string (image url or asset ID) | ""      | Displays a logo icon in the center of the menu. |
| _showtext_    | boolean                        | false   | Toggles visibility of item labels (titles). |

## Events

The menu component emits the following events when interacted with:

| Event         | Parameters                                       | Description                                                      |
| ------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| _select_      | `{ item: object }` | Emitted when a menu item is clicked. Returns the full item object (e.g. icon, title, color, textcolor). |
| _back_        | - | Emitted when the back button is clicked (when `backbutton` is enabled). Typically used for navigation within menu hierarchies. |
| _logo_        | - | Emitted when the center logo icon is clicked. Useful for triggering global actions such as navigating to a home view. |
