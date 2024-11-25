---
title: Menu
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);
const itemsString = ref(""); 

onMounted(async () => {
    try {
        await import("spatial-design-system/primitives/ar-menu.js");
        const { stringifyForHTML } = await import("spatial-design-system/utils/utils.js");
        
        itemsString.value = stringifyForHTML([
            { color: "white", icon: "/content-save", title: "Save", textColor: "black", },
            { color: "white", icon: "/close-circle", title: "Quit", textColor: "black", },
            { color: "white", icon: "/settings", title: "Settings", textColor: "black", },
            { color: "white", icon: "/file-plus", title: "New file", textColor: "black", },
        ]);

        renderScene.value = true;
    } catch (e) {
        console.error(e);
    }
});
</script>

# {{ $frontmatter.title }}

Menu is a crucial part of any application that allows users quickly achieve their goals. It must be simple and easy to use and that is why we have a dedicated component that you can embed anywhere in your app.

## Example

Below is an example with [circle](/ar-vr-components/circle) layout.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-ar-menu 
        position="0 1.5 -3"
        visible="true" 
        primary="#018A6C"
        :items="itemsString"
        variant="filled"
        layout="circle"
    ></a-ar-menu>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-menu.js";
```

```html
<a-ar-menu
  position="0 1.5 -3"
  visible="true"
  primary="#018A6C"
  items="[
            {'color':'white','icon':'/content-save','title':'Save','textColor':'black'},
            {'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'},
            {'color':'white','icon':'/settings','title':'Settings','textColor':'black'},
            {'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}
        ]"
  variant="filled"
  layout="circle"
></a-ar-menu>
```

::: tip
You can use `stringifyForHTML` from `spatial-design-system/utils/utils.js` to convert items to JSON and put them in the `items` attribute instead of hardcoding. For example, in Vue.js:

```html
<a-ar-menu
  position="0 1.5 -3"
  visible="true"
  primary="lightblue"
  :items="stringifyForHTML(items)"
  variant="filled"
  layout="circle"
></a-ar-menu>
```

:::

</template>

</ComponentExample>

## Props

| Property      | Type                           | Default | Description                                                                                                                                                         |
| ------------- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _visible_     | boolean                        | true    | Shows or hides the menu.                                                                                                                                            |
| _size_        | enum (small, medium, large)    | medium  | Influences the compactness of the menu (paddings, font sizes, etc.)                                                                                                 |
| _position_    | number[]                       | 0 0 0   | Sets menu position.                                                                                                                                                 |
| _primary_     | string (blue, #fff)            | #0091E3 | Alters menu color (text, background, icon background).                                                                                                              |
| _items_       | string (JSON)                  | ""      | Decorates menu using title, color or icon. Format: `{ icon: "home.svg", title: "", color: "red" }`. Icon is a URL or asset ID with hashtag. Default color is white. |
| _variant_     | enum (filled, transparent)     | filled  | Alters overall menu look.                                                                                                                                           |
| _logoicon_    | image url or asset ID (string) | ""      | Sets a menu prepend icon based on the image's url or asset ID with hashtag.                                                                                         |
| _layout_      | string (circle, grid)          | grid    | Sets menu layout.                                                                                                                                                   |
| _highlighted_ | string(red, #fff)              | #C1080C | Sets color of elements when clicked on                                                                                                                              |
| _backbutton_  | boolean                        | false   | Displays back button in the middle of the menu                                                                                                                      |
