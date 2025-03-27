export interface ILessonVariants {
  id: number
  title: string
  vueVariant: ILesson
  vanillaJSVariant: ILesson
}

export interface ILesson {
  completed?: string
  content: ILessonContent
  contentCode?: IContentCode[]
  contentOutput?: string
  task?: ILessonTask
}

export interface ILessonContent {
  intro: string
  whatYouWillLearn?: string
  howDoesItWork?: string
  props?: string
  task?: string
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
