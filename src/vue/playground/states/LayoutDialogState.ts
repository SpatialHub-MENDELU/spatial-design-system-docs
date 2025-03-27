import { reactive } from "vue";
import { IStateLayoutDialog } from "../types/states";

export const initLayoutDialogState = reactive<IStateLayoutDialog>({
  error: null,
  layout: null,
});
