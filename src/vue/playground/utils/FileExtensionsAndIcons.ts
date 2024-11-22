import { FolderItem } from "../types/fileItem";
import { FileExtensions, FileType } from "../types/fileType";

export const getFileExtension = (file: FolderItem): FileExtensions  => {
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

export const getFileIcon = (file: FolderItem) => {
  const extension = getFileExtension(file);
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

export const getFileWithoutExtension = (file: FolderItem): string => {
  return file.name.slice(0, file.name.lastIndexOf("."));
}
