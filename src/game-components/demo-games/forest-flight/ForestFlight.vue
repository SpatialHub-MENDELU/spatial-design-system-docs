<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';
import { PaperAirplaneModelSrc } from '../constants';

type GameState = 'menu' | 'playing';

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
        <a-sky color="blue"></a-sky>

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
            scale="0.03 0.03 0.03"
          ></a-entity>
        </a-entity>

        <a-ocean
          position="0 -1 0"
          width="25"
          depth="400"
          density="100"
          speed="2"
          color="#40E0D0"
          color-horizon="#20B2AA"
          metalness="0.1"
          roughness="0.8"
        >
        </a-ocean>

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
