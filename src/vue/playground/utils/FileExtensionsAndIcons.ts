import { FolderItem } from '../types/fileItem';
import { FileExtensions, FileType } from '../types/fileType';

export const getFileExtension = (fileName: string, fileType: FileType = FileType.FILE): FileExtensions => {
  if (!fileName) return FileExtensions.JS;

  const fileExtension = fileName
    .slice(fileName.lastIndexOf('.') + 1)
    .toLowerCase();
  if (fileType === FileType.FOLDER) return FileExtensions.FOLDER;

  switch (fileExtension) {
    case FileExtensions.CSS:
      return FileExtensions.CSS;
    case FileExtensions.HTML:
      return FileExtensions.HTML;
    case FileExtensions.TS:
      return FileExtensions.TS;
    case FileExtensions.JSON:
      return FileExtensions.JSON;
    case FileExtensions.JS:
      return FileExtensions.JS;
    case FileExtensions.VUE:
      return FileExtensions.VUE;
    default:
      return FileExtensions.DEFAULT;
  }
};

export const getFileIcon = (file: FolderItem) => {
  const extension = getFileExtension(file.name ?? "", file.type);
  switch (extension) {
    case 'html':
      return 'fab fa-html5';
    case 'css':
      return 'fab fa-css3';
    case 'js':
      return 'fab fa-js';
    case 'ts':
      return 'fas fa-file-code';
    case 'folder':
      return 'fas fa-folder';
    case 'json':
        return 'fas fa-file-code';
    case 'vue':
      return 'fab fa-vuejs';
    default:
      return 'fas fa-file';
  }
};

export const getFileWithoutExtension = (file: FolderItem): string => {
  if (file.type === FileType.FOLDER) return file.name;
  return file.name.slice(0, file.name.lastIndexOf('.'));
};
