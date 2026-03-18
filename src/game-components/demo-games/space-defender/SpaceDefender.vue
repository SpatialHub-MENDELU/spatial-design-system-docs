<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import 'aframe';

type GameState = 'menu' | 'playing';

const SpaceshipModelSrc =
  '../../public/glb_models/game_components/fly/spaceship.glb';
const SpaceshipEnemyModelSrc =
  '../../public/glb_models/game_components/fly/spaceship_enemy.glb';
const astronautModel =
  '../../public/glb_models/game_components/fly/astronaut.glb';

const gameState = ref<GameState>('menu');
const isMounted = ref(false);
const gameWrapperRef = ref<HTMLElement | null>(null);
const isLoading = ref(true);
const renderScene = ref(false);

const handleFullscreenChange = () => {
  if (!document.fullscreenElement) {
    gameState.value = 'menu';
  }
};

onMounted(() => {
  isMounted.value = true;
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onMounted(async () => {
  try {
    // Here import Spatial Design System components that you need
    await import('spatial-design-system/components/game/fly');
    await import('spatial-design-system/components/game/gameview');
    await import('spatial-design-system/components/game/npcWalk');
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

const startGame = async () => {
  gameState.value = 'playing';
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    window.dispatchEvent(new Event('resize'));
  }, 50);

  if (gameWrapperRef.value && gameWrapperRef.value.requestFullscreen) {
    try {
      await gameWrapperRef.value.requestFullscreen();
    } catch (err) {
      console.warn('Failed to start full screen mode:', err);
    }
  }
};
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef" v-if="renderScene">
    <div v-if="gameState === 'menu'" class="screen screen--menu">
      <button class="start-btn" @click="startGame">Start the game</button>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <div v-if="isLoading" class="loading-screen">
        <h2>Loading... 🚀</h2>
      </div>

      <a-scene
        physics=" driver: ammo; debug: true; debugDrawMode: 1;"
        inspector="true"
        v-if="isMounted"
        embedded
        xr-mode-ui="enabled: false"
      >
        <a-sky color="#111424"></a-sky>

        <!--          SPACESHIP-->
        <a-entity
          id="spaceship"
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 30 -10"
          rotation="0 0 0"
          fly="speed: 3; maxPitchDeg: 40; type: autoForward; keyUp: arrowup; keyDown: arrowdown; keyLeft: arrowleft; keyRight: arrowright;"
        >
          <a-entity
            :gltf-model="SpaceshipModelSrc"
            ammo-shape="type: hull;"
            position="0 0 -1.5"
            scale="0.02 0.02 0.02"
            rotation="0 0 0"
          ></a-entity>
        </a-entity>

        <a-entity
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 10 5"
          npc-walk="points: 0 10 5, 10 10 5; speed: 3; walkClipName: CharacterArmature|Walk; idleClipName: CharacterArmature|Idle; altitude: true;"
        >
          <a-entity
            :gltf-model="astronautModel"
            ammo-shape="type: hull;"
            position="0 -3 0"
            scale="3 3 3"
          ></a-entity>
        </a-entity>

        <a-entity
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 10 -10"
          npc-walk="points: 0 10 -10, 10 10 -10; speed: 3; walkClipName: CharacterArmature|Walk; idleClipName: CharacterArmature|Idle; altitude: true;"
        >
          <a-entity
            :gltf-model="astronautModel"
            ammo-shape="type: hull;"
            position="0 -3 0"
            scale="3 3 3"
          ></a-entity>
        </a-entity>

        <a-entity
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 10 -25"
          npc-walk="points: 0 10 -25, 10 10 -25; speed: 3; walkClipName: CharacterArmature|Walk; idleClipName: CharacterArmature|Idle; altitude: true;"
        >
          <a-entity
            :gltf-model="astronautModel"
            ammo-shape="type: hull;"
            position="0 -3 0"
            scale="3 3 3"
          ></a-entity>
        </a-entity>

        <!--                ENEMIES-->
        <!--        <a-entity-->
        <!--          npc-walk="-->
        <!--                type: points;-->
        <!--                points: 0 0 5, 5 0 5;-->
        <!--                speed: 3;-->
        <!--            "-->
        <!--          ammo-body="type: dynamic; activationState: disableDeactivation"-->
        <!--          position="0 0 5"-->
        <!--        >-->
        <!--          <a-entity-->
        <!--            :gltf-model="SpaceshipEnemyModelSrc"-->
        <!--            ammo-shape="type: hull;"-->
        <!--            position="0 -0.3 -0.8"-->
        <!--            scale="0.5 0.5 0.5"-->
        <!--          />-->
        <!--        </a-entity>-->

        <a-box
          ammo-body="type: static; friction: 0.2;"
          ammo-shape="type: box"
          position="0 -20 0"
          width="200"
          height="1"
          depth="200"
        />

        CAMERA
<!--        <a-entity-->
<!--          camera-->
<!--          game-view="target: #spaceship; type: thirdPersonFollow; distance: 40; height: 25; tilt: -27;"-->
<!--        >-->
<!--        </a-entity>-->

        <a-entity position="0 20 50" rotation="0 0 0">
          <a-camera position="0 0 0"></a-camera>
        </a-entity>
      </a-scene>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100%;
  height: 400px;
  background-color: #2c2c2c;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.game-wrapper:fullscreen {
  border-radius: 0;
  height: 100vh;
}

.screen {
  width: 100%;
  height: 100%;
}

.screen--menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #808080;
}

.start-btn {
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: #333;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.start-btn:hover {
  background-color: white;
  color: #333;
}

.screen--game {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.screen--game a-scene {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
</style>
