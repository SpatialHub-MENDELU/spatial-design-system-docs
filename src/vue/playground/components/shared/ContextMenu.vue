<template>
  <div
    v-if="visible"
    class="absolute bg-white shadow-lg border border-gray-300 z-10"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @click.stop
  >
    <ul class="list-none m-0 p-0">
      <li
        v-for="(option, index) in options"
        :key="index"
        @click="option.action"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ContextMenuOption } from '../../types/contextMenu';

const props = defineProps<{
  visible: boolean;
  position: { x: number; y: number };
  options: ContextMenuOption[];
  closeMenu: () => void;
}>();
</script>
