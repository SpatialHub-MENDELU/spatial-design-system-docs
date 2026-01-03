import { reactive } from "vue";
import { IStateNewItemDialog } from "../types/states";

export const initNewItemDialogState = reactive<IStateNewItemDialog>({
  itemToRename: null,
  newItemName: '',
  newFileExtension: '',
  errorMessage: '',
  errorExtensionMessage: '',
  dialogHeader: '',
  buttonLabel: 'Create',
  buttonIcon: 'pi pi-check',
});