---
title: grid
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/components/menu.js");
    renderScene.value = true;
  } catch(e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

In any application, you always have to deal with the correct alignment of objects in the scene. Grid is a classic two-dimensional layout that can be used not only in 2D, but also in 3D space.

## Example

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity grid position="0 1.5 -3">
<a-box color="#8A8A8A"></a-box>
<a-box color="#018A6C"></a-box>
<a-box color="#00C170"></a-box>
<a-box color="#03FCC6"></a-box>
</a-entity>
</template>

<template #code>

```js
import "spatial-design-system/components/menu.js";
```

```html
<a-entity grid position="0 1.5 -3">
  <a-box color="#8A8A8A"></a-box>
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-entity>
```

</template>

</ComponentExample>

## Props

| Property  | Type   | Default | Description                 |
| --------- | ------ | ------- | --------------------------- |
| _columns_ | number | 2       | Number of grid columns.     |
| _rows_    | number | 2       | Number of grid rows.        |
| _spacing_ | number | 0       | Sets spacing between items. |
