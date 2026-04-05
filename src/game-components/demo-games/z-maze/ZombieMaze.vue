<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';
import { AdventurerModelSrc, ZombieModelSrc } from '../constants';

type GameState = 'menu' | 'playing';

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);

const zombiesList = ref([]);

const handleFullscreenChange = () => {
  if (!document.fullscreenElement && gameState.value === 'playing') {
    gameState.value = 'menu';
  }
};

const generateZombies = () => {
  const scale = '0.5 0.5 0.5';
  const offset = '0 0 0';
  return [
    {
      id: 1,
      src: ZombieModelSrc,
      position: '25 0 5',
      rotation: '0 0 0',
      scale,
      offset,
    },
    {
      id: 2,
      src: ZombieModelSrc,
      position: '65 0 15',
      rotation: '0 -90 0',
      scale,
      offset,
    },
    {
      id: 3,
      src: ZombieModelSrc,
      position: '25 0 35',
      rotation: '0 90 0',
      scale,
      offset,
    },
    {
      id: 4,
      src: ZombieModelSrc,
      position: '60 0 45',
      rotation: '0 180 0',
      scale,
      offset,
    },
  ];
};

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  if (window.AFRAME) {
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
              // wall.setAttribute('src', '#bushTexture');
              wall.setAttribute('color', 'green');
              wall.setAttribute('repeat', `${blockSize} ${wallHeight}`);
              wall.setAttribute('roughness', 0.9);
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

              let endLight = document.createElement('a-light');
              endLight.setAttribute('type', 'point');
              endLight.setAttribute('color', '#00ff00');
              endLight.setAttribute('intensity', '0.5');
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
  } catch (e) {
    console.error(e);
  }
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

const startGame = async () => {
  gameState.value = 'playing';

  zombiesList.value = generateZombies();

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
</script>

<template>
  <div class="game-wrapper" ref="gameWrapperRef">
    <div v-if="gameState === 'menu'" class="screen screen--menu">
      <div class="menu-content">
        <h1 class="game-title">ZOMBIE MAZE</h1>
        <button class="start-btn" @click="startGame">PŘEŽÍT</button>
      </div>
    </div>

    <div v-else-if="gameState === 'playing'" class="screen screen--game">
      <a-scene
        physics=" driver: ammo; debug: true; debugDrawMode: 1;"
        inspector="true"
        maze-generator
      >
        <a-light
          type="hemisphere"
          color="#111111"
          groundColor="#ff1111"
          intensity="2"
        >
        </a-light>

        <a-light
          type="point"
          position="35 -5 35"
          color="#ff0000"
          intensity="3"
          distance="100"
        >
        </a-light>

        <a-plane
          position="20 0 20"
          rotation="-90 0 0"
          width="100"
          height="100"
          color="#009900"
          ammo-body="type: static"
          ammo-shape="type: box"
        ></a-plane>

        <a-entity
          v-for="model in zombiesList"
          key="'zombie-' + model.id"
          :id="'zombie-' + model.id"
          :gltf-model="model.src"
          :position="model.position"
          :rotation="model.rotation"
          :scale="model.scale"
          ammo-body="type: static; gravity: 0 0 0;"
          :ammo-shape="`type: hull; offset: ${model.offset};`"
        >
        </a-entity>

        <a-entity
          walk="sprint: true; speed: 4; sprintSpeed: 6; idleClipName: CharacterArmature|Idle_Neutral; walkClipName: CharacterArmature|Run; sprintClipName: CharacterArmature|Run; rotationSpeed: 180;"
          id="adventurer"
          ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
          ammo-shape="type: box; fit: manual; halfExtents: 0.2 1.1 0.2; offset: 0 -0.2 0;"
          position="0 15.8 0"
        >
          <a-entity
            :gltf-model="AdventurerModelSrc"
            position="0 -1 0"
            scale="1.1 1.1 1.1"
          ></a-entity>
        </a-entity>

        <a-entity
          camera
          game-view="type: thirdPersonFollow; target: #adventurer; distance: 2; height: 2; "
        ></a-entity>

        <!--        <a-entity-->
        <!--          camera-->
        <!--          rotation="-45 0 0"-->
        <!--          position="35 30 70"-->
        <!--          look-controls-->
        <!--          wasd-controls-->
        <!--        ></a-entity>-->
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

.screen {
  width: 100%;
  height: 100%;
}

.screen--menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #2a0808 0%, #000000 100%);
  color: white;
}

.menu-content {
  text-align: center;
}

.game-title {
  font-size: 5rem;
  color: #ff3333;
  margin: 0 0 40px 0;
  text-transform: uppercase;
  letter-spacing: 10px;
  text-shadow: 0 0 20px rgba(255, 51, 51, 0.5);
}

.start-btn {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
  font-weight: bold;
  padding: 15px 60px;
  background-color: transparent;
  color: #ff3333;
  border: 3px solid #ff3333;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.start-btn:hover {
  background-color: #ff3333;
  color: #000;
  box-shadow: 0 0 15px #ff3333;
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
