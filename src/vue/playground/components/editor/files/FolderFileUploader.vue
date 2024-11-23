<template>
  <Dialog
    :visible="isDialogVisible"
    :header="folderFileUplaoderState.dialogHeader"
    modal
    :closable="false"
  >
    <FileUploader
      :multiple="true"
      :accept="'.html, .css, .js, .ts, .jsx, .tsx'"
      :folderUploader="folderFileUplaoderState.isFolder"
      @new-item="handleNewItem"
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

<script lang="ts" setup>
import FileUploader from './FileUploader.vue';
import Dialog from 'primevue/dialog';
import { defineEmits, watch, reactive } from 'vue';
import Button from 'primevue/button';
import { FileType } from '../../../types/fileType';
import { TreeNode } from 'primevue/treenode';

const emit = defineEmits();
const folderFileUplaoderState = reactive({
  dialogHeader: '',
  isFolder: false,
});

const props = defineProps<{
  isDialogVisible: boolean;
  closeDialog: () => void;
  uploadType: FileType;
}>();

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
