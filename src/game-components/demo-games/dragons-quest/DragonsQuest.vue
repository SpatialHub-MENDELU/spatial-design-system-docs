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

if (typeof AFRAME !== 'undefined' && !AFRAME.components['html-compass']) {
  AFRAME.registerComponent('html-compass', {
    schema: {
      target: { type: 'string' },
      indicator: { type: 'string' },
    },
    tick: function () {
      const targetEl = document.querySelector(this.data.target);
      const indicatorEl = document.querySelector(
        this.data.indicator
      ) as HTMLElement;
      if (!targetEl || !indicatorEl) return;

      const cam = this.el.sceneEl?.camera;
      if (!cam) return;

      const targetPos = new THREE.Vector3();
      targetEl.object3D.getWorldPosition(targetPos);

      cam.updateMatrixWorld();
      targetPos.applyMatrix4(cam.matrixWorldInverse);

      const angle = Math.atan2(targetPos.x, -targetPos.z) * (180 / Math.PI);
      indicatorEl.style.transform = `rotate(${angle}deg)`;
    },
  });
}

type GameState = 'menu' | 'intro' | 'playing';

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
  hasQuestMarker?: boolean;
}

const staticModelsList = ref<StaticModel[]>([]);
const npcModelsList = ref<NpcModel[]>([]);

const handleFullscreenChange = () => {
  if (!document.fullscreenElement) {
    gameState.value = 'menu';
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (gameState.value === 'intro' && e.key === 'Enter') {
    gameState.value = 'playing';
  }
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  window.addEventListener('keydown', handleKeydown);
  renderScene.value = true;
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  window.removeEventListener('keydown', handleKeydown);
});

const startGame = async () => {
  gameState.value = 'intro';

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
      hasQuestMarker: true,
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
      <div class="fantasy-dialog">
        <h1>DRAGONS' QUEST</h1>
        <button class="fantasy-btn" @click="startGame">START ADVENTURE</button>
      </div>
    </div>

    <div v-else-if="gameState === 'intro'" class="screen screen--intro">
      <div class="fantasy-dialog story-dialog">
        <h2>Chapter 1: The Lost Fire</h2>
        <p>
          Oh no! You woke up and your dragon fire is gone! You caught a terrible
          dragon cold. You must find a cure to get your flames back.
        </p>
        <p>
          Go find the <strong>Yeti</strong> in the snowy mountains. He might
          know what to do!
        </p>
        <div class="press-enter">Press [ENTER] to start your quest</div>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <div class="compass-container">
        <div id="quest-arrow" class="quest-arrow">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L20 20L12 16L4 20L12 2Z"
              fill="#FFD700"
              stroke="#4a0e0e"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>

      <a-scene
        physics="driver: ammo; debug: true;"
        html-compass="target: #npc-3; indicator: #quest-arrow"
      >
        <a-sky color="#AEE2FF"></a-sky>

        <a-entity
          fly="type: freeDirectionalFlight; flyClipName: *Dragon_Flying*; idleClipName: *Dragon_Flying*; sprintClipName:  *Dragon_Flying*; forwardOffsetAngle: 0; maxPitchDeg: 20; pitchSpeed: 120; maxRollDeg: 15; rollSpeed: 60; rotationSpeed: 60; sprint: true;"
          id="dragon-character"
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 0 100"
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
          game-view="target: #dragon-character; type: thirdPersonFollow; distance: 5; height: 5;"
          rotation="-30 0 0"
        ></a-entity>

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

        <a-entity
          v-for="model in npcModelsList"
          :key="'npc-' + model.id"
          :id="'npc-' + model.id"
          :position="model.position"
          :rotation="model.rotation"
          ammo-body="type: dynamic; gravity: 0 0 0; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation;"
        >
          <a-entity
            v-if="model.hasQuestMarker"
            text="value: !; color: #FFD700; align: center; width: 20; wrapCount: 10; font: mozillavr;"
            position="0 6.5 0"
            material="emissive: #FFD700"
          ></a-entity>

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
  background-color: #1a0505;
  position: relative;
  overflow: hidden;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.game-wrapper:fullscreen {
  height: 100vh;
}

.screen {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a0505;
}

.fantasy-dialog {
  text-align: center;
  background: #4a0e0e;
  padding: 40px 60px;
  border: 3px solid #ffd700;
  border-radius: 8px;
  box-shadow:
    0 0 30px rgba(255, 215, 0, 0.2),
    inset 0 0 20px rgba(0, 0, 0, 0.8);
}

.fantasy-dialog h1 {
  color: #ffd700;
  font-size: 3rem;
  margin: 0 0 30px 0;
  text-shadow: 2px 2px 4px #000000;
  letter-spacing: 2px;
}

.story-dialog {
  max-width: 600px;
  padding: 30px 50px;
}

.story-dialog h2 {
  color: #ffd700;
  font-size: 2rem;
  margin-top: 0;
  border-bottom: 1px solid #ffd700;
  padding-bottom: 10px;
}

.story-dialog p {
  color: #fdf5e6;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
}

.press-enter {
  margin-top: 30px;
  color: #ffd700;
  font-size: 1rem;
  font-style: italic;
  animation: blink 1.5s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.fantasy-btn {
  cursor: pointer;
  background: #2a0505;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Georgia', 'Times New Roman', serif;
  color: #ffd700;
  border: 2px solid #ffd700;
  border-radius: 4px;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.fantasy-btn:hover {
  background: #ffd700;
  color: #2a0505;
  box-shadow: 0 0 15px #ffd700;
}

.screen--game {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

.compass-container {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  z-index: 100;
  pointer-events: none;
}

.quest-arrow {
  width: 100%;
  height: 100%;
  transform-origin: center center;
}

.quest-arrow svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.6));
}
</style>
