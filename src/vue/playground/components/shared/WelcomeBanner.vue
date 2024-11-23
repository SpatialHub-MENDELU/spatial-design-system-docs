<template>
  <div class="main-content h-full">
    <div class="flex items-center justify-center p-8 h-full w-full flex-col">
      <h1 class="font-bold text-center mb-4 lg:tex-[36px] md:text-[30px] text-[24px] leading-8">
        Welcome to the Spatial Design System Playground!
      </h1>
      <p class="lg:text-[22px] md:text-[20px] text-[18px] font-medium text-center mb-6">
        Explore our powerful library of components for creating AR/VR
        experiences. You can test and customize everything in the playground.
      </p>
      <p class="lg:text-[18px] md:text-[17px] text-[16px] font-light text-center mb-8">
        Before you start experimenting, create a new project to get going!
      </p>
      <button
        @click="showDialog"
        class="px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out mb-4"
      >
        New Project
      </button>
    </div>
  </div>

  <CreateProjectDialog 
    :visible="state.dialogIsVisible"
    :close-dialog="closeDialog"
    :create-project="createNewProject"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CreateProjectDialog from './CreateProjectDialog.vue';
import { ProjectType } from '../../types/projectType';
import { useStore } from 'vuex';

const playgroundStore = useStore()

const state = reactive({
  dialogIsVisible: false,
});

const showDialog = () => {
  state.dialogIsVisible = true;
};

const closeDialog = () => {
  state.dialogIsVisible = false
}

const createNewProject = (project: ProjectType) => {
  playgroundStore.commit('updateProjectType', project)
  closeDialog()
}
</script>
