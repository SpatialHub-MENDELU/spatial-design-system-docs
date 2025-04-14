<script lang="ts" type="module" setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { IPropsCodemirror } from '../../types/props';
import { CodeMirrorService } from '../../services/codemirrorService';
import Codemirror from 'vue-codemirror6';
import { EditorView } from 'codemirror';

const playgroundStore = useStore();
const openedFilePath = computed(() => playgroundStore.getters.currentFilePath);
const openedFileContent = computed(() => playgroundStore.getters.currentFileContent);

const props = defineProps<IPropsCodemirror>();
const codemirrorService = new CodeMirrorService();

const extensions = computed(() =>
  codemirrorService.extensions(openedFilePath.value).value
);

function handleEditorReady(payload: { view: EditorView }) {
  codemirrorService.setEditorView(payload.view);
  codemirrorService.loadCodemirror(playgroundStore);

  if (openedFileContent.value) {
    updateEditorContent(openedFileContent.value);
  }
}

watch(openedFileContent, (newContent) => {
  updateEditorContent(newContent);
});

watch(openedFilePath, async (newPath, oldPath) => {
  if (newPath !== oldPath) {
    codemirrorService.reloadEditorState(openedFileContent.value, newPath);
  }
});

function updateEditorContent(newContent: string) {
  const view = codemirrorService.editorView;
  if (!view) return;

  const currentContent = view.state.doc.toString();
  if (currentContent === newContent) return;

  const cursorPos = view.state.selection.main.head;

  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: newContent,
    },
    selection: { anchor: cursorPos, head: cursorPos },
    annotations: [],
  });
}


const updateCode = (newCode?: any) => {
  codemirrorService.updateCode(
    String(newCode),
    playgroundStore,
    openedFilePath.value,
    openedFileContent.value,
    !props.isDetail
  );
};
</script>

<template>
  <codemirror
    class="editor lg:w-full block overflow-y-auto lg:h-full h-[20rem]"
    id="editor"
    :class="props.dynamicClass"
    v-model="openedFileContent"
    @update:modelValue="updateCode"
    @ready="handleEditorReady"
    :is-detail="props.isDetail"
    :autofocus="true"
    :extensions="extensions"
    :indent-with-tab="true"
    :tab-size="2"
    :style="{ fontSize: codemirrorService.state.fontSize + 'px' }"
  />
</template>
