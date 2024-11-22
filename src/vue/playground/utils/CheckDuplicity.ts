import { FolderItem } from "../types/fileItem";

export function checkDuplicity(
  folders: FolderItem[] | { value: FolderItem[] }, 
  newItem: FolderItem,
  parentPath: string = ""
): boolean {
  const folderList = Array.isArray(folders) ? folders : folders.value;

  for (const folder of folderList) {
    const currentPath = parentPath
      ? `${parentPath}/${folder.name}`
      : folder.name;

    if (currentPath === newItem.webkitRelativePath) {
      return true; 
    }

    if (folder.children && folder.children.length > 0) {
      if (checkDuplicity(folder.children, newItem, currentPath)) {
        return true;
      }
    }
  }

  return false;
}
