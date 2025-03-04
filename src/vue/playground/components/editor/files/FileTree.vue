<script setup lang="ts">
import { inject, watch, computed, ref } from 'vue';
import Tree from 'primevue/tree';
import ContextMenu from 'primevue/contextmenu';
import Button from 'primevue/button';
import NewItemDialog from '../NewItemDialog.vue';
import FolderFileUploader from './FolderFileUploader.vue';
import { useStore } from 'vuex';
import Toast from 'primevue/toast';
import { IPropsFileTree } from '../../../types/props';
import { FileTreeService } from '../../../services/fileTreeService';
import { WebContainerService } from '../../../services/webContainersService';
import MoveFileDialog from '../../dialogs/MoveFileDialog.vue';
import { TreeNode } from 'primevue/treenode';

const playgroundStore = useStore();
const props = defineProps<IPropsFileTree>();
const webContainersService = inject<WebContainerService>(
  'webContainersService'
);
const fileTreeService = new FileTreeService(webContainersService);
const foldersAreLoading = computed(
  () => playgroundStore.getters.foldersAreLoading
);
const folders = ref<TreeNode[]>([]);
const movingLoading = ref<boolean>(false);

watch(props.loading, async () => {
  await fileTreeService.fetchFolders();
  if (!props.loading.installing && !props.loading.running) {
    fileTreeService.state.isHidden = false;
  }
  const data = await webContainersService?.fetchFolderStructureInTreeNode('/');
  if (data) {
    folders.value = data;
  }
});

const showNewFileMenu = (event) => {
  fileTreeService.state.itemToRename = null;
  fileTreeService.newFileContextMenu?.value?.show(event);
};

const toggleVisibility = () => {
  fileTreeService.state.isVisible = !fileTreeService.state.isVisible;
};

const updateItems = async () => {
  await fileTreeService.fetchFolders().then(() => {
    movingLoading.value = false
  });
};

const updateMovingLoading = () => {
  movingLoading.value = true
}
</script>

<template>
  <Toast position="bottom-center" />

  <div
    v-if="foldersAreLoading"
    class="lg:min-w-[8rem] lg:h-auto h-[10rem] flex items-center justify-center lg:border-r lg:border-b-0 lg:border-l-0 border border-border-color relative overflow-visible duration-300 block pb-2"
  >
    <div class="spinner" />
  </div>

  <div
    v-if="!foldersAreLoading"
    class="relative border-r border-border-color relative overflow-visible duration-300 block lg:border-t-0 border-t lg:border-l-0 border-l pb-2"
    :class="{ ' filetree--hidden ': fileTreeService.state.isHidden }"
  >
    <div
      class="flex justify-between px-3 py-1 border-b border-border-color duration-300 h-8 items-center"
      :class="{ 'border-b-0': !fileTreeService.state.isVisible }"
    >
      <span
        class="font-bold 2xl:text-[16px] lg:text-[15px] text-[14px] leading-0"
        :class="{
          ' w-0 overflow-hidden opacity-hidden ':
            fileTreeService.state.isHidden,
        }"
        >Files</span
      >
      <div
        class="flex gap-2 overflow-hidden filetree__buttons h-full"
        :class="{
          'lg:max-w-0': !fileTreeService.state.isVisible,
          'lg:max-w-full': fileTreeService.state.isVisible,
        }"
      >
        <Button
          @click="fileTreeService.downloadFileSystem"
          icon="pi pi-download"
          class="w-4"
        />
        <Button @click="showNewFileMenu" icon="pi pi-plus" class="w-4" />
        <Button
          @click="toggleVisibility"
          :icon="
            fileTreeService.state.isVisible
              ? 'pi pi-angle-up'
              : 'pi pi-angle-down'
          "
          class="w-4 lg:hidden block"
        />

        <ContextMenu
          :model="fileTreeService.newFileContextMenuItems"
          :ref="fileTreeService.newFileContextMenu"
        />
      </div>
    </div>
    <div
      class="relative w-full h-2 overflow-hidden bg-white"
      v-if="movingLoading"
    >
      <div
        class="absolute top-0 left-0 w-1/4 h-full bg-primary animate-slide"
      ></div>
    </div>

    <Tree
      :value="fileTreeService.folders"
      class="overflow-y-auto max-h-full duration-300"
      :class="{
        'lg:max-w-0 lg:max-h-full lg:h-full h-0':
          !fileTreeService.state.isVisible,
        'lg:max-w-[20rem] lg:w-[15rem] lg:h-full lg:max-h-full h-max max-h-max':
          fileTreeService.state.isVisible,
      }"
    >
      <template #default="{ node }">
        <div
          class="cursor-pointer"
          @contextmenu="
            fileTreeService.showContextMenu($event, node, playgroundStore)
          "
          @click="fileTreeService.openFile(node, playgroundStore)"
        >
          <span class="whitespace-nowrap block">{{ node.label }}</span>
        </div>
      </template>
    </Tree>

    <ContextMenu
      :model="fileTreeService.contextMenuItems"
      :ref="fileTreeService.menu"
    />

    <NewItemDialog
      :showDialog="fileTreeService.state.showAddRenameDialog"
      :dialogType="fileTreeService.state.dialogType"
      :closeDialog="fileTreeService.closeDialog"
      @new-item="updateItems"
      @rename-item="updateItems"
      :itemToRename="fileTreeService.state.itemToRename"
      :parent-node="fileTreeService.state.parentItemNode"
    />

    <MoveFileDialog
      :show-dialog="fileTreeService.state.showMoveItemDialog"
      :closeDialog="fileTreeService.closeDialog"
      :folders="folders"
      :selected-item="fileTreeService.state.itemToMove"
      @updated-item="updateItems"
      :updateLoading="updateMovingLoading"
    />

    <button
      class="absolute bottom-12 -right-6 h-12 w-12 cursor-pointer block z-40 lg:block hidden"
      @click="toggleVisibility"
    >
      <i
        :class="[
          'pi',
          fileTreeService.state.isVisible ? 'pi-angle-left' : 'pi-angle-right',
          'text-primary border border-primary text-[20px] duration-300 rounded-xl p-1.5 bg-white',
        ]"
      />
    </button>

    <FolderFileUploader
      :close-dialog="fileTreeService.closeDialog"
      :is-dialog-visible="fileTreeService.state.showUploadDialog"
      :uploadType="fileTreeService.state.dialogType"
      @new-item="updateItems"
    />
  </div>
</template>

<style>
@keyframes slide {
  0% {
    left: -25%;
  }
  100% {
    left: 100%;
  }
}

.animate-slide {
  animation: slide 1.5s infinite linear;
}
</style>
