import { createStore } from 'vuex';
import { ProjectType } from '../types/projectType';
import { FolderItem } from '../types/fileItem';
import { Layout } from '../types/layout';
import { FileType } from '../types/fileType';

export interface State {
  projectType: ProjectType | null
  openedFiles: FolderItem[];
  currentFileContent: string;
  currentFilePath: string;
  layout: Layout;
  filesAreLoading: boolean;
}

const playgroundStore = createStore({
  state: {
    projectType: null,
    openedFiles: [] as FolderItem[],
    currentFileContent: '',
    currentFilePath: '',
    layout: Layout.HORIZONTAL,
    filesAreLoading: true,
  } as State,
  mutations: {
    updateProjectType(state: State, projectType: ProjectType) {
      state.projectType = projectType
    },
    addFile(state: State, payload: { file: FolderItem, path: string }) {
      const folderPath = state.openedFiles.map(f => f.path as string)
      if (folderPath.indexOf(payload.path) < 0) state.openedFiles.push({
        ...payload.file,
        path: payload.path
      });
    },
    setOpenedFiles(state: State, files: FolderItem[]) {
      state.openedFiles = files;
    },
    readFile(state: State, payload: { content: string; path: string }) {
      state.currentFileContent = payload.content;
      state.currentFilePath = payload.path;
    },
    updateCurrentFileContent(state: State, content: string) {
      state.currentFileContent = content;
    },
    updateLayout(state: State, layout: Layout) {
      state.layout = layout;
    },
    updateFoldersLoading(state: State, loading: boolean) {
      state.filesAreLoading = loading;
    },
    updateCurrentFilePath(state: State, path: string) {
      state.currentFilePath = path;
    }
  },
  getters: {
    projectType(state: State) {
      return state.projectType;
    },
    openedFiles(state: State) {
      return state.openedFiles;
    },
    currentFileContent(state: State) {
      return state.currentFileContent;
    },
    currentFilePath(state: State) {
      return state.currentFilePath;
    },
    layout(state: State) {
      return state.layout
    },
    foldersAreLoading(state: State) {
      return state.filesAreLoading
    }
  },
  actions: {
    async closeFile(
      { state, commit },
      payload: { file: FolderItem; update?: (fileName: string) => Promise<string> }
    ) {
      state.openedFiles = state.openedFiles.filter(
        (f: FolderItem) => !f.path?.startsWith(payload.file.path ?? '')
      );

      const isCurrentFile = state.currentFilePath.startsWith(payload.file.path);
      const newOpenItem = state.openedFiles.length > 0 ? state.openedFiles[0] : null;

      if (!isCurrentFile) return

      if (newOpenItem) {
        state.currentFilePath = newOpenItem.path;
  
        if (payload.update) {
          const content = await payload.update(newOpenItem.path ?? newOpenItem.name);
          commit('updateCurrentFileContent', content);
        }
      } else {
        state.currentFilePath = '';
        state.currentFileContent = '';
        state.output = '';
      }
    },
    async renameFile(
      { state, commit },
      payload: { oldFile: FolderItem; newFileName: string; update?: (fileName: string) => Promise<string> }
    ) {
      const newPath = payload.oldFile.path?.replace(payload.oldFile.name, payload.newFileName);

      state.openedFiles = state.openedFiles.map((file: FolderItem) => {
        // opened file is renamed
        if (file.name === payload.oldFile.name) {
          return { ...file, name: payload.newFileName, path: file.path?.replace(payload.oldFile.name, payload.newFileName) };
        }
      
        // parent folder of opened file is renamed
        if (file.path?.startsWith(payload.oldFile.path ?? '')) {
          return { ...file, path: file.path.replace(payload.oldFile.path ?? '', newPath ?? '') };
        }
      
        return file;
      });
    

      // check if parent folder or opened file is renamed
      const itemToBeUpdated = state.openedFiles.find(f => {
        if (payload.oldFile.type === FileType.FILE) {
          return f.path.replace(payload.newFileName, payload.oldFile.name) === state.currentFilePath;
        }
        return f.path && f.path.startsWith(newPath);
      });

      if (itemToBeUpdated) {
        state.currentFilePath = itemToBeUpdated.path.replace(payload.oldFile.path, newPath);
      }
    },
  }      
});

export default playgroundStore;
