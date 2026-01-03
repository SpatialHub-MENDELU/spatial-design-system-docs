import { reactive } from "vue";
import { IStateRightBar } from "../types/states";

export const initRightBarstate = reactive<IStateRightBar>({
  isEditor: true,
  showDialog: false,
});
