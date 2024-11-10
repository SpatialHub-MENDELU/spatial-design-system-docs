<template>
    <div class="border-r border-border-color">
        <div
            class="flex justify-between p-3 min-w-[15rem] border-b border-border-color"
        >
            <span class="font-bold lg:text-[20px] text-[16px]">Files</span>
            <div class="flex gap-1.5">
                <button @click="openDialog(FileType.FOLDER)">
                    <i class="pi pi-folder text-[16px]"></i>
                </button>
                <button @click="openDialog(FileType.FILE)">
                    <i class="pi pi-file text-[16px]"></i>
                </button>
                <button @click="downloadFileSystem">
                    <i class="pi pi-download text-[16px]"></i>
                </button>
            </div>
        </div>

        <Tree
            :value="folders"
            class="overflow-y-auto max-h-full"
        >
        <template #default="{ node }">
            <div class="tree-node" @contextmenu="showContextMenu($event, node)">
                <span>{{ node.label }}</span>
            </div>
        </template>
    </Tree>
    
        <ContextMenu
            :model="contextMenuItems"
            ref="menu"
        />

        <NewItemDialog
            :showDialog="showDialog"
            :dialogType="dialogType"
            :closeDialog="closeDialog"
            @new-item="fetchItems"
            @rename-item="fetchItems"
            :itemToRename="currentItem"
        />
    </div>
</template>

<script setup lang="ts">
    import { inject, ref, watch } from "vue";
    import Tree from "primevue/tree";
    import ContextMenu from "primevue/contextmenu";
    import NewItemDialog from "../NewItemDialog.vue";
    import { WebContainerService } from "../../../services/webContainersService";
    import { FileType } from "../../../types/fileType";
    import { FolderItem } from "../../../types/fileItem";
    import { ILoading } from "../../../types/loading";
    import { TreeNode } from "primevue/treenode";

    const webContainersService = inject<WebContainerService>(
        "webContainersService",
    );

    const props = defineProps<{
        loading: ILoading;
    }>();

    const menu = ref()
    const contextMenuVisible = ref(false);
    const currentItem = ref<{ name: string; type: FileType } | null>(null);
    const folders = ref<TreeNode[]>([]);
    const showDialog = ref(false);
    const dialogType = ref<FileType>(FileType.FOLDER);

    const contextMenuItems = ref([
        {
            label: "Open",
            icon: "pi pi-folder-open",
            command: () => openItem(currentItem.value),
        },
        {
            label: "Rename",
            icon: "pi pi-pencil",
            command: () => renameItem()
        },
        {
            label: "Delete",
            icon: "pi pi-trash",
            command: () => deleteItem(currentItem.value),
        },
    ]);

    const fetchItems = async () => {
        await fetchFolders();
    };

    const fetchFolders = async () => {
        if (!webContainersService) return;
        try {
            const folderStructure = await webContainersService.fetchFolderStructureInTreeNode("/");
            folders.value = folderStructure as TreeNode[];
        } catch (error) {
            console.error("Error fetching folder structure:", error);
        }
    };

    const showContextMenu = (event: any, node: TreeNode) => {
        currentItem.value = { name: node.label ?? "", type: node.type as FileType ?? FileType.FILE}
        menu.value.show(event);
    };

    const closeContextMenu = () => {
        contextMenuVisible.value = false;
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
        if (currentItem.value) {
        showDialog.value = true
        dialogType.value = currentItem.value.type
        }

        closeContextMenu();
    };

    const removeItem = async (item: FolderItem) => {
        if (!webContainersService) return;

        try {
            const filteredItems = await webContainersService.removeItem(item);
            folders.value = filteredItems as TreeNode[];
        } catch (error) {
            console.error("Failed to delete item", error);
        }
    };

    const openDialog = (type: FileType) => {
        dialogType.value = type;
        showDialog.value = true;
    };

    const closeDialog = () => {
        showDialog.value = false;
    };

    const downloadFileSystem = async () => {
        await webContainersService?.installAllFiles();
    };

    watch(props.loading, async () => {
        await fetchFolders();
    });

    fetchFolders();
</script>
