<script lang="ts" setup>
  import { defineProps } from 'vue';
  import { ILoading } from '../../types/loading-types'

  const props = defineProps<{
    output: string;
    loading: ILoading
  }>();
</script>

<template>
  <div class="output w-1/2">
    <h2>Výstup:</h2>

    <div v-if="props.loading.installing || props.loading.running" class="loading-container">
      <div class="spinner"></div>
      <p v-if="props.loading.installing">Stahují se závislosti...</p>
      <p v-if="props.loading.running && !props.loading.installing">Spouští se kód...</p>
    </div>

    <iframe
      v-else
      :srcdoc="props.output"
      style="width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 5px;"
    ></iframe>
  </div>
</template>

