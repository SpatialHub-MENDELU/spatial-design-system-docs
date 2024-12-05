import { VANILLA_JS_COURSE, VUE_COURSE } from "../constants/courses";
import { ILesson, ILessonVariants } from "../types/courses/Lessons"

export const lessonByCourseVariant = (courseSlug: string, lesson: ILessonVariants) => {
  switch (courseSlug) {
    case VANILLA_JS_COURSE:
      return lesson.vanillaJSVariant
    case VUE_COURSE:
      return lesson.vueVariant
  }
}
