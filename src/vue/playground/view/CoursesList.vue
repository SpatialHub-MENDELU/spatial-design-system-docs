<script setup lang="ts">
import Button from 'primevue/button';
import Sidebar from '../components/shared/Sidebar.vue';
import { CourseListData } from '../data/courses/CoursesList';
import { reactive } from 'vue';
import ShareCourseDialog from '../components/courses/ShareCourseDialog.vue';
import { CourseListItem } from '../types/courses/CourseListItems';

const state = reactive<{
  dialogIsVisible: boolean,
  shareUrl: string
}>({
  dialogIsVisible: false,
  shareUrl: ''
})

const shareCourse = (course: CourseListItem) => {
  state.shareUrl = `https://sds.spatialhub.cz/playground/course/${course.slug}`
  state.dialogIsVisible = true
}

</script>

<template>
  <div class="flex gap-0 mx-auto w-full justify-center">
    <div class="main-content courses lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col">
      <Sidebar />
      <div class="w-full xl:p-16 lg:p-12 pt-6 lg:h-auto h-full">
        <div class="w-full border-b border-border-color pb-2">
          <h1 class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3">
            Courses
          </h1>
          <p class="lg:text-[16px] text-[14px]">
            Practice the Spatial Design System with the following courses.
          </p>
        </div>

        <div class="lg:my-12 my-6 lg:space-y-16 space-y-10">

          <div class="flex gap-4 items-start lg:flex-row flex-col" :key="course.id" v-for="course in CourseListData">
            <i class="text-main-color text-primary lg:text-[64px] text-[48px] lg:block hidden" :class="course.icon" />

            <div class="w-full">
              <h2
                class="lg:text-[24px] text-[22px] font-medium leading-8 lg:w-max w-4/5 duration-300 hover:text-primary text-dark-text">
                <a :href="`/playground/course/${course.slug}`">{{ course.title }}</a>
              </h2>
              <!-- TODO -->
              <div class="flex items-center lg:gap-x-3 gap-x-5 my-2">
                <p class="lg:text-[16px] text-[15px] font-medium">Completed: 0%</p>
                <p class="lg:text-[16px] text-[15px] font-medium flex gap-1"><span class="lg:block hidden">Duration:
                  </span> {{ course.duration }} hours</p>
                <div class="flex items-center gap-1">
                  <i class="fas fa-share text-main-color text-primary" />
                  <Button class="font-medium text-primary lg:text-[16px] text-[15px] flex gap-1"
                    @click="shareCourse(course)">Share <span
                      class="lg:block hidden">course</span></Button>
                </div>
              </div>
              <p class="lg:text-[16px] text-[15px] text-dark-text">{{ course.about }}</p>
            </div>

            <a class="px-4 py-2 bg-primary text-white rounded-lg font-semibold transition duration-300 ease-in-out
              md:text-[16px] text-[15px] w-max whitespace-nowrap" :href="`/playground/course/${course.slug}`">
              Open course
            </a>

          </div>

        </div>
      </div>
    </div>

    <ShareCourseDialog
      :dialog-is-visible="state.dialogIsVisible"
      :url="state.shareUrl"
      :on-close="() => state.dialogIsVisible = false"
    />
  </div>
</template>
