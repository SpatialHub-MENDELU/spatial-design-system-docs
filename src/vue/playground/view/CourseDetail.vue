<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';

import { useData } from 'vitepress'
import { courseDetailData } from '../data/courses/CourseDetail';
import { inject, onMounted, reactive } from 'vue';
import LessonsList from '../components/courses/LessonsList.vue';
import { ICourseDetail } from '../types/courses/CourseDetail';
import { ILessonVariants } from '../types/courses/Lessons';
import { SessionService } from '../services/sessionService';
import { lessonsData } from '../data/courses/Lessons';
import { lessonByCourseVariant } from '../utils/Lessons';
import { getPluralOrSingular } from '../utils/Plurals';
import { LESSON } from '../constants/routes';
import { IStateCourseDetail } from '../types/States';

const { params } = useData()
const sessionService = inject<SessionService>('sessionService');

const state = reactive<IStateCourseDetail>({
  percentage: 0,
  lessonsFromSession: [],
  activeCourse: null,
  completedLessons: 0
})

onMounted(() => {
  const completedLessonsFromSession = sessionService?.getFromSession('completedLessons') as ILessonVariants[] || [];
  state.lessonsFromSession = completedLessonsFromSession;
  const activeCourse = courseDetailData.find(c => c.slug === params.value?.slug) as ICourseDetail
  state.activeCourse = activeCourse

  const filteredLessonsByCourse = completedLessonsFromSession.map(l => lessonByCourseVariant(activeCourse.slug, l));
  state.percentage = Math.round((filteredLessonsByCourse.length / lessonsData.length) * 100);

  state.completedLessons = filteredLessonsByCourse.length
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
              {{ state.activeCourse?.title }}
            </h1>
            <p class="lg:text-[16px] text-[15px] font-semibold text-primary lg:hidden block mb-2">
              Course progress: {{ state.percentage }}%
            </p>
            <p class="lg:text-[16px] text-[15px]">
              {{ state.activeCourse?.description }}
            </p>
            <div class="flex items-center gap-2 my-4">
              <a class="bg-primary px-6 py-1 text-white rounded-2xl lg:text-[16px] text-[15px]"
                v-if="state.percentage != 100"
                :href="`${LESSON}/${state.activeCourse?.slug}-${state.completedLessons + 1}`">{{ state.percentage > 0 ? 'Continue' : 'Start' }}</a>
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
                  v-if="state.percentage > 0"
                  class="text-primary"
                  stroke-width="10"
                  fill="transparent"
                  r="38"
                  cx="50"
                  cy="50"
                  stroke="currentColor"
                  stroke-dasharray="238"
                  :stroke-dashoffset="state.percentage === 0 ? 238 : 238 - (238 * state.percentage / 100)"
                />
              </svg>              
              <div class="absolute text-sm font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-1">{{ state.percentage }}%</div>
            </div>

            <div class="space-y-0">
              <p class="text-primary font-semibold md:text-[18px] text-[16px] whitespace-nowrap">{{ `${state.completedLessons} lesson${getPluralOrSingular(state.completedLessons)}` }}
              </p>
              <p class="text-grey md:text-[16px] text-[15px]  whitespace-nowrap">Out of {{ `${lessonsData.length} lesson${getPluralOrSingular(lessonsData.length)}` }}</p>
            </div>
          </div>
        </div>

        <div class="lg:mt-10 mt-6 flex lg:gap-16 gap-6 lg:flex-row flex-col">
          <div class="space-y-5 w-full">
            <div class="space-y-1">
              <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">Course Overview</h2>
              <p class="lg:text-[16px] text-[15px]">{{ state.activeCourse?.about }}</p>
            </div>
  
            <div class="space-y-1">
              <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">What You Will Learn</h2>
              <p class="lg:text-[16px] text-[15px]">{{ state.activeCourse?.whatYouWillLearn }}</p>
            </div>
          </div>

          <div class="w-full">
            <h2 class="text-primary lg:text-[20px] md:text-[18px] text-[17px] font-semibold">Lessons</h2>
            <LessonsList
              :active-course="state.activeCourse as ICourseDetail"
              :lessons-from-session="state.lessonsFromSession"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
