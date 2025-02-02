<template>
  <Dialog
    :visible="visible"
    modal
    header="Create new project"
    :closable="false"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Choose the technology for your new project.</span
    >

    <div class="flex gap-8">
      <div
        class="flex items-center gap-4 flex-col p-2 rounded-md border-2 cursor-pointer md:w-36 md:h-36 w-28 h-28 justify-center duration-300"
        v-for="(item, index) of createProjectData"
        :class="
          state.projectType === item.projectType
            ? 'primaryBorder'
            : 'border-border-color'
        "
        :key="index"
        @click="updateProjectType(item.projectType)"
      >
        <i class="text-[32px] text-primary" :class="item.icon" />
        <p class="md:text-[16px] text-[15px] duration-300">{{ item.text }}</p>
      </div>
    </div>

    <p class="text-red lg:text-[15px] text-[14px] mt-8">{{ state.error }}</p>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Close"
        severity="secondary"
        @click="closeDialog"
        class="bg-red"
      />
      <Button
        type="button"
        label="Create"
        @click="submitForm"
        class="bg-primary"
      />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { defineProps, watch, reactive } from 'vue';
import { ProjectType } from '../../types/projectType';
import { createProjectData } from '../../data/create-project';

const props = defineProps<{
  closeDialog: () => void;
  createProject: (projectType: ProjectType) => void;
  visible: boolean;
}>();

const state = reactive<{
  error: string | null;
  projectType: ProjectType | null;
}>({
  error: null,
  projectType: null,
});

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      state.error = null;
    }
  }
);

const submitForm = () => {
  if (state.projectType) {
    props.createProject(state.projectType);
  } else {
    state.error = 'Please select a project type to proceed.';
  }
};

const updateProjectType = (projectType: ProjectType) => {
  state.projectType = projectType;
};
</script>
