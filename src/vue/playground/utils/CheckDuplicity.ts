import { FolderItem } from "../types/fileItem";

export function checkDuplicity(
  folders: FolderItem[] | { value: FolderItem[] }, 
  newItem: FolderItem,
  parentPath: string = ""
): boolean {
  const folderList = Array.isArray(folders) ? folders : folders.value; // Extrahuj skutečné pole

  console.log(folderList, 'f');

  for (const folder of folderList) {
    console.log(folder.name);
    const currentPath = parentPath
      ? `${parentPath}/${folder.name}`
      : folder.name;

    // Porovnej cestu aktuální položky s cestou nového itemu
    if (currentPath === newItem.webkitRelativePath) {
      return true; // Duplicitní cesta nalezena
    }

    // Rekurzivní kontrola v podřízených položkách
    if (folder.children && folder.children.length > 0) {
      if (checkDuplicity(folder.children, newItem, currentPath)) {
        return true; // Duplicitní cesta nalezena v podstromu
      }
    }
  }

  return false; // Žádná duplicita
}
