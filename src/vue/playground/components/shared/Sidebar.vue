<script setup lang="ts">
import { ref, onMounted } from "vue";
import { sidebarData } from "../../data/sidebar-data.ts";

const activeRoute = ref("");

onMounted(() => {
    activeRoute.value = window.location.pathname;
});
</script>

<template>
    <div class="sidebar h-full w-auto flex flex-col justify-between">
        <nav
            class="flex flex-col justify-between items-end h-full border-r border-border-color px-2"
        >
            <ul class="flex flex-col h-full">
                <li
                    v-for="(item, index) in sidebarData.slice(0, -1)"
                    :key="index"
                    class="py-4"
                >
                    <a
                        :href="item.route"
                        class="flex items-center gap-1 flex-col"
                        target="_self"
                    >
                        <i
                            :class="`pi pi-${item.icon} ${activeRoute === item.route ? 'text-primary' : 'text-grey'} text-[20px] duration-300`"
                        />
                        <span>{{ item.text }}</span>
                    </a>
                </li>
            </ul>

            <ul class="flex flex-col">
                <li class="py-4">
                    <a
                        :href="sidebarData[sidebarData.length - 1].route"
                        class="flex items-center gap-2 flex-col"
                        target="_self"
                    >
                        <i
                            :class="`pi pi-${sidebarData[sidebarData.length - 1].icon}`"
                        />
                        <span>{{
                            sidebarData[sidebarData.length - 1].text
                        }}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
