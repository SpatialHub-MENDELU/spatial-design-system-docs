import { VANILLA_JS_COURSE, VUE_COURSE } from "../../constants/courses";
import { ICourseListItem } from "../../types/courses/CourseListItems";
import { ProjectType } from "../../types/projectType";

export const courseListData: ICourseListItem[] = [
  {
    id: 1,
    icon: 'fab fa-js',
    title: 'Spatial Design System Course in Vanilla JS',
    duration: 16,
    slug: VANILLA_JS_COURSE,
    about: 'Throughout the course, you will explore the various components in Vanilla JS that make up Spatial Design System. Each lesson is carefully structured to introduce you to new components and features, building on your knowledge as you progress.',
    type: ProjectType.VANILLA
  },
  {
    id: 2,
    icon: 'fab fa-vuejs',
    title: 'Spatial Design System Course in Vue',
    duration: 16,
    slug: VUE_COURSE,
    about: 'Throughout the course, you will explore the various components in Vue that make up Spatial Design System. Each lesson is carefully structured to introduce you to new components and features, building on your knowledge as you progress.',
    type: ProjectType.VUE
  }
]
