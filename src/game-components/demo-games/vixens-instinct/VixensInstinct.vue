<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import 'aframe';

import './babies-counter.js';
import './health-bar.js';
import './stamina-bar.js';
import './time-counter.js';
import { obstacles } from './StaticModels.js';

import {
  GrassImageSrc,
  FoxModelSrc,
  CaveModelSrc,
  MountainModelSrc,
  PondModelSrc,
  FrogModelSrc,
  StagModelSrc,
  JeepModelSrc,
  PosedModelSrc,
  RabbitModelSrc,
  TreeModelSrc,
  Tree2ModelSrc,
  PineTreeModelSrc,
  PineconeModelSrc,
  BushModelSrc,
  RockModelSrcWalk,
  RocksModelSrc,
  babyFoxImageSrc,
} from '../constants';

import {
  trees,
  pineTrees,
  pineCones,
  rocks,
  trees2,
  singleRocks,
  bushes,
} from './StaticModels.js';

const GameStep = {
  Start: 'Start',
  Game: 'Game',
  Win: 'Win',
  Lose: 'Lose',
};

const FoxCharacter = {
  health: 100,
  stamina: 120,
  speed: 5,
  sprintSpeed: 10,
  gltfModel: './models/Fox.glb',
  babiesCounterImage: '/images/babyFox.png',
  gameOverImage: '/images/foxGameOver.png',
  winImage: '/images/foxWin.png',
  gltfModelBaby: './models/DeadFoxik.glb',
  babyPosition: '0.021 1.368 2.48',
  babyScale: '0.35 0.35 0.35',
};

const LevelSettings = {
  time: 75,
  criticalTime: 10,
};

const gameState = ref(GameStep.Start);
const isLoading = ref(false);
const isMounted = ref(false);
const renderScene = ref(false);
const gameWrapperRef = ref(null);

const hasBaby = ref(false);

const handleFullScreenChange = () => {
  if (!document.fullscreenElement && gameState.value !== GameStep.Start) {
    gameState.value = GameStep.Start;
  }
};

onMounted(async () => {
  isMounted.value = true;
  document.addEventListener('fullscreenchange', handleFullScreenChange);

  try {
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullScreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullScreenChange);
});

const startGame = async () => {
  isLoading.value = true;
  await nextTick();

  if (gameWrapperRef.value && !document.fullscreenElement) {
    try {
      await gameWrapperRef.value.requestFullscreen();
    } catch (err) {
      console.warn('Unable to enter full-screen mode:', err);
    }
  }

  gameState.value = GameStep.Game;

  setTimeout(() => {
    setTimeout(() => {
      addAllComponents();
      isLoading.value = false;
    }, 3000);
  }, 3000);
};

function addAllComponents() {
  addComponent(
    false,
    'ground',
    'ammo-body',
    'type: static; friction: 1; opacity: 0;'
  );
  addComponent(false, 'ground', 'ammo-shape', 'type: box;');
}

function addComponent(isClass, elementName, qualifiedName, value) {
  if (isClass) {
    const elements = document.querySelectorAll(elementName);
    elements.forEach((el) => {
      el.setAttribute(qualifiedName, value);
    });
  } else {
    const element = document.getElementById(elementName);
    element.setAttribute(qualifiedName, value);
  }
}
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef" v-if="isMounted">
    <div v-if="gameState === GameStep.Start" class="screen screen--menu">
      <h1>Vixen's Instinct</h1>
      <button @click="startGame">START GAME</button>
    </div>

    <div v-if="isLoading" class="screen screen--loading">
      <h2>Loading</h2>
    </div>

    <div v-if="gameState === GameStep.Game" class="screen screen--game">
      <a-scene v-if="renderScene" physics="driver: ammo;">
        <!--          shooters-->
        <a-entity
          v-for="(shooter, index) in obstacles.shooters"
          :key="'shooter-' + index"
          :gltf-model="ShooterModelSrc"
          :position="shooter.position"
          :rotation="shooter.rotation"
          :scale="shooter.scale"
          animation-mixer="clip: *Idle*"
          visible="true"
          class="shooter"
        >
          <a-entity
            :gltf-model="BulletModelSrc"
            position="11 2 1.5"
            scale="0.6 0.6 0.6"
            rotation="0 90 0"
            visible="true"
          >
          </a-entity>
        </a-entity>

        <!-- dogs hunters -->
        <a-entity
          v-for="(dog, index) in obstacles.dogs"
          :key="'dog-' + index"
          :position="dog.position"
          :gltf-model="DogModelSrc"
          :rotation="dog.rotation"
          :scale="dog.scale"
        >
        </a-entity>

        <!-- traps -->
        <a-entity
          v-for="(trap, index) in obstacles.traps"
          :key="'trap-' + index"
          :gltf-model="TrapModelSrc"
          :position="trap.position"
          :scale="trap.scale"
        >
        </a-entity>

        <!--          cave-->
        <a-entity
          :gltf-model="CaveModelSrc"
          position="15 0.4 -5"
          rotation="0 140 0"
          scale="2 2 2"
        >
          <a-entity>
            <a-entity
              id="baby"
              :visible="!hasBaby"
              :gltf-model="FoxModelSrc"
              position="0 0.2 -3"
              rotation="0 160 0"
              scale="0.15 0.15 0.15"
              animation-mixer="clip: Idle"
            >
            </a-entity>
          </a-entity>
        </a-entity>

        <!--          sky-->
        <a-sky color="#D9F6FF"></a-sky>

        <!-- health bar -->
        <a-entity
          id="hp"
          ref="healthBar"
          :health-bar="'max: ' + FoxCharacter.health"
          position="0 7.18 0"
        ></a-entity>

        <!-- stamina bar -->
        <a-entity
          id="stamina-bar"
          :stamina-bar="'max: ' + FoxCharacter.stamina"
          position="-3.4 7.18 0"
        >
        </a-entity>

        <!-- babies counter -->
        <a-entity
          id="babies-counter"
          :babies-counter="'image: ' + babyFoxImageSrc"
          position="3.4 7 0"
        ></a-entity>

        <!-- time counter -->
        <a-entity
          id="time-counter"
          :time-counter="`initialTime:${LevelSettings.time};criticalTime:${LevelSettings.criticalTime}`"
          position="7 7 0"
        ></a-entity>

        <!--          STATIC MODELS -->

        <!--          ground-->
        <a-box
          ammo-body="type: static"
          ammo-shape="type: box;"
          position="0 -0.2 -15"
          width="90"
          height="0.2"
          depth="70"
          :material="`src:${GrassImageSrc}; repeat: 45 35 `"
        ></a-box>

        <!-- mountain -->
        <a-entity
          :gltf-model="MountainModelSrc"
          scale="30 30 30"
          rotation="0 45 0"
          position="14 0.4 -20"
        ></a-entity>

        <a-entity
          :gltf-model="MountainModelSrc"
          scale="30 30 30"
          rotation="0 -45 0"
          position="-14 0.4 -20"
        ></a-entity>

        <!-- pond -->
        <a-entity
          :gltf-model="PondModelSrc"
          scale="0.04 0.04 0.04"
          rotation="0 0 0"
          position="-14 -0.33 -4"
        >
          <a-entity
            :gltf-model="FrogModelSrc"
            scale="0.4 0.4 0.4"
            rotation="0 45 0"
            position="90 19 0"
          ></a-entity>
        </a-entity>

        <!-- stag -->
        <a-entity
          :gltf-model="StagModelSrc"
          scale="0.4 0.4 0.4"
          rotation="0 45 0"
          animation-mixer="clip: *Eating*"
          position="10 1 -10.8"
        ></a-entity>
        <a-entity
          :gltf-model="StagModelSrc"
          scale="0.25 0.25 0.25"
          rotation="0 -45 0"
          animation-mixer="clip: *Eating*"
          position="12.8 0.2 -12"
        ></a-entity>

        <!-- jeep -->
        <a-entity
          :gltf-model="JeepModelSrc"
          scale="0.8 0.8 0.8"
          rotation="0 45 0"
          position="-4.5 1 -12"
        ></a-entity>

        <!-- posed -->
        <a-entity
          :gltf-model="PosedModelSrc"
          scale="1.5 1.5 1.5"
          position="-5 0.4 -7.8"
        ></a-entity>

        <!-- rabbits -->
        <a-entity
          :gltf-model="RabbitModelSrc"
          scale="0.01 0.01 0.01"
          rotation="0 -45 0"
          position="-5 0.2 -8.7"
        ></a-entity>

        <!-- trees -->
        <a-entity
          v-for="tree in trees"
          :gltf-model="TreeModelSrc"
          :position="tree.position"
          :rotation="tree.rotation"
          :scale="tree.scale"
        >
        </a-entity>

        <a-entity
          v-for="tree in trees2"
          :gltf-model="Tree2ModelSrc"
          :position="tree.position"
          :rotation="tree.rotation"
          :scale="tree.scale"
        >
        </a-entity>

        <a-entity
          v-for="tree in pineTrees"
          :gltf-model="PineTreeModelSrc"
          :position="tree.position"
          :rotation="tree.rotation"
          :scale="tree.scale"
        ></a-entity>

        <a-entity
          v-for="tree in pineCones"
          :gltf-model="PineconeModelSrc"
          :position="tree.position"
          :rotation="tree.rotation"
          :scale="tree.scale"
        ></a-entity>

        <!-- rocks -->
        <a-entity
          v-for="rock in rocks"
          :gltf-model="RocksModelSrc"
          :scale="rock.scale"
          :position="rock.position"
          :rotation="rock.rotation"
        >
        </a-entity>

        <a-entity
          v-for="rock in singleRocks"
          :gltf-model="RockModelSrcWalk"
          :scale="rock.scale"
          :position="rock.position"
          :rotation="rock.rotation"
        >
        </a-entity>

        <!-- bushes -->
        <a-entity
          v-for="bush in bushes"
          :gltf-model="BushModelSrc"
          :scale="bush.scale"
          :position="bush.position"
          :rotation="bush.rotation"
        >
        </a-entity>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

.screen--menu {
  background-color: #2e7d32;
}

.screen--loading {
  background-color: #111;
  z-index: 500;
  position: absolute;
  top: 0;
  left: 0;
}

.screen--game {
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

button {
  padding: 15px 30px;
  font-size: 1.5rem;
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  text-transform: uppercase;
  font-weight: bold;
}

button:hover {
  background-color: #ffa726;
}
</style>
