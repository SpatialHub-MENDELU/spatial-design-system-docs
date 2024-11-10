<script setup lang="ts">
    import { ref, onMounted, reactive } from "vue";

    onMounted(() => {
        if (window.location.pathname === '/playground/') {
            sidebarState.isEditor = true
        }
    });

    const sidebarState = reactive({
        isEditor: true,
    });
</script>

<template>
    <div class="sidebar h-full w-auto flex flex-col justify-between 2xl:pr-0 pr-[32px] lg:block hidden"
        :class="{' max-w-full sidebar-grow ': sidebarState.isEditor}">
        <nav
            class="flex flex-col justify-between items-start h-full border-l border-border-color px-2"
        >
            <ul class="flex flex-col h-full items-center justify-between">
                <li class="py-4">
                    <i
                        class="pi pi-th-large text-dark-text text-[20px] duration-300"
                    />
                </li>

                <li class="py-4">
                    <a
                        href="https://github.com/SpatialHub-MENDELU/spatial-design-system"
                        class="flex items-center gap-1 flex-col"
                        target="_blank"
                        rel="norefferer"
                    >
                        <i
                            class="pi pi-github text-dark-text text-[20px] duration-300"
                        />
                        <span class="2xl:text-[16px] text-[14px]">Github</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
