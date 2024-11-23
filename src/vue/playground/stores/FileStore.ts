import { createStore } from 'vuex';
import { FolderItem } from '../types/fileItem';

export interface State {
  openedFiles: FolderItem[];
  currentFileContent: string;
  currentFilePath: string;
  output: string;
}

const fileStore = createStore({
  state: {
    openedFiles: [] as FolderItem[],
    currentFileContent: '',
    currentFilePath: '',
    output: '',
  } as State,
  mutations: {
    addFile(state: State, file: FolderItem) {
      if (state.openedFiles.indexOf(file) < 0) state.openedFiles.push(file);
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
          state.currentFilePath = newOpenItem.webkitRelativePath ?? newOpenItem.name;
    
          if (payload.update) {
            try {
              const content = await payload.update(newOpenItem.webkitRelativePath ?? newOpenItem.name);
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

export default fileStore;
