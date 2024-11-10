import { inject, ref } from "vue";
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
    ) {
        const newItem: FolderItem = {
            name,
            type,
            ...(type === FileType.FOLDER ? { children: [] } : {}),
        };

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
                );
            } else if (parentFolder) {
                parentFolder.children?.push(newItem);
                await this.webContainersService?.writeFile(
                    `/${parentFolder.name}/${newItem.name}`,
                    "",
                );
            } else {
                this.folders.value.push(newItem);
                await this.webContainersService?.writeFile(
                    `/${newItem.name}`,
                    "",
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
    
        switch (fileExtension) {
            case FileExtensions.CSS:
                return FileExtensions.CSS;
            case FileExtensions.HTML:
                return FileExtensions.HTML;
            default:
                return FileExtensions.JS;
        }
    }

    public getFileWithoutExtension(file: FolderItem): string {
        return file.name.slice(0, file.name.lastIndexOf("."));
    }
}
