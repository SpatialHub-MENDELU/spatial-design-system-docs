import { reactive } from "vue";
import { IStatePlaygroundEditor } from "../types/states";

export const initEditorState = reactive<IStatePlaygroundEditor>({
  fontSize: 14,
  editorIsShown: false,
  outputIsShown: true
});
