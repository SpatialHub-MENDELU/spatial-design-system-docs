<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';

import { useData } from 'vitepress'
import { courseDetailData } from '../data/courses/CourseDetail';
import { reactive } from 'vue';
import { lessonByCourseVariant } from '../utils/Lessons';

const { params } = useData()

const activeCourse = courseDetailData.find(c => c.slug === params.value?.slug)
const state = reactive<{ percentage: number }>({
  percentage: 60
})

</script>

<template>
  <div class="flex gap-0 mx-auto w-full justify-center">
    <div class="main-content courses lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col">
      <Sidebar />
      <div class="w-full xl:p-16 lg:p-12 pt-6 lg:h-auto h-full overflow-y-auto">
        <div class="flex border-b border-border-color pb-2">
          <div class="w-full xl:w-2/3">
            <h1 class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3">
              {{ activeCourse?.title }}
            </h1>
            <p class="lg:text-[16px] text-[15px] font-semibold text-primary lg:hidden block mb-2">
              Course progress: {{ state.percentage }}%
            </p>
            <p class="lg:text-[16px] text-[15px]">
              {{ activeCourse?.description }}
            </p>
            <div class="flex items-center gap-2 my-4">
              <a class="bg-primary px-6 py-1 text-white rounded-2xl lg:text-[16px] text-[15px]"
                href="/getting-started/introduction">Continue</a>
              <a class="bg-extra-light-background px-6 py-1 text-dark-text rounded-2xl lg:text-[16px] text-[15px]"
                href="/getting-started/introduction">Docs</a>
            </div>
          </div>
          <div class="xl:w-1/3 w-max items-center gap-4 justify-end pl-6 lg:flex hidden">
            <div class="relative flex justify-center items-center">
              <svg class="w-24 h-24 transform rotate-[-90deg]">
                <circle
                  class="text-light-background"
                  stroke-width="10"
                  fill="transparent"
                  r="38"
                  cx="50"
                  cy="50"
                  stroke="currentColor"
                />
                <circle
                  class="text-primary"
                  stroke-width="10"
                  fill="transparent"
                  r="38"
                  cx="50"
                  cy="50"
                  stroke="currentColor"
                  stroke-dasharray="238"
                  :stroke-dashoffset="238 - (238 * state.percentage / 100)"
                />
              </svg>
              <div class="absolute text-sm font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-1">{{ state.percentage }}%</div>
            </div>

            <div class="space-y-0">
              <p class="text-primary font-semibold md:text-[18px] text-[16px] whitespace-nowrap">9 lessons</p>
              <p class="text-grey md:text-[16px] text-[15px]  whitespace-nowrap">Out of 13 lessons</p>
            </div>
          </div>
        </div>

        <div class="lg:mt-10 mt-6 flex lg:gap-16 gap-6 lg:flex-row flex-col">
          <div class="space-y-5 w-full">
            <div class="space-y-1">
              <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">Course Overview</h2>
              <p class="lg:text-[16px] text-[15px]">{{ activeCourse?.about }}</p>
            </div>
  
            <div class="space-y-1">
              <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">What You Will Learn</h2>
              <p class="lg:text-[16px] text-[15px]">{{ activeCourse?.whatYouWillLearn }}</p>
            </div>
          </div>

          <div class="w-full">
            <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">Lessons</h2>
            <a v-for="lesson in activeCourse?.lessons"
              :href="`/playground/course/lesson/${activeCourse?.slug}-${lesson.id}`"
              class="flex gap-2 justify-between py-1.5 border-b border-border-color">
                <div class="flex gap-2 items-center lg:text-[16px] text-[15px]">
                  <span>Lesson {{ lesson.id }}:</span>
                  <p>{{ lesson.title }}</p>
                </div>
                <span class="w-6 h-6 flex items-center justify-center rounded-full border-2 border-primary md:text-[16px] text-[15px]"
                :class="{'border-grey': !lessonByCourseVariant(String(activeCourse?.slug), lesson)?.completed}">
                  <i class="fas fa-check text-primary"
                  :class="{'hidden': !lessonByCourseVariant(String(activeCourse?.slug), lesson)?.completed}"/>
                </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
