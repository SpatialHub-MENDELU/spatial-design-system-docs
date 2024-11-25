---
title: circle
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/components/menu.js");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}

Creates a circle (pie) layout.

## Example

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-entity circle position="0 1.6 -2.5">
<a-entity material="color: #8A8A8A"></a-entity>
<a-entity material="color: #018A6C"></a-entity>
<a-entity material="color: #00C170"></a-entity>
<a-entity material="color: #03FCC6"></a-entity>
</a-entity>
</template>

<template #code>

```js
import "spatial-design-system/components/menu.js";
```

```html
<a-entity circle position="0 1.6 -2.5">
  <a-entity material="color: #8A8A8A"></a-entity>
  <a-entity material="color: #018A6C"></a-entity>
  <a-entity material="color: #00C170"></a-entity>
  <a-entity material="color: #03FCC6"></a-entity>
</a-entity>
```

</template>

</ComponentExample>

## Props

Children of circle must be plain entities because they are converted to parts of the circle.

| Property  | Type   | Default | Description                    |
| --------- | ------ | ------- | ------------------------------ |
| _spacing_ | number | 0       | Sets spacing between elements. |
| _radius_  | number | 1       | Sets circle's radius.          |
