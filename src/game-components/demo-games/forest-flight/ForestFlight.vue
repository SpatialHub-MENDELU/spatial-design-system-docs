<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import 'aframe';

type GameState = 'menu' | 'playing';

const gameState = ref<GameState>('menu');
const gameWrapperRef = ref<HTMLElement | null>(null);

const handleFullscreenChange = () => {
    if (!document.fullscreenElement && gameState.value === 'playing') {
        gameState.value = 'menu';
    }
};

onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

const startGame = async () => {
    gameState.value = 'playing';

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
            <h1>FOREST FLIGHT</h1>
            <button @click="startGame">START GAME</button>
        </div>

        <div v-else-if="gameState === 'playing'" class="screen screen--game">
            <a-scene>
                <a-cylinder position="0 1.5 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
                <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
                <a-sky color="#ECECEC"></a-sky>
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
}

.screen--menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}

.screen--menu button {
    padding: 15px 30px;
    font-size: 1.2rem;
    cursor: pointer;
    margin-top: 20px;
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
