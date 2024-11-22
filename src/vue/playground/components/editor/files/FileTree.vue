<template>
  <div
    class="border-r border-border-color relative overflow-visible duration-300 lg:block hidden"
    :class="{ ' filetree--hidden ': fileTreeState.isHidden }"
  >
    <div
      class="flex justify-between p-3 border-b border-border-color duration-300"
    >
      <span
        class="font-bold 2xl:text-[20px] lg:text-[18px] text-[16px]"
        :class="{
          ' w-0 overflow-hidden opacity-hidden ': fileTreeState.isHidden,
        }"
        >Files</span
      >
      <div
        class="flex gap-2 overflow-hidden filetree__buttons"
        :class="{
          'max-w-0': !fileTreeState.isVisible,
          'max-w-full': fileTreeState.isVisible,
        }"
      >
        <Button @click="downloadFileSystem" icon="pi pi-download" class="w-5" />
        <Button @click="showNewFileMenu" icon="pi pi-plus" class="w-5" />

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
        'max-w-0': !fileTreeState.isVisible,
        'max-w-[20rem] w-[15rem]': fileTreeState.isVisible,
      }"
    >
      <template #default="{ node }">
        <div class="tree-node" @contextmenu="showContextMenu($event, node)">
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
      :itemToRename="fileTreeState.currentItem"
    />

    <button
      class="absolute bottom-12 -right-6 h-12 w-12 cursor-pointer block z-40"
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
      :parent-node="fileTreeState.parentItemNode"
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
import { FileType } from '../../../types/fileType';
import { FolderItem } from '../../../types/fileItem';
import { ILoading } from '../../../types/loading';
import { TreeNode } from 'primevue/treenode';
import { MenuItem } from 'primevue/menuitem';
import FolderFileUploader from './FolderFileUploader.vue';

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

const showNewFileMenu = (event) => {
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
    webkitRelativePath: '',
  },
  parentItemNode: null
});

const toggleVisibility = () => {
  fileTreeState.isVisible = !fileTreeState.isVisible;
};

const menu = ref();
const folders = ref<TreeNode[]>([]);

const getContextMenuItems = (node: TreeNode): MenuItem[] => {
  const contextMenuItems: MenuItem[] = [
    {
      label: 'Open',
      icon: 'pi pi-folder-open',
      command: () => openItem(fileTreeState.currentItem),
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
        fileTreeState.showUploadDialog = true;
        fileTreeState.dialogType = FileType.FILE;
      },
    },
    {
      label: 'New folder',
      icon: 'pi pi-folder',
      command: () => {
        fileTreeState.showUploadDialog = true;
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
    const item = {
      name: node.label ?? '',
      type: (node.type as FileType) ?? FileType.FILE,
    } as FolderItem;

    fileTreeState.currentItem = item; // Reassign currentItem to trigger reactivity
    fileTreeState.parentItemNode = item.type === FileType.FILE ? null : node;

    contextMenuItems.value = getContextMenuItems(node);
    menu.value.show(event);
};

const closeContextMenu = () => {
  fileTreeState.contextMenuVisible = false;
};

const openItem = (item: any) => {
  if (item) {
    console.log(`Opening ${item.name}`);
  }
  closeContextMenu();
};

const deleteItem = (item: any) => {
  if (item) {
    removeItem(item);
  }
  closeContextMenu();
};

const renameItem = () => {
  fileTreeState.showDialog = true;
  fileTreeState.dialogType = fileTreeState.currentItem.type;

  closeContextMenu();
};

const removeItem = async (item: FolderItem) => {
  if (!webContainersService) return;

  try {
    const filteredItems = await webContainersService.removeItem(item);
    folders.value = filteredItems as TreeNode[];
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
