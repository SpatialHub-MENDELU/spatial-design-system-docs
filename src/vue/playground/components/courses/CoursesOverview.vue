<script lang="ts" setup>
import { defineProps } from 'vue';
import { ICourseDetail } from '../../types/courses/CourseDetail';
import LessonsList from './LessonsList.vue';
import { ILessonVariants } from '../../types/courses/Lessons';

const props = defineProps<{
  activeCourse: ICourseDetail;
  activeLesson: ILessonVariants | null;
  isVisible: boolean;
  onClose: () => void;
  lessonsFromSession: ILessonVariants[]
}>();
</script>

<template>
  <div
    class="bg-custom-block-tip-bg px-4 absolute lg:h-screen h-full top-0 left-0 bg-white lg:border-r border-border-color flex flex-col overflow-x-hidden duration-500 lg:w-[25rem] w-full lg:p-6 pt-6 z-10"
    :class="{ '-translate-x-full': !props.isVisible, 'translate-x-0': props.isVisible }"
  >
    <div class="flex justify-end">
      <i
        class="pi pi-times text-grey lg:text-[16px] text-[15px] duration-300 cursor-pointer"
        @click="onClose()"
      />
    </div>
    <h3 class="lg:text-[20px] md:text-[20px] text-[18px] font-medium my-8">
      {{ activeCourse?.title }}
    </h3>
    <div class="h-full overflow-y-auto mb-16">
      <LessonsList
        :active-course="activeCourse"
        :active-lesson="activeLesson"
        :lessons-from-session="lessonsFromSession"
      />
    </div>
  </div>
</template>
