<template>
  <div class="flex gap-0 h-full flex-1" :class="layout === Layout.HORIZONTAL ? 'lg:flex-row flex-col' : 'flex-col'">
    <div :class="{
      'editor-hidden': !state.editorIsShown,
      [layout === Layout.HORIZONTAL ? 'lg:w-full' : ' w-full']: true
    }" class="lg:border-0 border border-border-color lg:h-full">
      <EmptyState v-if="!openedFilePath" />

      <div v-if="openedFilePath" class="h-full w-full">
        <div
          class="px-2 py-1 border-b border-border-color overflow-x-auto whitespace-nowrap w-full h-8 flex items-center">
          <OpenedFiles />
        </div>
        <div class="px-2 overflow-x-auto whitespace-nowrap w-full h-8 flex items-center">
          <Breadcrumbs :path="openedFilePath" />
        </div>
        <Codemirror
        :is-detail="false"
          :dynamic-class="{
          'editor-hidden': !state.editorIsShown,
          [layout === Layout.HORIZONTAL ? 'lg:h-full' : 'w-full editor--vertical']: true
        }" />
      </div>
    </div>

    <EditorOutput :loading="loading"
      :is-detail="false" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, inject, watch, computed } from 'vue';
import Codemirror from './Codemirror.vue';
import EditorOutput from './EditorOutput.vue';
import { ILoading } from '../../types/loading';
import { WebContainerService } from '../../services/webContainersService';
import OpenedFiles from './files/OpenedFiles.vue';
import { useStore } from 'vuex';
import EmptyState from './EmptyState.vue';
import { Layout } from '../../types/layout';
import Breadcrumbs from '../shared/Breadcrumbs.vue';

const state = reactive<{
  fontSize: number;
  editorIsShown: boolean
}>({
  fontSize: 14,
  editorIsShown: false,
});

const playgroundStore = useStore()
const openedFilePath = computed(() => playgroundStore.getters.currentFilePath);
const projectType = computed(() => playgroundStore.getters.projectType)
const layout = computed(() => playgroundStore.getters.layout)

const props = defineProps<{
  loading: ILoading;
}>();

const webContainersService = inject<WebContainerService>(
  'webContainersService'
);

onMounted(async () => {
  try {
    if (!projectType) {
      throw new Error("No project type selected.");
    }

    await webContainersService?.ensureInitialized();

    await webContainersService?.createProject(projectType.value);
    props.loading.installing = false;
  } catch (error) {
    console.error("Error during project creation:", error);
    props.loading.installing = false;
    props.loading.running = false;
  }
});


watch(props.loading, () => {
  if (!props.loading.installing && !props.loading.running) {
    state.editorIsShown = true;
  }
});
</script>
