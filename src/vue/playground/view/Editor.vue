<script setup lang="ts">
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { ILoading } from '../types/loading';
import Sidebar from '../components/shared/Sidebar.vue';
import RightBar from '../components/shared/RightBar.vue';
import WelcomeBanner from '../components/shared/WelcomeBanner.vue';
import { useStore } from 'vuex';
import FileTree from '../components/editor/files/FileTree.vue';
import PlaygroundEditor from '../components/editor/PlaygroundEditor.vue';
import { IStateEditor } from '../types/States';

const playgroundStore = useStore();
const projectType = computed(() => playgroundStore.getters.projectType);

const loading = reactive<ILoading>({
  installing: true,
  running: false,
});

const state = reactive<IStateEditor>({
    showConfirmDialog: false,
    nextRoute: null
})

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (projectType.value != null) {
    event.preventDefault();
    event.returnValue = '';
  }
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});
</script>

<template>
  <div class="flex gap-0 lg:flex-row flex-col mx-auto w-full lg:overflow-y-hidden">
    <Sidebar />
    <WelcomeBanner v-if="!projectType" />

    <div class="main-content h-full editor-content"
        v-if="projectType">
      <div class="flex lg:flex-row flex-col h-full max-w-full">
        <FileTree :loading="loading" />
        <PlaygroundEditor :loading="loading" />
      </div>
    </div>

    <RightBar />
  </div>
</template>
