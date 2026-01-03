<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';
import { useData } from 'vitepress';
import { onMounted, ref } from 'vue';
import { ICourseDetail } from '../types/courses/CourseDetail';
import CoursesOverview from '../components/courses/CoursesOverview.vue';
import LessonError from '../components/lessons/LessonError.vue';
import Toast from 'primevue/toast';
import EditorLoadError from '../components/editor/EditorLoadError.vue';
// !!! after adding new courses, update the imports !!!
// import * as BUTTON from "spatial-design-system/primitives/ar-button.js";
// import * as CHECKBOX from "spatial-design-system/primitives/ar-checkbox.js";

import { useStore } from 'vuex';
import { LessonDetailService } from '../services/lessonDetailService';
import LessonDetailTask from '../components/lessons/LessonDetailTask.vue';
import LessonDetailContent from '../components/lessons/LessonDetailContent.vue';
import LessonDetailDialogs from '../components/lessons/LessonDetailDialogs.vue';
import RightBar from '../components/shared/RightBar.vue';

const { params } = useData();
const playgroundStore = useStore();
const lessonDetailService = new LessonDetailService();

const renderScene = ref(false);
const loading = ref(true);
const showError = ref(false);

onMounted(async () => {
  try {
    // !!! after adding new courses, update the imports !!!
    await import('spatial-design-system/primitives/ar-button.js');
    await import('spatial-design-system/primitives/ar-checkbox.js');
    await lessonDetailService.loadDetail(params, playgroundStore);
    renderScene.value = true;
  } catch (error) {
    console.error('Error during project creation:', error);
    showError.value = true;
    throw new Error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Toast position="bottom-center" />

  <EditorLoadError v-if="showError" />

    <div
    v-else
      class="h-full flex gap-0 lg:flex-row flex-col mx-auto w-full lg:overflow-y-hidden"
    >
      <Sidebar />
      <div
        class="relative min-content overflow-y-hidden lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col  xl:p-16 lg:p-12 pt-6"
        v-if="lessonDetailService.state.canBeDisplayed"
        style="max-width: 100%"
        :class="{
          ' lg:gap-16 gap-8': lessonDetailService.state.isContentVisible,
        }"
      >
        <CoursesOverview
          :is-visible="lessonDetailService.state.isOverviewVisible"
          :active-course="
            lessonDetailService.state.activeCourse as ICourseDetail
          "
          :active-lesson="lessonDetailService.state.lessonById"
          :lessons-from-session="lessonDetailService.state.lessonsFromSession"
          v-on:close="lessonDetailService.state.isOverviewVisible = false"
        />

        <LessonDetailContent :lessonDetailService="lessonDetailService" />
        <div
          v-if="loading"
          class="lg:h-full flex flex-col items-center justify-center w-full h-[25rem] border border-border-colo"
        >
          <div class="spinner" />
          <p class="text-grey md:text-[16px] text-[15px] text-center mt-3">
            Loading task...
          </p>
        </div>
        <LessonDetailTask v-else :lessonDetailService="lessonDetailService" />
      </div>
      <LessonError v-else v-if="!loading" />
      <RightBar :show-layout-icon="false"/>
    </div>

  <LessonDetailDialogs :lessonDetailService="lessonDetailService" />
</template>
