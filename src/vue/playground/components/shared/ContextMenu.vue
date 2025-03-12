<script setup lang="ts">
import { defineProps } from 'vue';
import { IPropsContextMenu } from '../../types/props';

const props = defineProps<IPropsContextMenu>();
</script>

<template>
  <div
    v-if="props.visible"
    class="absolute bg-white shadow-lg border border-gray-300 z-10"
    :style="{ top: props.position.y + 'px', left: props.position.x + 'px' }"
    @click.stop
  >
    <ul class="list-none m-0 p-0">
      <li
        v-for="(option, index) in props.options"
        :key="index"
        @click="option.action"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>
