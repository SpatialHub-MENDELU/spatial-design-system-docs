<script lang="ts" setup>
  import { defineProps, reactive } from 'vue';
  import { ILoading } from '../../types/loading-types'

  const props = defineProps<{
    output: string;
    loading: ILoading
  }>();

  const outputState = reactive({
    isVisible: true
  });

  const toggleVisibility = () => {
    outputState.isVisible = !outputState.isVisible;
  };
</script>

<template>
  <div class="output duration-300 w-1/2 h-full border-l border-border-color" :class="{'overflow-hidden w-[3rem]': !outputState.isVisible}">
    <div class="w-full px-2 py-1 flex justify-between"
      :class="{'border-b border-border-color': outputState.isVisible}">
      <h2 v-if="outputState.isVisible" class="text-grey md:text-[15px] text-[14px]">Output</h2>
      <div @click="toggleVisibility" class="cursor-pointer">
        <i :class="['pi', outputState.isVisible ? 'pi-angle-down' : 'pi-angle-left', 'text-primary', 'text-[20px]', 'duration-300']"></i>
      </div>
    </div>

    <div v-if="outputState.isVisible"
      class="h-full">
      <div v-if="props.loading.installing || props.loading.running" class="h-full flex flex-col items-center justify-center">
        <div class="spinner" />
        <p v-if="props.loading.installing"
          class="text-grey md:text-[16px] text-[15px] text-center">Installing dependencies...</p>
        <p v-if="props.loading.running && !props.loading.installing"
          class="text-grey md:text-[16px] text-[15px] text-center">Running code...</p>
      </div>

      <iframe
        v-else
        :srcdoc="props.output"
        style="width: 100%; height: 100%;"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.hidden-output {
  width: 2.5rem;
  overflow: hidden;
}
</style>

