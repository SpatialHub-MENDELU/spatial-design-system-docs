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
  DirectionArrowModelSrc,
  TrapModelSrc,
  DogModelSrc,
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
const putBaby = ref(false);

const handleFullScreenChange = () => {
  if (!document.fullscreenElement && gameState.value !== GameStep.Start) {
    gameState.value = GameStep.Start;
  }
};

onMounted(async () => {
  isMounted.value = true;
  await import('spatial-design-system/components/game/walk');
  await import('spatial-design-system/components/game/gameview');
  await import('spatial-design-system/components/game/npcWalk');
  registerAframeComponents();
  document.addEventListener('fullscreenchange', handleFullScreenChange);

  try {
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
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

const addAllComponents = () => {
  addComponent(false, 'ground', 'ammo-body', 'type: static;');
  addComponent(false, 'ground', 'ammo-shape', 'type: box;');

  addComponent(true, '.static-collidable', 'ammo-body', 'type: static');
  addComponent(true, '.static-collidable', 'ammo-shape', 'type: box');

  const caveEl = document.querySelector('#cave-entity');
  if (caveEl) {
    const initCave = () => {
      addComponent(false, 'cave-entity', 'ammo-body', 'type: static');
      addComponent(
        false,
        'cave-entity',
        'ammo-shape',
        'type: hull; offset: 0 0.5 -1;'
      );
    };
    if (caveEl.getObject3D('mesh')) initCave();
    else caveEl.addEventListener('model-loaded', initCave, { once: true });
  }

  const foxModelEl = document.querySelector('#main-character-model');
  if (foxModelEl) {
    const initFox = () => {
      handleFoxDeath();
      addComponent(
        false,
        'main-character',
        'ammo-body',
        'type: dynamic; angularFactor: 0 0 0; mass: 100; activationState: disableDeactivation'
      );
      addComponent(
        false,
        'main-character-model',
        'ammo-shape',
        'type: hull; offset: 0 0.6 0;'
      );

      addComponent(
        false,
        'main-character',
        'proximity-trigger',
        'target: #baby; radius: 2.5; event: baby-found'
      );
      addComponent(false, 'main-character', 'trap-manager', '');
      addComponent(false, 'main-character', 'dog-manager', '');
      const foxEl = document.getElementById('main-character');
      if (foxEl) {
        foxEl.addEventListener(
          'baby-found',
          () => {
            hasBaby.value = true;
          },
          { once: true }
        );
      }
      setTimeout(() => {
        addComponent(
          false,
          'main-character',
          'walk',
          `speed: ${FoxCharacter.speed}; sprintSpeed: ${FoxCharacter.sprintSpeed}; turnType: stepTurnDiagonal; rotationSpeed: 650; walkClipName: Walk; sprintClipName: Gallop; idleClipName: Idle;`
        );
      }, 50);
    };

    if (foxModelEl.getObject3D('mesh')) {
      initFox();
    } else {
      foxModelEl.addEventListener('model-loaded', initFox, { once: true });
    }
  }
  obstacles.dogs.forEach((dog) => {
    const dogContainerId = `dog-${dog.id}`;
    const dogContainerEl = document.querySelector(`#${dogContainerId}`);

    const dogModelEl = dogContainerEl
      ? dogContainerEl.querySelector('a-entity')
      : null;

    if (dogModelEl) {
      const initDog = () => {
        addComponent(
          false,
          dogContainerId,
          'ammo-body',
          'type: dynamic; angularFactor: 0 0 0; mass: 500; activationState: disableDeactivation'
        );
        dogModelEl.setAttribute('ammo-shape', 'type: hull; offset: 0 0.8 0.3');

        setTimeout(() => {
          addComponent(
            false,
            dogContainerId,
            'npc-walk',
            `points: ${dog.points}; speed: 4; pauseAtPoints: 1; slowDownRadius: 0.5;`
          );
        }, 50);
      };

      if (dogModelEl.getObject3D('mesh')) {
        initDog();
      } else {
        dogModelEl.addEventListener('model-loaded', initDog, { once: true });
      }
    }
  });

  addComponent(true, '.bush-obs-entity', 'ammo-body', 'type: static');
  addComponent(
    true,
    '.bush-obs-entity',
    'ammo-shape',
    'type: hull; offset: 0 0 0'
  );
};

function addComponent(isClass, elementName, qualifiedName, value) {
  if (isClass) {
    const elements = document.querySelectorAll(elementName);
    elements.forEach((el) => {
      el.setAttribute(qualifiedName, value);
    });
  } else {
    const element = document.getElementById(elementName);
    if (element) {
      element.setAttribute(qualifiedName, value);
    }
  }
}

function registerAframeComponents() {
  if (
    typeof AFRAME !== 'undefined' &&
    !AFRAME.components['proximity-trigger']
  ) {
    AFRAME.registerComponent('proximity-trigger', {
      schema: {
        target: { type: 'selector' },
        radius: { type: 'number', default: 1.5 },
        event: { type: 'string', default: 'reached' },
      },
      init: function () {
        this.targetWorldPos = new THREE.Vector3();
        this.entityWorldPos = new THREE.Vector3();
      },
      tick: function () {
        if (!this.data.target) return;

        this.data.target.object3D.getWorldPosition(this.targetWorldPos);
        this.el.object3D.getWorldPosition(this.entityWorldPos);

        const distance = this.entityWorldPos.distanceTo(this.targetWorldPos);

        if (distance < this.data.radius) {
          this.el.emit(this.data.event);
          this.el.removeAttribute('proximity-trigger');
        }
      },
    });
  }

  if (typeof AFRAME !== 'undefined' && !AFRAME.components['trap-manager']) {
    AFRAME.registerComponent('trap-manager', {
      init: function () {
        this.traps = document.querySelectorAll('.trap-entity');
        this.foxPos = new THREE.Vector3();
        this.trapPos = new THREE.Vector3();

        this.triggerDistance = 0.8;

        this.isDead = false;
      },

      tick: function () {
        if (this.isDead || !this.traps.length) return;

        this.el.object3D.getWorldPosition(this.foxPos);

        for (let i = 0; i < this.traps.length; i++) {
          let trap = this.traps[i];
          trap.object3D.getWorldPosition(this.trapPos);

          let dx = this.foxPos.x - this.trapPos.x;
          let dz = this.foxPos.z - this.trapPos.z;
          let distance = Math.sqrt(dx * dx + dz * dz);

          if (distance < this.triggerDistance) {
            this.isDead = true;
            this.el.emit('fox-death');
            break;
          }
        }
      },
    });
  }
    if (typeof AFRAME !== 'undefined' && !AFRAME.components['dog-manager']) {
        AFRAME.registerComponent('dog-manager', {
            init: function () {
                this.dogs = document.querySelectorAll('.dog-entity');
                this.foxPos = new THREE.Vector3();
                this.dogPos = new THREE.Vector3();
                this.triggerDistance = 1.8;
                this.isDead = false;
            },

            tick: function () {
                if (this.isDead || !this.dogs.length) return;

                this.el.object3D.getWorldPosition(this.foxPos);

                for (let i = 0; i < this.dogs.length; i++) {
                    let dog = this.dogs[i];
                    dog.object3D.getWorldPosition(this.dogPos);

                    let dx = this.foxPos.x - this.dogPos.x;
                    let dz = this.foxPos.z - this.dogPos.z;
                    let distance = Math.sqrt(dx * dx + dz * dz);

                    if (distance < this.triggerDistance) {
                        this.isDead = true;

                        dog.removeAttribute('npc-walk');

                        const dogModel = dog.querySelector('.dog-model');
                        if (dogModel) {
                            dogModel.setAttribute('animation-mixer', 'clip: Attack; loop: once; clampWhenFinished: true');
                        }

                        this.el.emit('fox-death');
                        break;
                    }
                }
            },
        });
    }
}

const handleBabyReached = () => {
  if (!hasBaby.value) {
    hasBaby.value = true;
  }
};

const handleFoxDeath = () => {
  const foxEl = document.getElementById('main-character');
  const foxModelEl = document.querySelector('#main-character-model');

  if (foxEl && foxModelEl) {
    foxEl.addEventListener('fox-death', () => {
      foxEl.removeAttribute('walk');
      foxEl.setAttribute('ammo-body', 'type: static');
      foxModelEl.setAttribute(
        'animation-mixer',
        'clip: Death; loop: once; clampWhenFinished: true'
      );
    });
  }
};
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef" v-if="isMounted">
    <div v-if="gameState === GameStep.Start" class="screen screen--menu">
      <h1>Vixen's Instinct</h1>
      <button @click="startGame">START GAME</button>
    </div>

    <div v-if="isLoading" class="screen screen--loading">
      <div class="forest-loading">
        <div class="animal-fox"></div>
        <div class="animal-fox"></div>
        <div class="animal-fox"></div>
        <div class="loading-text">Loading..</div>
      </div>
    </div>

    <div v-if="gameState === GameStep.Game" class="screen screen--game">
      <a-scene v-if="renderScene" physics="driver: ammo;">
        <a-entity
          camera="fov: 40"
          position="0 11 18"
          rotation="-35 0 0"
        ></a-entity>

        <a-sky color="#D9F6FF"></a-sky>

        <a-entity
          id="cave-entity"
          :gltf-model="CaveModelSrc"
          position="15 0.4 -5"
          rotation="0 140 0"
          scale="2 2 2"
        >
          <a-entity
            id="baby"
            :visible="!hasBaby"
            :gltf-model="FoxModelSrc"
            position="0 0.2 -3"
            rotation="0 160 0"
            scale="0.15 0.15 0.15"
            animation-mixer="clip: Idle"
          ></a-entity>
        </a-entity>

        <a-entity id="main-character" position="-8 0.4 2" rotation="0 90 0">
          <a-entity
            id="main-character-model"
            :gltf-model="FoxModelSrc"
            scale="0.5 0.5 0.5"
          ></a-entity>
        </a-entity>

        <a-entity
          :gltf-model="FoxModelSrc"
          :visible="putBaby"
          position="-10 0 4.2"
          scale="0.25 0.25 0.25"
          animation-mixer="clip: Idle_2_HeadLow"
        ></a-entity>

        <a-entity
          id="getBabySpot_1"
          :visible="!hasBaby"
          :gltf-model="DirectionArrowModelSrc"
          position="10.6 2.8 0"
          rotation="0 -110 -90"
          scale="0.5 0.5 0.5"
          animation="property: position; dir: alternate; dur: 400; easing: easeInOutSine; loop: true; to: 10.6 3.1 0"
        ></a-entity>
        <a-entity
          id="getBabySpot_2"
          :visible="hasBaby"
          :gltf-model="DirectionArrowModelSrc"
          position="-10 2.4 3.2"
          rotation="0 -80 -90"
          animation="property: position; dir: alternate; dur: 400; easing: easeInOutSine; loop: true; to: -10 2.7 3.2"
        ></a-entity>

        <a-entity
          v-for="(trap, index) in obstacles.traps"
          :key="'trap-' + index"
          class="trap-entity"
          :gltf-model="TrapModelSrc"
          :position="trap.position"
          :scale="trap.scale"
        ></a-entity>

        <a-entity
          v-for="(dog, index) in obstacles.dogs"
          :key="'dog-' + dog.id"
          :id="'dog-' + dog.id"
          class="dog-entity"
          :position="dog.position"
          :rotation="dog.rotation"
        >
          <a-entity
            class="dog-model"
            :gltf-model="DogModelSrc"
            :scale="dog.scale"
          ></a-entity>
        </a-entity>

        <a-entity
          v-for="(bush, index) in obstacles.bushes"
          :key="'bush-obs-' + index"
          class="bush-obs-entity"
          :gltf-model="BushModelSrc"
          :position="bush.position"
          :rotation="bush.rotation"
          :scale="bush.scale"
        ></a-entity>

        <a-box
          id="ground"
          position="0 -0.2 -15"
          width="90"
          height="0.2"
          depth="70"
          :material="`src:${GrassImageSrc}; repeat: 45 35 `"
        ></a-box>

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

        <a-entity
          :gltf-model="PondModelSrc"
          scale="0.04 0.04 0.04"
          position="-14 -0.33 -4"
        >
          <a-entity
            :gltf-model="FrogModelSrc"
            scale="0.4 0.4 0.4"
            rotation="0 45 0"
            position="90 19 0"
          ></a-entity>
        </a-entity>

        <a-entity
          :gltf-model="StagModelSrc"
          scale="0.4 0.4 0.4"
          rotation="0 45 0"
          position="10 1 -10.8"
          animation-mixer="clip: *Eating*"
        ></a-entity>
        <a-entity
          :gltf-model="JeepModelSrc"
          scale="0.8 0.8 0.8"
          rotation="0 45 0"
          position="-4.5 1 -12"
        ></a-entity>
        <a-entity
          :gltf-model="RabbitModelSrc"
          scale="0.01 0.01 0.01"
          rotation="0 -45 0"
          position="-5 0.2 -8.7"
        ></a-entity>

        <a-entity
          v-for="tree in trees"
          :key="tree.position"
          :gltf-model="TreeModelSrc"
          :position="tree.position"
          :rotation="tree.rotation"
          :scale="tree.scale"
        ></a-entity>
        <a-entity
          v-for="tree in trees2"
          :key="tree.position"
          :gltf-model="Tree2ModelSrc"
          :position="tree.position"
          :rotation="tree.rotation"
          :scale="tree.scale"
        ></a-entity>
        <a-entity
          v-for="tree in pineTrees"
          :key="tree.position"
          :gltf-model="PineTreeModelSrc"
          :position="tree.position"
          :rotation="tree.rotation"
          :scale="tree.scale"
        ></a-entity>
        <a-entity
          v-for="rock in rocks"
          :key="rock.position"
          :gltf-model="RocksModelSrc"
          :scale="rock.scale"
          :position="rock.position"
          :rotation="rock.rotation"
        ></a-entity>
        <a-entity
          v-for="bush in bushes"
          :key="bush.position"
          class="static-collidable"
          :gltf-model="BushModelSrc"
          :scale="bush.scale"
          :position="bush.position"
          :rotation="bush.rotation"
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
  background-color: #d9f6ff;
  z-index: 500;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.forest-loading {
  position: relative;
  width: 300px;
  height: 150px;
}

.animal-fox {
  position: absolute;
  bottom: 40px;
  width: 80px;
  height: 60px;
  background-image: url('/game_images/babyFox.png');
  background-size: contain;
  background-repeat: no-repeat;
  animation: runAcross 3s linear infinite;
  opacity: 0;
}

.animal-fox:nth-child(1) {
  animation-delay: 0s;
}

.animal-fox:nth-child(2) {
  animation-delay: 1s;
}

.animal-fox:nth-child(3) {
  animation-delay: 2s;
}

@keyframes runAcross {
  0% {
    left: -100px;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.loading-text {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #2e7d32;
  font-size: 1.5em;
  font-weight: bold;
  letter-spacing: 2px;
  animation: blink 2s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
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
