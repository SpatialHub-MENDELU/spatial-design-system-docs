import { reactive } from "vue";
import { IStateFileTree } from "../types/states";
import { FileType } from "../types/fileType";

export const initFileTreeState = reactive<IStateFileTree>({
  isVisible: true,
  isHidden: true,
  showAddRenameDialog: false,
  showMoveItemDialog: false,
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
  itemToMove: null
});
