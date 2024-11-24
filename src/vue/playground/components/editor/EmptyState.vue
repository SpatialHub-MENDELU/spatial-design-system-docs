<template>
  <div class="empty-state flex flex-col items-center justify-center text-center lg:h-full h-[20rem]">
    <Image src="/empty-editor.svg" alt="Spatial Design System - empty editor" width="250" />
    <span class="text-grey mt-8 lg:text-[22px] md:text-[19px] text-[17px] font-medium">No file is opened...</span>
    <p class="text-grey md:text-[14px] text-[13px]">Click on a file in the sidebar to open it!</p>
  </div>
</template>

<script lang="ts" setup>

import Image from 'primevue/image';
</script>