<script setup lang="ts">
    import { reactive } from "vue";
    import CodeMirrorEditor from "../components/editor/CodeMirrorEditor.vue";
    import FileTree from "../components/editor/files/FileTree.vue";
    import { ILoading } from "../types/loading";
    import Sidebar from "../components/shared/Sidebar.vue";
    import RightBar from "../components/shared/RightBar.vue";

    const loading = reactive<ILoading>({
        installing: true,
        running: false,
    });
</script>

<template>
    <div class="flex gap-0 lg:flex-row flex-col mx-auto w-full">
        <Sidebar />

        <div class="main-content h-full editor-content">
            <div class="flex lg:flex-row flex-col h-full max-w-full">
                <FileTree :loading="loading" />
                <CodeMirrorEditor :loading="loading" />
            </div>
        </div>

        <RightBar />
    </div>

</template>
