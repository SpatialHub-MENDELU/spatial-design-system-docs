import { ICourseListItem } from "./CourseListItems"
import { ILessonVariants } from "./Lessons"

export interface ICourseDetail extends ICourseListItem {
  description: string
  whatYouWillLearn: string
  lessons: ILessonVariants[]
}
