<script setup lang="ts">
import { sidebarData } from "../../data/sidebar-data.ts";
</script>

<template>
    <div class="sidebar h-full w-auto flex flex-col justify-between">
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
                        <span>Github</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>
