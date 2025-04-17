import { reactive } from "vue";
import { IStateFileTree } from "../types/states";
import { FileType } from "../types/fileType";
import { ProjectType } from "../types/projectType";

export const initFileTreeState = reactive<IStateFileTree>({
  isVisible: true,
  isHidden: true,
  showAddRenameDialog: false,
  showMoveItemDialog: false,
  showCreateProjectDialog: false,
  showCreateProjectDialogConfirm: false,
  showDeleteConfirmDialog: false,
  dialogType: FileType.FILE,
  showUploadDialog: false,
  contextMenuVisible: false,
  currentItem: {
    name: '',
    type: FileType.FILE,
    children: [],
    size: 0,
    path: ''
  },
  parentItemNode: null,
  itemToRename: null,
  itemToMove: null,
  projectType: null
});
