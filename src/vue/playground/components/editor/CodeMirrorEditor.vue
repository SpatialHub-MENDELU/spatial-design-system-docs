<template>
    <div class="flex gap-0 lg:flex-row flex-col h-full w-full">
        <codemirror
            class="editor lg:w-full block overflow-y-auto lg:border-0 border border-border-color lg:h-full h-1/2"
            :class="{ ' editor-hidden' : !state.editorIsShown }"
            v-model="state.code"
            :extensions="extensions"
            @update:modelValue="updateCode"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :style="{ fontSize: state.fontSize + 'px' }"
        />

        <EditorOutput :output="state.output" :loading="loading" />
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted, inject, watch } from "vue";
    import { Codemirror } from "vue-codemirror";
    import { basicSetup } from "codemirror";
    import { javascript } from "@codemirror/lang-javascript";
    import { EditorView } from "@codemirror/view";
    import EditorOutput from "./EditorOutput.vue";
    import { ILoading } from "../../types/loading";
    import { autocompletion } from "@codemirror/autocomplete";
    import { WebContainerService } from "../../services/webContainersService";
    import { SessionService } from "../../services/sessionService";
    import { files } from "./files";

    const state = reactive({
        code: "",
        output: "",
        fontSize: 14,
        editorIsShown: false
    });

    const sessionService = inject<SessionService>("sessionService");

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
        state.code = newCode;

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
            state.code = indexHtmlContent as string;
            await webContainersService?.installDependencies();
            props.loading.installing = false;
            runCode();
        } catch (error) {
            console.error("Error during onMounted:", error);
            state.output = `Error: ${error.message}`;
        }

        const editorSettings = sessionService?.getFromSession('editorSettings')
        if (editorSettings) {
            state.fontSize = editorSettings['selectedFontSize']
        }
    });

    const runCode = async () => {
        if (!webContainersService) return;

        props.loading.running = true;
        try {
            await webContainersService.writeFile("index.html", state.code);
            const htmlContent = await webContainersService.readFile("index.html");
            state.output = htmlContent as string;
        } catch (error) {
            state.output = `Failed to read this file: ${error.message}`;
        } finally {
            props.loading.running = false;
        }
    };

    watch(props.loading, () => {
        if (!props.loading.installing && !props.loading.running) {
            state.editorIsShown = true
        }
    });

</script>
