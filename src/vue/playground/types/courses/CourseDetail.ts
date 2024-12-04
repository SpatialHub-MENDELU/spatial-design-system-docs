import { ICourseListItem } from "./CourseListItems"
import { ILesson } from "./Lessons"

export interface ICourseDetail extends ICourseListItem {
  description: string
  whatYouWillLearn: string
  lessons: ILesson[]
}
