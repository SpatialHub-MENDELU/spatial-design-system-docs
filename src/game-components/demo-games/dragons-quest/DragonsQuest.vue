<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';
import {IslandModelSrc, VolcanoModelSrc, WinterMountainModelSrc, PalmIslandModelSrc} from '../constants';


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

const staticModelsList = ref<StaticModel[]>([]);

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
            position: '0 -50 -50',
            rotation: '0 0 0',
            scale: '60 60 60',
            offset: '0 22 0',
        },
        {
            id: 2,
            src: VolcanoModelSrc,
            position: '0 0 -50',
            rotation: '0 0 0',
            scale: '15 15 15',
            offset: '2 2 2',
        },
        {
            id: 3,
            src: PalmIslandModelSrc,
            position: '-20 -5 0',
            rotation: '0 -45 0',
            scale: '0.3 0.3 0.3',
            offset: '-4 7 -1',
        },
        {
            id: 5,
            src: IslandModelSrc,
            position: '-20 -50 0',
            rotation: '0 0 0',
            scale: '60 60 60',
            offset: '0 22 0',
        },
        {
            id: 6,
            src: WinterMountainModelSrc,
            position: '40 0 0',
            rotation: '0 0 0',
            scale: '15 15 15',
            offset: '0 1 3',
        },
        {
            id: 7,
            src: IslandModelSrc,
            position: '40 -50 0',
            rotation: '0 -45 0',
            scale: '60 60 60',
            offset: '0 22 0',
        },
    ]

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

                <a-camera position="0 1.6 0"></a-camera>

<!--                ISLANDS -->
                <a-entity
                    v-for="model in staticModelsList"
                    :key="model.id"
                    :gltf-model="model.src"
                    :position="model.position"
                    :rotation="model.rotation"
                    :scale="model.scale"
                    ammo-body="type: static;"
                    :ammo-shape="`type: hull; offset: ${model.offset};`"
                ></a-entity>
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
    border: 2px solid #FFFFFF;
}

.menu-content h1 {
    font-family: monospace;
    color: #FFFFFF;
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
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    transition: all 0.2s;
}

.start-btn:hover {
    background: #FFFFFF;
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
