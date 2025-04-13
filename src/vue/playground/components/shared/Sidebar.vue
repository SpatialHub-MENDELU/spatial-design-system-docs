<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { sidebarData } from '../../data/sidebar-data';
import { IPropsSidebar } from '../../types/props';
import * as ROUTES from "../../constants/routes";
import { useStore } from 'vuex';

const activeRoute = ref('');
const props = defineProps<IPropsSidebar>()

const playgroundStore = useStore()
const projectType = computed(() => playgroundStore.getters.projectType)

onMounted(() => {
  activeRoute.value = window.location.pathname;

  if (window.location.pathname.includes('/playground/editor')) {
    sidebarState.isEditor = true;
  } else {
    sidebarState.isEditor = false;
  }
});

const sidebarState = reactive({
  isEditor: true,
});
</script>

<template>
  <div
    class="sidebar flex flex-col lg:justify-between justify-start 2xl:pl-0 lg:pl-[32px] overflow-x-auto"
    :class="{
      ' max-w-full sidebar-grow w-max lg:h-auto lg:max-h-auto h-[3.5rem] h-max':
        sidebarState.isEditor,
      'lg:w-[5rem] lg:h-auto lg:max-h-auto h-[3.5rem] h-max':
        !sidebarState.isEditor,
    }"
  >
    <nav
      class="flex lg:flex-col lg:gap-0 gap-5 lg:justify-between lg:items-end items-center lg:h-full h-[3.5rem] lg:border-r border-border-color lg:px-2 w-full"
    >
      <ul class="flex lg:flex-col lg:h-full lg:gap-0 gap-5">
        <li
          v-for="(item, index) in sidebarData.slice(0, sidebarData.length - 1)"
          :key="index"
          class="lg:py-4 py-3"
        >
          <a
            :href="item.route"
            class="flex items-center lg:gap-1 gap-2 lg:flex-col"
            target="_self"
          >
            <i
              :class="`pi pi-${item.icon} ${activeRoute.includes(item.route.replace('/index.html', '')) ? 'mainColor' : 'text-grey'} lg:text-[20px] text-[15px] duration-300`"
            />
            <span class="2xl:text-[16px] text-[14px]">{{ item.text }}</span>
          </a>
        </li>
      </ul>

      <ul class="lg:flex hidden flex-col new-project-btn"
      v-if="activeRoute.includes(ROUTES.EDITOR) && projectType !== null">
        <li class="lg:py-4 py-3">
          <button
            @click="() => {
              if (props.showDialog) props.showDialog()
            }"
            class="flex items-center lg:gap-1 gap-2 lg:flex-col text-center"
          >
            <i
              :class="`pi pi-${sidebarData[sidebarData.length - 1].icon} ${activeRoute.includes(sidebarData[sidebarData.length - 1].route.replace('/index.html', '')) ? 'text-primary' : 'text-grey'} text-[20px] duration-300`"
            />
            <span class="2xl:text-[16px] text-[14px]">{{
              sidebarData[sidebarData.length - 1].text
            }}</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
