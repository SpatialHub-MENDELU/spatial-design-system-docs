import { ref } from 'vue';
import { FolderItem } from '../types/fileItem';
import { FileType } from '../types/fileType';
import { WebContainerService } from './webContainersService';
import { checkDuplicity } from '../utils/CheckDuplicity';
import { initNewItemDialogState } from '../states/NewItemDialogState';
import { IStateNewItemDialog } from '../types/states';
import {
  getFileExtension,
  getFileWithoutExtension,
} from '../utils/FileExtensionsAndIcons';
import { IPropsNewItemDialog } from '../types/props';
import { handlePath } from '../utils/Path';
import { ToastServiceMethods } from 'primevue';

export class FileSystemService {
  private static instance: FileSystemService;
  public folders = ref<FolderItem[]>([]);
  constructor(private webContainersService: WebContainerService) {}

  private _state = initNewItemDialogState;

  public static getInstance(
    webContainersService: WebContainerService
  ): FileSystemService {
    if (!this.instance) {
      this.instance = new FileSystemService(webContainersService);
    }
    return this.instance;
  }

  public toggleFolder(folder: FolderItem) {
    folder.isOpen = !folder.isOpen;
  }

  public getOpenFolder() {
    return this.folders.value.find((folder) => folder.isOpen);
  }

  public getFolders() {
    return this.folders.value;
  }

  public async createNewItem(
    name: string,
    type: FileType,
    parentFolder?: FolderItem,
    fileContent: string = '',
    files: FolderItem[] = [],
    toast?: ToastServiceMethods
  ) {
    const newItem = new File([], name, { type: 'text/plain' }) as FolderItem;

    if (type == FileType.FOLDER) {
      newItem.children = files;
    }

    newItem.path = `${parentFolder?.path ? `/${parentFolder.path.replace(/^\/|\/$/g, '')}` : ''}/${newItem.name}`;
    const data = await this.webContainersService?.fetchFolderStructureInTreeNode('/');
    const isDuplicate = checkDuplicity(data, newItem);

    if (isDuplicate) {
      toast?.add({ severity: 'error', summary: 'Error', detail: 'Item with this name already exists', life: 3000 });

      return {
        error: `An item with the name "${newItem.name}" already exists.`,
      };
    }

    try {
      if (type === FileType.FOLDER && !parentFolder) {
        this.folders.value.push(newItem);
        await this.webContainersService?.createFolder(`/${newItem.name}`);
      } else if (parentFolder) {
        const filePath = `${handlePath(parentFolder.path ?? '')}${handlePath(newItem.name)}`;
        newItem.path = filePath;

        parentFolder.children?.push({
          ...newItem,
          path: filePath,
        });

        if (type === FileType.FOLDER) {
          await this.webContainersService?.createFolder(filePath);
        } else {
          await this.webContainersService?.writeFile(filePath, fileContent);
        }
      } else {
        this.folders.value.push(newItem);
        await this.webContainersService?.writeFile(
          `/${newItem.name}`,
          fileContent
        );
      }

      return { item: newItem };
    } catch (error) {
      console.error('Error creating new item in WebContainer:', error);
      return { error: 'Failed to create item in WebContainer.' };
    }
  }

  async renameItem(oldName: string, newName: string) {
    try {
      const result = await this.webContainersService.renameItem(
        oldName,
        newName
      );
      if (result.success) {
        return { success: true };
      } else {
        return { error: 'Failed to rename item' };
      }
    } catch (error) {
      return { error: 'An error occurred while renaming the item' };
    }
  }

  public async uploadItem(f: FolderItem, parentFolder?: FolderItem, toast?: ToastServiceMethods) {
    if (f.type === FileType.FOLDER) {
      const result = await this.createNewItem(
        f.name,
        f.type,
        parentFolder,
        '',
        [],
        toast
      );

      if (f.children) {
        for (const child of f.children) {
          await this.uploadItem(child, result.item, toast);
        }
      }

      return result;
    } else {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileContent = reader.result as string | ArrayBuffer;
        const content =
          typeof fileContent === 'string'
            ? fileContent
            : btoa(fileContent as unknown as string);

        const result = await this.createNewItem(
          f.name,
          f.type,
          parentFolder,
          content,
          [],
          toast
        );
        return result;
      };

      if (f.type.startsWith('text/')) {
        reader.readAsText(f as File);
      } else {
        reader.readAsArrayBuffer(f as File);
      }
    }
  }

  async submitNewItemDialog(props: IPropsNewItemDialog, playgroundStore, toast: ToastServiceMethods) {
    this._state.errorMessage = '';
    this._state.errorExtensionMessage = '';

    if (this._state.newItemName.trim() === '') {
      this._state.errorMessage = 'Name cannot be empty.';
      return;
    }

    if (props.dialogType === FileType.FILE && !this._state.newFileExtension) {
      this._state.errorExtensionMessage = 'Extension is required.';
      return;
    }

    const fullName =
      props.dialogType === FileType.FILE && this._state.newFileExtension
        ? `${this._state.newItemName}.${this._state.newFileExtension}`
        : this._state.newItemName;

    const parentFolder = props.parentNode?.parent;
    if (parentFolder && parentFolder.path) {
      parentFolder.path = props.parentNode?.key;
    }

    if (props.itemToRename) {
      const result = await this?.renameItem(props.itemToRename?.path ?? '', fullName);
      const updateContent = async (filePath) => {
        return await this.webContainersService?.readFile(filePath);
      };
  
      playgroundStore.dispatch('renameFile', {
        oldFile: props.itemToRename,
        newFileName: fullName,
        update: updateContent
      });

      if (result?.error) {
        this._state.errorMessage = result.error;
      } else {
        props.closeDialog();
      }
    } else {
      const result = await this?.createNewItem(
        fullName,
        props.dialogType,
        parentFolder,
        '',
        [],
        toast
      );

      if (result?.error) {
        this._state.errorMessage = result.error;
      } else {
        this._state.newItemName = '';
        props.closeDialog();
      }
    }
  }

  updateEditedItem(
    newValue: FolderItem,
    props: IPropsNewItemDialog,
    newDialogType: FolderItem | FileType | null
  ) {
    if (newValue && newValue.name !== '') {
      this._state.newItemName = getFileWithoutExtension(newValue);
      this._state.newFileExtension = getFileExtension(
        newValue.name,
        newValue.type
      );
      this._state.dialogHeader = `Rename ${props.dialogType}`;
      this._state.buttonLabel = 'Rename';
      this._state.buttonIcon = 'pi pi-pencil';
    } else {
      if (
        newDialogType === FileType.FILE &&
        this.fileNameExtensions.length > 0
      ) {
        this._state.newFileExtension = this.fileNameExtensions[0].value;
      }

      this._state.newItemName = '';
      this._state.dialogHeader =
        newDialogType === FileType.FILE ? 'New file' : 'New folder';
      this._state.buttonLabel = 'Create';
      this._state.buttonIcon = 'pi pi-check';
    }
  }

  get state(): IStateNewItemDialog {
    return this._state;
  }

  get fileNameExtensions() {
    return [
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'JS', value: 'js' },
      { label: 'JSON', value: 'json' },
    ];
  }
}
