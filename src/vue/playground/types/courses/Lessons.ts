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
  content: string
}

export interface ILessonTask {
  id: number
  prompt: string
  code: IContentCode
  hint: IContentCode
  testCases: ILessonTaskTestCase[]
}

export interface ILessonTaskTestCase {
  id: number
  description: number
  testScript: string
}
