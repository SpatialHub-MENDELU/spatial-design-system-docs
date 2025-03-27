<script lang="ts" setup>
import FileUploader from './FileUploader.vue';
import Dialog from 'primevue/dialog';
import { defineEmits, watch } from 'vue';
import Button from 'primevue/button';
import { FileType } from '../../../types/fileType';
import { initFolderFileUploaderState } from '../../../states/FolderFileUploaderState';
import { IPropsFolderFileUploader } from '../../../types/props';

const emit = defineEmits();
const folderFileUplaoderState = initFolderFileUploaderState
const props = defineProps<IPropsFolderFileUploader>();

const handleNewItem = () => {
  emit('new-item');
  props.closeDialog();
};

watch(
  () => props.uploadType,
  (uploadType) => {
    folderFileUplaoderState.dialogHeader = `Upload ${uploadType === FileType.FOLDER ? 'folders' : 'files'}`;
    folderFileUplaoderState.isFolder = uploadType === FileType.FOLDER;
  },
  { immediate: true }
);
</script>

<template>
  <Dialog
    :visible="isDialogVisible"
    :header="folderFileUplaoderState.dialogHeader"
    modal
    :closable="false"
    class="folder-file-uploader"
  >
    <FileUploader
      :multiple="true"
      :accept="'.html, .css, .js, .ts, .jsx, .tsx'"
      :folderUploader="folderFileUplaoderState.isFolder"
      @new-item="handleNewItem"
      :parent-node="props.parentNode"
    />

    <div class="flex justify-end mt-2">
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="closeDialog"
        class="bg-primary"
      />
    </div>
  </Dialog>
</template>
