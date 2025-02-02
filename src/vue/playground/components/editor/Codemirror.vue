<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { getFileExtension } from '../../utils/FileExtensionsAndIcons';
import { autocompletion } from '@codemirror/autocomplete';
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { AutocompleteMatch } from '../../types/autocomplete';
import { FileExtensions } from '../../types/fileType';
import {
  getAframeAutocomplete,
  getAutompleteByFileExtension,
  getSDSAutocomplete,
} from '../../utils/Autocomplete';
import { useStore } from 'vuex';
import { SessionService } from '../../services/sessionService';
import { LanguageSupport } from '@codemirror/language';
import { WebContainerService } from '../../services/webContainersService';

const playgroundStore = useStore();
const openedFilePath = computed(() => playgroundStore.getters.currentFilePath);
const sessionService = inject<SessionService>('sessionService');
const webContainersService = inject<WebContainerService>(
  'webContainersService'
);
const errors = reactive(webContainersService?.state.errors ?? []);
const showTooltip = ref(false);
const openedFileContent = computed(
  () => playgroundStore.getters.currentFileContent
);
let debounceTimer: any = null;

const state = reactive<{
  fontSize: number;
  editorIsShown: boolean;
}>({
  fontSize: 14,
  editorIsShown: false,
});

const props = defineProps<{
  isDetail: boolean;
  dynamicClass?: Record<string, boolean>;
}>();

onMounted(() => {
  const editorSettings = sessionService?.getFromSession('editorSettings');
  if (editorSettings) {
    state.fontSize = editorSettings['selectedFontSize'];
    playgroundStore.commit('updateLayout', editorSettings['selectedLayout']);
  }
});

const extensions = computed(() => {
  const fileExtension = getFileExtension(openedFilePath.value);

  const customAutocomplete = autocompletion({
    override: [
      (context) => {
        const word = context.matchBefore(/[\w-]*/);
        if (!word || word.from === word.to) return null;

        // Get the code before the cursor (last 50 characters) to check the context.
        const textBeforeCursor = context.state.sliceDoc(
          word.from - 50,
          word.from
        );
        const isInsideString = /["'`]/.test(
          textBeforeCursor.charAt(textBeforeCursor.length - 1)
        );
        const isInsideTag = /<[^>]*$/.test(textBeforeCursor);
        const autocompleteForString =
          isInsideString || isInsideTag
            ? getAutompleteByFileExtension(FileExtensions.HTML).filter((comp) =>
                comp.value.startsWith(word.text)
              )
            : [];

        const matches = [
          ...autocompleteForString,
          ...getSDSAutocomplete(),
          ...getAframeAutocomplete(),
          ...getAutompleteByFileExtension(fileExtension).filter((comp) =>
            comp.value.startsWith(word.text)
          ),
        ];

        if (matches.length === 0) return null;

        const uniqueMatches: AutocompleteMatch[] = [
          ...new Set(matches.map((comp) => comp.value)),
        ].map((value) => {
          return matches.find(
            (comp) => comp.value === value
          ) as AutocompleteMatch;
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

  let languageExtension: LanguageSupport;
  if (
    [FileExtensions.JS, FileExtensions.TS, FileExtensions.HTML].includes(
      fileExtension
    )
  ) {
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

const updateCode = (newCode: string) => {
  if (!webContainersService) return;
  webContainersService.state.isLoading = true;

  playgroundStore.commit('updateCurrentFileContent', newCode);
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    try {
      await webContainersService?.writeFile(
        openedFilePath.value,
        openedFileContent.value,
        !props.isDetail
      );
    } catch (error) {
      console.error('Error during runCode execution:', error.message);
    } finally {
      webContainersService.state.isLoading = false;
    }
  }, 100);
};
</script>

<template>
  <div class="relative">
    <codemirror
      class="editor lg:w-full block overflow-y-auto h-[30rem] pb-5"
      :class="props.dynamicClass"
      v-model="openedFileContent"
      :extensions="extensions"
      @update:modelValue="updateCode"
      :is-detail="props.isDetail"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :style="{ fontSize: state.fontSize + 'px' }"
    />

    <div
      v-if="errors?.length"
      class="absolute bottom-5 right-5 w-[36px] h-[36px] bg-red text-white rounded-full cursor-pointer flex items-center justify-center z-50 duration-200 hover:scale-125 transform"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <i class="pi pi-exclamation-circle"></i>
      <div v-if="showTooltip" class="relative bottom-4 right-0 bg-black text-white p-3 text-[14px] max-w-[200px] shadow-md">
        <p v-for="(err, index) in errors" :key="index">
          {{ err.message }}
        </p>
      </div>
    </div>
  </div>
</template>
