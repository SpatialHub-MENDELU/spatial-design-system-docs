<template>
  <div>
    <codemirror
      v-model="code"
      :extensions="extensions"
      @update:modelValue="updateCode"
    />
    <button @click="runCode">Spustit kód</button>
    <div class="output">
      <h2>Výstup:</h2>
      <pre>{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { WebContainer } from '@webcontainer/api';
import { files } from './files';
import { Codemirror } from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

const code = ref('');
const output = ref('');

const editorOptions = {
  lineNumbers: true,
  extensions: [basicSetup, javascript()],
};

const extensions = [basicSetup, javascript()];

let webcontainerInstance;

const updateCode = (newCode) => {
  code.value = newCode;
};

onMounted(async () => {
  try {
    console.log("Initializing WebContainer");
    webcontainerInstance = await WebContainer.boot();
    console.log("WebContainer initialized");

    console.log("Mounting files:", files);
    await webcontainerInstance.mount(files);
    console.log("Files mounted");

    const indexJsContent = await webcontainerInstance.fs.readFile('index.js', 'utf-8');
    console.log("index.js content:", indexJsContent);
    code.value = indexJsContent;

    const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');
    console.log("Package JSON:", packageJSON);

    const exitCode = await installDependencies();
    if (exitCode !== 0) {
      throw new Error('Installation failed');
    }
  } catch (error) {
    console.error("Error during WebContainer initialization:", error);
    output.value = `Error: ${error.message}`;
  }
});

async function installDependencies() {
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  return installProcess.exit;
}

const runCode = async () => {
  try {
    await webcontainerInstance.fs.writeFile('index.js', code.value);
    console.log("Updated index.js with new code.");

    const runProcess = await webcontainerInstance.spawn('node', ['index.js']);

    output.value = '';

    const reader = runProcess.output.getReader();
    let done, value;

    while (true) {
      ({ done, value } = await reader.read());
      if (done) break;

      if (typeof value === 'string') {
        output.value += value; 
      } else if (value instanceof Uint8Array) {
        const decodedValue = new TextDecoder('utf-8').decode(value);
        output.value += decodedValue; 
      } else {
        console.error("Received value is not a Uint8Array or string:", value);
      }
    }

    const exitCode = await runProcess.exit;

    if (exitCode !== 0) {
      output.value += `\nProcess exited with code: ${exitCode}\n`;
    }
  } catch (error) {
    output.value = `Error: ${error.message}`;
  }
};



</script>

<style>
.output {
  margin-top: 20px;
  white-space: pre-wrap; /* Maintain whitespace for better readability */
  background-color: #f9f9f9; /* Optional: background for output */
  padding: 10px; /* Optional: padding for aesthetics */
  border: 1px solid #ddd; /* Optional: border for definition */
  border-radius: 5px; /* Optional: rounded corners */
}
</style>
