<script setup lang="ts">
import { computed, defineProps } from 'vue';
import EditorOutput from '../editor/EditorOutput.vue';
import Codemirror from '../editor/Codemirror.vue';
import { IPropsLessonDetailTask } from '../../types/props';

const props = defineProps<IPropsLessonDetailTask>();
const isLoading = computed(
  () => props.lessonDetailService.webContainersService?.state.isLoading
);
</script>

<template>
  <div
    class="flex flex-col relative duration-300 lg:h-full"
    :class="{
      ' lg:w-1/2 w-full': props.lessonDetailService.state.isContentVisible,
      ' w-full': !props.lessonDetailService.state.isContentVisible,
    }"
    v-if="props.lessonDetailService.state.activeLesson?.task"
  >
    <Codemirror
      :dynamic-class="{
        'border border-b-0 border-border-color lg:h-full':
          !props.lessonDetailService.state.loading.installing &&
          !props.lessonDetailService.state.loading.running,
        ' editor-hidden':
          props.lessonDetailService.state.loading.installing ||
          props.lessonDetailService.state.loading.running
      }"
      :is-detail="true"
    />
    <EditorOutput
      :loading="props.lessonDetailService.state.loading"
      :is-detail="true"
      :output-is-shown="true"
    />

    <div
      v-if="props.lessonDetailService.state.activeLesson?.task"
      class="flex items-center gap-3 py-2 justify-end"
    >
      <button
        class="px-6 py-1 bg-primary text-white rounded-2xl transition duration-300 ease-in-out md:text-[16px] text-[15px] coursor-pointer"
        @click.prevent="props.lessonDetailService.submitTask"
        :disabled="isLoading"
      >
        <span v-if="!isLoading">Submit</span>
        <svg
          v-else
          class="animate-spin h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </button>

      <button
        class="px-6 py-1 bg-extra-light-background text-black rounded-2xl transition duration-300 ease-in-out md:text-[16px] text-[15px] coursor-pointer"
        @click="props.lessonDetailService.showHintDialog"
      >
        Hint
      </button>

      <button
      class="h-12 w-12 cursor-pointer block z-40 lg:block hidden"
      @click="props.lessonDetailService.toggleVisibility"
    >
      <i
        :class="[
          'pi',
          props.lessonDetailService.state.isContentVisible
            ? 'pi-window-maximize'
            : 'pi-window-minimize',
          'text-primary border border-primary text-[20px] duration-300 rounded-xl p-1.5 bg-white',
        ]"
      />
    </button>
    </div>
  </div>
</template>
