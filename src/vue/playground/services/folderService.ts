import { inject, ref } from "vue";
import { FolderItem } from "../types/fileItem";
import { FileType } from "../types/fileType";
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
                ); // Create file at root
            }

            return { item: newItem };
        } catch (error) {
            console.error("Error creating new item in WebContainer:", error);
            return { error: "Failed to create item in WebContainer." };
        }
    }
}
