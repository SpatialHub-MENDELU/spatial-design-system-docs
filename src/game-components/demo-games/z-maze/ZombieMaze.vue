<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';
import { AdventurerModelSrc, ZombieModelSrc } from '../constants';

type GameState = 'menu' | 'playing' | 'gameover' | 'win';

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);
const timeLeft = ref(60);
let timerInterval: number | null = null;

const zombiesList = ref([]);

const handleFullscreenChange = () => {
  if (!document.fullscreenElement && gameState.value === 'playing') {
    stopTimer();
    gameState.value = 'menu';
  }
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const startTimer = () => {
  timeLeft.value = 60;
  stopTimer();
  timerInterval = window.setInterval(() => {
    timeLeft.value--;
    if (timeLeft.value <= 0) {
      stopTimer();
      gameState.value = 'gameover';
    }
  }, 1000);
};

const handleGameWon = () => {
  if (gameState.value === 'playing') {
    stopTimer();
    gameState.value = 'win';
  }
};

const handlePlayerDied = () => {
  if (gameState.value === 'playing') {
    stopTimer();
    gameState.value = 'gameover';
  }
};

const generateZombies = () => {
  const scale = '0.5 0.5 0.5';
  const offset = '0 1 0.5';
  return [
    {
      id: 1,
      src: ZombieModelSrc,
      position: '25 0.3 5',
      rotation: '0 0 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 2,
      src: ZombieModelSrc,
      position: '65 0.3 15',
      rotation: '0 180 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 3,
      src: ZombieModelSrc,
      position: '25 0.3 35',
      rotation: '0 -90 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 4,
      src: ZombieModelSrc,
      position: '60 0.3 45',
      rotation: '0 -90 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 5,
      src: ZombieModelSrc,
      position: '35 0.3 15',
      rotation: '0 0 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 6,
      src: ZombieModelSrc,
      position: '40 0.3 25',
      rotation: '0 90 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 7,
      src: ZombieModelSrc,
      position: '40 0.3 35',
      rotation: '0 90 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 8,
      src: ZombieModelSrc,
      position: '15 0.3 45',
      rotation: '0 0 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 9,
      src: ZombieModelSrc,
      position: '35 0.3 55',
      rotation: '0 90 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
    {
      id: 10,
      src: ZombieModelSrc,
      position: '50 0.3 45',
      rotation: '0 90 0',
      scale,
      offset,
      animation: '*Armature|Scream*',
    },
  ];
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  window.addEventListener('game-won', handleGameWon);
  window.addEventListener('player-died', handlePlayerDied);

  if (window.AFRAME) {
    window.AFRAME.registerComponent('zombie-collider', {
      init: function () {
        this.isDead = false;
      },
      tick: function () {
        if (this.isDead) return;

        const playerPos = this.el.object3D.position;
        const zombies = document.querySelectorAll('[id^="zombie-"]');

        for (let i = 0; i < zombies.length; i++) {
          const zombiePos = zombies[i].object3D.position;

          const dx = playerPos.x - zombiePos.x;
          const dz = playerPos.z - zombiePos.z;
          const distance = Math.sqrt(dx * dx + dz * dz);

          if (distance < 4.0) {
            this.isDead = true;
            window.dispatchEvent(new Event('player-died'));
            break;
          }
        }
      },
    });

    window.AFRAME.registerComponent('finish-trigger', {
      init: function () {
        this.won = false;
      },
      tick: function () {
        if (this.won) return;

        const playerEl = document.querySelector('#adventurer');
        if (!playerEl) return;

        const playerPos = playerEl.object3D.position;
        const finishPos = this.el.object3D.position;

        const dx = playerPos.x - finishPos.x;
        const dz = playerPos.z - finishPos.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance < 3) {
          this.won = true;
          window.dispatchEvent(new Event('game-won'));
        }
      },
    });

    window.AFRAME.registerComponent('maze-generator', {
      init: function () {
        // 1 = bush, 0 = road, 2 = Start, 3 = Finish
        const mazeMap = [
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          [1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
          [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
          [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
          [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
          [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1],
        ];

        const blockSize = 5;
        const wallHeight = 4;
        const sceneEl = this.el;
        const playerEl = document.querySelector('#adventurer');

        for (let z = 0; z < mazeMap.length; z++) {
          for (let x = 0; x < mazeMap[z].length; x++) {
            let posX = x * blockSize;
            let posZ = z * blockSize;
            let type = mazeMap[z][x];

            if (type === 1) {
              let wall = document.createElement('a-box');
              let posY = wallHeight / 2;
              wall.setAttribute('position', `${posX} ${posY} ${posZ}`);
              wall.setAttribute('width', blockSize);
              wall.setAttribute('height', wallHeight);
              wall.setAttribute('depth', blockSize);
              wall.setAttribute('color', 'green');
              wall.setAttribute('repeat', `${blockSize} ${wallHeight}`);
              wall.setAttribute('roughness', 0.9);
              wall.setAttribute('color', '#013220');
              wall.setAttribute('ammo-body', 'type: static');
              wall.setAttribute('ammo-shape', 'type: box');
              sceneEl.appendChild(wall);
            } else if (type === 2) {
              let startPad = document.createElement('a-box');
              startPad.setAttribute('position', `${posX} 0.05 ${posZ}`);
              startPad.setAttribute('width', blockSize);
              startPad.setAttribute('height', 0.1);
              startPad.setAttribute('depth', blockSize);
              startPad.setAttribute('color', '#8b0000');
              sceneEl.appendChild(startPad);

              if (playerEl) {
                playerEl.setAttribute('position', `${posX} 1.6 ${posZ}`);
              }
            } else if (type === 3) {
              let endPad = document.createElement('a-box');
              endPad.setAttribute('position', `${posX} 0.05 ${posZ}`);
              endPad.setAttribute('width', blockSize);
              endPad.setAttribute('height', 0.1);
              endPad.setAttribute('depth', blockSize);
              endPad.setAttribute('color', '#006400');

              endPad.setAttribute('finish-trigger', '');

              let endLight = document.createElement('a-light');
              endLight.setAttribute('type', 'point');
              endLight.setAttribute('color', '#00ff00');
              endLight.setAttribute('intensity', '2');
              endLight.setAttribute('distance', '8');
              endLight.setAttribute('position', `0 1 0`);
              endPad.appendChild(endLight);

              sceneEl.appendChild(endPad);
            }
          }
        }
      },
    });
  }
});

onMounted(async () => {
  try {
    await import('spatial-design-system/components/game/walk');
    await import('spatial-design-system/components/game/gameview');
    await import('spatial-design-system/components/game/npcWalk');
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  window.removeEventListener('game-won', handleGameWon);
  window.removeEventListener('player-died', handlePlayerDied);
  stopTimer();
});

const startGame = async () => {
  gameState.value = 'playing';
  zombiesList.value = generateZombies();
  startTimer();

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

const quitGame = () => {
  stopTimer();
  gameState.value = 'menu';
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
};
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef">
    <div v-if="gameState !== 'playing'" class="overlay-container">
      <div class="overlay vignette"></div>
      <div class="overlay scanlines"></div>
    </div>

    <div v-if="gameState === 'menu'" class="screen screen--menu">
      <div class="menu-content">
        <h1 class="game-title">Z-MAZE</h1>
        <p class="game-subtitle">NO ONE ESCAPES THE LABYRINTH</p>
        <button class="btn btn--primary" @click="startGame">SURVIVE</button>
      </div>
    </div>

    <div v-else-if="gameState === 'gameover'" class="screen screen--gameover">
      <div class="menu-content">
        <h1 class="game-title title--dead">YOU DIED</h1>
        <p class="game-subtitle">THE ZOMBIES FOUND THEIR PREY</p>
        <div class="button-group">
          <button class="btn btn--primary" @click="startGame">RETRY</button>
          <button class="btn btn--secondary" @click="quitGame">
            QUIT GAME
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="gameState === 'win'" class="screen screen--win">
      <div class="menu-content">
        <h1 class="game-title title--win">ESCAPED!</h1>
        <p class="game-subtitle subtitle--win">YOU SURVIVED THE LABYRINTH</p>
        <div class="button-group">
          <button class="btn btn--win-primary" @click="startGame">
            PLAY AGAIN
          </button>
          <button class="btn btn--secondary" @click="quitGame">
            QUIT GAME
          </button>
        </div>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <div class="game-hud">
        <div class="timer-container" :class="{ 'timer-low': timeLeft <= 20 }">
          <span class="timer-label">TIME LEFT:</span>
          <span class="timer-value">{{ timeLeft }}s</span>
        </div>
      </div>

      <a-scene physics="driver: ammo; debug: false;" maze-generator>
        <a-light
          type="hemisphere"
          color="#fff"
          groundColor="#000"
          intensity="0.002"
        ></a-light>

        <a-box
          position="20 -0.5 20"
          width="100"
          depth="100"
          height="1"
          color="#1A4D2E"
          ammo-body="type: static"
          ammo-shape="type: box"
        ></a-box>

        <a-entity
          v-for="model in zombiesList"
          :key="'zombie-' + model.id"
          :id="'zombie-' + model.id"
          :position="model.position"
          :rotation="model.rotation"
          ammo-body="type: static;"
          :ammo-shape="`type: box; offset: ${model.offset};`"
          :gltf-model="model.src"
          :scale="model.scale"
          :animation-mixer="`clip: ${model.animation}; loop: repeat;`"
        >
        </a-entity>

        <a-entity
          id="adventurer"
          zombie-collider
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          position="0 15.8 0"
          walk="sprint: true; speed: 4; sprintSpeed: 6; idleClipName: CharacterArmature|Idle_Neutral; walkClipName: CharacterArmature|Run; sprintClipName: CharacterArmature|Run; rotationSpeed: 180;"
        >
          <a-entity
            :gltf-model="AdventurerModelSrc"
            ammo-shape="type: hull;"
            position="0 -1 0"
            scale="1.1 1.1 1.1"
          ></a-entity>
          <a-entity
            light="type: spot; color: #fffbd6; intensity: 12; distance: 5; angle: 45; penumbra: 0.5"
            position="0 0.7 0.2"
            rotation="-10 180 0"
          ></a-entity>
        </a-entity>

        <a-entity
          camera
          game-view="type: thirdPersonFollow; target: #adventurer; distance: 2; height: 2; "
        ></a-entity>

        <!--                <a-entity-->
        <!--                  camera-->
        <!--                  rotation="-45 0 0"-->
        <!--                  position="35 30 70"-->
        <!--                  look-controls-->
        <!--                  wasd-controls-->
        <!--                ></a-entity>-->
      </a-scene>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  width: 100%;
  height: 500px;
  background-color: #000;
  position: relative;
  overflow: hidden;
  font-family: 'Courier New', Courier, monospace;
}

.game-wrapper:fullscreen {
  height: 100vh;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  pointer-events: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vignette {
  background: radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.9) 100%);
}

.scanlines {
  background: linear-gradient(
    to bottom,
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.3) 50%
  );
  background-size: 100% 4px;
}

.screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.screen--menu,
.screen--gameover {
  background: radial-gradient(circle, #2a0808 0%, #000000 100%);
  color: white;
}

.screen--win {
  background: radial-gradient(circle, #0a2a0a 0%, #000000 100%);
  color: white;
}

.menu-content {
  position: relative;
  z-index: 10;
}

.game-title {
  font-size: 6rem;
  color: #eee;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 15px;
  text-shadow: 0 0 10px rgba(255, 51, 51, 0.7);
  animation: flicker 3s infinite;
}

.title--dead {
  color: #ff0000;
  text-shadow: 0 0 20px rgba(139, 0, 0, 0.9);
}

.title--win {
  color: #00ff00;
  text-shadow: 0 0 20px rgba(0, 255, 0, 0.9);
  animation: flicker-green 3s infinite;
}

.game-subtitle {
  font-size: 1.2rem;
  letter-spacing: 5px;
  color: #666;
  margin-top: 20px;
  margin-bottom: 50px;
  text-transform: uppercase;
}

.subtitle--win {
  color: #88ff88;
}

.button-group {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.8rem;
  font-weight: bold;
  padding: 15px 50px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border-radius: 5px;
}

.btn--primary {
  background-color: transparent;
  color: #ff3333;
  border: 3px solid #ff3333;
}

.btn--primary:hover {
  background-color: #ff3333;
  color: #000;
  box-shadow: 0 0 30px #ff3333;
}

.btn--win-primary {
  background-color: transparent;
  color: #00ff00;
  border: 3px solid #00ff00;
}

.btn--win-primary:hover {
  background-color: #00ff00;
  color: #000;
  box-shadow: 0 0 30px #00ff00;
}

.btn--secondary {
  background-color: transparent;
  color: #666;
  border: 3px solid #444;
}

.btn--secondary:hover {
  border-color: #fff;
  color: #fff;
}

.game-hud {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  pointer-events: none;
}

.timer-container {
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #ff3333;
  padding: 10px 20px;
  color: #ff3333;
}

.timer-value {
  font-size: 2rem;
  font-weight: bold;
}

.timer-low {
  animation: pulse-red 0.5s infinite alternate;
  background: rgba(139, 0, 0, 0.9);
  color: #fff;
}

@keyframes pulse-red {
  from {
    box-shadow: 0 0 5px #ff0000;
  }
  to {
    box-shadow: 0 0 25px #ff0000;
  }
}

@keyframes flicker {
  0%,
  19.999%,
  22%,
  62.999%,
  64%,
  64.999%,
  70%,
  100% {
    opacity: 1;
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
  }
  20%,
  21.999%,
  63%,
  63.999%,
  65%,
  69.999% {
    opacity: 0.4;
    text-shadow: none;
  }
}

@keyframes flicker-green {
  0%,
  19.999%,
  22%,
  62.999%,
  64%,
  64.999%,
  70%,
  100% {
    opacity: 1;
    text-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
  }
  20%,
  21.999%,
  63%,
  63.999%,
  65%,
  69.999% {
    opacity: 0.4;
    text-shadow: none;
  }
}

.screen--game {
  position: absolute;
  top: 0;
  left: 0;
}

.screen--game a-scene {
  width: 100%;
  height: 100%;
}
</style>
