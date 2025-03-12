import { ProjectType } from "../projectType"

export interface ICourseListItem {
  id: number
  title: string
  icon: string
  duration: number
  slug: string
  about: string
  type: ProjectType
}
