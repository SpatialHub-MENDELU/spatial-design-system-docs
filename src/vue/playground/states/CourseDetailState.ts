import { reactive } from "vue";
import { IStateCourseDetail } from "../types/states";

export const initCourseDetailState = reactive<IStateCourseDetail>({
  percentage: 0,
  lessonsFromSession: [],
  activeCourse: null,
  completedLessons: 0
})
