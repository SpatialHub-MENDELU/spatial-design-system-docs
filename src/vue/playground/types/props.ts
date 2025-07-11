import { TreeNode } from "primevue/treenode";
import { FileType } from "./fileType";
import { FolderItem } from "./fileItem";
import { ILoading } from "./loading";
import { IContentCode, ILessonVariants } from "./courses/Lessons";
import { ICourseDetail } from "./courses/CourseDetail";
import { CourseDetailService } from "../services/courseDetailService";
import { ICourseListItem } from "./courses/CourseListItems";
import { LessonDetailService } from "../services/lessonDetailService";
import { ContextMenuOption } from "./contextMenu";
import { ProjectType } from "./projectType";

export interface IPropsNewItemDialog {
  showDialog: boolean;
  dialogType: FileType;
  closeDialog: () => void;
  itemToRename: FolderItem | null;
  parentNode: TreeNode | null;
}

export interface IPropsCodemirror {
  isDetail: boolean;
  dynamicClass?: Record<string, boolean>;
}

export interface IPropsFileUploader {
  accept: string;
  multiple: boolean;
  folderUploader: boolean;
  parentNode: TreeNode | null;
}

export interface IPropsFileTree {
  loading: ILoading;
}

export interface IPropsHintDialog {
  hint?: IContentCode | undefined;
  showDialog: boolean;
  closeDialog: () => void;
}

export interface IPropsShareCourseDialog {
  dialogIsVisible: boolean,
  url: string,
  onClose: () => void
}

export interface IPropsTaskDialog {
  type: 'success' | 'error'
  successMessage?: string;
  showDialog: boolean;
  continue?: () => void;
  closeDialog?: () => void;
  link?: string | null;
  text?: string;
  errors?: string[];
}

export interface IPropsCourseOverview {
  activeCourse: ICourseDetail;
  activeLesson: ILessonVariants | null;
  isVisible: boolean;
  onClose: () => void;
  lessonsFromSession: ILessonVariants[]
}

export interface IPropsCourseDetailProgress {
  courseDetailService: CourseDetailService;
}

export interface IPropsCourseDetailMainInfo {
  courseDetailService: CourseDetailService;
}

export interface IPropsCourseDetailAdditionalInfo {
  courseDetailService: CourseDetailService;
}

export interface IPropsCourseCard {
  course: ICourseListItem
}

export interface IPropsEditorOutput {
  loading: ILoading;
  isDetail: boolean;
  outputIsShown?: boolean;
  isResizing?: boolean;
}

export interface IPropsFolderFileUploader {
  isDialogVisible: boolean;
  closeDialog: () => void;
  uploadType: FileType;
  parentNode: TreeNode | null;
}

export interface IPropsLessonDetailContent {
  lessonDetailService: LessonDetailService;
}

export interface IPropsLessonDetailDialogs {
  lessonDetailService: LessonDetailService;
}

export interface IPropsLessonDetailTask {
  lessonDetailService: LessonDetailService;
}

export interface IPropsLessonsList {
  activeCourse: ICourseDetail;
  lessonsFromSession: ILessonVariants[];
  activeLesson: ILessonVariants | null;
  onClose?: () => void;
}

export interface IPropsBreadcrumbs {
  path: string
}

export interface IPropsContextMenu {
  visible: boolean;
  position: { x: number; y: number };
  options: ContextMenuOption[];
  closeMenu: () => void;
}

export interface IPropsCreateProjectDialog {
  closeDialog: () => void;
  createProject: (projectType: ProjectType) => void;
  visible: boolean;
}

export interface IPropsLayoutDialog {
  closeDialog: () => void;
  visible: boolean;
}

export interface IPropsMoveFileDialog {
  folders: TreeNode[];
  selectedItem: TreeNode | null;
  showDialog: boolean;
  closeDialog: () => void;
  updateLoading: () => void;
}

export interface IPropsSidebar {
  showDialog?: () => void
}

export interface IPropsConfirmDialog {
  accept: () => void
  reject: () => void
  showDialog: boolean
  message: string
}

export interface IPropsRightBar {
  showLayoutIcon: boolean
}
