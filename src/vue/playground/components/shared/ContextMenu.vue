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
import { ref, defineProps } from 'vue';
import { ContextMenuOption } from '../../types/context-menu-types';

const props = defineProps<{
  visible: boolean;
  position: { x: number; y: number };
  options: ContextMenuOption[];
  closeMenu: () => void;
}>();

const onOptionClick = (action: () => void) => {
  action();
  props.closeMenu();
};
</script>

<style scoped>
/* Add styles for your context menu here */
ul {
  list-style-type: none;
  padding: 10px;
}
li {
  padding: 5px 10px;
  cursor: pointer;
}
li:hover {
  background-color: #f0f0f0;
}
</style>
