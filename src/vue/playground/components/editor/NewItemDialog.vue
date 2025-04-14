<script setup lang="ts">
import { defineProps, inject, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { FileSystemService } from '../../services/fileSystemService';
import { FileType } from '../../types/fileType';
import { WebContainerService } from '../../services/webContainersService';
import { FolderItem } from '../../types/fileItem';
import { IPropsNewItemDialog } from '../../types/props';
import { useStore } from 'vuex';
import { useToast } from 'primevue';

const emit = defineEmits()
const webContainersService = inject<WebContainerService>(
  'webContainersService'
);
const fileSystemService = new FileSystemService(
  webContainersService as WebContainerService
);

const props = defineProps<IPropsNewItemDialog>();
const playgroundStore = useStore()
const toast = useToast()

const submit = async () => {
  const regex = /^[a-zA-Z]([a-zA-Z0-9]*[-_]?([a-zA-Z0-9]+))*$/;
  if (!regex.test(fileSystemService.state.newItemName)) {
    fileSystemService.state.errorMessage = 'Invalid format';
    return;
  }

  await fileSystemService.submitNewItemDialog(props, playgroundStore, toast).then(() => {
    if (props.itemToRename) emit('rename-item');
    else emit('new-item')

    playgroundStore.commit('updateFoldersLoading', true)
  })
}

watch(
  () => [props.itemToRename, props.dialogType],
  ([newItemToRename, newDialogType]) => {
    const newValue = newItemToRename as FolderItem;
    fileSystemService.updateEditedItem(newValue, props, newDialogType);
  },
  { immediate: true, deep: true }
);

</script>

<template>
  <Dialog
    :visible="showDialog"
    :header="fileSystemService.state.dialogHeader"
    modal
    maximizable
    dismissableMask
    @update:visible="() => closeDialog()" 
  >
    <div class="flex gap-2 items-center items-stretch mt-2">
      <div class="flex flex-col gap-1 w-full justify-start relative ">
        <InputText
          v-model="fileSystemService.state.newItemName"
          placeholder="Enter name"
          :class="{ 'p-invalid': fileSystemService.state.errorMessage }"
        />
        <span
          v-if="fileSystemService.state.errorMessage"
          class="absolute h-4 right-0 bottom-2"
          v-tooltip.bottom="fileSystemService.state.errorMessage"
        >
          <i class="pi pi-info-circle" style="color: red"></i>
        </span>
      </div>

      <template v-if="props.dialogType === FileType.FILE">
        <div class="flex flex-col gap-1 w-max justify-start relative">
          <Dropdown
            v-model="fileSystemService.state.newFileExtension"
            :options="fileSystemService.fileNameExtensions"
            placeholder="Select"
            optionLabel="label"
            optionValue="value"
            :class="{ 'p-invalid': fileSystemService.state.errorExtensionMessage }"
          />
          <span
            v-if="fileSystemService.state.errorExtensionMessage"
            class="absolute h-4 right-0 bottom-2"
            v-tooltip.bottom="fileSystemService.state.errorExtensionMessage"
          >
            <i class="pi pi-info-circle" style="color: red"></i>
          </span>
        </div>
      </template>
    </div>

    <div class="flex justify-end mt-2">
      <Button label="Cancel" icon="pi pi-times" @click="closeDialog" />
      <Button
        :label="fileSystemService.state.buttonLabel"
        class="bg-primary"
        :icon="fileSystemService.state.buttonIcon"
        @click="submit"
      />
    </div>
  </Dialog>
</template>
