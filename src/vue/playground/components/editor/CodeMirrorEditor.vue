<template>
  <div class="flex gap-0 lg:flex-row flex-col h-full flex-1">
    <div :class="{ ' editor-hidden': !state.editorIsShown }" class="lg:w-1/2 h-full">
      <EmptyState v-if="!openedFilePath" />

      <div v-if="openedFilePath"
        class="h-full">
        <div
          class="px-2 py-1 border-b border-border-color overflow-x-auto whitespace-nowrap w-full h-8 flex items-center"
        >
          <OpenedFiles />
        </div>

        <codemirror
          class="editor lg:w-full block overflow-y-auto lg:border-0 border border-border-color lg:h-full h-1/2"
          :class="{ ' editor-hidden': !state.editorIsShown }"
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

const state = reactive<{
  fontSize: number;
  editorIsShown: boolean;
}>({
  fontSize: 14,
  editorIsShown: false,
});

const sessionService = inject<SessionService>('sessionService');
const fileStore = useStore();
const openedFileContent = computed(() => fileStore.getters.currentFileContent);
const openedFilePath = computed(() => fileStore.getters.currentFilePath);
const output = computed(() => fileStore.getters.output);

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
  fileStore.commit('updateCurrentFileContent', newCode);
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    runCode();
  }, 1000);
};

onMounted(async () => {
  try {
    await webContainersService?.ensureInitialized();
    await webContainersService?.mountFiles(files);
    await webContainersService?.installDependencies();
    props.loading.installing = false;
    runCode();
  } catch (error) {
    console.error('Error during onMounted:', error);
    fileStore.commit('setOuput', `Error: ${error.message}`);
  }

  const editorSettings = sessionService?.getFromSession('editorSettings');
  if (editorSettings) {
    state.fontSize = editorSettings['selectedFontSize'];
  }
});

const runCode = async () => {
  if (!webContainersService) return;
  props.loading.running = true;
  try {
    console.log(openedFilePath.value);
    if (openedFilePath.value && openedFileContent.value) {
      await webContainersService.writeFile(
        openedFilePath.value,
        openedFileContent.value
      );
      const htmlContent = await webContainersService.readFile(
        openedFilePath.value
      );
      fileStore.commit('setOuput', htmlContent as string);
    }
  } catch (error) {
    fileStore.commit('setOuput', `Failed to read this file: ${error.message}`);
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
