import { RouteLocationNormalized } from "vue-router";
import { ICourseDetail } from "./courses/CourseDetail";
import { ILessonVariants, ILesson } from "./courses/Lessons";
import { Layout } from "./layout";
import { FolderItem } from "./fileItem";
import { ILoading } from "./loading";

export interface IStateLessonDetail {
  activeCourse: ICourseDetail | null;
  lessonById: ILessonVariants | null;
  activeLesson: ILesson | null;
  nextLessonLink: string | null;
  isOverviewVisible: boolean;
  isContentVisible: boolean;
  isHintVisible: boolean;
  isErrorDialogVisible: boolean;
  completedIn: string | null;
  canBeDisplayed: boolean;
  lessonsFromSession: ILessonVariants[];
  testErrors: string[];
  loading: ILoading
}

export interface IStateCourseDetail {
  percentage: number,
  lessonsFromSession: ILessonVariants[],
  activeCourse: ICourseDetail | null,
  completedLessons: number
}

export interface IStateCoursesList {
  dialogIsVisible: boolean,
  shareUrl: string,
}

export interface IStateEditor {
  showConfirmDialog: boolean,
  nextRoute: RouteLocationNormalized | null
}

export interface IStateSettings {
  iconsAreShown: boolean,
  selectedLayout: Layout,
  selectedFontSize: number,
}

export interface IStateLayoutDialog {
  error: string | null;
  layout: Layout | null;
}

export interface IStateRightBar {
  isEditor: boolean,
  showDialog: boolean,
}

export interface IStateNewItemDialog {
  itemToRename: FolderItem | null,
  newItemName: string,
  newFileExtension: string,
  errorMessage: string,
  errorExtensionMessage: string,
  dialogHeader: string,
  buttonLabel: string,
  buttonIcon: string,
}
