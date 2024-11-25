import { FileType } from "./fileType";

export interface FolderItem extends Omit<File, 'name' | 'type' | 'webkitRelativePath' | 'lastModified' | 'arrayBuffer' | 'slice' | 'stream' |'text'> {
    name: string;
    type: FileType;
    children?: FolderItem[];
    isOpen?: boolean;
    size: number;
    content?: any
    path?: string
}
