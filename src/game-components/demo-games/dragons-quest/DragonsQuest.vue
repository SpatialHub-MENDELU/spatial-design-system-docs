<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';
import {
  DemonModelSrc,
  TribalModelSrc,
  YetiModelSrc,
  IslandModelSrc,
  VolcanoModelSrc,
  WinterMountainModelSrc,
  PalmIslandModelSrc,
  DragonModelSrc,
} from '../constants';

type GameState = 'menu' | 'playing';

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);
const renderScene = ref(false);

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

const handleFullscreenChange = () => {
  if (!document.fullscreenElement) {
    gameState.value = 'menu';
  }
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  renderScene.value = true;
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

const startGame = async () => {
  gameState.value = 'playing';

  staticModelsList.value = [
    {
      id: 1,
      src: IslandModelSrc,
      position: '0 -50 -100',
      rotation: '0 0 0',
      scale: '60 60 60',
      offset: '0 22 0',
    },
    {
      id: 2,
      src: VolcanoModelSrc,
      position: '0 0 -100',
      rotation: '0 0 0',
      scale: '15 15 15',
      offset: '2 2 2',
    },
    {
      id: 3,
      src: PalmIslandModelSrc,
      position: '-100 -5 0',
      rotation: '0 -45 0',
      scale: '0.3 0.3 0.3',
      offset: '-4 7 -1',
    },
    {
      id: 5,
      src: IslandModelSrc,
      position: '-100 -50 0',
      rotation: '0 0 0',
      scale: '60 60 60',
      offset: '0 22 0',
    },
    {
      id: 6,
      src: WinterMountainModelSrc,
      position: '100 0 0',
      rotation: '0 0 0',
      scale: '25 25 25',
      offset: '0 1 3',
    },
    {
      id: 7,
      src: IslandModelSrc,
      position: '100 -50 0',
      rotation: '0 -45 0',
      scale: '60 60 60',
      offset: '0 22 0',
    },
    {
      id: 8,
      src: IslandModelSrc,
      position: '0 -50 100',
      rotation: '0 -45 0',
      scale: '60 60 60',
      offset: '0 22 0',
    },
  ];
  npcModelsList.value = [
    {
      id: 1,
      src: DemonModelSrc,
      position: '0 0 -85',
      rotation: '0 0 0',
      scale: '1 1 1',
      offset: '0 1.5 0',
      walkClipName: 'CharacterArmature|Fast_Flying',
      idleClipName: 'CharacterArmature|Flying_Idle',
      points: '0 0 -85,',
    },
    {
      id: 2,
      src: TribalModelSrc,
      position: '-85 -5 0',
      rotation: '0 0 0',
      scale: '1 1 1',
      offset: '0 2 0',
      walkClipName: 'CharacterArmature|Fast_Flying',
      idleClipName: 'CharacterArmature|Flying_Idle',
      points: '-85 -5 0,',
    },
    {
      id: 3,
      src: YetiModelSrc,
      position: '85 -5 0',
      rotation: '0 0 0',
      scale: '1 1 1',
      offset: '0 1.5 0.5',
      walkClipName: '*Walk*',
      idleClipName: '*Idle*',
      points: '85 -5 0,',
    },
  ];

  nextTick(() => {
    window.dispatchEvent(new Event('resize'));
  });

  if (
    gameWrapperRef.value &&
    gameWrapperRef.value.requestFullscreen &&
    !document.fullscreenElement
  ) {
    try {
      await gameWrapperRef.value.requestFullscreen();
    } catch (err) {
      console.warn(err);
    }
  }
};
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef" v-if="renderScene">
    <div v-if="gameState === 'menu'" class="screen screen--menu">
      <div class="menu-content">
        <h1>DRAGONS' QUEST</h1>
        <button class="start-btn" @click="startGame">START</button>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <a-scene physics="driver: ammo; debug: true;">
        <a-sky color="#AEE2FF"></a-sky>

        <!--                <a-box position="0 1 -4" rotation="0 45 0" color="#FFFFFF"></a-box>-->

<!--        <a-camera position="0 20 10"></a-camera>-->

        <!--                MAIN CHARACTER -->
        <a-entity
          fly="type: freeDirectionalFlight; flyClipName: *Dragon_Flying*; idleClipName: *Dragon_Flying*; sprintClipName:  *Dragon_Flying*; forwardOffsetAngle: 0; maxPitchDeg: 20; pitchSpeed: 120; maxRollDeg: 15; rollSpeed: 60; rotationSpeed: 60; sprint: true;"
          id="dragon-character"
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 20 0"
          rotation="0 180 0"
        >
          <a-entity
            :gltf-model="`${DragonModelSrc}`"
            ammo-shape="type: hull;"
            position="0 -2.1 0"
            scale="1 1 1"
          ></a-entity>
        </a-entity>

        <a-entity
          camera
          game-view="target: #dragon-character; distance: 5; height: 5;"
          rotation="-30 0 0"
        ></a-entity>

        <!--                ISLANDS -->
        <a-entity
          v-for="model in staticModelsList"
          :key="'static-' + model.id"
          :gltf-model="model.src"
          :position="model.position"
          :rotation="model.rotation"
          :scale="model.scale"
          ammo-body="type: static;"
          :ammo-shape="`type: hull; offset: ${model.offset};`"
        ></a-entity>

        <!--                NPC -->
        <a-entity
          v-for="model in npcModelsList"
          :key="'npc-' + model.id"
          :position="model.position"
          :rotation="model.rotation"
          ammo-body="type: dynamic; gravity: 0 0 0; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation;"
          animation-mixer="clip: idle; loop: repeat;"
        >
          <a-entity
            :gltf-model="model.src"
            :ammo-shape="`type: hull; offset: ${model.offset};`"
            :scale="model.scale"
            :animation-mixer="`clip: ${model.idleClipName}; loop: repeat; crossFadeDuration: 0.3;`"
          ></a-entity>
        </a-entity>
      </a-scene>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100%;
  height: 400px;
  background-color: #000000;
  position: relative;
  overflow: hidden;
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
  justify-content: center;
  align-items: center;
  background-color: #000000;
}

.menu-content {
  text-align: center;
  background: #000000;
  padding: 40px 60px;
  border: 2px solid #ffffff;
}

.menu-content h1 {
  font-family: monospace;
  color: #ffffff;
  font-size: 2.5rem;
  margin: 0 0 30px 0;
}

.start-btn {
  cursor: pointer;
  background: #000000;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: monospace;
  color: #ffffff;
  border: 2px solid #ffffff;
  transition: all 0.2s;
}

.start-btn:hover {
  background: #ffffff;
  color: #000000;
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
</style>
