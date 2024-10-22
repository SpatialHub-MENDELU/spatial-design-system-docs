<script setup lang="ts">

  import { sidebarData } from '../../data/sidebar-data.ts'

</script>

<template>
  <div class="sidebar h-full w-auto flex flex-col justify-between">
    
    <nav class="flex flex-col justify-between items-start h-full border-l border-border-color px-2">
      <ul class="flex flex-col h-full">
        <li v-for="(item, index) in sidebarData.slice(0, -1)" :key="index" class="py-4">
          <a :href="item.route"
             class="flex items-center gap-2 flex-col"
             target="_self">
            <i :class="`pi pi-${item.icon}`" />
            <span>{{ item.text }}</span>
          </a>
        </li>
      </ul>

      
    </nav>

  </div> 
</template>
