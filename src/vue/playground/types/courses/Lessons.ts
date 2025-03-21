export interface ILessonVariants {
  id: number
  title: string
  vueVariant: ILesson
  vanillaJSVariant: ILesson
}

export interface ILesson {
  completed?: string
  content: string
  contentCode?: IContentCode[]
  contentOutput?: string
  task?: ILessonTask
}

export interface IContentCode {
  lang: string,
  content: string,
  imports?: string
}

export interface ILessonTask {
  id: number
  codes: IContentCode[]
  hint: IContentCode
  test: string
}

export interface ITaskResult {
  success?: boolean;
  errors?: string[];
}
