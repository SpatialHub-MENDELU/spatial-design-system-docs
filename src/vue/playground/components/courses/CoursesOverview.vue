<script lang="ts" setup>
import { defineProps } from 'vue';
import LessonsList from '../lessons/LessonsList.vue';
import { IPropsCourseOverview } from '../../types/props';

const props = defineProps<IPropsCourseOverview>();
</script>

<template>
  <div
    class="overview px-4 absolute lg:h-screen h-full top-0 left-0 lg:border-r border-border-color flex flex-col overflow-x-hidden duration-500 lg:w-[25rem] w-full lg:p-6 pt-6 z-10"
    :class="{ '-translate-x-full': !props.isVisible, 'translate-x-0': props.isVisible }"
  >
    <div class="flex justify-end">
      <i
        class="pi pi-times text-grey lg:text-[16px] text-[15px] duration-300 cursor-pointer"
        @click="props.onClose()"
      />
    </div>
    <h3 class="lg:text-[20px] md:text-[20px] text-[18px] font-medium my-8">
      {{ props.activeCourse?.title }}
    </h3>
    <div class="h-full overflow-y-auto mb-16">
      <LessonsList
        :active-course="props.activeCourse"
        :active-lesson="props.activeLesson"
        :lessons-from-session="props.lessonsFromSession"
        :on-close="() => props.onClose()"
      />
    </div>
  </div>
</template>
