---
title: auto-position
---

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
    try {
        await import ("spatial-design-system/components/position.js");
        renderScene.value = true;
    } catch (e) {
        console.error(e);
    }
});
</script>

# {{ $frontmatter.title }}

Aligns the element inside its parent node.

## Example

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
<a-plane width="5" height="5" position="0 1.5 -5" color="#018A6C">
<a-box color="#03FCC6" auto-position></a-box>
</a-plane>
</template>

<template #code>

```js
import "spatial-design-system/components/position.js";
```

```html
<a-plane width="5" height="5" position="0 1.5 -5" color="#018A6C">
  <a-box color="#03FCC6" auto-position></a-box>
</a-plane>
```

</template>

</ComponentExample>

## Props

| Property | Type                      | Default | Description                |
| -------- | ------------------------- | ------- | -------------------------- |
| _hAlign_ | enum(left, center, right) | center  | Sets horizontal alignment. |
| _vAlign_ | enum(top, center, bottom) | center  | Sets vertical alignment.   |
