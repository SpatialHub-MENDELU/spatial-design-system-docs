<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';
import {
  SpaceshipEnemyModelSrc,
  EarthModelSrc,
  JupiterModelSrc,
  MarsModelSrc,
  MercuryModelSrc,
  astronautModel,
  NeptuneModelSrc,
  SaturnModelSrc,
  SpaceshipModelSrc,
  SunModelSrc,
  UranusModelSrc,
  VenusModelSrc,
} from '../constants';

type GameState = 'menu' | 'playing' | 'victory' | 'defeat';

const gameState = ref<GameState>('menu');
const isMounted = ref(false);
const gameWrapperRef = ref<HTMLElement | null>(null);
const isLoading = ref(true);
const renderScene = ref(false);

interface EnemyTarget {
  id: number;
  position: string;
  points: string;
  // xMin: number;
  // xMax: number;
  // zMin: number;
  // zMax: number;
  // yMin: number;
  // yMax: number;
}

const enemiesList = ref<EnemyTarget[]>([]);
const initialTotalEnemies = 3;
const totalEnemiesGoal = ref(initialTotalEnemies);
const killedEnemies = ref(0);

const timeLeft = ref(180);
let timerInterval: number | null = null;

const handleFullscreenChange = () => {
  if (
    !document.fullscreenElement &&
    gameState.value !== 'victory' &&
    gameState.value !== 'defeat'
  ) {
    gameState.value = 'menu';
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
};

onMounted(() => {
  isMounted.value = true;
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onMounted(async () => {
  try {
    await import('spatial-design-system/components/game/fly');
    await import('spatial-design-system/components/game/gameview');
    await import('spatial-design-system/components/game/npcWalk');
    registerAframeComponents();
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  window.removeEventListener('keydown', handleKeyDown);
  if (timerInterval) clearInterval(timerInterval);
});

const startGame = async () => {
  gameState.value = 'playing';
  isLoading.value = true;
  killedEnemies.value = 0;
  totalEnemiesGoal.value = initialTotalEnemies;

  enemiesList.value = [
    { id: 1, position: '0 10 5', points: '0 10 5, 10 10 5' },
    { id: 2, position: '0 10 -10', points: '0 10 -10, 10 10 -10' },
    { id: 3, position: '0 10 -25', points: '0 10 -25, 10 10 -25' },
  ];

  setTimeout(() => {
    isLoading.value = false;
    nextTick(() => {
      window.dispatchEvent(new Event('resize'));
    });
    startTimer();
  }, 50);

  if (
    gameWrapperRef.value &&
    gameWrapperRef.value.requestFullscreen &&
    !document.fullscreenElement
  ) {
    try {
      await gameWrapperRef.value.requestFullscreen();
    } catch (err) {
      console.warn('Failed to start full screen mode:', err);
    }
  }
};

const quitGame = () => {
  gameState.value = 'menu';
  stopTimer();
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => console.warn(err));
  }
};

// TIMER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const startTimer = () => {
  timeLeft.value = 180;
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval!);
      timerInterval = null;
      gameState.value = 'defeat';
    }
  }, 1000);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// LASER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const registerAframeComponents = () => {
  if (typeof AFRAME === 'undefined' || AFRAME.components['laser-behavior'])
    return;

  const THREE = AFRAME.THREE;

  AFRAME.registerComponent('laser-behavior', {
    schema: { speed: { type: 'number', default: 150 } },
    init: function () {
      this.direction = new THREE.Vector3(0, 0, 1);
      this.direction.applyQuaternion(this.el.object3D.quaternion);
      this.direction.normalize();

      this.destroyTimeout = setTimeout(() => {
        if (this.el.parentNode) {
          this.el.parentNode.removeChild(this.el);
        }
      }, 2000000000);
    },
    tick: function (time, timeDelta) {
      if (!timeDelta) return;
      const distance = (this.data.speed * timeDelta) / 1000;
      this.el.object3D.position.addScaledVector(this.direction, distance);
    },
    remove: function () {
      clearTimeout(this.destroyTimeout);
    },
  });

  if (!AFRAME.components['enemy-target']) {
    AFRAME.registerComponent('enemy-target', {
      init: function () {
        this.onCollisionBound = this.onCollision.bind(this);
        this.el.addEventListener('collidestart', this.onCollisionBound);
      },
      onCollision: function (event: any) {
        const collidingEl = event.detail.targetEl;

        if (
          collidingEl &&
          typeof collidingEl.classList !== 'undefined' &&
          collidingEl.classList.contains('laser')
        ) {
          const enemyId = parseInt(this.el.id.replace('enemy-', ''));

          if (collidingEl.parentNode) {
            collidingEl.parentNode.removeChild(collidingEl);
          }

          handleEnemyHit(enemyId);
        }
      },
      remove: function () {
        this.el.removeEventListener('collidestart', this.onCollisionBound);
      },
    });
  }
};

const shootLaser = () => {
  if (gameState.value !== 'playing') return;

  const spaceship = document.querySelector('#spaceship');
  const scene = document.querySelector('a-scene');
  if (!spaceship || !scene) return;

  const THREE = AFRAME.THREE;

  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  spaceship.object3D.getWorldPosition(position);
  spaceship.object3D.getWorldQuaternion(quaternion);

  const forward = new THREE.Vector3(0, 0, 4);
  forward.applyQuaternion(quaternion);
  position.add(forward);

  const euler = new THREE.Euler().setFromQuaternion(quaternion, 'YXZ');
  const rotX = THREE.MathUtils.radToDeg(euler.x);
  const rotY = THREE.MathUtils.radToDeg(euler.y);
  const rotZ = THREE.MathUtils.radToDeg(euler.z);

  const laser = document.createElement('a-entity');
  laser.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
  laser.setAttribute('rotation', `${rotX} ${rotY} ${rotZ}`);
  laser.setAttribute('laser-behavior', 'speed: 150');
  laser.setAttribute('class', 'laser');

  const visual = document.createElement('a-cylinder');
  visual.setAttribute('color', '#ff3333');
  visual.setAttribute('radius', '0.15');
  visual.setAttribute('height', '3');
  visual.setAttribute('rotation', '90 0 0');
  laser.appendChild(visual);

  scene.appendChild(laser);

  laser.setAttribute(
    'ammo-body',
    'type: kinematic; activationState: disableDeactivation; emitCollisionEvents: true;'
  );

  laser.setAttribute(
    'ammo-shape',
    'type: box; fit: manual; halfExtents: 0.15 0.15 1.5;'
  );
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    e.preventDefault();
    shootLaser();
  }
};

// COLLISION
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const handleEnemyHit = (enemyId: number) => {
  if (gameState.value !== 'playing') return;

  const index = enemiesList.value.findIndex((a) => a.id === enemyId);
  if (index !== -1) {
    enemiesList.value.splice(index, 1);
    killedEnemies.value++;

    if (enemiesList.value.length === 0) {
      stopTimer();
      setTimeout(() => {
        gameState.value = 'victory';
      }, 500);
    }
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef" v-if="renderScene">
    <div v-if="gameState === 'menu'" class="screen screen--menu">
      <div class="menu-content">
        <h1>🚀 SPACE DEFENDER 🚀</h1>
        <button class="start-btn" @click="startGame">▶ Start the game</button>
      </div>
    </div>

    <div v-else-if="gameState === 'victory'" class="screen screen--victory">
      <div class="victory-content">
        <h1>🏆 VICTORY! 🏆</h1>
        <p>All enemies destroyed in {{ 180 - timeLeft }} seconds!</p>
        <div class="btn-group">
          <button class="action-btn" @click="startGame">🔄 Retry</button>
          <button class="action-btn" @click="quitGame">❌ Quit</button>
        </div>
      </div>
    </div>

    <div v-else-if="gameState === 'defeat'" class="screen screen--defeat">
      <div class="defeat-content">
        <h1>💀 GAME OVER 💀</h1>
        <p>Time is up! You failed to destroy all enemies.</p>
        <div class="btn-group">
          <button class="action-btn" @click="startGame">🔄 Retry</button>
          <button class="action-btn" @click="quitGame">❌ Quit</button>
        </div>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <div v-if="isLoading" class="loading-screen">
        <h2>Loading... 🚀</h2>
      </div>

      <div v-if="!isLoading" class="game-hud">
        <div class="hud-item">
          🎯 Goal: {{ killedEnemies }} / {{ totalEnemiesGoal }}
        </div>
        <div class="hud-item" :class="{ 'time-warning': timeLeft <= 30 }">
          ⏱️ Time: {{ formattedTime }}
        </div>
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
          position="80 10 -1"
          rotation="0 -90 0"
          fly="speed: 7; maxPitchDeg: 40; type: autoForward; keyUp: arrowup; keyDown: arrowdown; keyLeft: arrowleft; keyRight: arrowright;"
        >
          <a-entity
            :gltf-model="SpaceshipModelSrc"
            ammo-shape="type: hull;"
            position="0 0 -1.5"
            scale="0.02 0.02 0.02"
            rotation="0 0 0"
          ></a-entity>
        </a-entity>

        <!--          ENEMIES-->

        <a-entity
          v-for="enemy in enemiesList"
          :key="enemy.id"
          :id="'enemy-' + enemy.id"
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation; emitCollisionEvents: true;"
          :position="enemy.position"
          :npc-walk="`points: ${enemy.points}; speed: 3; walkClipName: CharacterArmature|Walk; idleClipName: CharacterArmature|Idle; altitude: true;`"
          enemy-target=""
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


        <!--        CAMERA-->
        <a-entity
          camera
          game-view="target: #spaceship; type: thirdPersonFollow; distance: 40; height: 25; tilt: -27;"
        >
        </a-entity>

        <!--        <a-entity position="0 20 50" rotation="0 0 0">-->
        <!--          <a-camera position="0 0 0"></a-camera>-->
        <!--        </a-entity>-->

        <!--          PLANETS-->
        <a-entity
          :gltf-model="SunModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull;"
          position="0 250 -450"
          scale="300 300 300"
        ></a-entity>

        <a-entity
          :gltf-model="MercuryModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 16 0;"
          position="0 30 -190"
          scale="0.4 0.4 0.4"
        ></a-entity>

        <a-entity
          :gltf-model="VenusModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 30 0;"
          position="50 50 -120"
          scale="0.3 0.3 0.3"
        ></a-entity>

        <a-entity
          :gltf-model="EarthModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 40 0;"
          position="0 30 -40"
          scale="0.1 0.1 0.1"
        ></a-entity>

        <a-entity
          :gltf-model="MarsModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 22 0;"
          position="0 30 30"
          scale="0.2 0.2 0.2"
        ></a-entity>

        <a-entity
          :gltf-model="JupiterModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 80 0;"
          position="0 30 170"
          scale="0.8 0.8 0.8"
        ></a-entity>

        <a-entity
          :gltf-model="SaturnModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull;"
          position="0 30 350"
          scale="40 40 40"
        ></a-entity>

        <!--          <a-entity-->
        <!--              :gltf-model="UranusModelSrc"-->
        <!--              ammo-body="type: static;"-->
        <!--              ammo-shape="type: hull;"-->
        <!--              position="0 30 500"-->
        <!--              scale="80 80 80"-->
        <!--          ></a-entity>-->

        <!--          <a-entity-->
        <!--              :gltf-model="NeptuneModelSrc"-->
        <!--              ammo-body="type: static;"-->
        <!--              ammo-shape="type: hull;"-->
        <!--              position="0 30 -1250"-->
        <!--              scale="1.9 1.9 1.9"-->
        <!--          ></a-entity>-->
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
  background-color: #111424;
}

.menu-content {
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 40px 60px;
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 204, 0.5);
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.2);
}

.menu-content h1 {
  font-family: 'Courier New', Courier, monospace;
  color: #fff;
  font-size: 2.5rem;
  margin: 0 0 30px 0;
  text-shadow:
    2px 2px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000,
    1px 1px 0px #000;
}

.start-btn {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: rgba(0, 0, 0, 0.8);
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  color: #00ffcc;
  border: 1px solid rgba(0, 255, 204, 0.5);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
}

.start-btn:hover {
  background: rgba(0, 255, 204, 0.2);
  transform: scale(1.05);
}

.screen--victory,
.screen--defeat {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #111424;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}

.victory-content,
.defeat-content {
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 40px 60px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 255, 204, 0.2);
}

.victory-content {
  border: 1px solid rgba(0, 255, 204, 0.5);
}

.defeat-content {
  border: 1px solid rgba(255, 51, 51, 0.5);
  box-shadow: 0 0 15px rgba(255, 51, 51, 0.2);
}

.victory-content h1 {
  font-family: 'Courier New', Courier, monospace;
  color: #00ffcc;
  font-size: 3rem;
  margin: 0 0 10px 0;
  text-shadow:
    2px 2px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000,
    1px 1px 0px #000;
}

.defeat-content h1 {
  font-family: 'Courier New', Courier, monospace;
  color: #ff3333;
  font-size: 3rem;
  margin: 0 0 10px 0;
  text-shadow:
    2px 2px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000,
    1px 1px 0px #000;
}

.victory-content p,
.defeat-content p {
  font-family: 'Courier New', Courier, monospace;
  color: #fff;
  font-size: 1.2rem;
  margin: 0 0 30px 0;
  font-weight: bold;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.action-btn {
  background: rgba(0, 0, 0, 0.8);
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  color: #00ffcc;
  border: 1px solid rgba(0, 255, 204, 0.5);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn:hover {
  background: rgba(0, 255, 204, 0.2);
  transform: scale(1.05);
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

.game-hud {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  pointer-events: none;
  font-family: 'Courier New', Courier, monospace;
  color: #00ffcc;
  text-shadow:
    2px 2px 0px #000,
    -1px -1px 0px #000,
    1px -1px 0px #000,
    -1px 1px 0px #000,
    1px 1px 0px #000;
  font-size: 1.5rem;
  font-weight: bold;
}

.hud-item {
  background: rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 204, 0.3);
}

.time-warning {
  color: #ff3333;
  animation: pulse 1s infinite;
  border-color: #ff3333;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
