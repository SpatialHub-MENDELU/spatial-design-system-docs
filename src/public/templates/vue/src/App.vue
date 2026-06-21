<script setup>
import 'aframe';
import 'spatial-design-system/primitives/ar-menu.js';
import 'spatial-design-system/components/position.js';
import { stringifyForHTML } from 'spatial-design-system/utils/utils.js';
import 'spatial-design-system/components/ar/touch-raycaster.js';

const items = [
  { color: 'white', title: 'Games', textColor: 'black' },
  { color: 'white', title: 'Films', textColor: 'black' },
  { color: 'white', title: 'Books', textColor: 'black' },
  { color: 'white', title: 'Paintings', textColor: 'black' },
];
</script>

<template>
  <a-scene touch-raycaster>
    <a-ar-menu
      position="0 1.5 -3"
      visible="true"
      color="#018A6C"
      activecolor="#03FCC6"
      :items="stringifyForHTML(items)"
      layout="circle"
      showtext="true"
    ></a-ar-menu>
  </a-scene>
</template>
