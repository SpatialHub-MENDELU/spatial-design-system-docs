import { reactive } from "vue";
import { IStateFileUploader } from "../types/states";

export const initFileUploadState = reactive<IStateFileUploader>({
  totalSize: 0,
  files: [],
});
