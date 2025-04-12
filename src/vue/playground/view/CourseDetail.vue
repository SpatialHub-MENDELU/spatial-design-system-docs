<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';

import { useData } from 'vitepress';
import { onMounted } from 'vue';
import { CourseDetailService } from '../services/courseDetailService';
import CourseDetailMainInfo from '../components/courses/CourseDetailMainInfo.vue';
import CourseDetailProgress from '../components/courses/CourseDetailProgress.vue';
import CourseDetailAdditionalInfo from '../components/courses/CourseDetailAdditionalInfo.vue';

const { params } = useData();
const courseDetailService = new CourseDetailService();

onMounted(() => {
  courseDetailService.loadDetail(params);
});
</script>

<template>
  <div class="h-full flex gap-0 mx-auto w-full justify-center">
    <div
      class="main-content courses lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col"
    >
      <Sidebar />
      <div class="w-full xl:p-16 lg:p-12 pt-6 lg:h-auto h-full overflow-y-auto">
        <div class="flex border-b border-border-color pb-2">
          <CourseDetailMainInfo :courseDetailService="courseDetailService" />
          <CourseDetailProgress :courseDetailService="courseDetailService" />
        </div>

        <CourseDetailAdditionalInfo
          :courseDetailService="courseDetailService"
        />
      </div>
    </div>
  </div>
</template>
