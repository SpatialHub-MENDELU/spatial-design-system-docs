
<script setup lang="ts">
import { defineProps } from 'vue';
import { LessonDetailService } from '../../services/lessonDetailService';

const props = defineProps<{
  lessonDetailService: LessonDetailService;
}>();
</script>

<template>
  <div
    class="h-full block overflow-x-auto relative duration-300"
    :class="{
      ' w-0 overflow-hidden': !lessonDetailService.state.isContentVisible,
      ' lg:w-1/2 w-full':
        lessonDetailService.state.isContentVisible &&
        lessonDetailService.state.activeLesson?.task,
      ' w-full': !lessonDetailService.state.activeLesson?.task,
    }"
  >
    <div class="flex flex-col w-full h-full">
      <div
        class="flex items-center gap-2 lg:mb-6 mb-4 cursor-pointer"
        @click="lessonDetailService.state.isOverviewVisible = true"
      >
        <i
          class="pi pi-th-large text-grey lg:text-[16px] text-[15px] duration-300 cursor-pointer"
        />
        <p class="lg:text-[16px] text-[15px] text-grey">Lesson overview</p>
      </div>
      <span class="lg:text-[17px] text-[16px] text-grey"
        >Lesson {{ lessonDetailService.state.lessonById?.id }}</span
      >
      <h1
        class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3 text-primary md:mt-3 mt-2 md:mb-6 mb-4"
      >
        {{ lessonDetailService.state.lessonById?.title }}
      </h1>

      <div
        v-if="
          lessonDetailService.state.activeLesson &&
          lessonDetailService.state.activeLesson.content
        "
        v-html="lessonDetailService.state.activeLesson.content"
        ref="lessonContent"
        class="lesson__content h-full overflow-y-auto"
      ></div>

      <div v-else>
        <p class="lg:text-[16px] text-[15px]">
          Lesson content could not be loaded. Please check the course and lesson
          parameters.
        </p>
      </div>
      <div
        class="flex items-end justify-end flex-col gap-3"
        v-if="
          lessonDetailService.state.nextLessonLink &&
          !lessonDetailService.state.activeLesson?.task
        "
      >
        <a
          class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
          :href="lessonDetailService.state.nextLessonLink"
          @click.prevent="lessonDetailService.addLessonToSession"
          >Next</a
        >
        <span
          class="text-primary lg:text-[16px] text-[15px]"
          v-if="lessonDetailService.state.completedIn"
          >Completed: {{ lessonDetailService.state.completedIn }}</span
        >
      </div>
    </div>
  </div>
</template>
