import { ref } from "vue";
import { FolderItem } from "../types/fileItem";
import { FileExtensions, FileType } from "../types/fileType";
import { WebContainerService } from "./webContainersService";

export class FolderService {
    private static instance: FolderService;
    public folders = ref<FolderItem[]>([]);

    constructor(private webContainersService: WebContainerService) {}

    public static getInstance(
        webContainersService: WebContainerService,
    ): FolderService {
        if (!this.instance) {
            this.instance = new FolderService(webContainersService);
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
        return this.folders;
    }

    public async createNewItem(
        name: string,
        type: FileType,
        parentFolder?: FolderItem,
        fileContent: string = "",
        files: FolderItem[] = []
    ) {
        const newItem = new File([], name, { type: "text/plain" }) as FolderItem
        //newItem.type = type ?? FileType.FILE

        if (type == FileType.FOLDER) {
            newItem.children = files
        }
    
        const isDuplicate = parentFolder
            ? parentFolder.children?.some(
                  (child) => child.name === newItem.name,
              )
            : this.folders.value.some((folder) => folder.name === newItem.name);
    
        if (isDuplicate) {
            return {
                error: `An item with the name "${newItem.name}" already exists.`,
            };
        }
    
        try {
            if (type === FileType.FOLDER) {
                this.folders.value.push(newItem);
                await this.webContainersService?.createFolder(
                    `/${newItem.name}`,
                    files
                );

            } else if (parentFolder) {
                parentFolder.children?.push({
                    ...newItem,
                    webkitRelativePath: files[0].webkitRelativePath
                });
                const filePath = `/${parentFolder.name}/${newItem.name}`;

                await this.webContainersService?.writeFile(
                    filePath,
                    fileContent,
                );
            } else {
                this.folders.value.push(newItem);
                await this.webContainersService?.writeFile(
                    `/${newItem.name}`,
                    fileContent,
                );
            }
    
            return { item: newItem };
        } catch (error) {
            console.error("Error creating new item in WebContainer:", error);
            return { error: "Failed to create item in WebContainer." };
        }
    }    

    async renameItem(oldName: string, newName: string) {
        try {

            const result = await this.webContainersService.renameItem(oldName, newName); 
            if (result.success) {
                return { success: true };
            } else {
                return { error: "Failed to rename item" };
            }
        } catch (error) {
            return { error: "An error occurred while renaming the item" };
        }
    }

    public getFileExtension(file: FolderItem): FileExtensions {
        const fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1).toLowerCase();
        if (file.type === FileType.FOLDER) return FileExtensions.FOLDER
    
        switch (fileExtension) {
            case FileExtensions.CSS:
                return FileExtensions.CSS;
            case FileExtensions.HTML:
                return FileExtensions.HTML;
            case FileExtensions.TS:
                return FileExtensions.TS;
            default:
                return FileExtensions.JS;
        }
    }

    public getFileIcon(file: FolderItem) {
        const extension = this.getFileExtension(file);
        switch (extension) {
          case 'html':
            return 'fas fa-file-code'; 
          case 'css':
            return 'fas fa-css3-alt'; 
          case 'js':
            return 'fas fa-js-square';
          case 'ts':
            return 'fas fa-file-code';
        case 'folder':
            return 'fas fa-folder';
          default:
            return 'fas fa-file';  
        }
      };

    public getFileWithoutExtension(file: FolderItem): string {
        return file.name.slice(0, file.name.lastIndexOf("."));
    }
}
