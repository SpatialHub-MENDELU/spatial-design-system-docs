<script setup lang="ts">
import {
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  ref,
} from 'vue';
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
import { useConfirm } from 'primevue/useconfirm';
import { useRouter } from 'vitepress';
import EditorLoadError from '../components/editor/EditorLoadError.vue';
import CustomCofirmDialog from '../components/dialogs/CustomCofirmDialog.vue';
import * as ROUTES from '../constants/routes';

const playgroundStore = useStore();
const projectType = computed(() => playgroundStore.getters.projectType);
const router = useRouter();
const confirm = useConfirm();

const loading = reactive<ILoading>({
  installing: true,
  running: false,
});

const showError = ref(false);

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

const updateShowError = () => {
  showError.value = true;
};

const closeProject = () => {
  playgroundStore.commit('updateProjectType', null);
  playgroundStore.commit('setOpenedFiles', []);
  playgroundStore.commit('updateCurrentFileContent', null);
  playgroundStore.commit('updateCurrentFilePath', '');
  playgroundStore.commit('updateFoldersLoading', true);
};

let previousBeforeRouteChange: typeof router.onBeforeRouteChange;

const handleBeforeRouteChange = (to: string) => {
  // No open project or staying within the editor: let navigation proceed.
  if (projectType.value == null || to.includes(ROUTES.EDITOR)) {
    return previousBeforeRouteChange ? previousBeforeRouteChange(to) : undefined;
  }

  // Leaving the editor with an open project: confirm, then close the project.
  confirm.require({
    message:
      'Are you sure you want to leave? This will close your current project and discard all changes.',
    header: 'Leave Playground',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptClass: 'p-button-danger',
    rejectClass: 'p-button-secondary',
    blockScroll: true,
    modal: true,
    accept: () => {
      closeProject();
      confirm.close();
      router.go(to);
    },
    reject: () => {
      confirm.close();
    },
  });

  return false;
};

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload);
  previousBeforeRouteChange = router.onBeforeRouteChange;
  router.onBeforeRouteChange = handleBeforeRouteChange;
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
  router.onBeforeRouteChange = previousBeforeRouteChange;
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
  <EditorLoadError v-if="showError"/>

  <div
    v-else
    class="h-full flex gap-0 lg:flex-row flex-col mx-auto w-full lg:overflow-y-hidden"
  >
    <Sidebar :show-dialog="() => showDialog()" />
    <WelcomeBanner v-if="!projectType" />

    <CreateProjectDialog
      :visible="state.createNewProjectDialogIsVisible"
      :close-dialog="closeDialog"
      :create-project="createNewProject"
    />

    <CustomCofirmDialog
      message="Are you sure you want to create a new project? This will discard all your current changes."
      :show-dialog="state.createNewProjectConfirmDialogIsVisible"
      :accept="createProjectConfirmAccept"
      :reject="closeNewProjectConfirmDialog"
    />

    <div class="main-content h-full editor-content" v-if="projectType">
      <div class="flex lg:flex-row flex-col h-full max-w-full">
        <button
          @click="showDialog"
          class="lg:hidden block px-3 py-2 bg-primary text-white rounded-lg font-semibold transition duration-300 ease-in-out mb-4 md:text-[16px] text-[15px] w-max"
        >
          New project
        </button>
        <FileTree :loading="loading" v-if="!showError" />
        <PlaygroundEditor
          :loading="loading"
          :update-show-error="updateShowError"
        />
      </div>
    </div>

    <ConfirmDialog />
    <RightBar :show-layout-icon="true" />
  </div>
</template>
