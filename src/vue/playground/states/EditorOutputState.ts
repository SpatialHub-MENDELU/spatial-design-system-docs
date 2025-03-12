import { reactive } from "vue";
import { IStateEditorOutput } from "../types/states";

export const initEditorOutputState = reactive<IStateEditorOutput>({
  isVisible: true,
})