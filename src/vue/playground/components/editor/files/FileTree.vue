<template>
  <Toast position="bottom-center" />

  <div
    class="border-r border-border-color relative overflow-visible duration-300 block lg:border-t-0 border-t lg:border-l-0 border-l pb-2"
    :class="{ ' filetree--hidden ': fileTreeState.isHidden}"
  >
    <div
      class="flex justify-between px-3 py-1 border-b border-border-color duration-300 h-8 items-center"
      :class="{'border-b-0' : !fileTreeState.isVisible }"
    >
      <span
        class="font-bold 2xl:text-[16px] lg:text-[15px] text-[14px] leading-0"
        :class="{
          ' w-0 overflow-hidden opacity-hidden ': fileTreeState.isHidden,
        }"
        >Files</span
      >
      <div
        class="flex gap-2 overflow-hidden filetree__buttons h-full"
        :class="{
          'lg:max-w-0': !fileTreeState.isVisible,
          'lg:max-w-full': fileTreeState.isVisible,
        }"
      >
        <Button @click="downloadFileSystem" icon="pi pi-download" class="w-4" />
        <Button @click="showNewFileMenu" icon="pi pi-plus" class="w-4" />
        <Button
          @click="toggleVisibility"
          :icon="
            fileTreeState.isVisible ? 'pi pi-angle-up' : 'pi pi-angle-down'
          "
          class="w-4 lg:hidden block"
        />

        <ContextMenu
          :model="newFileContextMenuItems"
          ref="newFileContextMenu"
        />
      </div>
    </div>

    <Tree
      :value="folders"
      class="overflow-y-auto max-h-full duration-300"
      :class="{
        'lg:max-w-0 lg:max-h-full lg:h-full h-0': !fileTreeState.isVisible,
        'lg:max-w-[20rem] lg:w-[15rem] lg:h-full lg:max-h-full h-max max-h-max':
          fileTreeState.isVisible,
      }"
    >
      <template #default="{ node }">
        <div
          class="cursor-pointer"
          @contextmenu="showContextMenu($event, node)"
          @click="openFile(node)"
        >
          <span class="whitespace-nowrap block">{{ node.label }}</span>
        </div>
      </template>
    </Tree>

    <ContextMenu :model="contextMenuItems" ref="menu" />

    <NewItemDialog
      :showDialog="fileTreeState.showDialog"
      :dialogType="fileTreeState.dialogType"
      :closeDialog="closeDialog"
      @new-item="fetchItems"
      @rename-item="fetchItems"
      :itemToRename="fileTreeState.itemToRename"
      :parent-node="fileTreeState.parentItemNode"
    />

    <button
      class="absolute bottom-12 -right-6 h-12 w-12 cursor-pointer block z-40 lg:block hidden"
      @click="toggleVisibility"
    >
      <i
        :class="[
          'pi',
          fileTreeState.isVisible ? 'pi-angle-left' : 'pi-angle-right',
          'text-primary border border-primary text-[20px] duration-300 rounded-xl p-1.5 bg-white',
        ]"
      />
    </button>

    <FolderFileUploader
      :close-dialog="closeDialog"
      :is-dialog-visible="fileTreeState.showUploadDialog"
      :uploadType="fileTreeState.dialogType"
      @new-item="fetchItems"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, reactive } from 'vue';
import Tree from 'primevue/tree';
import ContextMenu from 'primevue/contextmenu';
import Button from 'primevue/button';
import NewItemDialog from '../NewItemDialog.vue';
import { WebContainerService } from '../../../services/webContainersService';
import { FileExtensions, FileType } from '../../../types/fileType';
import { FolderItem } from '../../../types/fileItem';
import { ILoading } from '../../../types/loading';
import { TreeNode } from 'primevue/treenode';
import { MenuItem } from 'primevue/menuitem';
import FolderFileUploader from './FolderFileUploader.vue';
import { useStore } from 'vuex';
import { getFileExtension } from '../../../utils/FileExtensionsAndIcons';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const toast = useToast();

const newFileContextMenuItems: MenuItem[] = [
  {
    label: 'Create new file',
    icon: 'pi pi-file',
    command: () => openDialog(FileType.FILE),
  },
  {
    label: 'Create new folder',
    icon: 'pi pi-folder',
    command: () => openDialog(FileType.FOLDER),
  },
  {
    label: 'Import file',
    icon: 'pi pi-upload',
    command: () => {
      fileTreeState.showUploadDialog = true;
      fileTreeState.dialogType = FileType.FILE;
    },
  },
  {
    label: 'Import folder',
    icon: 'pi pi-upload',
    command: () => {
      fileTreeState.showUploadDialog = true;
      fileTreeState.dialogType = FileType.FOLDER;
    },
  },
];

const newFileContextMenu = ref<ContextMenu | null>(null);
const contextMenuItems = ref<MenuItem[]>([]);
const playgroundStore = useStore();

const showNewFileMenu = (event) => {
  fileTreeState.itemToRename = null;
  newFileContextMenu.value?.show(event);
};

const webContainersService = inject<WebContainerService>(
  'webContainersService'
);

const props = defineProps<{
  loading: ILoading;
}>();

const fileTreeState = reactive<{
  isVisible: boolean;
  isHidden: boolean;
  showDialog: boolean;
  dialogType: FileType;
  showUploadDialog: boolean;
  contextMenuVisible: boolean;
  currentItem: FolderItem;
  parentItemNode: TreeNode | null;
  itemToRename: FolderItem | null;
}>({
  isVisible: true,
  isHidden: true,
  showDialog: false,
  dialogType: FileType.FILE,
  showUploadDialog: false,
  contextMenuVisible: false,
  currentItem: {
    name: '',
    type: FileType.FILE,
    children: [],
    size: 0,
    path: ''
  },
  parentItemNode: null,
  itemToRename: null,
});

const toggleVisibility = () => {
  fileTreeState.isVisible = !fileTreeState.isVisible;
};

const openFile = async (node: TreeNode) => {
  if (node.type === FileType.FOLDER) return;

  playgroundStore.commit('addFile', {
    file: node.parent,
    path: node.data.path
  });
  const path =
    node.data.path ?? node.parent.label ?? node.label;

  try {
    const content = await webContainersService?.readFile(path);
    playgroundStore.commit('readFile', { content, path });
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

const menu = ref();
const folders = ref<TreeNode[]>([]);

const getContextMenuItems = (node: TreeNode): MenuItem[] => {
  const contextMenuItems: MenuItem[] = [
    {
      label: 'Open',
      icon: 'pi pi-folder-open',
      command: () => openItem(node),
    },
    {
      label: 'Rename',
      icon: 'pi pi-pencil',
      command: () => renameItem(),
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => deleteItem(fileTreeState.currentItem),
    },
  ];

  const contextMenuItemsFolder: MenuItem[] = [
    {
      label: 'New file',
      icon: 'pi pi-file',
      command: () => {
        fileTreeState.itemToRename = null;
        fileTreeState.showDialog = true;
        fileTreeState.dialogType = FileType.FILE;
      },
    },
    {
      label: 'New folder',
      icon: 'pi pi-folder',
      command: () => {
        fileTreeState.itemToRename = null;
        fileTreeState.showDialog = true;
        fileTreeState.dialogType = FileType.FOLDER;
      },
    },
  ];

  if (node.type === FileType.FOLDER) {
    contextMenuItems.push(...contextMenuItemsFolder);
  }

  return contextMenuItems;
};

const fetchItems = async () => {
  await fetchFolders();
};

const fetchFolders = async () => {
  if (!webContainersService) return;
  try {
    const folderStructure =
      await webContainersService.fetchFolderStructureInTreeNode('/');
    folders.value = folderStructure as TreeNode[];
    folders.value = [...folders.value];
  } catch (error) {
    console.error('Error fetching folder structure:', error);
  }
};

const showContextMenu = (event: any, node: TreeNode) => {
  fileTreeState.itemToRename = null;

  const item = {
    name: node.label ?? '',
    type: (node.type as FileType) ?? FileType.FILE,
    path: node.data.path ?? ''
  } as FolderItem;

  fileTreeState.currentItem = item;
  fileTreeState.parentItemNode = item.type === FileType.FILE ? null : node;

  contextMenuItems.value = getContextMenuItems(node);
  menu.value.show(event);
};

const closeContextMenu = () => {
  fileTreeState.contextMenuVisible = false;
};

const openItem = (item: any) => {
  if (item) {
    openFile(item)
  }
  closeContextMenu();
};

const deleteItem = (item: FolderItem) => {
  if (item) {
    removeItem(item);
  }
  closeContextMenu();
};

const renameItem = () => {
  fileTreeState.itemToRename = fileTreeState.currentItem;
  fileTreeState.showDialog = true;
  fileTreeState.dialogType = fileTreeState.currentItem.type;

  closeContextMenu();
};

const removeItem = async (item: FolderItem) => {
  if (!webContainersService) return;

  try {
    const filteredItems = await webContainersService.removeItem(item);
    folders.value = filteredItems as TreeNode[];
    playgroundStore.dispatch('closeFile', {
    file: {...item},
    update: async (filePath: string) => {
      return await webContainersService?.readFile(filePath);
    },
  });
  } catch (error) {
    console.error('Failed to delete item', error);
  }
};

const openDialog = (type: FileType) => {
  fileTreeState.dialogType = type;
  fileTreeState.showDialog = true;
  fileTreeState.currentItem = new File([], '', {
    type: 'text/plain',
  }) as FolderItem;
};

const closeDialog = () => {
  fileTreeState.showDialog = false;
  fileTreeState.showUploadDialog = false;
};

const downloadFileSystem = async () => {
  toast.add({ severity: 'info', summary: 'Downloading', detail: 'Files are being prepared for download', life: 3000 });
  await webContainersService?.installAllFiles();
};

watch(props.loading, async () => {
  await fetchFolders();
  if (!props.loading.installing && !props.loading.running) {
    fileTreeState.isHidden = false;
  }
});

fetchFolders();

</script>
