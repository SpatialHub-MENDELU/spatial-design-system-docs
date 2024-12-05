export interface ILessonVariants {
  id: number
  title: string
  vueVariant: ILesson
  vanillaJSVariant: ILesson
}

export interface ILesson {
  completed?: boolean
  content: string
  task?: ILessonTask
}

export interface ILessonTask {
  id: number
  prompt: string
  code: string
  hint: string
  correctResult: string
  testCases: ILessonTaskTestCase[]
}

export interface ILessonTaskTestCase {
  id: number
  description: number
  testScript: string
}
