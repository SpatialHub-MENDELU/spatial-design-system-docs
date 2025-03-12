import { createStore } from 'vuex';
import { ProjectType } from '../types/projectType';
import { FolderItem } from '../types/fileItem';
import { Layout } from '../types/layout';

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
      state.layout = layout
    },
    updateFoldersLoading(state: State, loading: boolean) {
      state.filesAreLoading = loading
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
        (f: FolderItem) => f.name !== payload.file.name
      );

      const isCurrentFile = payload.file.path === state.currentFilePath;
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
      payload: { oldFileName: string; newFileName: string; update?: (fileName: string) => Promise<string> }
    ) {
      state.openedFiles = state.openedFiles.map((file: FolderItem) =>
        file.name === payload.oldFileName
        ? { ...file, name: payload.newFileName, path: file.path?.replace(payload.oldFileName, payload.newFileName) }
        : file
      );

      const updatedItem = state.openedFiles.find(f => f.name === payload.newFileName);

      if (state.currentFilePath === updatedItem.path?.replace(payload.newFileName, payload.oldFileName)) {
        console.log("ano, je to otevrene")
        state.currentFilePath = updatedItem.path?.replace(payload.oldFileName);
      }
    },
  }      
});

export default playgroundStore;
