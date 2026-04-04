<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AFRAME from 'aframe';
import 'aframe';
import {
  PaperAirplaneModelSrc,
  ForestModelSrc,
  DockModelSrc,
  FoxModelSrc,
} from '../constants';

type GameState = 'menu' | 'playing' | 'gameover';

interface StaticModel {
  id: number;
  src: string;
  position: string;
  rotation: string;
  scale: string;
  offset: string;
}

interface NpcModel {
  id: number;
  src: string;
  position: string;
  rotation: string;
  scale: string;
  offset: string;
  walkClipName: string;
  idleClipName: string;
  points: string;
}

const staticModelsList = ref<StaticModel[]>([]);
const npcModelsList = ref<NpcModel[]>([]);

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);

if (typeof AFRAME !== 'undefined' && !AFRAME.components['fox-collider']) {
  AFRAME.registerComponent('fox-collider', {
    init: function () {
      this.el.addEventListener('collidestart', (e: any) => {
        const targetEl = e.detail.targetEl;
        if (targetEl && targetEl.id && targetEl.id.startsWith('npc-')) {
          window.dispatchEvent(new Event('gameover-event'));
        }
      });
    },
  });
}

const handleFullscreenChange = () => {
  if (
    !document.fullscreenElement &&
    (gameState.value === 'playing' || gameState.value === 'gameover')
  ) {
    gameState.value = 'menu';
  }
};

const handleGameOver = () => {
  gameState.value = 'gameover';
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  window.addEventListener('gameover-event', handleGameOver);
});

onMounted(async () => {
  try {
    await import('spatial-design-system/components/game/fly');
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  window.removeEventListener('gameover-event', handleGameOver);
});

const generateStaticModels = () => {
  return [
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
};

const generateNpcModels = () => {
  return [
    {
      id: 1,
      src: FoxModelSrc,
      position: '0 1 140',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '',
    },
    {
      id: 2,
      src: FoxModelSrc,
      position: '0 1 90',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '',
    },
    {
      id: 3,
      src: FoxModelSrc,
      position: '0 1 40',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '',
    },
    {
      id: 4,
      src: FoxModelSrc,
      position: '0 1 0',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '',
    },
  ];
};

const startGame = async () => {
  gameState.value = 'playing';

  staticModelsList.value = generateStaticModels();
  npcModelsList.value = generateNpcModels();

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

const quitGame = async () => {
  gameState.value = 'menu';
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch (err) {
      console.warn(err);
    }
  }
};
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef">
    <div v-if="gameState === 'menu'" class="screen screen--menu">
      <div class="menu-content">
        <h1 class="game-title">FOREST FLIGHT</h1>
        <button class="start-btn" @click="startGame">START GAME</button>
      </div>
    </div>

    <div v-else-if="gameState === 'gameover'" class="screen screen--gameover">
      <div class="menu-content">
        <h1 class="game-title">GAME OVER</h1>
        <div class="button-group">
          <button class="start-btn" @click="startGame">RESTART</button>
          <button class="quit-btn" @click="quitGame">QUIT</button>
        </div>
      </div>
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
          fox-collider
          ammo-body="type: dynamic; emitCollisionEvents: true; gravity: 0 0 0; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 4 180"
          rotation="0 180 0"
          fly="speed: 7; forwardOffsetAngle: 180; maxPitchDeg: 40; type: autoForwardFixedDirection; canMoveVertically: false; keyUp: arrowup; keyDown: arrowdown; keyLeft: arrowleft; keyRight: arrowright;"
        >
          <a-entity
            :gltf-model="`${PaperAirplaneModelSrc}`"
            ammo-shape="type: hull;"
            position="0 0 0"
            scale="0.02 0.02 0.02"
            rotation="0 0 0"
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
          v-for="model in npcModelsList"
          :key="'npc-' + model.id"
          :id="'npc-' + model.id"
          :position="model.position"
          :rotation="model.rotation"
          ammo-body="type: dynamic; emitCollisionEvents: true; angularFactor: 0 0 0; mass: 5000; activationState: disableDeactivation;"
        >
          <a-entity
            :gltf-model="model.src"
            :ammo-shape="`type: hull; offset: ${model.offset};`"
            :scale="model.scale"
            :animation-mixer="`clip: ${model.idleClipName}; loop: repeat; crossFadeDuration: 0.3;`"
          ></a-entity>
        </a-entity>

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
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

.game-wrapper {
  width: 100%;
  height: 500px;
  background-color: #222;
  position: relative;
  overflow: hidden;
  font-family: 'Fredoka One', 'Comic Sans MS', cursive, sans-serif;
}

.game-wrapper:fullscreen {
  height: 100vh;
}

.screen {
  width: 100%;
  height: 100%;
}

.screen--menu,
.screen--gameover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #a8e063 0%, #2e7d32 100%);
  color: white;
  position: relative;
}

.screen--menu::before,
.screen--gameover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.menu-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.game-title {
  font-size: 6rem;
  line-height: 0.6;
  letter-spacing: 4px;
  color: #ffffff;
  margin: 0 0 50px 0;
  text-transform: uppercase;
  text-align: center;
  -webkit-text-stroke: 3px #4e342e;
  text-shadow:
    0 8px 0 #4e342e,
    0 15px 20px rgba(0, 0, 0, 0.5);
  animation: floatTitle 4s ease-in-out infinite;
}

.button-group {
  display: flex;
  gap: 20px;
  flex-direction: row;
}

.start-btn {
  font-family: 'Fredoka One', 'Comic Sans MS', cursive, sans-serif;
  font-size: 2.5rem;
  padding: 15px 70px;
  background-color: #ff8c00;
  color: white;
  border: 5px solid #4e342e;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow:
    0 10px 0 #bf360c,
    0 20px 25px rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease;
}

.start-btn:hover {
  background-color: #ffa726;
  transform: translateY(-2px);
  box-shadow:
    0 12px 0 #bf360c,
    0 25px 30px rgba(0, 0, 0, 0.4);
}

.start-btn:active {
  transform: translateY(10px);
  box-shadow:
    0 0 0 #bf360c,
    0 5px 10px rgba(0, 0, 0, 0.4);
}

.quit-btn {
  font-family: 'Fredoka One', 'Comic Sans MS', cursive, sans-serif;
  font-size: 2.5rem;
  padding: 15px 70px;
  background-color: #e53935;
  color: white;
  border: 5px solid #4e342e;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow:
    0 10px 0 #b71c1c,
    0 20px 25px rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease;
}

.quit-btn:hover {
  background-color: #ef5350;
  transform: translateY(-2px);
  box-shadow:
    0 12px 0 #b71c1c,
    0 25px 30px rgba(0, 0, 0, 0.4);
}

.quit-btn:active {
  transform: translateY(10px);
  box-shadow:
    0 0 0 #b71c1c,
    0 5px 10px rgba(0, 0, 0, 0.4);
}

@keyframes floatTitle {
  0% {
    transform: translateY(0px) rotate(-1deg);
  }
  50% {
    transform: translateY(-15px) rotate(1deg);
  }
  100% {
    transform: translateY(0px) rotate(-1deg);
  }
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
