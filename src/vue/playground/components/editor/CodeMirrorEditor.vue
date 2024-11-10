<template>
    <div class="flex gap-0">
        <codemirror
            class="editor w-1/2 block overflow-y-auto"
            v-model="code"
            :extensions="extensions"
            @update:modelValue="updateCode"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
        />

        <EditorOutput :output="output" :loading="loading" />
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, inject } from "vue";
    import { Codemirror } from "vue-codemirror";
    import { basicSetup } from "codemirror";
    import { javascript } from "@codemirror/lang-javascript";
    import { EditorView } from "@codemirror/view";
    import EditorOutput from "./EditorOutput.vue";
    import { ILoading } from "../../types/loading";
    import { autocompletion } from "@codemirror/autocomplete";
    import { WebContainerService } from "../../services/webContainersService";
    import { files } from "./files";

    const code = ref("");
    const output = ref("");

    const props = defineProps<{
        loading: ILoading;
    }>();

    const webContainersService = inject<WebContainerService>(
        "webContainersService",
    );

    const extensions = [
        basicSetup,
        javascript(),
        EditorView.lineWrapping,
        autocompletion(),
    ];

    let debounceTimer: any = null;

    const updateCode = (newCode) => {
        code.value = newCode;

        if (debounceTimer) clearTimeout(debounceTimer);

        debounceTimer = setTimeout(() => {
            runCode();
        }, 1000);
    };

    onMounted(async () => {
        try {
            await webContainersService?.ensureInitialized();
            await webContainersService?.mountFiles(files);
            const indexHtmlContent =
                await webContainersService?.readFile("index.html");
            code.value = indexHtmlContent as string;
            await webContainersService?.installDependencies();
            props.loading.installing = false;
            runCode();
        } catch (error) {
            console.error("Error during onMounted:", error);
            output.value = `Error: ${error.message}`;
        }
    });

    const runCode = async () => {
        if (!webContainersService) return;

        props.loading.running = true;
        try {
            await webContainersService.writeFile("index.html", code.value);
            const htmlContent = await webContainersService.readFile("index.html");
            output.value = htmlContent as string;
        } catch (error) {
            output.value = `Failed to read this file: ${error.message}`;
        } finally {
            props.loading.running = false;
        }
    };
</script>
