<template>
  <div class="flex gap-0">
    <codemirror
      class="editor w-1/2"
      v-model="code"
      :extensions="extensions"
      @update:modelValue="updateCode"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
    />

    <EditorOutput 
      :output="output"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { WebContainer } from '@webcontainer/api';
import { files } from './files';
import { Codemirror } from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {EditorView, keymap} from "@codemirror/view"
import EditorOutput from './EditorOutput.vue';
import { ILoading } from '../../types/loading-types'
import { autocompletion } from '@codemirror/autocomplete'

const code = ref('');
const output = ref('');
const loading = reactive<ILoading>({
  installing: true,
  running: false
})

const editorOptions = {
  lineWrapping: true, // Enable line wrapping
  theme: 'material', // Change to a more visually appealing theme
  tabSize: 2, // Set the size of tabs
  indentWithTab: true, // Use tabs for indentation
};

const extensions = [basicSetup, javascript(), EditorView.lineWrapping, autocompletion()];

let webcontainerInstance;
let debounceTimer = null;

const updateCode = (newCode) => {
  code.value = newCode;

  if (debounceTimer) clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    runCode();
  }, 1000);
};

onMounted(async () => {
  try {
    webcontainerInstance = await WebContainer.boot();

    await webcontainerInstance.mount(files);

    const indexHtmlContent = await webcontainerInstance.fs.readFile('index.html', 'utf-8');
    code.value = indexHtmlContent;

    const exitCode = await installDependencies();
    if (exitCode !== 0) {
      throw new Error('Dependency installation failed');
    }

    loading.installing = false;
    runCode();
  } catch (error) {
    output.value = `Error: ${error.message}`;
  }
});

async function installDependencies() {
  const installProcess = await webcontainerInstance.spawn('npm', ['install', '--verbose']);

  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));

  return installProcess.exit;
}

const runCode = async () => {
  loading.running = true;
  try {
    await webcontainerInstance.fs.writeFile('index.html', code.value);

    const htmlContent = await webcontainerInstance.fs.readFile('index.html', 'utf-8');
    output.value = htmlContent;
  } catch (error) {
    output.value = `Chyba: ${error.message}`;
  } finally {
    loading.running = false; 
  }
};
</script>
