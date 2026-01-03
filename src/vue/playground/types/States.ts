import { RouteLocationNormalized } from "vue-router";
import { ICourseDetail } from "./courses/CourseDetail";
import { ILessonVariants, ILesson } from "./courses/Lessons";
import { Layout } from "./layout";
import { FolderItem } from "./fileItem";
import { ILoading } from "./loading";
import { TreeNode } from "primevue/treenode";
import { FileType } from "./fileType";
import { ProjectType } from "./projectType";

export interface IStateLessonDetail {
  activeCourse: ICourseDetail | null;
  lessonById: ILessonVariants | null;
  activeLesson: ILesson | null;
  nextLessonLink: string | null;
  isOverviewVisible: boolean;
  isContentVisible: boolean;
  isHintVisible: boolean;
  isErrorDialogVisible: boolean;
  isSuccessDialogVisible: boolean;
  completedIn: string | null;
  canBeDisplayed: boolean;
  lessonsFromSession: ILessonVariants[];
  testErrors: string[];
  loading: ILoading;
  successDialogTitle: string;
  successDialogText: string;
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
  nextRoute: RouteLocationNormalized | null,
  createNewProjectDialogIsVisible: boolean,
  createNewProjectConfirmDialogIsVisible: boolean
}

export interface IStateSettings {
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

export interface IStatePlaygroundEditor {
  fontSize: number;
  editorIsShown: boolean;
  outputIsShown: boolean;
}

export interface IStateFileUploader {
  totalSize: number;
  files: FolderItem[];
}

export interface IStateFileTree {
  isVisible: boolean;
  isHidden: boolean;
  showAddRenameDialog: boolean;
  showMoveItemDialog: boolean;
  showCreateProjectDialog: boolean;
  showCreateProjectDialogConfirm: boolean;
  showDeleteConfirmDialog: boolean;
  itemToMove: TreeNode | null;
  dialogType: FileType;
  showUploadDialog: boolean;
  contextMenuVisible: boolean;
  currentItem: FolderItem | null;
  parentItemNode: TreeNode | null;
  itemToRename: FolderItem | null;
  projectType: ProjectType | null
}

export interface IStateShareCourseDialog {
  buttonText: string
}

export interface IStateEditorOutput {
  isVisible: boolean,
}

export interface IStateFolderFileUploader {
  dialogHeader: string,
  isFolder: boolean,
}

export interface IStateCreateProjectDialog {
  error: string | null;
  projectType: ProjectType | null;
}

export interface IStateWelcomeBanner {
  dialogIsVisible: boolean
}
