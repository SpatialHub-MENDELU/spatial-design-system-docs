<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';
import { courseListData } from '../data/courses/CoursesList';
import CourseCard from '../components/courses/CourseCard.vue';
import RightBar from '../components/shared/RightBar.vue';
</script>

<template>
  <div
    class="h-full flex gap-0 lg:flex-row flex-col mx-auto w-full lg:overflow-y-hidden"
  >
    <Sidebar />
    <div
      class="main-content settings lg:h-full h-full mx-auto relative flex w-full flex-col xl:p-16 lg:p-12 pt-6"
    >
      <div class="w-full border-b border-border-color pb-2">
        <h1 class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3">
          Courses
        </h1>
        <p class="lg:text-[16px] text-[14px]">
          Practice the Spatial Design System with the following courses.
        </p>
      </div>

      <div class="lg:my-12 my-6 lg:space-y-16 space-y-10">
        <div v-for="course in courseListData" :key="course.id">
          <CourseCard :course="course" />
        </div>
      </div>
    </div>

    <RightBar :show-layout-icon="false" />
  </div>
</template>
