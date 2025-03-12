import { reactive } from "vue";
import { IStateCoursesList } from "../types/states";

export const initCourseCardState = reactive<IStateCoursesList>({
  dialogIsVisible: false,
  shareUrl: ''
})
