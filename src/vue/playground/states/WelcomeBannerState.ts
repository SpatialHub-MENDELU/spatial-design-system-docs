import { reactive } from "vue";
import { IStateWelcomeBanner } from "../types/states";

export const initWelcomeBannerState = reactive<IStateWelcomeBanner>({
  dialogIsVisible: false
});
