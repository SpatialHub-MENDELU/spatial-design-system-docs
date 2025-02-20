import { reactive } from "vue";
import { IStateEditor } from "../types/states";

export const initViewEditorState = reactive<IStateEditor>({
  showConfirmDialog: false,
  nextRoute: null
})
