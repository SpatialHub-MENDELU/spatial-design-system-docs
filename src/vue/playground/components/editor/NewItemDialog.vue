<template>
  <Dialog
    :visible="showDialog"
    :header="state.dialogHeader"
    modal
    maximizable
    :closable="false"
  >
    <div class="flex gap-2 items-center">
      <div class="flex flex-col gap-1 w-full justify-start relative">
        <InputText
          v-model="state.newItemName"
          placeholder="Enter name"
          :class="{ 'p-invalid': state.errorMessage }"
        />
        <span
          v-if="state.errorMessage"
          class="absolute h-4 right-0 bottom-2"
          v-tooltip.bottom="state.errorMessage"
        >
          <i class="pi pi-info-circle" style="color: red"></i>
        </span>
      </div>

      <template v-if="props.dialogType === FileType.FILE">
        <div class="flex flex-col gap-1 w-max justify-start relative">
          <Dropdown
            v-model="state.newFileExtension"
            :options="fileNameExtensions"
            placeholder="Select"
            optionLabel="label"
            optionValue="value"
            :class="{ 'p-invalid': state.errorExtensionMessage }"
          />
          <span
            v-if="state.errorExtensionMessage"
            class="absolute h-4 right-0 bottom-2"
            v-tooltip.bottom="state.errorExtensionMessage"
          >
            <i class="pi pi-info-circle" style="color: red"></i>
          </span>
        </div>
      </template>
    </div>

    <div class="flex justify-end mt-2">
      <Button label="Cancel" icon="pi pi-times" @click="closeDialog" />
      <Button
        :label="state.buttonLabel"
        class="bg-primary"
        :icon="state.buttonIcon"
        @click="handleAction"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  inject,
  defineEmits,
  watch,
  reactive,
} from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { FolderService } from '../../services/folderService';
import { FileType } from '../../types/fileType';
import { WebContainerService } from '../../services/webContainersService';
import { FolderItem } from '../../types/fileItem';
import {
  getFileExtension,
  getFileWithoutExtension,
} from '../../utils/FileExtensionsAndIcons';
import { TreeNode } from 'primevue/treenode';
import { IStateNewItemDialog } from '../../types/States';

const emit = defineEmits();
const webContainersService = inject<WebContainerService>(
  'webContainersService'
);
const folderService = new FolderService(
  webContainersService as WebContainerService
);

const props = defineProps<{
  showDialog: boolean;
  dialogType: FileType;
  closeDialog: () => void;
  itemToRename: FolderItem | null;
  parentNode: TreeNode | null
}>();

const fileNameExtensions = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JS', value: 'js' },
];

const state = reactive<IStateNewItemDialog>({
  itemToRename: props.itemToRename || null,
  newItemName: '',
  newFileExtension: '',
  errorMessage: '',
  errorExtensionMessage: '',
  dialogHeader: '',
  buttonLabel: 'Create',
  buttonIcon: 'pi pi-check',
});

watch(
  () => [props.itemToRename, props.dialogType],
  ([newItemToRename, newDialogType]) => {
    const newValue = newItemToRename as FolderItem;
    if (newValue && newValue.name !== '') {
      state.newItemName = getFileWithoutExtension(newValue);
      state.newFileExtension = getFileExtension(newValue.name, newValue.type);
      state.dialogHeader = `Rename ${props.dialogType}`;
      state.buttonLabel = 'Rename';
      state.buttonIcon = 'pi pi-pencil';
    } else {
        if (newDialogType === FileType.FILE && fileNameExtensions.length > 0) {
            state.newFileExtension = fileNameExtensions[0].value;
        }
        
        state.newItemName = ''
        state.dialogHeader = newDialogType === FileType.FILE ? 'New file' : 'New folder'
        state.buttonLabel = 'Create';
        state.buttonIcon = 'pi pi-check';
    }
  },
  { immediate: true, deep: true }
);

const handleAction = async () => {
  state.errorMessage = '';
  state.errorExtensionMessage = '';

  if (state.newItemName.trim() === '') {
    state.errorMessage = 'Name cannot be empty.';
    return;
  }

  if (props.dialogType === FileType.FILE && !state.newFileExtension) {
    state.errorExtensionMessage = 'Extension is required.';
    return;
  }

  const fullName =
    props.dialogType === FileType.FILE && state.newFileExtension
      ? `${state.newItemName}.${state.newFileExtension}`
      : state.newItemName;

  const parentFolder = props.parentNode?.parent;

  if (props.itemToRename) {
    const result = await folderService?.renameItem(
      props.itemToRename.name,
      fullName
    );
    if (result?.error) {
      state.errorMessage = result.error;
    } else {
      emit('rename-item');
      props.closeDialog();
    }
  } else {
    const result = await folderService?.createNewItem(
      fullName,
      props.dialogType,
      parentFolder
    );

    if (result?.error) {
      state.errorMessage = result.error;
    } else {
      state.newItemName = '';
      emit('new-item');
      props.closeDialog();
    }
  }
};
</script>
