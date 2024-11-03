<template>
  <Dialog :visible="showDialog" :header="`New ${dialogType}`" modal maximizable :closable="false">
    <div>
      <InputText v-model="newItemName" placeholder="Enter name" />
      <small v-if="errorMessage" class="text-red-500">{{ errorMessage }}</small>
    </div>
    <div class="flex justify-end mt-2">
      <Button label="Cancel" icon="pi pi-times" @click="closeDialog" />
      <Button label="Create" icon="pi pi-check" @click="createNewItem" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, inject, defineEmits } from 'vue';

import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { FolderService } from '../../services/folderService';
import { FileType } from '../../types/fileType';
import { WebContainerService } from '../../services/webContainersService';

const emit = defineEmits();
const webContainersService = inject<WebContainerService>('webContainersService')
const folderService = new FolderService(webContainersService as WebContainerService);

const props = defineProps<{
  showDialog: boolean;
  dialogType: FileType;
  closeDialog: () => void;
}>();

const newItemName = ref('');
const errorMessage = ref('');

const createNewItem = async () => {
  errorMessage.value = '';

  if (newItemName.value.trim() === '') {
    errorMessage.value = 'Name cannot be empty.';
    return;
  }

  const parentFolder = props.dialogType === 'file' ? folderService?.getOpenFolder() : undefined;
  const result = await folderService?.createNewItem(newItemName.value, props.dialogType, parentFolder);

  if (result?.error) {
    errorMessage.value = result.error;
  } else {
    newItemName.value = ''; // Reset input
    emit('new-item');
    props.closeDialog(); // Close dialog
  }
};
</script>

<style scoped>
.text-red-500 {
  color: red; 
}
</style>
