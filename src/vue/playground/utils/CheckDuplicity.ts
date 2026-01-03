import { TreeNode } from "primevue/treenode";
import { FolderItem } from "../types/fileItem";

export function checkDuplicity(
  folders: TreeNode[], 
  newItem: FolderItem,
): boolean {
  for (const folder of folders) {
    const currentPath = folder.key;

    if (currentPath === newItem.path) {
      return true; 
    }

    if (folder.children && folder.children.length > 0) {
      if (checkDuplicity(folder.children, newItem)) {
        return true;
      }
    }
  }

  return false;
}
