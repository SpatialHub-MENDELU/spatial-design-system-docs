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

type GameState = 'menu' | 'intro' | 'playing' | 'end';

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);
const renderScene = ref(false);

const currentQuestStep = ref(0);
const showInteractPrompt = ref(false);
const activeDialogText = ref<string | null>(null);
const distToTarget = ref(0);
const arrowRotation = ref(0);

const questSteps = [
  {
    npcId: 'npc-3',
    marker: '!',
    dialog:
      "Yeti: Hello dragon! I see you lost your fire. I have a 'Healing Herb' frozen in this ice, but it's too hard for me to break. Go to the Demon in the Volcano, his hellfire is the only thing that can melt magical ice!",
  },
  {
    npcId: 'npc-1',
    marker: '!',
    dialog:
      'Demon: A frozen herb? I can melt it, but my fire is too wild. I would burn it to ashes! Go to the Tribal Shaman on the tropical island, I need a special Fireproof Leaf to protect the herb.',
  },
  {
    npcId: 'npc-2',
    marker: '!',
    dialog:
      'Tribal Shaman: Welcome, dragon. I have been guarding this ancient Fireproof Leaf in our sanctuary. Take it! Now you can safely melt the herb and get your dragon fire back!',
  },
];

if (typeof AFRAME !== 'undefined' && !AFRAME.components['minimap-updater']) {
  AFRAME.registerComponent('minimap-updater', {
    tick: function () {
      const player = document.querySelector('#dragon-character');
      if (!player) return;

      const pPos = player.object3D.position;
      const pRotY = player.object3D.rotation.y;

      const playerIcon = document.getElementById('minimap-player-icon');
      if (playerIcon) {
        playerIcon.style.transform = `rotate(${-pRotY + Math.PI}rad)`;
      }

      const scale = 0.5;

      const updateMarkers = (selector: string) => {
        const markers = document.querySelectorAll(selector);
        markers.forEach((marker) => {
          const m = marker as HTMLElement;
          const targetId = m.getAttribute('data-target');
          if (!targetId) return;

          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const tPos = targetEl.object3D.position;
            const dx = (tPos.x - pPos.x) * scale;
            const dz = (tPos.z - pPos.z) * scale;

            m.style.left = `calc(50% + ${dx}px)`;
            m.style.top = `calc(50% + ${dz}px)`;
          }
        });
      };

      updateMarkers('.minimap-marker-island');
      updateMarkers('.minimap-marker-npc');
    },
  });
}

if (typeof AFRAME !== 'undefined' && !AFRAME.components['game-logic']) {
  AFRAME.registerComponent('game-logic', {
    tick: function () {
      const player = document.querySelector('#dragon-character');
      const currentStep = questSteps[currentQuestStep.value];

      if (!player || !currentStep || gameState.value !== 'playing') {
        showInteractPrompt.value = false;
        return;
      }

      const targetNpc = document.querySelector(`#${currentStep.npcId}`);
      if (!targetNpc) return;

      const pPos = player.object3D.position;
      const tPos = targetNpc.object3D.position;

      const dist = pPos.distanceTo(tPos);
      distToTarget.value = dist;
      showInteractPrompt.value = dist < 12;

      const dx = tPos.x - pPos.x;
      const dz = tPos.z - pPos.z;
      const angleToTarget = Math.atan2(dx, dz);
      const playerRotation = player.object3D.rotation.y;
      arrowRotation.value =
        (angleToTarget - playerRotation) * (180 / Math.PI) + 180;
    },
  });
}

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
  if (!document.fullscreenElement && gameState.value !== 'menu') {
    gameState.value = 'menu';
  }
};

const handleInteraction = () => {
  if (showInteractPrompt.value && !activeDialogText.value) {
    activeDialogText.value = questSteps[currentQuestStep.value].dialog;
  } else if (activeDialogText.value) {
    activeDialogText.value = null;
    if (currentQuestStep.value < questSteps.length - 1) {
      currentQuestStep.value++;
    } else {
      gameState.value = 'end';
    }
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (gameState.value === 'intro' && e.key === 'Enter') {
    gameState.value = 'playing';
  } else if (gameState.value === 'playing' && e.key === 'Enter') {
    handleInteraction();
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

const restartGame = () => {
  currentQuestStep.value = 0;
  activeDialogText.value = null;
  gameState.value = 'playing';
};

const quitGame = async () => {
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen();
    } catch (err) {
      console.warn(err);
    }
  }
  gameState.value = 'menu';
  currentQuestStep.value = 0;
  activeDialogText.value = null;
};

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
    },
  ];

  nextTick(() => {
    window.dispatchEvent(new Event('resize'));
  });

  if (gameWrapperRef.value && !document.fullscreenElement) {
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
        <h2>The Lost Fire</h2>
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

    <div v-else-if="gameState === 'end'" class="screen screen--end">
      <div class="fantasy-dialog">
        <h1>QUEST COMPLETE</h1>
        <p style="color: #fdf5e6; font-size: 1.2rem; margin-bottom: 30px">
          You have found the Fireproof Leaf and cured your dragon cold!<br />
          The skies are yours to burn again.
        </p>
        <div class="end-actions">
          <button class="fantasy-btn" @click="restartGame">
            RESTART QUEST
          </button>
          <button class="fantasy-btn fantasy-btn--secondary" @click="quitGame">
            QUIT TO MENU
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <div
        class="quest-arrow-container"
        v-if="questSteps[currentQuestStep]?.npcId"
      >
        <div
          class="quest-arrow"
          :style="{ transform: `rotate(${arrowRotation}deg)` }"
        >
          ▲
        </div>
        <div class="quest-dist">{{ Math.round(distToTarget) }}m</div>
      </div>

      <div
        v-if="showInteractPrompt && !activeDialogText"
        class="interact-prompt"
      >
        Press <span class="key-hint">ENTER</span> to talk
      </div>

      <div v-if="activeDialogText" class="dialog-overlay">
        <div class="fantasy-dialog quest-box">
          <p>{{ activeDialogText }}</p>
          <div class="press-enter">[ Press ENTER to continue ]</div>
        </div>
      </div>

      <div class="minimap-wrapper">
        <div class="minimap-content">
          <div id="minimap-player-icon" class="minimap-player">
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
          <div
            v-for="model in staticModelsList"
            :key="'mm-stat-' + model.id"
            class="minimap-marker-island"
            :data-target="`#static-${model.id}`"
          ></div>
          <div
            v-for="model in npcModelsList"
            :key="'mm-npc-' + model.id"
            class="minimap-marker-npc"
            :data-target="`#npc-${model.id}`"
          >
            <span
              v-if="questSteps[currentQuestStep]?.npcId === 'npc-' + model.id"
              class="minimap-quest"
            >
              {{ questSteps[currentQuestStep].marker }}
            </span>
          </div>
        </div>
      </div>

      <a-scene physics="driver: ammo; debug: false;" minimap-updater game-logic>
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
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 100; activationState: disableDeactivation;"
        >
            <a-entity
                v-if="questSteps[currentQuestStep]?.npcId === 'npc-' + model.id"
                position="0 5 0"
                animation="property: position; to: 0 7.5 0; dir: alternate; dur: 1000; loop: true; easing: easeInOutSine"
                animation__rotate="property: rotation; to: 0 360 0; dur: 4000; loop: true; easing: linear"
            >
                <a-entity v-if="questSteps[currentQuestStep].marker === '!'">
                    <a-cylinder color="#FFD700" height="1.5" radius="0.15" position="0 1.1 0"></a-cylinder>
                    <a-sphere color="#FFD700" radius="0.2" position="0 0 0"></a-sphere>
                </a-entity>
            </a-entity>
          <a-entity
            :gltf-model="model.src"
            :ammo-shape="`type: hull; offset: ${model.offset};`"
            :scale="model.scale"
            :animation-mixer="`clip: ${model.idleClipName}; loop: repeat; crossFadeDuration: 0.3;`"
          ></a-entity>
        </a-entity>
      </a-scene>

      <div class="controls-guide">
        <div class="controls-title">DRAGON CONTROLS</div>
        <div class="controls-grid">
          <div class="control-item">
            <span class="key">W</span> <span>Forward</span>
          </div>
          <div class="control-item">
            <span class="key">S</span> <span>Backward</span>
          </div>
          <div class="control-item">
            <span class="key">A</span> <span>Left</span>
          </div>
          <div class="control-item">
            <span class="key">D</span> <span>Right</span>
          </div>
          <hr class="controls-divider" />
          <div class="control-item">
            <span class="key">Space</span> <span>Fly Up</span>
          </div>
          <div class="control-item">
            <span class="key">C</span> <span>Descend</span>
          </div>
          <div class="control-item">
            <span class="key">Shift</span> <span>Sprint</span>
          </div>
        </div>
      </div>
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

.fantasy-btn--secondary {
  background: #1a0505;
  border-color: rgba(255, 215, 0, 0.5);
  font-size: 1rem;
  margin-top: 10px;
}

.end-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
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

.minimap-wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid #ffd700;
  background-color: rgba(30, 10, 10, 0.9);
  overflow: hidden;
  z-index: 100;
  box-shadow:
    0 0 20px rgba(0, 0, 0, 0.8),
    inset 0 0 15px rgba(0, 0, 0, 0.7);
}

.minimap-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.minimap-player {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  margin-left: -15px;
  z-index: 10;
  transform-origin: center center;
}

.minimap-player svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.9));
}

.minimap-marker-island {
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: rgba(80, 60, 45, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.4);
}

.minimap-marker-npc {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #666666;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.minimap-quest {
  color: #ffd700;
  font-weight: 900;
  font-size: 28px;
  text-shadow:
    2px 2px 0 #000,
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000;
  position: absolute;
  top: -24px;
  font-family: Arial, sans-serif;
  z-index: 20;
}

.controls-guide {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(74, 14, 14, 0.85);
  border: 2px solid #ffd700;
  border-radius: 8px;
  padding: 15px;
  color: #fdf5e6;
  z-index: 100;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  min-width: 180px;
}

.controls-title {
  color: #ffd700;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.3);
  padding-bottom: 5px;
  letter-spacing: 1px;
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6px;
}

.control-item {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.key {
  display: inline-block;
  min-width: 26px;
  height: 24px;
  background: #2a0505;
  border: 1px solid #ffd700;
  border-radius: 4px;
  color: #ffd700;
  text-align: center;
  line-height: 22px;
  margin-right: 12px;
  font-weight: bold;
  font-size: 0.7rem;
  box-shadow:
    inset 0 0 5px rgba(0, 0, 0, 0.5),
    0 2px 0 rgba(0, 0, 0, 0.3);
  padding: 0 4px;
}

.controls-divider {
  border: 0;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  margin: 4px 0;
}

.control-item:nth-child(6) .key,
.control-item:nth-child(8) .key {
  min-width: 55px;
}

.quest-arrow-container {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 110;
  pointer-events: none;
}

.quest-arrow {
  font-size: 40px;
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  transition: transform 0.1s ease-out;
}

.quest-dist {
  color: #fdf5e6;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000;
}

.interact-prompt {
  position: absolute;
  bottom: 180px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(74, 14, 14, 0.9);
  padding: 12px 25px;
  border: 2px solid #ffd700;
  color: #fdf5e6;
  border-radius: 8px;
  z-index: 100;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  font-weight: bold;
}

.key-hint {
  color: #ffd700;
  background: #2a0505;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #ffd700;
  margin: 0 5px;
}

.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}

.quest-box {
  max-width: 500px;
  border-width: 4px;
}

.quest-box p {
  color: #fdf5e6;
  font-size: 1.3rem;
  line-height: 1.5;
}
</style>
