import { ref } from "vue";
import { FolderItem } from "../types/fileItem";
import { FileExtensions, FileType } from "../types/fileType";
import { WebContainerService } from "./webContainersService";
import { checkDuplicity } from "../utils/CheckDuplicity";

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
        return this.folders.value;
    }

    public async createNewItem(
        name: string,
        type: FileType,
        parentFolder?: FolderItem,
        fileContent: string = "",
        files: FolderItem[] = []
    ) {
        const newItem = new File([], name, { type: "text/plain" }) as FolderItem

        if (type == FileType.FOLDER) {
            newItem.children = files
        }
    
        const isDuplicate = checkDuplicity(this.folders.value, newItem, '')

        if (isDuplicate) {
            return {
                error: `An item with the name "${newItem.name}" already exists.`,
            };
        }
    
        try {
            if (type === FileType.FOLDER) {
                this.folders.value.push(newItem);
                await this.webContainersService?.createFolder(
                    `/${newItem.name}`
                );

            } else if (parentFolder) {
                parentFolder.children?.push({
                    ...newItem,
                    webkitRelativePath: `${parentFolder.webkitRelativePath}/${name}`
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
                )
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

    public async uploadItem (f: FolderItem, parentFolder?: FolderItem) {
        if (f.type === FileType.FOLDER) {
    
          if (f.children) {
            for (const child of f.children) {
              await this.uploadItem(child, f);
            }
          }
          
          const result = await this.createNewItem(f.name, f.type, undefined, '', f.children)
          return result
     
        } else {
          const reader = new FileReader();
          reader.onload = async () => {
            const fileContent = reader.result as string | ArrayBuffer;
            const content =
              typeof fileContent === 'string'
                ? fileContent
                : btoa(fileContent as unknown as string);
    
            const result = await this.createNewItem(f.name, f.type, parentFolder, content)
            return result
          };
    
          if (f.type.startsWith('text/')) {
            reader.readAsText(f as File);
          } else {
            reader.readAsArrayBuffer(f as File);
          }
        }
      };
}
