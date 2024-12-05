<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';

import { useData } from 'vitepress'
import { lessonsData } from '../data/courses/Lessons';
import { courseDetailData } from '../data/courses/CourseDetail';
import { lessonByCourseVariant } from '../utils/Lessons';
import { ILesson, ILessonVariants } from '../types/courses/Lessons';
import { onMounted, reactive } from 'vue';
import { ICourseDetail } from '../types/courses/CourseDetail';
import { LESSON } from '../constants/routes';
const { params } = useData()

const state = reactive<{
  activeCourse: ICourseDetail | null,
  lessonById: ILessonVariants | null,
  activeLesson: ILesson | null,
  nextLessonLink: string | null
}>({
  activeCourse: null,
  lessonById: null,
  activeLesson: null,
  nextLessonLink: null
})

onMounted(() => { 
  state.activeCourse = courseDetailData.find(c => c.slug === params.value?.course) as ICourseDetail
  state.lessonById = lessonsData.find(c => c.id === params.value?.lesson) as ILessonVariants
  state.activeLesson = lessonByCourseVariant(String(state.activeCourse?.slug), state.lessonById) as ILesson

  if (params.value?.lesson as number < lessonsData.length) {
    state.nextLessonLink = `${LESSON}/${state.activeCourse?.slug}-${Number(params.value?.lesson + 1)}`
  }
})

</script>

<template>
  <div class="lesson flex gap-0 mx-auto w-full justify-center">
    <div class="main-content courses lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col">
      <Sidebar />
      <div class="w-full xl:p-16 lg:p-12 pt-6 lg:h-auto h-full overflow-y-auto flex gap-16">
        
        <div class="flex flex-col">
          <span class="lg:text-[17px] text-[16px] text-grey">Lesson {{ state.lessonById?.id }}</span>
          <h1 class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3 text-primary md:mt-3 mt-2 md:mb-6 mb-4">{{ state.lessonById?.title }}</h1>
          <div v-if="state.activeLesson" v-html="state.activeLesson.content"
          class="lesson__content h-full" />
        <div v-else>
          <p>Lesson content could not be loaded. Please check the course and lesson parameters.</p>
        </div>

        <div class="flex items-end justify-end">
            <a class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4
          md:text-[16px] text-[15px] coursor-pointer"
            :href="state.nextLessonLink"
            v-if="state.nextLessonLink && !state.activeLesson?.task">Next</a>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
