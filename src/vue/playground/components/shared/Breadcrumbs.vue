<template>
  <div class="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 whitespace-nowrap max-w-1/2">
    <div v-for="item in props.path.slice(1).split('/')"
      class="flex items-center">
      <p v-if="item != ''"
        class="lg:text-[14px] text-[13px] text-grey">{{ item }}</p>
      <i v-else"
        class="pi pi-angle-right text-grey text-[15px] duration-300"
      />
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { defineProps } from 'vue';

  const props = defineProps<{
    path: string
  }>();

</script>
