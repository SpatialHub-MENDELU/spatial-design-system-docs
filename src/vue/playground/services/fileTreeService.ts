import { MenuItem } from "primevue/menuitem";
import { initFileTreeState } from "../states/FileTreeState";
import { IStateFileTree } from "../types/states";
import { FileType } from "../types/fileType";
import { nextTick, ref } from "vue";
import { TreeNode } from "primevue/treenode";
import { WebContainerService } from "./webContainersService";
import { FolderItem } from "../types/fileItem";
import { useToast } from "primevue/usetoast";
import { useStore } from "vuex";
import { ProjectType } from "../types/projectType";
import { ILoading } from "../types/loading";
import { ContextMenu } from "primevue";

export class FileTreeService {

  private _state = initFileTreeState
  private _newFileContextMenu = ref<ContextMenu | null>(null);
  private _contextMenuItems = ref<MenuItem[]>([]);
  private _folders = ref<TreeNode[]>([]);
  private _menu = ref();
  private _toast = useToast();

  private _playgroundStore = useStore();

  private _webContainersService: WebContainerService | null = null

  constructor(webcontainersService: WebContainerService | undefined) {
    if (webcontainersService) this._webContainersService = webcontainersService
  }

  toggleVisibility() {
    this._state.isVisible = !this._state.isVisible;
  };
  
  async fetchFolders() {
    if (!this._webContainersService) return;
    try {
      const folderStructure =
        await this._webContainersService.fetchFolderStructureInTreeNode('/');
      this._folders.value = folderStructure as TreeNode[];
      this._folders.value = [...this._folders.value];
    } catch (error) {
      console.error('Error fetching folder structure:', error);
    } finally {
      this._playgroundStore.commit('updateFoldersLoading', false)
    }
  };

  showContextMenu(event: any, node: TreeNode, playgroundStore) {
    this._state.itemToRename = null;

    const item = {
      name: node.label ?? '',
      type: (node.type as FileType) ?? FileType.FILE,
      path: node.data.path ?? ''
    } as FolderItem;
  
    this._state.currentItem = item;
    this._state.parentItemNode = item.type === FileType.FILE ? null : node;
  
    if (this._state.parentItemNode?.parent) {
      this._state.parentItemNode.parent.path = this._state.parentItemNode.key;
    }
  
    this._contextMenuItems.value = this._getContextMenuItems(node, playgroundStore);
    this._menu.value.show(event);
  };
  
  closeContextMenu() {
    this._state.contextMenuVisible = false;
  };

  downloadFileSystem = async () => {
    this._toast.add({ severity: 'info', summary: 'Downloading', detail: 'Files are being prepared for download', life: 3000 });
    await this._webContainersService?.installAllFiles();
  };

  closeDialog = () => {
    this._state.showAddRenameDialog = false;
    this._state.showUploadDialog = false;
    this._state.showMoveItemDialog = false;
    this._state.showCreateProjectDialog = false;
  };

  createProjectConfirmAccept = () => {
    this._state.showCreateProjectDialog = true
    this.closeNewProjectConfirmDialog();
  }
  
  closeNewProjectConfirmDialog = () => {
    this._state.showCreateProjectDialogConfirm = false
  }

  async openFile(node: TreeNode, playgroundStore) {
    if (node.type === FileType.FOLDER) return;
  
    playgroundStore.commit('addFile', {
      file: node.parent,
      path: node.data.path
    });

    const path = node.data.path ?? node.parent.label ?? node.label;
  
    try {
      const content = await this._webContainersService?.readFile(path);
      playgroundStore.commit('readFile', { content, path });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };
  
  createNewProject = async (project: ProjectType, loading: ILoading, playgroundStore) => {
    playgroundStore.commit('updateProjectType', null);
    await nextTick(); 
  
    loading.installing = true;
    
    playgroundStore.commit('updateProjectType', project);
    playgroundStore.commit('setOpenedFiles', []);
    playgroundStore.commit('updateCurrentFileContent', null);
    playgroundStore.commit('updateFoldersLoading', true);
    playgroundStore.commit('updateCurrentFilePath', '');
    this._state.projectType = project
    this.closeDialog();
  };

  private _getContextMenuItems(node: TreeNode, playgroundStore): MenuItem[] {
    const contextMenuItems: MenuItem[] = [
      {
        label: 'Open',
        icon: 'pi pi-folder-open',
        command: () => this._openItem(node, playgroundStore),
        visible: node.type === FileType.FILE
      },
      {
        label: 'Rename',
        icon: 'pi pi-pencil',
        command: () => this._renameItem(),
      },
      {
        label: 'Move',
        icon: 'pi pi-reply',
        command: () => this._moveItem(),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.state.showDeleteConfirmDialog = true,
      },
      {
        label: 'New file',
        icon: 'pi pi-file',
        command: () => {
          this._state.itemToRename = null;
          this._state.showAddRenameDialog = true;
          this._state.dialogType = FileType.FILE;
        },
        visible: node.type === FileType.FOLDER
      },
      {
        label: 'New folder',
        icon: 'pi pi-folder',
        command: () => {
          this._state.itemToRename = null;
          this._state.showAddRenameDialog = true;
          this._state.dialogType = FileType.FOLDER;
        },
        visible: node.type === FileType.FOLDER
      },
      {
        label: 'Import file',
        icon: 'pi pi-upload',
        command: () => {
          this._state.showUploadDialog = true;
          this._state.dialogType = FileType.FILE;
        },
        visible: node.type === FileType.FOLDER
      },
      {
        label: 'Import folder',
        icon: 'pi pi-upload',
        command: () => {
          this._state.showUploadDialog = true;
          this._state.dialogType = FileType.FOLDER;
        },
        visible: node.type === FileType.FOLDER
      },
    ];
  
    return contextMenuItems;
  }
  
  private _openItem = (item: any, playgroundStore) => {
    if (item) {
      this.openFile(item, playgroundStore)
    }
    
    this.closeContextMenu();
  };
  
  async deleteItem(item: FolderItem, playgroundStore) {
    if (!item) return;
  
    playgroundStore.commit('updateFoldersLoading', true);
    
    try {
      await this._removeItem(item, playgroundStore);
    } finally {
      this.fetchFolders();
      this._state.showDeleteConfirmDialog = false;
    }
  
    this.closeContextMenu();
  }
  
  private _renameItem = () => {
    if (!this._state.currentItem) return

    this._state.itemToRename = this._state.currentItem;
    this._state.showAddRenameDialog = true;
    this._state.dialogType = this._state.currentItem.type;
  
    this.closeContextMenu();
  };

  private _moveItem = () => {
    if (!this._state.currentItem) return

    this._state.itemToMove = {
      key: this.state.currentItem?.path ?? '',
      label: this.state.currentItem?.name,
      type: this.state.currentItem?.type
    }
    this.state.showMoveItemDialog = true;
  }

  private async _removeItem(item: FolderItem, playgroundStore) {
    if (!this._webContainersService) return;
  
    this._folders.value = this._folders.value.filter(node => !item.path?.startsWith(node.data?.path));
  
    try {
      const updatedItemsPromise = await this._webContainersService.removeItem(item);
  
      playgroundStore.dispatch('closeFile', {
        file: { ...item },
        update: (filePath: string) => this._webContainersService?.readFile(filePath),
      });
  
      this._folders.value = await updatedItemsPromise as TreeNode[];
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  }
  
  private _openDialog = (type: FileType) => {
    this._state.dialogType = type;
    this._state.showAddRenameDialog = true;
    this._state.currentItem = new File([], '', {
      type: 'text/plain',
    }) as FolderItem;
  };

  get state(): IStateFileTree {
    return this._state
  }

  get newFileContextMenuItems(): MenuItem[] {
    return [
      {
        label: 'Create new file',
        icon: 'pi pi-file',
        command: () => {
          this._state.parentItemNode = null;
          this._openDialog(FileType.FILE);
        },
      },
      {
        label: 'Create new folder',
        icon: 'pi pi-folder',
        command: () => {
          this._state.parentItemNode = null;
          this._openDialog(FileType.FOLDER);
        },
      },
      {
        label: 'Import file',
        icon: 'pi pi-upload',
        command: () => {
          this._state.parentItemNode = null;
          this._state.showUploadDialog = true;
          this._state.dialogType = FileType.FILE;
        },
      },
      {
        label: 'Import folder',
        icon: 'pi pi-upload',
        command: () => {
          this._state.parentItemNode = null;
          this._state.showUploadDialog = true;
          this._state.dialogType = FileType.FOLDER;
        },
      },
      {
        label: 'New project',
        icon: 'pi pi-plus-circle',
        command: () => {
          this._state.showCreateProjectDialogConfirm = true;
        }
      }
    ];
  }

  get newFileContextMenu() {
    return this._newFileContextMenu
  }

  get contextMenuItems(): MenuItem[] {
    return this._contextMenuItems.value
  }

  get folders(): TreeNode[] {
    return this._folders.value
  }

  get menu() {
    return this._menu
  }
}


