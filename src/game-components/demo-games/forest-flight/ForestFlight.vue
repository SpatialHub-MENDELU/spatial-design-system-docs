<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';
import {
  PaperAirplaneModelSrc,
  ForestModelSrc,
  DockModelSrc,
} from '../constants';

type GameState = 'menu' | 'playing';

interface StaticModel {
  id: number;
  src: string;
  position: string;
  rotation: string;
  scale: string;
  offset: string;
}

const staticModelsList = ref<StaticModel[]>([]);

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);

const handleFullscreenChange = () => {
  if (!document.fullscreenElement && gameState.value === 'playing') {
    gameState.value = 'menu';
  }
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

const startGame = async () => {
  gameState.value = 'playing';

  staticModelsList.value = [
    //forest models on one side of the river
    {
      id: 1,
      src: ForestModelSrc,
      position: '-50 15 170',
      rotation: '0 0 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 2,
      src: ForestModelSrc,
      position: '-43 15 122',
      rotation: '0 90 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 3,
      src: ForestModelSrc,
      position: '-33.1 15 57',
      rotation: '0 180 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 4,
      src: ForestModelSrc,
      position: '-38 15 -12',
      rotation: '0 270 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 5,
      src: ForestModelSrc,
      position: '-50 15 -56',
      rotation: '0 0 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 6,
      src: ForestModelSrc,
      position: '-43 15 -104',
      rotation: '0 90 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 7,
      src: ForestModelSrc,
      position: '-33.1 15 -169',
      rotation: '0 180 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 8,
      src: ForestModelSrc,
      position: '-38 15 -234',
      rotation: '0 270 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    // Other side of the river
    {
      id: 9,
      src: ForestModelSrc,
      position: '33 15 170',
      rotation: '0 0 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 10,
      src: ForestModelSrc,
      position: '38 15 122',
      rotation: '0 90 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 11,
      src: ForestModelSrc,
      position: '50 15 57',
      rotation: '0 180 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 12,
      src: ForestModelSrc,
      position: '43 15 -12',
      rotation: '0 270 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 13,
      src: ForestModelSrc,
      position: '33 15 -56',
      rotation: '0 0 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 14,
      src: ForestModelSrc,
      position: '38 15 -104',
      rotation: '0 90 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 15,
      src: ForestModelSrc,
      position: '50 15 -169',
      rotation: '0 180 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    {
      id: 16,
      src: ForestModelSrc,
      position: '43 15 -234',
      rotation: '0 270 0',
      scale: '70 70 70',
      offset: '8 20 1',
    },
    // bridges
    {
      id: 17,
      src: DockModelSrc,
      position: '0 0 140',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
    {
      id: 18,
      src: DockModelSrc,
      position: '0 0 90',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
    {
      id: 19,
      src: DockModelSrc,
      position: '0 0 40',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
    {
      id: 20,
      src: DockModelSrc,
      position: '0 0 0',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
  ];

  nextTick(async () => {
    if (gameWrapperRef.value && !document.fullscreenElement) {
      try {
        await gameWrapperRef.value.requestFullscreen();
      } catch (err) {
        console.warn(err);
      }
    }
  });
};
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef">
    <div v-if="gameState === 'menu'" class="screen screen--menu">
      <h1>FOREST FLIGHT</h1>
      <button @click="startGame">START GAME</button>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <a-scene physics="driver: ammo; debug: true;">
        <a-sky color="#00BFFF"></a-sky>

        <a-sphere
          id="sun"
          position="0 25 -400"
          radius="40"
          material="color: #FFD700; shader: flat"
          segments-width="16"
          segments-height="16"
        ></a-sphere>

        <a-entity
          id="plane-character"
          ammo-body="type: static; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 2 180"
          rotation="0 0 0"
        >
          <a-entity
            :gltf-model="`${PaperAirplaneModelSrc}`"
            ammo-shape="type: hull;"
            position="0 0 0"
            scale="0.02 0.02 0.02"
          ></a-entity>
        </a-entity>

        <a-ocean
          position="0 -1 0"
          width="25"
          depth="400"
          density="100"
          speed="2"
          color="#006994"
          color-horizon="#004B6B"
          metalness="0.1"
          roughness="0.8"
        >
        </a-ocean>

        <a-entity
          v-for="model in staticModelsList"
          :key="'static-' + model.id"
          :id="'static-' + model.id"
          :gltf-model="model.src"
          :position="model.position"
          :rotation="model.rotation"
          :scale="model.scale"
          ammo-body="type: static;"
          :ammo-shape="`type: hull; offset: ${model.offset};`"
        ></a-entity>

        <a-entity
          camera
          wasd-controls
          look-controls
          position="0 10 200"
        ></a-entity>
      </a-scene>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100%;
  height: 500px;
  background-color: #222;
  position: relative;
  overflow: hidden;
  font-family: sans-serif;
}

.game-wrapper:fullscreen {
  height: 100vh;
}

.screen {
  width: 100%;
  height: 100%;
}

.screen--menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.screen--menu button {
  padding: 15px 30px;
  font-size: 1.2rem;
  cursor: pointer;
  margin-top: 20px;
}

.screen--game {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
}

.screen--game a-scene {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
