---
title: Row, column
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
    try {
        await import("spatial-design-system/components/menu.js");
        await import("spatial-design-system/primitives/ar-list.js");

        renderScene.value = true;
    } catch (e) {
        console.error(e);
    }
});
</script>

# {{ $frontmatter.title }}

If you need a one dimensional layout, you can use row or column container. Both use [grid](/ar-vr-components/grid) component.

## Example

Below is an example of using row layout, `a-ar-row`. The column layout differs in direction (it is vertical) and it has tag name `a-ar-column`, [props](#props) are the same.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-row width="3" position="0 1.5 -3">
        <a-box color="#018A6C"></a-box>
        <a-box color="#00C170"></a-box>
        <a-box color="#03FCC6"></a-box>
    </a-ar-row>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/primitives/ar-list.js";
```

```html
<a-ar-row width="3" position="0 1.5 -3">
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-ar-row>
```

</template>

</ComponentExample>

## Props

| Property   | Type     | Default | Description                   |
| ---------- | -------- | ------- | ----------------------------- |
| _visible_  | boolean  | true    | Shows or hides the container. |
| _width_    | number   | 1       | Container's width.            |
| _height_   | number   | 1       | Container's height.           |
| _position_ | number[] | 0 0 0   | Sets container position.      |
| _spacing_  | number   | 0       | Sets spacing between items.   |
| _opacity_  | number   | 1       | Sets container's opacity.     |
