/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const packageJsonVanilla = `
  {
    "name": "sds-playground",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "devDependencies": {
      "vite": "^6.0.1"
    },
    "dependencies": {
      "spatial-design-system": "^1.6.9"
    },
    "overrides": {
      "debug": "@spatialhub/three-bmfont-text",
      "three-bmfont-text": "@spatialhub/three-bmfont-text"
    }
  }
`
export const packageJsonVue = `
  {
    "name": "sds-playground",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "devDependencies": {
      "vite": "^6.0.1",
      "@vitejs/plugin-vue": "^5.2.1"
    },
    "dependencies": {
      "spatial-design-system": "^1.6.9",
      "vue": "^3.5.13"
    },
    "overrides": {
      "debug": "@spatialhub/three-bmfont-text",
      "three-bmfont-text": "@spatialhub/three-bmfont-text"
    }
  }
`
export const MainVanillaFile = `
  import "spatial-design-system/components/position.js";
  const app = document.getElementById("app");
  const scene = document.createElement("a-scene");

  const autoPosition = \`
    <a-plane width="5" height="5" position="0 1.5 -5" color="#018A6C" >
      <a-box color="#03FCC6" auto-position> </a-box>
    </a-plane>
  \`;

  scene.innerHTML = autoPosition;
  app.appendChild(scene);
`;

export const MainVueFile = `
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

<!-- Globally scoped! -->
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
`;
