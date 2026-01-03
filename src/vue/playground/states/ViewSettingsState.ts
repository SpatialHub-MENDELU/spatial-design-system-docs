import { reactive } from "vue";
import { Layout } from "../types/layout";
import { IStateSettings } from "../types/states";

export const initViewSettingsState = reactive<IStateSettings>({
  selectedLayout: Layout.HORIZONTAL,
  selectedFontSize: 14,
});
