<script setup lang="ts">
    import { ref, onMounted, reactive } from "vue";
    import { sidebarData } from "../../data/sidebar-data.ts";

    const activeRoute = ref("");

    onMounted(() => {
        activeRoute.value = window.location.pathname;

        if (window.location.pathname === '/playground/') {
            sidebarState.isEditor = true
        } else {
            sidebarState.isEditor = false
        }
    });

    const sidebarState = reactive({
        isEditor: true,
    });
</script>

<template>
    <div class="sidebar flex flex-col lg:justify-between justify-start 2xl:pl-0 lg:pl-[32px] overflow-x-auto"
        :class="{' max-w-full sidebar-grow w-max lg:h-full h-[3.5rem]': sidebarState.isEditor, 'lg:w-[5rem] lg:h-auto h-[3.5rem]' : !sidebarState.isEditor}"
    >
        <nav
            class="flex lg:flex-col lg:gap-0 gap-5 lg:justify-between lg:items-end items-center lg:h-full h-[3.5rem] lg:border-r border-border-color lg:px-2 w-full "
        >
            <ul class="flex lg:flex-col lg:h-full lg:gap-0 gap-5">
                <li
                    v-for="(item, index) in sidebarData.slice(0, -1)"
                    :key="index"
                    class="lg:py-4 py-3"
                >
                    <a
                        :href="item.route"
                        class="flex items-center lg:gap-1 gap-2 lg:flex-col"
                        target="_self"
                    >
                        <i
                            :class="`pi pi-${item.icon} ${activeRoute === item.route ? 'text-primary' : 'text-grey'} text-[20px] duration-300`"
                        />
                        <span class="2xl:text-[16px] text-[14px]">{{ item.text }}</span>
                    </a>
                </li>
            </ul>

            <ul class="flex flex-col">
                <li class="lg:py-4 py-3">
                    <a
                        :href="sidebarData[sidebarData.length - 1].route"
                        class="flex items-center lg:gap-1 gap-2 lg:flex-col"
                        target="_self"
                    >
                        <i
                            :class="`pi pi-${sidebarData[sidebarData.length - 1].icon} ${activeRoute === sidebarData[sidebarData.length - 1].route ? 'text-primary' : 'text-grey'} text-[20px] duration-300`"
                        />
                        <span class="2xl:text-[16px] text-[14px]">{{
                            sidebarData[sidebarData.length - 1].text
                        }}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
