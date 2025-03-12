
<script setup lang="ts">
import { defineProps } from 'vue';
import { getPluralOrSingular } from '../../utils/Plurals';
import { lessonsData } from '../../data/courses/Lessons';
import { IPropsCourseDetailProgress } from '../../types/props';

const props = defineProps<IPropsCourseDetailProgress>();
</script>

<template>
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
          v-if="props.courseDetailService.state.percentage > 0"
          class="text-primary"
          stroke-width="10"
          fill="transparent"
          r="38"
          cx="50"
          cy="50"
          stroke="currentColor"
          stroke-dasharray="238"
          :stroke-dashoffset="props.courseDetailService.state.percentage === 0 ? 238 : 238 - (238 * props.courseDetailService.state.percentage / 100)"
        />
      </svg>              
      <div class="absolute text-sm font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ml-1">{{ props.courseDetailService.state.percentage }}%</div>
    </div>

    <div class="space-y-0">
      <p class="text-primary font-semibold md:text-[18px] text-[16px] whitespace-nowrap">{{ `${props.courseDetailService.state.completedLessons} lesson${getPluralOrSingular(props.courseDetailService.state.completedLessons)}` }}
      </p>
      <p class="text-grey md:text-[16px] text-[15px]  whitespace-nowrap">Out of {{ `${lessonsData.length} lesson${getPluralOrSingular(lessonsData.length)}` }}</p>
    </div>
  </div>
</template>
