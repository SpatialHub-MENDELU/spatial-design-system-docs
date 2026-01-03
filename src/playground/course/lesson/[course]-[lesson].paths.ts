import { VANILLA_JS_COURSE, VUE_COURSE } from "../../../vue/playground/constants/courses";
import { lessonsData } from "../../../vue/playground/data/courses/Lessons";

export default {
  paths: () => {
    const courses = [VANILLA_JS_COURSE, VUE_COURSE];
    return courses.flatMap(course =>
      lessonsData.map(lesson => ({
        params: { course, lesson: lesson.id },
      }))
    );
  }
}
