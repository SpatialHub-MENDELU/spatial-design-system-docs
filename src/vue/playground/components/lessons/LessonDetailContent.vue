
<script setup type="module" lang="ts">
import { defineProps } from 'vue';
import { IPropsLessonDetailContent } from '../../types/props';
import Chip from 'primevue/chip';

const props = defineProps<IPropsLessonDetailContent>();
</script>

<template>
  <div
    class="h-full block overflow-x-auto relative duration-300"
    :class="{
      ' w-0 overflow-hidden': !props.lessonDetailService.state.isContentVisible,
      ' lg:w-1/2 w-full':
        props.lessonDetailService.state.isContentVisible &&
        props.lessonDetailService.state.activeLesson?.task,
      ' w-full': !props.lessonDetailService.state.activeLesson?.task,
    }"
  >
    <div class="flex flex-col w-full h-full">
      <div
        class="flex items-center gap-2 lg:mb-6 mb-4 cursor-pointer bg-primary hover:bg-tertiary duration-300 w-max py-2 px-4 rounded-2xl"
        @click="props.lessonDetailService.state.isOverviewVisible = true"
      >
        <i
          class="pi pi-th-large text-white lg:text-[16px] text-[15px] duration-300 cursor-pointer"
        />
        <p class="lg:text-[16px] text-[15px] text-white">Lesson overview</p>
      </div>
      <span class="lg:text-[17px] text-[16px] text-grey"
        >Lesson {{ props.lessonDetailService.state.lessonById?.id }}</span
      >
      <div class="flex gap-4 items-center">
        <h1
        class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3 text-primary md:mt-3 mt-2 md:mb-6 mb-4"
        >
          {{ props.lessonDetailService.state.lessonById?.title }}
        </h1>
        
        <button 
          @click="props.lessonDetailService.showHintDialog"
          v-if="props.lessonDetailService.state.activeLesson?.task">
          <Chip label="Hint"/>
        </button>
      </div>

      <div
        v-if="
        props.lessonDetailService.state.activeLesson &&
        props.lessonDetailService.state.activeLesson.content
        "
        ref="lessonContent"
        class="lesson__content h-full overflow-y-auto lg:pr-5"
      >
        <div :class="{
          'bordered-section': props.lessonDetailService.state.activeLesson.content.task
        }" v-html="props.lessonDetailService.state.activeLesson.content.intro" />

        <div v-if="props.lessonDetailService.state.activeLesson.content.task"
          class="lg:mt-6 mt-4">
          <h2>Your task</h2>
          <div v-html="props.lessonDetailService.state.activeLesson.content.task" />
        </div>

        <div v-if="props.lessonDetailService.state.activeLesson.content.whatYouWillLearn"
          class="lg:mt-6 mt-4">
          <h2>What You Will Learn</h2>
          <div v-html="props.lessonDetailService.state.activeLesson.content.whatYouWillLearn"/>
        </div>

        <div v-if="props.lessonDetailService.state.activeLesson.content.howDoesItWork"
          class="lg:mt-6 mt-4">
          <h2>How Does It Works?</h2>
          <div v-html="props.lessonDetailService.state.activeLesson.content.howDoesItWork"/>
        </div>

        <div class="lg:mt-6 mt-4"
          v-if="props.lessonDetailService.state.activeLesson.contentCode">
          <h2 tabindex="-1">
            Example
          </h2>
  
          <div id="placeholder"></div>
        </div>

        <div v-if="props.lessonDetailService.state.activeLesson.content.props"
          class="lg:mt-6 mt-4">
          <h2>Props</h2>
          <div v-html="props.lessonDetailService.state.activeLesson.content.props"/>
        </div>
    </div>

      <div v-else>
        <p class="lg:text-[16px] text-[15px]">
          Lesson content could not be loaded. Please check the course and lesson
          parameters.
        </p>
      </div>
      
      <div
        class="flex items-end justify-end flex-col gap-3"
        v-if="
        props.lessonDetailService.state.nextLessonLink &&
          !props.lessonDetailService.state.activeLesson?.task
        "
      >
        <a
          class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
          :href="props.lessonDetailService.state.nextLessonLink"
          @click.prevent="props.lessonDetailService.addLessonToSession"
          >Next</a
        >
        <span
          class="text-primary lg:text-[16px] text-[15px]"
          v-if="props.lessonDetailService.state.completedIn"
          >Completed: {{ props.lessonDetailService.state.completedIn }}</span
        >
      </div>
    </div>
  </div>
</template>
