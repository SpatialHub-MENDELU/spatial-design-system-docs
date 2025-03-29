<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';
import { useData } from 'vitepress';
import { onMounted, ref, render } from 'vue';
import { ICourseDetail } from '../types/courses/CourseDetail';
import CoursesOverview from '../components/courses/CoursesOverview.vue';
import LessonError from '../components/lessons/LessonError.vue';
import Toast from 'primevue/toast';

// !!! after adding new courses, update the imports !!!
// import * as BUTTON from "spatial-design-system/primitives/ar-button.js";
// import * as CHECKBOX from "spatial-design-system/primitives/ar-checkbox.js";

import { useStore } from 'vuex';
import { LessonDetailService } from '../services/lessonDetailService';
import LessonDetailTask from '../components/lessons/LessonDetailTask.vue';
import LessonDetailContent from '../components/lessons/LessonDetailContent.vue';
import LessonDetailDialogs from '../components/lessons/LessonDetailDialogs.vue';

const { params } = useData();
const playgroundStore = useStore();
const lessonDetailService = new LessonDetailService();

const renderScene = ref(false);

onMounted(async () => {
  try {
    // !!! after adding new courses, update the imports !!!
    await import('spatial-design-system/primitives/ar-button.js');
    await import('spatial-design-system/primitives/ar-checkbox.js');
    await lessonDetailService.loadDetail(params, playgroundStore);

    renderScene.value = true
  } catch (error) {
    console.error('Error during project creation:', error);
  }
});
</script>

<template>
  <div class="lesson flex gap-0 mx-auto w-full justify-center lg:max-h-screen">
    <Toast position="bottom-center" />

    <div
      class="main-content courses lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col w-screen"
    >
      <Sidebar />
      <div
        class="relative w-full xl:p-16 lg:p-12 pt-6 h-auto overflow-y-hidden flex lg:flex-row flex-col duration-300"
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
        <LessonDetailTask :lessonDetailService="lessonDetailService" />
      </div>
      <LessonError v-else />
    </div>
  </div>

  <LessonDetailDialogs :lessonDetailService="lessonDetailService" />
</template>
