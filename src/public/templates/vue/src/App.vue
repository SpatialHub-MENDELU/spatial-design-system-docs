<script setup>
import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/components/position.js";
import { stringifyForHTML } from "spatial-design-system/utils/utils.js";

const items = [
  { color: "white", title: "Games", textColor: "black" },
  { color: "white", title: "Films", textColor: "black" },
  { color: "white", title: "Books", textColor: "black" },
  { color: "white", title: "Paintings", textColor: "black" },
];
</script>

<template>
  <a-scene>
    <a-ar-menu
      position="0 1.5 -3"
      visible="true"
      primary="lightblue"
      :items="stringifyForHTML(items)"
      variant="filled"
      layout="circle"
      fit-info-fov
      follow-camera="angle: 20"
      billboard
    ></a-ar-menu>
  </a-scene>
</template>
