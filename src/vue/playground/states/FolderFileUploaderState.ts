import { reactive } from "vue";
import { IStateFolderFileUploader } from "../types/states";

export const initFolderFileUploaderState = reactive<IStateFolderFileUploader>({
  dialogHeader: '',
  isFolder: false,
});
