import { FileUploadSelectEvent } from "primevue/fileupload";
import { initFileUploadState } from "../states/FileUploaderState";
import { IStateFileUploader } from "../types/states";
import { FolderItem } from "../types/fileItem";
import { formatSize } from "../utils/SizeFormatter";
import { inject, defineEmits } from "vue";
import { FileType } from "../types/fileType";
import { FileSystemService } from "./fileSystemService";
import { WebContainerService } from "./webContainersService";

export class FileUplaoderService {
 
  private _state = initFileUploadState
  private _webContainersService = inject<WebContainerService>(
    'webContainersService'
  );
  private _fileSystemService = new FileSystemService(
    this._webContainersService as WebContainerService
  );
  emit = defineEmits();

  onRemoveTemplatingFile = (
    file: FolderItem,
    removeFileCallback: (index: number) => void,
    index: number,
    primevue
  ) => {
    removeFileCallback(index);
    this._state.totalSize -= parseInt(formatSize(file.size, primevue));
  };
  
  onSelectedFiles = (event: FileUploadSelectEvent, primevue) => {
    this._state.files = event.files as FolderItem[];
    this._state.files?.forEach((file) => {
      this._state.totalSize += parseInt(formatSize((file as File).size, primevue));
    });
  };
  
  handleUpload = async (handleEmit: () => void) => {
    for (const f of this._state.files) {
      await this._fileSystemService?.uploadItem(f);
    }
  
    await this._webContainersService?.fetchFolderStructure('/');
    handleEmit();
  };
  
  onFolderSelected = (event) => {
    const files = Array.from(event.target.files) as File[];
  
    const folder = files[0]?.webkitRelativePath.split('/')[0] || 'Unknown Folder';
    const totalSize = files.map((f) => f.size).reduce((sum, f) => sum + f, 0);
  
    this._state.files = [
      ...this._state.files,
      {
        name: folder,
        children: files,
        type: FileType.FOLDER,
        size: totalSize,
        path: folder,
      },
    ] as FolderItem[];
  
    this._state.totalSize = this._state.totalSize + totalSize;
  };

  get state(): IStateFileUploader {
    return this._state
  }

}