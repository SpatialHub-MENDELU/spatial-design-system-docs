import { inject } from "vue";
import { initEditorState } from "../states/EditorState";
import { WebContainerService } from "./webContainersService";
import { ProjectType } from "../types/projectType";
import { ILoading } from "../types/loading";
import { IStatePlaygroundEditor } from "../types/states";

export class EditorService {

  private _state = initEditorState
  private _webContainersService = inject<WebContainerService>(
    'webContainersService'
  );

  async loadEditor(projectType: ProjectType, loading: ILoading) {
    try {
      if (!projectType) {
        throw new Error("No project type selected.");
      }
  
      await this._webContainersService?.ensureInitialized();
  
      await this._webContainersService?.createProject(projectType);
      loading.installing = false;
    } catch (error) {
      console.error("Error during project creation:", error);
      loading.installing = false;
      loading.running = false;
    }
  }

  get state(): IStatePlaygroundEditor {
    return this._state
  }

}
