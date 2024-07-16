<script setup lang="ts">
import { ref, onMounted } from "vue";
import { VPButton } from "vitepress/theme";

const props = defineProps({
    fixed: {
        type: Boolean,
        default: false
    },
});

enum Tab {
    Output = "output",
    Code = "code"
};

enum CameraMoveDirection {
    Forward = "forward",
    Right = "right",
    Backward = "backward",
    Left = "left"
};

const selectedTab = ref(Tab.Output);
// Below boolean is needed to avoid this problem: https://github.com/aframevr/aframe/issues/4038
const isAframeImported = ref(false);
const aframeScene = ref(null);
const showMoveControllers = ref(false);
const moveControllersIcons = {
    left: "<img class='move-icon move-icon_white' src='../arrow_left_alt_fill_opsz40.svg' alt='Left'>",
    right: "<img class='move-icon move-icon_white' src='../arrow_right_alt_fill_opsz40.svg' alt='Right'>",
    forward: "<img class='move-icon move-icon_white' src='../arrow_upward_alt_fill_opsz40.svg' alt='Forward'>",
    backward: "<img class='move-icon move-icon_white' src='../arrow_downward_alt_fill_opsz40.svg' alt='Backward'>"
};

function selectTab(tab: Tab) {
    selectedTab.value = tab;
}

onMounted(async () => {
    await import("aframe");
    isAframeImported.value = true;
    registerPointerChange();
});

function registerPointerChange() {
    const isMobileMediaQuery = window.matchMedia("(pointer: coarse)");
    isMobileMediaQuery.addEventListener("change", handlePointerChange);
    handlePointerChange(isMobileMediaQuery);
}

function handlePointerChange(e) {
    showMoveControllers.value = e.matches && !props.fixed || false;
}

function moveCamera(direction: CameraMoveDirection) {
    // @ts-ignore
    const cameraEl = aframeScene.value?.camera?.el;
    if (!cameraEl) return

    let offsetX = 0;
    let offsetZ = 0;

    switch (direction) {
        case CameraMoveDirection.Forward:
            offsetZ -= 1;
            break;
        case CameraMoveDirection.Right:
            offsetX += 1;
            break;
        case CameraMoveDirection.Backward:
            offsetZ += 1;
            break;
        case CameraMoveDirection.Left:
            offsetX -= 1;
            break;
    }

    const cameraX = cameraEl.object3D.position.x + offsetX;
    const cameraY = cameraEl.object3D.position.y;
    const cameraZ = cameraEl.object3D.position.z + offsetZ;

    cameraEl.setAttribute("animation__position", {
        "property": "position",
        "to": {
            x: cameraX,
            y: cameraY,
            z: cameraZ
        },
        "dur": 500
    });
}
</script>

<template>
    <section class="tabs">
        <div class="tabs__row">
            <button
                @click="selectTab(Tab.Output)"
                :class="{ 'tabs__button_selected': selectedTab === Tab.Output }"
                type="button"
                class="tabs__button"
            >Output</button>

            <button
                @click="selectTab(Tab.Code)"
                :class="{ 'tabs__button_selected': selectedTab === Tab.Code }"
                type="button"
                class="tabs__button"
            >Code</button>
        </div>

        <div v-if="isAframeImported" v-show="selectedTab === Tab.Output" class="tabs__content">
            <a-scene embedded xr-mode-ui="enabled: false" :device-orientation-permission-ui="{enabled: false}" ref="aframeScene">
                <a-camera fov="60" :touchEnabled="!props.fixed" :wasd-controls-enabled="!props.fixed" :look-controls-enabled="!props.fixed"></a-camera>
                <slot name="output"></slot>
                <a-sky color="#4a4a4a"></a-sky>
            </a-scene>
        </div>

        <div v-show="selectedTab === Tab.Code" class="tabs__content">
            <slot name="code"></slot>
        </div>

        <div class="move-controls tabs__move-controls" v-if="showMoveControllers">
            <VPButton
                class="move-controls__button move-controls__button_forward"
                v-html="moveControllersIcons.forward"
                @pointerdown="moveCamera(CameraMoveDirection.Forward)"
            />
            <VPButton
                class="move-controls__button move-controls__button_left"
                v-html="moveControllersIcons.left"
                @pointerdown="moveCamera(CameraMoveDirection.Left)"
            />
            <VPButton
                class="move-controls__button move-controls__button_backward"
                v-html="moveControllersIcons.backward"
                @pointerdown="moveCamera(CameraMoveDirection.Backward)"
            />
            <VPButton
                class="move-controls__button move-controls__button_right"
                v-html="moveControllersIcons.right"
                @pointerdown="moveCamera(CameraMoveDirection.Right)"
            />
        </div>

        <p class="tabs__note" v-if="showMoveControllers">
            Tap and hold your finger on the scene and drag it to rotate.
        </p>

        <p class="tabs__note" v-else-if="!props.fixed">
            Use the mouse to rotate the scene.
        </p>
    </section>
</template>

<style>
.tabs__content a-scene {
    height: 300px;
}

.tabs__row {
    display: flex;
    gap: 2rem;
    margin-bottom: 1.5rem;
}

.tabs__button {
    width: 4rem;
}

.tabs__button_selected {
    border-bottom: 3px solid var(--vp-c-brand-1);
}

.move-controls {
    display: grid;
    padding-top: 1.5rem;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
}

.move-controls__button_forward {
    grid-column: 2/3;
}

.move-controls__button_left,
.move-controls__button_backward,
.move-controls__button_right {
    grid-row: 2/3;
}

.move-icon {
    margin: 0 auto;
}

.move-icon_white {
    filter: invert(100%) sepia(15%) saturate(2%) hue-rotate(265deg) brightness(108%) contrast(101%);
}
</style>
