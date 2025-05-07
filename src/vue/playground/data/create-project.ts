import { ICreateProject } from "../types/createProject"
import { ProjectType } from "../types/projectType"

export const createProjectData: ICreateProject[] = [
  {
    icon: 'fab fa-js',
    projectType: ProjectType.VANILLA,
    text: "Vanilla JS"
  },
  {
    icon: 'fab fa-vuejs',
    projectType: ProjectType.VUE,
    text: "Vue"
  }
]
