<script setup lang="ts">
import { defineProps, inject } from 'vue'
import { ICourseListItem } from '../../types/courses/CourseListItems';
import { ILessonVariants } from '../../types/courses/Lessons';
import { lessonByCourseVariant } from '../../utils/Lessons';
import { lessonsData } from '../../data/courses/Lessons';
import { SessionService } from '../../services/sessionService';
import ShareCourseDialog from '../dialogs/ShareCourseDialog.vue';
import { IPropsCourseCard } from '../../types/props';
import { initCourseCardState } from '../../states/CourseCardState';

const sessionService = inject<SessionService>('sessionService');
const props = defineProps<IPropsCourseCard>();
const state = initCourseCardState;

const shareCourse = (course: ICourseListItem) => {
  state.shareUrl = `https://sds.spatialhub.cz/playground/course/${course.slug}`
  state.dialogIsVisible = true
}

const getCompletedPercentage = (course: ICourseListItem) => {
  const completedLessonsFromSession = sessionService?.getFromSession('completedLessons') as ILessonVariants[] || [];
  const filteredLessonsByCourse = completedLessonsFromSession.map(l => lessonByCourseVariant(course.slug, l)).filter(l => l?.completed);
  return Math.round((filteredLessonsByCourse.length / lessonsData.length) * 100);
};

</script>

<template>
  <div class="flex gap-4 items-start lg:flex-row flex-col">
    <i class="text-main-color text-primary lg:text-[64px] text-[48px] lg:block hidden" :class="props.course.icon" />

    <div class="w-full">
      <h2 class="lg:text-[24px] text-[22px] font-medium leading-8 lg:w-max w-4/5 duration-300 hover:text-primary">
        <a :href="`/playground/course/${props.course.slug}`">{{ props.course.title }}</a>
      </h2>
      <div class="flex items-center lg:gap-x-3 gap-x-5 my-2">
        <p class="lg:text-[16px] text-[15px] font-medium">
          Completed: {{ getCompletedPercentage(props.course) }}%
        </p>
        <p class="lg:text-[16px] text-[15px] font-medium flex gap-1">
          <span class="lg:block hidden">Duration: </span> {{ props.course.duration }} hours
        </p>
        <div class="flex items-center gap-1">
          <i class="fas fa-share text-main-color text-primary" />
          <Button class="font-medium text-primary lg:text-[16px] text-[15px] flex gap-1" @click="shareCourse(props.course)">
            Share <span class="lg:block hidden">course</span>
          </Button>
        </div>
      </div>
      <p class="lg:text-[16px] text-[15px]">{{ props.course.about }}</p>
    </div>

    <a
      class="px-4 py-2 bg-primary text-white rounded-lg font-semibold transition duration-300 ease-in-out md:text-[16px] text-[15px] w-max whitespace-nowrap"
      :href="`/playground/course/${props.course.slug}`"
    >
      Open course
    </a>
  </div>

  <ShareCourseDialog
    :dialog-is-visible="state.dialogIsVisible"
    :url="state.shareUrl"
    :on-close="() => state.dialogIsVisible = false"
  />
</template>
