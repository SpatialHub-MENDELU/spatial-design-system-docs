import { FileType } from "./fileType";

export interface FolderItem extends Omit<File, 'name' | 'type' | 'webkitRelativePath'> {
    name: string;
    type: FileType;
    children?: FolderItem[];
    isOpen?: boolean;
    size: number;
    webkitRelativePath: string;
    content?: any
}
