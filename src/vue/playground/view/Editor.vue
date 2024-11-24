<script setup lang="ts">
import { reactive, computed } from 'vue';
import { ILoading } from '../types/loading';
import Sidebar from '../components/shared/Sidebar.vue';
import RightBar from '../components/shared/RightBar.vue';
import WelcomeBanner from '../components/shared/WelcomeBanner.vue';
import { useStore } from 'vuex';
import FileTree from '../components/editor/files/FileTree.vue';
import CodeMirrorEditor from '../components/editor/CodeMirrorEditor.vue';

const playgroundStore = useStore();
const projectType = computed(() => playgroundStore.getters.projectType);

const loading = reactive<ILoading>({
  installing: true,
  running: false,
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
        <CodeMirrorEditor :loading="loading" />
      </div>
    </div>

    <RightBar />
  </div>
</template>
