<script setup lang="ts">
import { reactive } from 'vue';
import CodeMirrorEditor from '../components/editor/CodeMirrorEditor.vue';
import FolderStucture from '../components/editor/FolderStucture.vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

// Reactive object to store the dialog state
const dialogState = reactive({
  isVisible: false,   // Tracks if the dialog is visible
  mode: '',           // Tracks the mode: 'folder' or 'file'
});

// Function to show the dialog for creating a new folder
const showNewFolderDialog = () => {
  dialogState.mode = 'folder';
  dialogState.isVisible = true;
};

// Function to show the dialog for creating a new file
const showNewFileDialog = () => {
  dialogState.mode = 'file';
  dialogState.isVisible = true;
};

// Function to close the dialog
const closeDialog = () => {
  dialogState.isVisible = false;
};
</script>

<template>
  <div class="flex h-full">
    <FolderStucture
      :showNewFolderDialog="showNewFolderDialog"
      :showNewFileDialog="showNewFileDialog"
    />
  
    <CodeMirrorEditor />
  </div>



  <Dialog 
    v-model:visible="dialogState.isVisible" 
    :header="dialogState.mode === 'folder' ? 'Create New Folder' : 'Create New File'" 
    :modal="true"
    :closable="false"
    class="w-[30vw]"
  >
    <p v-if="dialogState.mode === 'folder'">Enter a name for the new folder:</p>
    <p v-if="dialogState.mode === 'file'">Enter a name for the new file:</p>
    <input type="text" class="w-full p-2 border border-gray-300 rounded mb-4" placeholder="Enter name..." />

    <div class="flex justify-end gap-2">
      <Button label="Cancel" class="p-button-secondary" @click="closeDialog" />
      <Button label="Create" class="p-button-primary" @click="closeDialog" />
    </div>
  </Dialog>
</template>
