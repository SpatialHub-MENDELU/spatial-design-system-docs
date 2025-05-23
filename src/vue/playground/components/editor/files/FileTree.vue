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
import ConfirmDialog from 'primevue/confirmdialog';
import CreateProjectDialog from '../../shared/CreateProjectDialog.vue';
import CustomCofirmDialog from '../../dialogs/CustomCofirmDialog.vue';
import { FolderItem } from '../../../types/fileItem';

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

const disabledNodes = ['node_modules', 'package.json', 'package-lock.json', 'vite.config.js'];

watch(props.loading, async () => {
  await fileTreeService.fetchFolders();
  if (!props.loading.installing && !props.loading.running) {
    fileTreeService.state.isHidden = false;
  }
});

watch(foldersAreLoading, async() => {
  if (!foldersAreLoading.value) {
    const data = await webContainersService?.fetchFolderStructureInTreeNode('/');
    if (data) {
      folders.value = data;
    }
  }
})

const showNewFileMenu = (event) => {
  fileTreeService.state.itemToRename = null;
  fileTreeService.newFileContextMenu?.value?.show(event);
};

const toggleVisibility = () => {
  fileTreeService.state.isVisible = !fileTreeService.state.isVisible;
};

const updateItems = async () => {
  movingLoading.value = true

  await fileTreeService.fetchFolders().then(() => {
    movingLoading.value = false
  });
};

const updateMovingLoading = async () => {
  movingLoading.value = true

  const data = await webContainersService?.fetchFolderStructureInTreeNode('/');
  if (data) {
    folders.value = data;
  }
}
</script>

<template>
  <Toast position="bottom-center" />

  <div
    v-if="foldersAreLoading && !props.loading.installing && !props.loading.running"
    class="lg:min-w-[8rem] lg:h-auto h-[10rem] flex items-center justify-center lg:border-r lg:border-b-0 lg:border-l-0 border border-border-color relative overflow-visible duration-300 block pb-2"
  >
    <div class="loading-dots">
      <span />
      <span />
      <span />
    </div>  
  </div>

  <ConfirmDialog></ConfirmDialog>

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
          v-tooltip.left="'Download file system'"
        />

        <Button @click="showNewFileMenu" icon="pi pi-plus" class="w-4"
        v-tooltip.left="'Add content'" />

        <button class="w-max h-full lg:hidden flex items-center justify-center"
          @click="toggleVisibility">
          <i
            :class="[
              'pi',
              fileTreeService.state.isVisible ? 'pi-angle-up' : 'pi-angle-down',
              'text-primary lg:border border-primary text-[20px] duration-300 lg:rounded-xl lg:p-2 bg-white h-full',
            ]"
          />
        </button>

        <ContextMenu
          :model="fileTreeService.newFileContextMenuItems"
          :ref="fileTreeService.newFileContextMenu"
        />
      </div>
    </div>
    <div
      class="relative w-full h-2 overflow-hidden bg-white lg:min-w-[8rem]"
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
        'p-tree--hidden lg:max-w-0 lg:max-h-full lg:h-full h-0':
          !fileTreeService.state.isVisible,
        'lg:max-w-[20rem] lg:w-[15rem] lg:h-full lg:max-h-full h-max max-h-max':
          fileTreeService.state.isVisible,
      }"
    >
      <template #default="{ node }">
        <span class="whitespace-nowrap block text-grey"
          v-if="disabledNodes.includes(String(node.label))">{{ node.label }}</span>

        <div
          v-else
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

    <CustomCofirmDialog
      message="Are you sure you want to create a new project? This will discard all your current changes."
      :show-dialog="fileTreeService.state.showCreateProjectDialogConfirm"
      :accept="fileTreeService.createProjectConfirmAccept"
      :reject="fileTreeService.closeNewProjectConfirmDialog"
    />

    <CreateProjectDialog
      :visible="fileTreeService.state.showCreateProjectDialog"
      :close-dialog="fileTreeService.closeDialog"
      :create-project="(projectType) => fileTreeService.createNewProject(projectType, props.loading, playgroundStore)"
    />

    <CustomCofirmDialog
      message="Are you sure you want to delete this item?"
      :show-dialog="fileTreeService.state.showDeleteConfirmDialog"
      :accept="() => fileTreeService.deleteItem(fileTreeService.state.currentItem as FolderItem, playgroundStore)"
      :reject="() => fileTreeService.state.showDeleteConfirmDialog = false"
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
      :parent-node="fileTreeService.state.parentItemNode"
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
