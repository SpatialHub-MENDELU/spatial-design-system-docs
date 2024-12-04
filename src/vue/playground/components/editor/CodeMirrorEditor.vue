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
        <codemirror class="editor lg:w-full block overflow-y-auto h-[30rem] pb-5" :class="{
          'editor-hidden': !state.editorIsShown,
          [layout === Layout.HORIZONTAL ? 'lg:h-full' : 'w-full editor--vertical']: true
        }" v-model="openedFileContent" :extensions="extensions" @update:modelValue="updateCode" :autofocus="true"
          :indent-with-tab="true" :tab-size="2" :style="{ fontSize: state.fontSize + 'px' }" />
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
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import EditorOutput from './EditorOutput.vue';
import { ILoading } from '../../types/loading';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';
import { WebContainerService } from '../../services/webContainersService';
import { SessionService } from '../../services/sessionService';
import OpenedFiles from './files/OpenedFiles.vue';
import { useStore } from 'vuex';
import EmptyState from './EmptyState.vue';
import { Layout } from '../../types/layout';
import Breadcrumbs from '../shared/Breadcrumbs.vue';
import { getFileExtension } from '../../utils/FileExtensionsAndIcons';
import { FileExtensions } from '../../types/fileType';
import { getAutompleteByFileExtension } from '../../utils/Autocomplete';
import { AutocompleteMatch } from '../../types/autocomplete';

const state = reactive<{
  fontSize: number;
  editorIsShown: boolean;
  sdsComponentsAndPrimitives: AutocompleteMatch[]
}>({
  fontSize: 14,
  editorIsShown: false,
  sdsComponentsAndPrimitives: []
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

const extensions = computed(() => {
  const fileExtension = getFileExtension(openedFilePath.value);

  const customAutocomplete = autocompletion({
    override: [
      (context) => {
        const word = context.matchBefore(/\w*/);
        if (!word || word.from === word.to) return null;

        const matches = [
          ...state.sdsComponentsAndPrimitives.filter((comp) =>
            comp.value.startsWith(word.text)
          ),
          ...getAutompleteByFileExtension(fileExtension).filter((comp) =>
            comp.value.startsWith(word.text)
          )
        ];

        if (matches.length === 0) return null;

        const uniqueMatches: AutocompleteMatch[] = [...new Set(matches.map(comp => comp.value))].map(value => {
          return matches.find(comp => comp.value === value) as AutocompleteMatch;
        });

        return {
          from: word.from,
          to: word.to,
          options: uniqueMatches.map((match) => ({
            label: typeof match === 'string' ? match : match.value,
            type: match.type,
          })),
        };
      },
    ],
  });

  let languageExtension;
  if (fileExtension === FileExtensions.JS || fileExtension === FileExtensions.TS) {
    languageExtension = javascript();
  } else if (fileExtension === FileExtensions.HTML) {
    languageExtension = html();
  } else if (fileExtension === FileExtensions.CSS) {
    languageExtension = css();
  } else {
    languageExtension = javascript();
  }

  return [basicSetup, customAutocomplete, languageExtension];
});

let debounceTimer: any = null;

const updateCode = (newCode: string) => {
  playgroundStore.commit('updateCurrentFileContent', newCode);
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    try {
      if (state.sdsComponentsAndPrimitives.length === 0) {
        const result = await webContainersService?.findAFrameComponentsInDirectory('node_modules/spatial-design-system') as string[]
        state.sdsComponentsAndPrimitives = result.map(r => {
          return {
            type: 'component',
            value: r
          }
        })
      }
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
    await webContainersService?.createProject(projectType.value)
    props.loading.installing = false;
  } catch (error) {
    console.error('Error during project creation:', error);
  }

  const editorSettings = sessionService?.getFromSession('editorSettings');
  if (editorSettings) {
    state.fontSize = editorSettings['selectedFontSize'];
    playgroundStore.commit('updateLayout', editorSettings['selectedLayout']);
  }
});

watch(props.loading, () => {
  if (!props.loading.installing && !props.loading.running) {
    state.editorIsShown = true;
  }
});
</script>
