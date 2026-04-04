<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AFRAME from 'aframe';
import 'aframe';
import {
  PaperAirplaneModelSrc,
  ForestModelSrc,
  DockModelSrc,
  FoxModelSrc,
  RockModelSrc,
} from '../constants';

type GameState = 'menu' | 'playing' | 'gameover' | 'victory';

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
  speed: number;
}

const staticModelsList = ref<StaticModel[]>([]);
const npcModelsList = ref<NpcModel[]>([]);

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);

const showHint = ref(false);
let hintTimeout: ReturnType<typeof setTimeout>;

if (typeof AFRAME !== 'undefined' && !AFRAME.components['fox-collider']) {
  AFRAME.registerComponent('fox-collider', {
    init: function () {
      this.el.addEventListener('collidestart', (e: any) => {
        const targetEl = e.detail.targetEl;
        if (targetEl && targetEl.id) {
          if (targetEl.id.startsWith('npc-')) {
            window.dispatchEvent(new Event('gameover-event'));
          } else if (targetEl.id.startsWith('static-')) {
            const idNum = parseInt(targetEl.id.replace('static-', ''));
            if (idNum >= 21) {
              window.dispatchEvent(new Event('gameover-event'));
            }
          }
        }
      });
    },
  });
}

if (typeof AFRAME !== 'undefined' && !AFRAME.components['victory-checker']) {
  AFRAME.registerComponent('victory-checker', {
    tick: function () {
      if (this.el.object3D.position.z <= -20) {
        window.dispatchEvent(new Event('victory-event'));
      }
    },
  });
}

const handleFullscreenChange = () => {
  if (
    !document.fullscreenElement &&
    (gameState.value === 'playing' ||
      gameState.value === 'gameover' ||
      gameState.value === 'victory')
  ) {
    gameState.value = 'menu';
  }
};

const handleGameOver = () => {
  if (gameState.value === 'playing') {
    gameState.value = 'gameover';
  }
};

const handleVictory = () => {
  if (gameState.value === 'playing') {
    gameState.value = 'victory';
  }
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  window.addEventListener('gameover-event', handleGameOver);
  window.addEventListener('victory-event', handleVictory);
});

onMounted(async () => {
  try {
    await import('spatial-design-system/components/game/fly');
    await import('spatial-design-system/components/game/gameview');
    await import('spatial-design-system/components/game/npcWalk');
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  window.removeEventListener('gameover-event', handleGameOver);
  window.removeEventListener('victory-event', handleVictory);
  if (hintTimeout) clearTimeout(hintTimeout);
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
      position: '0 -1.5 140',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
    {
      id: 18,
      src: DockModelSrc,
      position: '0 -1.5 90',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
    {
      id: 19,
      src: DockModelSrc,
      position: '0 -1.5 40',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
    {
      id: 20,
      src: DockModelSrc,
      position: '0 -1.5 0',
      rotation: '0 90 0',
      scale: '19 19 19',
      offset: '0 -2.9 0',
    },
    // rocks
    {
      id: 21,
      src: RockModelSrc,
      position: '0 -0.2 175',
      rotation: '0 0 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 22,
      src: RockModelSrc,
      position: '-5 -0.4 165',
      rotation: '0 180 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 23,
      src: RockModelSrc,
      position: '3 0 160',
      rotation: '0 45 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 24,
      src: RockModelSrc,
      position: '8 -0.1 165',
      rotation: '0 90 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 25,
      src: RockModelSrc,
      position: '-6 -0.5 157',
      rotation: '0 90 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 26,
      src: RockModelSrc,
      position: '0 -0.3 150',
      rotation: '0 90 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    // next set of rocks
    {
      id: 27,
      src: RockModelSrc,
      position: '4 -0.2 132',
      rotation: '0 15 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 28,
      src: RockModelSrc,
      position: '-5 -0.1 128',
      rotation: '0 87 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 30,
      src: RockModelSrc,
      position: '-1 -0.4 119',
      rotation: '0 210 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 31,
      src: RockModelSrc,
      position: '-8 0 116',
      rotation: '0 305 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 32,
      src: RockModelSrc,
      position: '8 -0.5 113',
      rotation: '0 45 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 33,
      src: RockModelSrc,
      position: '-6 -0.2 110',
      rotation: '0 175 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 35,
      src: RockModelSrc,
      position: '6 -0.3 102',
      rotation: '0 95 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 36,
      src: RockModelSrc,
      position: '-4 -0.1 100',
      rotation: '0 330 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    // next set of rocks
    {
      id: 37,
      src: RockModelSrc,
      position: '5 -0.4 84',
      rotation: '0 12 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 38,
      src: RockModelSrc,
      position: '-6 -0.2 82',
      rotation: '0 104 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 39,
      src: RockModelSrc,
      position: '2 0 77',
      rotation: '0 220 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 40,
      src: RockModelSrc,
      position: '-2 -0.5 73',
      rotation: '0 55 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 41,
      src: RockModelSrc,
      position: '8 -0.1 69',
      rotation: '0 310 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 42,
      src: RockModelSrc,
      position: '-7 -0.3 64',
      rotation: '0 180 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 43,
      src: RockModelSrc,
      position: '0 -0.2 60',
      rotation: '0 275 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 44,
      src: RockModelSrc,
      position: '-4 -0.4 56',
      rotation: '0 90 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 45,
      src: RockModelSrc,
      position: '6 -0.1 52',
      rotation: '0 15 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 46,
      src: RockModelSrc,
      position: '-1 0 52',
      rotation: '0 199 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    // next set of rocks
    {
      id: 47,
      src: RockModelSrc,
      position: '0 -0.5 32',
      rotation: '0 15 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 48,
      src: RockModelSrc,
      position: '-7 -0.2 30',
      rotation: '0 84 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 49,
      src: RockModelSrc,
      position: '5 -0.3 28',
      rotation: '0 170 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 50,
      src: RockModelSrc,
      position: '-2 -0.1 26',
      rotation: '0 220 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 51,
      src: RockModelSrc,
      position: '8 -0.4 24',
      rotation: '0 310 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 52,
      src: RockModelSrc,
      position: '1 -0.2 22',
      rotation: '0 45 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 53,
      src: RockModelSrc,
      position: '-9 -0.5 19',
      rotation: '0 135 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 54,
      src: RockModelSrc,
      position: '-4 0 17',
      rotation: '0 260 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 55,
      src: RockModelSrc,
      position: '4 -0.1 15',
      rotation: '0 15 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 56,
      src: RockModelSrc,
      position: '10 -0.3 13',
      rotation: '0 105 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 57,
      src: RockModelSrc,
      position: '-1 -0.4 10',
      rotation: '0 200 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
    {
      id: 58,
      src: RockModelSrc,
      position: '-6 -0.2 8',
      rotation: '0 340 0',
      scale: '15 15 15',
      offset: '0 1.6 -0.2',
    },
  ];
};

const generateNpcModels = () => {
  return [
    {
      id: 1,
      src: FoxModelSrc,
      position: '0 0 140',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '-6 0 140, 6 0 140',
      speed: 4,
    },
    {
      id: 2,
      src: FoxModelSrc,
      position: '0 0 90',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '-6 0 90, 6 0 90',
      speed: 5,
    },
    {
      id: 3,
      src: FoxModelSrc,
      position: '0 0 40',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '-5.5 0 40, 5.5 0 40',
      speed: 6,
    },
    {
      id: 4,
      src: FoxModelSrc,
      position: '0 0 0',
      rotation: '0 90 0',
      scale: '1.4 1.4 1.4',
      offset: '-0.5 1.8 0',
      walkClipName: 'Walk',
      idleClipName: 'Idle',
      points: '-6 0 0, 6 0 0',
      speed: 7,
    },
  ];
};

const startGame = async () => {
  gameState.value = 'playing';

  showHint.value = true;
  if (hintTimeout) clearTimeout(hintTimeout);
  hintTimeout = setTimeout(() => {
    showHint.value = false;
  }, 5000);

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
  if (hintTimeout) clearTimeout(hintTimeout);
  showHint.value = false;
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

    <div v-else-if="gameState === 'victory'" class="screen screen--victory">
      <div class="menu-content">
        <h1 class="game-title">VICTORY!</h1>
        <div class="button-group">
          <button class="start-btn" @click="startGame">PLAY AGAIN</button>
          <button class="quit-btn" @click="quitGame">QUIT</button>
        </div>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <div v-if="showHint" class="game-hint">
        <div class="hint-line">USE <span class="arrows">⬅ ➡</span></div>
        <div class="hint-line">ARROWS TO MOVE</div>
      </div>

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
          id="plane"
          fox-collider
          victory-checker
          ammo-body="type: dynamic; emitCollisionEvents: true; gravity: 0 0 0; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 2 200"
          rotation="0 180 0"
          fly="speed: 10; forwardOffsetAngle: 180; rollSpeed: 150; maxRollDeg: 15;  type: autoForwardFixedDirection; canMoveVertically: false; keyLeft: arrowleft; keyRight: arrowright;"
        >
          <a-entity
            :gltf-model="`${PaperAirplaneModelSrc}`"
            ammo-shape="type: hull;"
            position="0 0 0"
            scale="0.01 0.01 0.01"
            rotation="0 0 0"
          ></a-entity>
        </a-entity>

        <a-entity
          camera
          game-view="target: #plane; type: thirdPersonFixed; distance: 9; height: 7; tilt: -10;"
        >
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
          ammo-body="type: static; emitCollisionEvents: true;"
          :ammo-shape="`type: hull; offset: ${model.offset};`"
        ></a-entity>

        <a-entity
          v-for="model in npcModelsList"
          :key="'npc-' + model.id"
          :id="'npc-' + model.id"
          :position="model.position"
          :rotation="model.rotation"
          ammo-body="type: dynamic; emitCollisionEvents: true; angularFactor: 0 0 0; mass: 5000; activationState: disableDeactivation;"
          :npc-walk="`points: ${model.points}; speed: ${model.speed}; walkClipName: ${model.walkClipName}; idleClipName: ${model.idleClipName};`"
        >
          <a-entity
            :gltf-model="model.src"
            :ammo-shape="`type: hull; offset: ${model.offset};`"
            :scale="model.scale"
          ></a-entity>
        </a-entity>
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
.screen--gameover,
.screen--victory {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #a8e063 0%, #2e7d32 100%);
  color: white;
  position: relative;
}

.screen--menu::before,
.screen--gameover::before,
.screen--victory::before {
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

.game-hint {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: white;
  font-size: 3.5rem;
  text-align: center;
  background: rgba(34, 64, 86, 0.85);
  padding: 50px 90px;
  border-radius: 40px;
  border: 8px solid #ff8c00;
  pointer-events: none;
  animation: fadeOutHint 5s forwards;
  text-shadow: 4px 4px 0 #000;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6);
  white-space: nowrap;
}

.hint-line {
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrows {
  font-size: 5rem;
  margin: 0 30px;
  letter-spacing: 30px;
}

@keyframes fadeOutHint {
  0% {
    opacity: 0;
    top: 10%;
  }
  10% {
    opacity: 1;
    top: 15%;
  }
  80% {
    opacity: 1;
    top: 15%;
  }
  100% {
    opacity: 0;
    top: 10%;
  }
}
</style>
