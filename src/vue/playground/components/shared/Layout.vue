<script setup lang="ts">
  import 'primeicons/primeicons.css'
  import 'primevue/resources/primevue.min.css'; 
  import 'primevue/resources/themes/saga-blue/theme.css'; 
 
  import '../../../../styles/app.scss'

  import Sidebar from './Sidebar.vue'
  import RightBar from './RightBar.vue';
</script>

<template>
  <div class="wrapper page md:px-[32px] pr-[8px] pl-[24px] h-full">
    <Sidebar />

    <div class="main-content h-full">
      <slot></slot>
    </div>

    <RightBar />
  </div>
</template>
