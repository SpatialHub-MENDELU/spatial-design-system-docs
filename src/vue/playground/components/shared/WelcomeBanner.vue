<script setup lang="ts">
import CreateProjectDialog from './CreateProjectDialog.vue';
import { ProjectType } from '../../types/projectType';
import { useStore } from 'vuex';
import Image from 'primevue/image';
import { initWelcomeBannerState } from '../../states/WelcomeBannerState';

const playgroundStore = useStore();
const state = initWelcomeBannerState

const showDialog = () => {
  state.dialogIsVisible = true;
};

const closeDialog = () => {
  state.dialogIsVisible = false;
};

const createNewProject = (project: ProjectType) => {
  playgroundStore.commit('updateProjectType', project);
  closeDialog();
};
</script>

<template>
  <div class="main-content h-full">
    <div class="lg:p-16 px-0 md:py-32 py-16 h-full w-full flex items-center gap-16">
      <div class="flex items-start justify-center flex-col lg:gap-y-5 gap-y-2">
        <span class="text-primary lg:text-[18px] md:text-[17px] text-[16px] font-medium">Welcome to the</span>
        <h1
          class="font-bold lg:mb-4 mb-2 lg:text-[44px] md:text-[30px] text-[24px] leading-tight text-left"
        >
          Spatial Design System Playground!
        </h1>
        <p
          class="lg:text-[18px] md:text-[17px] text-[16px] font-medium mb-6 text-left"
        >
          Explore our powerful library of&nbsp;components for creating AR/VR
          experiences. You can test and&nbsp;customize everything in&nbsp;the&nbsp;playground.
          Before you start experimenting, create a&nbsp;new project to&nbsp;get going!
        </p>
        <button
          @click="showDialog"
          class="px-6 py-3 bg-primary hover:bg-tertiary text-white rounded-lg font-semibold shadow-lg transition duration-300 ease-in-out mb-4
          md:text-[18px] text-[16px]"
        >
          New Project
        </button>
      </div>

      <Image
        src="/spatial-design-system-logo-dark.png"
        alt="Spatial Design System - logo"
        class="lg:block hidden"
      />
    </div>
  </div>

  <CreateProjectDialog
    :visible="state.dialogIsVisible"
    :close-dialog="closeDialog"
    :create-project="createNewProject"
  />
</template>
