<template>
  <div class="flex gap-0 h-full flex-1"
    :class="layout === Layout.HORIZONTAL ? 'lg:flex-row flex-col' : 'flex-col'">
    <div
    :class="{
      'editor-hidden': !state.editorIsShown,
      [layout === Layout.HORIZONTAL ? 'lg:w-full' : ' w-full']: true
    }"
      class="lg:border-0 border border-border-color lg:h-full"
    >
      <EmptyState v-if="!openedFilePath" />

      <div v-if="openedFilePath" class="h-full w-full">
        <div
          class="px-2 py-1 border-b border-border-color overflow-x-auto whitespace-nowrap w-full h-8 flex items-center"
        >
          <OpenedFiles />
        </div>
        <div class="px-2 overflow-x-auto whitespace-nowrap w-full h-8 flex items-center">
          <Breadcrumbs :path="openedFilePath"/>
        </div>
        <codemirror
          class="editor lg:w-full block overflow-y-auto h-[30rem] pb-5"
          :class="{
            'editor-hidden': !state.editorIsShown,
            [layout === Layout.HORIZONTAL ? 'lg:h-full' : 'w-full editor--vertical']: true
          }"
          v-model="openedFileContent"
          :extensions="extensions"
          @update:modelValue="updateCode"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :style="{ fontSize: state.fontSize + 'px' }"
        />
      </div>
    </div>

    <EditorOutput :output="output" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, inject, watch, computed } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import EditorOutput from './EditorOutput.vue';
import { ILoading } from '../../types/loading';
import { autocompletion } from '@codemirror/autocomplete';
import { WebContainerService } from '../../services/webContainersService';
import { SessionService } from '../../services/sessionService';
import { files } from './files';
import OpenedFiles from './files/OpenedFiles.vue';
import { useStore } from 'vuex';
import EmptyState from './EmptyState.vue';
import { ProjectType } from '../../types/projectType';
import { Layout } from '../../types/layout';
import Breadcrumbs from '../shared/Breadcrumbs.vue';

const state = reactive<{
  fontSize: number;
  editorIsShown: boolean;
}>({
  fontSize: 14,
  editorIsShown: false,
});

const sessionService = inject<SessionService>('sessionService');
const playgroundStore = useStore()
const openedFileContent = computed(() => playgroundStore.getters.currentFileContent);
const openedFilePath = computed(() => playgroundStore.getters.currentFilePath);
const output = computed(() => playgroundStore.getters.output);
const projectType = computed(() => playgroundStore.getters.projectType)
const layout = computed(() => playgroundStore.getters.layout)

const props = defineProps<{
  loading: ILoading;
}>();

const webContainersService = inject<WebContainerService>(
  'webContainersService'
);

const extensions = [
  basicSetup,
  javascript(),
  EditorView.lineWrapping,
  autocompletion(),
];

let debounceTimer: any = null;

const updateCode = (newCode: string) => {
  playgroundStore.commit('updateCurrentFileContent', newCode);
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    try {
      await webContainersService?.writeFile(
        openedFilePath.value,
        openedFileContent.value
      );
    } catch (error) {
      console.error('Error during runCode execution:', error.message);
    }
  }, 500);
};

onMounted(async () => {
  try {
    if (!projectType) {
      throw new Error("No project type selected.");
    }

    await webContainersService?.ensureInitialized();

    if (projectType.value === ProjectType.VUE) {
      const url = await webContainersService?.createVueProject()
      console.log('url: ', url)
    } else if (projectType.value === ProjectType.VANILLA) {
      await webContainersService?.mountFiles(files);
       await webContainersService?.startServer()
    }

    props.loading.installing = false;
    runCode();
  } catch (error) {
    console.error('Error during project creation:', error);
    playgroundStore.commit('setOutput', `Error: ${error.message}`);
  }

  const editorSettings = sessionService?.getFromSession('editorSettings');
  if (editorSettings) {
    state.fontSize = editorSettings['selectedFontSize'];
    playgroundStore.commit('updateLayout', editorSettings['selectedLayout']);
  }
});

const runCode = async () => {
  if (!webContainersService) return;
  props.loading.running = true;
  try {
    if (openedFilePath.value && openedFileContent.value) {
      await webContainersService.writeFile(
        openedFilePath.value,
        openedFileContent.value
      );
    }
  } catch (error) {
    console.log(`Failed to read this file: ${error.message}`);
  } finally {
    props.loading.running = false;
  }
};

watch(props.loading, () => {
  if (!props.loading.installing && !props.loading.running) {
    state.editorIsShown = true;
  }
});
</script>
