<template>
  <div class="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 whitespace-nowrap max-w-full">
    <div
      class="flex items-center gap-2"
      v-for="file in openedFiles"
      :key="file.name"
    >
      <div class="flex items-center gap-0.5"
        @click="setOpenedFile(file)">
        <i :class="getFileIcon(file), { 'text-primary': file.name === currentFilePath }" class="w-4 h-4" />
        <p class="md:text-[14px] text-[13px] truncate max-w-[150px]"
        :class="{ 
          'text-black': file.name === currentFilePath, 
          'text-grey': file.name !== currentFilePath 
        }" 
        title="file.name">
          {{ file.name }}
        </p>
      </div>
      <Button
        @click="removeFile(file)"
        icon="pi pi-times"
        class="w-2.5 h-2.5"
        v-if="file.name === currentFilePath"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { getFileExtension, getFileIcon } from '../../../utils/FileExtensionsAndIcons';
import { computed, inject } from 'vue';
import Button from 'primevue/button';
import { FolderItem } from '../../../types/fileItem';
import { FileExtensions, FileType } from '../../../types/fileType';
import { WebContainerService } from '../../../services/webContainersService';

const fileStore = useStore();
const openedFiles = computed(() => fileStore.getters.openedFiles);
const currentFilePath = computed(() => fileStore.getters.currentFilePath)

const webContainersService = inject<WebContainerService>(
  'webContainersService'
);

const removeFile = (file: FolderItem) => {
  fileStore.dispatch('removeFile', {
    file,
    update: async (filePath: string) => {
      console.log(filePath)
      return await webContainersService?.readFile(filePath);
    },
  });
};

const setOpenedFile = async (file: FolderItem) => {
  fileStore.commit('addFile', file);
  const path = file.webkitRelativePath ?? file.name;

  if (getFileExtension(path, FileType.FILE) === FileExtensions.HTML) {
    const htmlContent = await webContainersService?.readFile(path);
    fileStore.commit('setOuput', htmlContent as string);
	}

  try {
    const content = await webContainersService?.readFile(path);
    fileStore.commit('readFile', { content, path });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}
</script>
