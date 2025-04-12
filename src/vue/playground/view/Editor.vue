<script setup lang="ts">
import { reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { ILoading } from '../types/loading';
import Sidebar from '../components/shared/Sidebar.vue';
import RightBar from '../components/shared/RightBar.vue';
import WelcomeBanner from '../components/shared/WelcomeBanner.vue';
import { useStore } from 'vuex';
import FileTree from '../components/editor/files/FileTree.vue';
import PlaygroundEditor from '../components/editor/PlaygroundEditor.vue';
import { initViewEditorState } from '../states/ViewEditorState';
import CreateProjectDialog from '../components/shared/CreateProjectDialog.vue';
import { ProjectType } from '../types/projectType';
import ConfirmDialog from 'primevue/confirmdialog';
import NewProjectConfirmDialog from '../components/dialogs/NewProjectConfirmDialog.vue';

const playgroundStore = useStore();
const projectType = computed(() => playgroundStore.getters.projectType);

const loading = reactive<ILoading>({
  installing: true,
  running: false,
});

const state = initViewEditorState;

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  if (projectType.value != null) {
    event.preventDefault();
    event.returnValue = '';
  }
};

const createProjectConfirmAccept = () => {
  state.createNewProjectDialogIsVisible = true;
  closeNewProjectConfirmDialog();
};

const closeNewProjectConfirmDialog = () => {
  state.createNewProjectConfirmDialogIsVisible = false;
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

const showDialog = () => {
  state.createNewProjectConfirmDialogIsVisible = true;
};

const closeDialog = () => {
  state.createNewProjectDialogIsVisible = false;
};

const createNewProject = async (project: ProjectType) => {
  playgroundStore.commit('updateProjectType', null);
  await nextTick();

  loading.installing = true;

  playgroundStore.commit('updateProjectType', project);
  playgroundStore.commit('setOpenedFiles', []);
  playgroundStore.commit('updateCurrentFileContent', null);
  playgroundStore.commit('updateFoldersLoading', true);
  playgroundStore.commit('updateCurrentFilePath', '');
  closeDialog();
};
</script>

<template>
  <div
    class="h-full flex gap-0 lg:flex-row flex-col mx-auto w-full lg:overflow-y-hidden"
  >
    <Sidebar :show-dialog="() => showDialog()" />
    <WelcomeBanner v-if="!projectType" />

    <CreateProjectDialog
      :visible="state.createNewProjectDialogIsVisible"
      :close-dialog="closeDialog"
      :create-project="createNewProject"
    />

    <NewProjectConfirmDialog
      :show-dialog="state.createNewProjectConfirmDialogIsVisible"
      :accept="createProjectConfirmAccept"
      :reject="closeNewProjectConfirmDialog"
    />

    <div class="main-content h-full editor-content" v-if="projectType">
      <div class="flex lg:flex-row flex-col h-full max-w-full">
        <button
          @click="showDialog"
          class="lg:hidden block px-3 py-2 bg-primary text-white rounded-lg font-semibold transition duration-300 ease-in-out mb-4
        md:text-[16px] text-[15px] w-max">New project</button>
        <FileTree :loading="loading" />
        <PlaygroundEditor :loading="loading" />
      </div>
    </div>

    <ConfirmDialog />
    <RightBar />
  </div>
</template>
