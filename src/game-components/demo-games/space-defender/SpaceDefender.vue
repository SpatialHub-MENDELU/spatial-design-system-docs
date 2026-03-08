<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

type GameState = 'menu' | 'playing';

const gameState = ref<GameState>('menu');
const isMounted = ref(false);
const gameWrapperRef = ref<HTMLElement | null>(null);

const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
        gameState.value = 'menu';
    }
};

onMounted(() => {
    isMounted.value = true;
    document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
});

const startGame = async () => {
    gameState.value = 'playing';

    if (gameWrapperRef.value && gameWrapperRef.value.requestFullscreen) {
        try {
            await gameWrapperRef.value.requestFullscreen();
        } catch (err) {
            console.warn('Failed to start full screen mode:', err);
        }
    }
};
</script>

<template>
    <div class="game-wrapper" ref="gameWrapperRef">

        <div v-if="gameState === 'menu'" class="screen screen--menu">
            <button class="start-btn" @click="startGame">
                Start the game
            </button>
        </div>

        <div v-else-if="gameState === 'playing'" class="screen screen--game">
            <a-scene v-if="isMounted" embedded xr-mode-ui="enabled: false">
                <a-box position="0 0 0" rotation="-90 0 0" width="40" height="40" depth="1" color="#008800"></a-box>

                <a-camera position="0 1.6 5"></a-camera>
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
    background-color: #808080;
}

.start-btn {
    padding: 15px 30px;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    background-color: #333;
    border: 2px solid white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.start-btn:hover {
    background-color: white;
    color: #333;
}

.screen--game a-scene {
    width: 100%;
    height: 100%;
}
</style>
