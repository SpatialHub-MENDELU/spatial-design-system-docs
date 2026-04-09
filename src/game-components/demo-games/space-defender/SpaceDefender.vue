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

const GameStep = {
  Start: 'Start',
  Game: 'Game',
  Victory: 'Victory',
  Defeat: 'Defeat',
};

const gameState = ref(GameStep.Start);
const isMounted = ref(false);
const gameWrapperRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const renderScene = ref(false);

interface EnemyTarget {
  id: number;
  position: string;
  xMin: number;
  xMax: number;
  zMin: number;
  zMax: number;
  yMin: number;
  yMax: number;
}

const initialEnemiesData: EnemyTarget[] = [
  {
    id: 1,
    position: '0 10 5',
    xMin: -40,
    xMax: 40,
    yMin: 15,
    yMax: 40,
    zMin: -10,
    zMax: 50,
  },
  {
    id: 2,
    position: '20 25 -90',
    xMin: -50,
    xMax: 50,
    yMin: 20,
    yMax: 45,
    zMin: -120,
    zMax: -60,
  },
  {
    id: 3,
    position: '-20 30 -180',
    xMin: -50,
    xMax: 50,
    yMin: 20,
    yMax: 50,
    zMin: -220,
    zMax: -150,
  },
];

const enemiesList = ref<EnemyTarget[]>([...initialEnemiesData]);
const initialTotalEnemies = 3;
const totalEnemiesGoal = ref(initialTotalEnemies);
const killedEnemies = ref(0);

const timeLeft = ref(180);
let timerInterval: number | null = null;

function addComponent(
  isClass: boolean,
  elementName: string,
  qualifiedName: string,
  value: string
) {
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

const handleFullscreenChange = () => {
  if (!document.fullscreenElement && gameState.value !== GameStep.Start) {
    gameState.value = GameStep.Start;
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

const resetGameValues = () => {
  killedEnemies.value = 0;
  totalEnemiesGoal.value = initialTotalEnemies;
  enemiesList.value = [...initialEnemiesData];
};

const startGame = async () => {
  isLoading.value = true;
  resetGameValues();

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
      startTimer();
    }, 3000);
  }, 3000);
};

const addAllComponents = () => {
  addComponent(
    false,
    'spaceship',
    'ammo-body',
    'type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation'
  );
  addComponent(false, 'spaceship-model', 'ammo-shape', 'type: hull;');
  addComponent(
    false,
    'spaceship',
    'fly',
    'speed: 12; sprint: true; sprintSpeed: 20; maxPitchDeg: 40; maxRollDeg: 40; type: autoForward; keyUp: arrowup; keyDown: arrowdown; keyLeft: arrowleft; keyRight: arrowright;'
  );

  addComponent(
    true,
    '.enemy',
    'ammo-body',
    'type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation; emitCollisionEvents: true;'
  );
  enemiesList.value.forEach((enemy) => {
    addComponent(false, `enemy-model-${enemy.id}`, 'ammo-shape', 'type: hull;');

    const npcWalkValue = `xMin: ${enemy.xMin}; xMax: ${enemy.xMax}; yMin: ${enemy.yMin}; yMax: ${enemy.yMax}; zMin: ${enemy.zMin}; zMax: ${enemy.zMax}; speed: 10; rotationSpeed: 400; allowRotation: true; type: randomMoving; walkClipName: CharacterArmature|Walk; idleClipName: CharacterArmature|Idle; altitude: true;`;
    addComponent(false, `enemy-${enemy.id}`, 'npc-walk', npcWalkValue);
  });

  addComponent(true, '.enemy', 'enemy-target', '');

  addComponent(
    false,
    'camera',
    'game-view',
    'target: #spaceship; type: thirdPersonFollow; distance: 40; height: 25; tilt: -27;'
  );
};

const quitGame = () => {
  gameState.value = GameStep.Start;
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
      gameState.value = GameStep.Defeat;
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
  if (gameState.value !== GameStep.Game) return;

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
  if (gameState.value !== GameStep.Game) return;

  const index = enemiesList.value.findIndex((a) => a.id === enemyId);
  if (index !== -1) {
    enemiesList.value.splice(index, 1);
    killedEnemies.value++;

    if (enemiesList.value.length === 0) {
      stopTimer();
      setTimeout(() => {
        gameState.value = GameStep.Victory;
      }, 500);
    }
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef" v-if="renderScene">
    <div v-if="gameState === GameStep.Start" class="screen screen--menu">
      <div class="menu-content">
        <h1>🚀 SPACE DEFENDER 🚀</h1>
        <button class="start-btn" @click="startGame">▶ Start the game</button>
      </div>
    </div>

    <div v-if="gameState === GameStep.Victory" class="screen screen--victory">
      <div class="victory-content">
        <h1>🏆 VICTORY! 🏆</h1>
        <p>All enemies destroyed in {{ 180 - timeLeft }} seconds!</p>
        <div class="btn-group">
          <button class="action-btn" @click="startGame">🔄 Retry</button>
          <button class="action-btn" @click="quitGame">❌ Quit</button>
        </div>
      </div>
    </div>

    <div v-if="gameState === GameStep.Defeat" class="screen screen--defeat">
      <div class="defeat-content">
        <h1>💀 GAME OVER 💀</h1>
        <p>Time is up! You failed to destroy all enemies.</p>
        <div class="btn-group">
          <button class="action-btn" @click="startGame">🔄 Retry</button>
          <button class="action-btn" @click="quitGame">❌ Quit</button>
        </div>
      </div>
    </div>

    <div v-if="gameState === GameStep.Game" class="screen screen--game">
      <div v-if="isLoading" class="loading-screen">
        <div class="loading-content">
          <div class="loading-spinner">🚀</div>
          <h2>PREPARING MISSION...</h2>

          <div class="mission-objective">
            <h3>OBJECTIVE: DESTROY ALL ENEMIES</h3>
          </div>

          <div class="controls-guide">
            <div class="control-item">
              <span class="key">↑↓←→</span>
              <span class="label">Fly Spaceship</span>
            </div>
            <div class="control-item">
              <span class="key key--shift">SHIFT</span>
              <span class="label">Speed Boost</span>
            </div>
            <div class="control-item">
              <span class="key key--space">SPACE</span>
              <span class="label">Fire Lasers</span>
            </div>
          </div>
        </div>
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
        physics=" driver: ammo;"
        inspector="true"
        v-if="isMounted"
        embedded
      >
        <a-sky color="#111424"></a-sky>

        <!--          SPACESHIP-->
        <a-entity id="spaceship" position="80 10 -1" rotation="0 -90 0">
          <a-entity
            id="spaceship-model"
            :gltf-model="SpaceshipModelSrc"
            position="0 0 -1.5"
            scale="0.02 0.02 0.02"
            rotation="0 0 0"
          ></a-entity>
        </a-entity>

        <!--          ENEMIES-->

        <a-entity
          class="enemy"
          v-for="enemy in enemiesList"
          :key="enemy.id"
          :id="'enemy-' + enemy.id"
          :position="enemy.position"
        >
          <a-entity
            :gltf-model="SpaceshipEnemyModelSrc"
            :id="'enemy-model-' + enemy.id"
            position="0 -1.3 -1.5"
            scale="1.5 1.5 1.5"
          ></a-entity>
        </a-entity>

        <!--        CAMERA-->
        <a-entity id="camera" camera></a-entity>

        <!--        <a-entity position="0 20 50" rotation="0 0 0">-->
        <!--          <a-camera position="0 0 0"></a-camera>-->
        <!--        </a-entity>-->

        <!--          PLANETS-->
        <a-entity
          :gltf-model="SunModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull;"
          position="0 -30 -450"
          scale="300 300 300"
        ></a-entity>

        <a-entity
          :gltf-model="MercuryModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 16 0;"
          position="0 -30 -190"
          scale="0.4 0.4 0.4"
        ></a-entity>

        <a-entity
          :gltf-model="VenusModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 30 0;"
          position="50 -40 -120"
          scale="0.3 0.3 0.3"
        ></a-entity>

        <a-entity
          :gltf-model="EarthModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 40 0;"
          position="0 -80 -40"
          scale="0.1 0.1 0.1"
        ></a-entity>

        <a-entity
          :gltf-model="MarsModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 22 0;"
          position="0 -40 30"
          scale="0.2 0.2 0.2"
        ></a-entity>

        <a-entity
          :gltf-model="JupiterModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull; offset: 0 80 0;"
          position="0 -30 170"
          scale="0.8 0.8 0.8"
        ></a-entity>

        <a-entity
          :gltf-model="SaturnModelSrc"
          ammo-body="type: static;"
          ammo-shape="type: hull;"
          position="0 -30 350"
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
  background-color: #111424;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  max-width: 500px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #00ffcc;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 255, 204, 0.2);
}

.loading-spinner {
  font-size: 3rem;
  margin-bottom: 20px;
  animation: rocket-pulse 1.5s infinite ease-in-out;
}

@keyframes rocket-pulse {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
}

.loading-content h2 {
  font-family: 'Courier New', Courier, monospace;
  color: #00ffcc;
  letter-spacing: 4px;
  margin-bottom: 30px;
}

.mission-objective {
  margin-bottom: 40px;
  padding: 15px;
  background: rgba(255, 51, 51, 0.1);
  border: 1px dashed #ff3333;
}

.mission-objective h3 {
  color: #ff3333;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
}

.controls-guide {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
}

.key {
  background: #333;
  color: #fff;
  padding: 5px 15px;
  border-radius: 5px;
  border-bottom: 4px solid #000;
  font-family: monospace;
  font-weight: bold;
  min-width: 60px;
  display: inline-block;
}

.key--space {
  min-width: 120px;
}

.key--shift {
  min-width: 80px;
}

.label {
  color: #fff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
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
