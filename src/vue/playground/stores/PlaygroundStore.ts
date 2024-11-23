import { createStore } from 'vuex';
import { ProjectType } from '../types/projectType';
import { FolderItem } from '../types/fileItem';

export interface State {
  projectType: ProjectType | null
  openedFiles: FolderItem[];
  currentFileContent: string;
  currentFilePath: string;
  output: string;
}

const playgroundStore = createStore({
  state: {
    projectType: null,
    openedFiles: [] as FolderItem[],
    currentFileContent: '',
    currentFilePath: '',
    output: '',
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
    setOuput(state: State, output: string) {
      state.output = output;
    },
    updateCurrentFileContent(state: State, content: string) {
      state.currentFileContent = content;
    },
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
    output(state: State) {
      return state.output;
    },
  },
  actions: {
    async removeFile(
      { state, commit },
      payload: { file: FolderItem; update?: (fileName: string) => Promise<string> }
    ) {
      state.openedFiles = state.openedFiles.filter(
        (f: FolderItem) => f.name !== payload.file.name
      );
    
      if (payload.file.name === state.currentFilePath) {
        const newOpenItem = state.openedFiles.length > 0 ? state.openedFiles[0] : null;
    
        if (newOpenItem) {
          state.currentFilePath = newOpenItem.path ?? newOpenItem.name;
    
          if (payload.update) {
            try {
              const content = await payload.update(newOpenItem.path ?? newOpenItem.name);
              commit('updateCurrentFileContent', content);
            } catch (error) {
              console.error('Error updating file content:', error); 
            }
          }
        } else {
          state.currentFilePath = '';
          state.currentFileContent = '';
        }
      }
    }
  }      
});

export default playgroundStore;