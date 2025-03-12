<script setup lang="ts">
import { defineProps } from 'vue';
import { CourseDetailService } from '../../services/courseDetailService';
import { ICourseDetail } from '../../types/courses/CourseDetail';
import LessonsList from '../lessons/LessonsList.vue';

const props = defineProps<{
  courseDetailService: CourseDetailService;
}>();
</script>


<template>
  <div class="lg:mt-10 mt-6 flex lg:gap-16 gap-6 lg:flex-row flex-col">
    <div class="space-y-5 w-full">
      <div class="space-y-1">
        <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">Course Overview</h2>
        <p class="lg:text-[16px] text-[15px]">{{ props.courseDetailService.state.activeCourse?.about }}</p>
      </div>

      <div class="space-y-1">
        <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">What You Will Learn</h2>
        <p class="lg:text-[16px] text-[15px]">{{ props.courseDetailService.state.activeCourse?.whatYouWillLearn }}</p>
      </div>
    </div>

    <div class="w-full">
      <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">Lessons</h2>
      <LessonsList
        :active-course="props.courseDetailService.state.activeCourse as ICourseDetail"
        :lessons-from-session="props.courseDetailService.state.lessonsFromSession"
        :active-lesson="null" />
    </div>
  </div>
</template>
