import { reactive } from "vue";
import { IStateShareCourseDialog } from "../types/states";

export const initShareCourseDialogState = reactive<IStateShareCourseDialog>({
  buttonText: 'Copy'
})
