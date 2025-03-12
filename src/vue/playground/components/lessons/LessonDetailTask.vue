<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { LessonDetailService } from '../../services/lessonDetailService';
import EditorOutput from '../editor/EditorOutput.vue'
import Codemirror from '../editor/Codemirror.vue'

const props = defineProps<{
  lessonDetailService: LessonDetailService;
}>();

const isLoading = computed(
  () => props.lessonDetailService.webContainersService?.state.isLoading
);

</script>

<template>
  <div
    class="flex flex-col relative duration-300"
    :class="{
      ' lg:w-1/2 w-full': lessonDetailService.state.isContentVisible,
      ' w-full': !lessonDetailService.state.isContentVisible,
    }"
    v-if="props.lessonDetailService.state.activeLesson?.task"
  >
    <Codemirror
      :dynamic-class="{
        'border border-b-0 border-border-color lg:h-full':
          !lessonDetailService.state.loading.installing &&
          !lessonDetailService.state.loading.running,
        ' editor-hidden':
          lessonDetailService.state.loading.installing ||
          lessonDetailService.state.loading.running,
      }"
      :is-detail="true"
    />
    <EditorOutput
      :loading="lessonDetailService.state.loading"
      :is-detail="true"
    />

    <button
      class="absolute bottom-16 right-3 h-12 w-12 cursor-pointer block z-40 lg:block hidden"
      @click="lessonDetailService.toggleVisibility"
    >
      <i
        :class="[
          'pi',
          lessonDetailService.state.isContentVisible
            ? 'pi-window-maximize'
            : 'pi-window-minimize',
          'text-primary border border-primary text-[20px] duration-300 rounded-xl p-1.5 bg-white',
        ]"
      />
    </button>

    <div
      v-if="lessonDetailService.state.activeLesson?.task"
      class="flex items-center gap-3 py-2 justify-end"
    >
      <button
        class="px-6 py-1 bg-primary text-white rounded-2xl transition duration-300 ease-in-out md:text-[16px] text-[15px] coursor-pointer"
        @click.prevent="lessonDetailService.submitTask"
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
        @click="lessonDetailService.showHintDialog"
      >
        Hint
      </button>
    </div>
  </div>
</template>
