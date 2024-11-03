import { FileType } from './fileType';

export interface FolderItem {
  name: string;
  type: FileType;
  children?: FolderItem[];
  isOpen?: boolean;
}
