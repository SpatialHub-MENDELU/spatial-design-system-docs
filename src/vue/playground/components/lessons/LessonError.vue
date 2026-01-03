<script lang="ts" setup>
import { COURSE } from '../../constants/routes';
</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div
      class="flex flex-col items-center justify-center border border-border-color rounded-lg lg:p-8 p-6 lg:mt-0 mt-12"
    >
      <div class="flex sm:flex-row flex-col items-center gap-3 mb-4">
        <i class="pi pi-exclamation-circle text-primary text-[36px]"></i>
        <span class="text-primary lg:text-[28px] text-[20px] font-bold text-center"
          >Please complete all previous lessons first</span
        >
      </div>
      <p class="text-center lg:text-[18px] text-[16px]">
        Course data is currently unavailable. Please check your access and try again.        
      </p>
      <a
        class="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-medium text-[16px] hover:bg-primary-dark transition-colors"
        :href="COURSE"
      >
        Go to course list
      </a>
    </div>
  </div>
</template>