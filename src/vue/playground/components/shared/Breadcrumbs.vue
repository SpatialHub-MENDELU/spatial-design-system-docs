<script lang="ts" setup>
  import { defineProps } from 'vue';
  import { IPropsBreadcrumbs } from '../../types/props';

  const props = defineProps<IPropsBreadcrumbs>();
</script>

<template>
  <div class="breadcrumbs flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 whitespace-nowrap max-w-1/2">
    <div v-for="item in props.path.slice(1).split('/')"
      class="flex items-center">
      <p v-if="item != ''"
        class="lg:text-[14px] text-[13px]">{{ item }}</p>
      <i v-else"
        class="pi pi-angle-right text-[15px] duration-300"
      />
    </div>
  </div>
</template>
