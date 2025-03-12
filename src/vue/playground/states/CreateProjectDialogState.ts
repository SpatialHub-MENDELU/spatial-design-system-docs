import { reactive } from "vue";
import { IStateCreateProjectDialog } from "../types/states";

export const initCreateProjectDialogState = reactive<IStateCreateProjectDialog>({
  error: null,
  projectType: null,
});
