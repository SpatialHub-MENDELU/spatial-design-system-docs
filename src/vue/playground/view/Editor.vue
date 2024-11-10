<script setup lang="ts">
import { reactive, watch } from "vue";
import CodeMirrorEditor from "../components/editor/CodeMirrorEditor.vue";
import FileTree from "../components/editor/files/FileTree.vue";
import { ILoading } from "../types/loading";

const loading = reactive<ILoading>({
    installing: true,
    running: false,
});
</script>

<template>
    <div class="flex h-full">
        <FileTree :loading="loading" />
        <CodeMirrorEditor :loading="loading" />
    </div>
</template>
