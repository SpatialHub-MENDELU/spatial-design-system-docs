<script lang="ts" setup>
import { useStore } from 'vuex';
import { getFileIcon } from '../../../utils/FileExtensionsAndIcons';
import { computed, inject } from 'vue';
import Button from 'primevue/button';
import { FolderItem } from '../../../types/fileItem';
import { WebContainerService } from '../../../services/webContainersService';

const playgroundStore = useStore();
const openedFiles = computed(() => playgroundStore.getters.openedFiles);
const currentFilePath = computed(() => playgroundStore.getters.currentFilePath);

const webContainersService = inject<WebContainerService>(
  'webContainersService'
);

const removeFile = (file: FolderItem) => {
  playgroundStore.dispatch('closeFile', {
    file,
    update: async (filePath: string) => {
      return await webContainersService?.readFile(filePath);
    },
  });
};

const setOpenedFile = async (file: FolderItem) => {
  playgroundStore.commit('addFile', file);
  const path = file.path ?? file.name;

  try {
    const content = await webContainersService?.readFile(path);
    playgroundStore.commit('readFile', { content, path });
  } catch (error) {
    console.error('Error reading file:', error);
  }
};
</script>

<template>
  <div
    class="opened-files flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 whitespace-nowrap w-full"
  >
    <div
      class="flex items-center gap-2"
      v-for="file in openedFiles"
      :key="file.name"
    >
      <div
        class="flex items-center gap-0.5 cursor-pointer"
        @click="setOpenedFile(file)"
      >

        <i
          :class="[getFileIcon(file), { 'text-primary': file.path === currentFilePath }]"
          class="w-4 h-4 text-grey"
        />       
        <p
          class="md:text-[14px] text-[13px] truncate max-w-[150px]"
          :class="{
            'text--mainColor': file.path === currentFilePath,
            'text-grey': file.path !== currentFilePath,
          }"
          title="file.name"
        >
          {{ file.name }}
        </p>
      </div>
      <Button
        @click="removeFile(file)"
        icon="pi pi-times"
        class="w-2.5 h-2.5"
        v-if="file.path === currentFilePath"
      />
    </div>
  </div>
</template>
