<script setup lang="ts">
import { defineProps } from 'vue';
import { LESSON } from '../../constants/routes';
import { IPropsCourseDetailMainInfo } from '../../types/props';

const props = defineProps<IPropsCourseDetailMainInfo>();
</script>

<template>
  <div class="w-full xl:w-2/3">
    <h1 class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3">
      {{ props.courseDetailService.state.activeCourse?.title }}
    </h1>
    <p class="lg:text-[16px] text-[15px] font-semibold text-primary lg:hidden block mb-2">
      Course progress: {{ props.courseDetailService.state.percentage }}%
    </p>
    <p class="lg:text-[16px] text-[15px]">
      {{ props.courseDetailService.state.activeCourse?.description }}
    </p>
    <div class="flex items-center gap-2 my-4">
      <a class="bg-primary px-6 py-1 text-white rounded-2xl lg:text-[16px] text-[15px]"
        v-if="props.courseDetailService.state.percentage === 100"
        @click="props.courseDetailService.resetSession()"
        :href="`${LESSON}/${props.courseDetailService.state.activeCourse?.slug}-1`">Start again</a>
      
      <a class="bg-primary px-6 py-1 text-white rounded-2xl lg:text-[16px] text-[15px]"
        v-if="props.courseDetailService.state.percentage !== 100"
        :href="`${LESSON}/${props.courseDetailService.state.activeCourse?.slug}-${props.courseDetailService.state.completedLessons + 1}`">{{ props.courseDetailService.state.percentage > 0 ? 'Continue' : 'Start' }}</a>
      
      <a class="bg-extra-light-background px-6 py-1 text-dark-text rounded-2xl lg:text-[16px] text-[15px]"
        href="/getting-started/introduction">Docs</a>
    </div>
  </div>
</template>
