<script lang="ts" setup>
    import { defineProps, reactive } from "vue";
    import { ILoading } from "../../types/loading";

    const props = defineProps<{
        output: string;
        loading: ILoading;
    }>();

    const outputState = reactive({
        isVisible: true,
    });

    const toggleVisibility = () => {
        outputState.isVisible = !outputState.isVisible;
    };
</script>

<template>
    <div
        class="output duration-300 lg:w-full block lg:border-l border-border-color lg:border-0 border border-border-color border-t-0 lg:h-full h-1/2"
        :class="{ 'hidden-output': !outputState.isVisible }"
    >
        <div
            class="w-full px-2 py-1 justify-between flex"
            :class="{ 'border-b border-border-color': outputState.isVisible, 'hidden' : props.loading.installing || props.loading.running }"
        >
            <h2
                v-if="outputState.isVisible"
                class="text-grey md:text-[15px] text-[14px]"
            >
                Output
            </h2>
            <div @click="toggleVisibility" class="cursor-pointer">
                <i
                    :class="[
                        'pi',
                        outputState.isVisible
                            ? 'pi-angle-right'
                            : 'pi-angle-left',
                        'text-primary',
                        'text-[20px]',
                        'duration-300',
                    ]"
                ></i>
            </div>
        </div>

        <div v-if="outputState.isVisible" class="lg:h-full lg:px-0 px-8">
            <div
                v-if="props.loading.installing || props.loading.running"
                class="lg:h-full flex flex-col items-center justify-center"
            >
                <div class="spinner" />
                <p
                    v-if="props.loading.installing"
                    class="text-grey md:text-[16px] text-[15px] text-center"
                >
                    Installing dependencies...
                </p>
                <p
                    v-if="props.loading.running && !props.loading.installing"
                    class="text-grey md:text-[16px] text-[15px] text-center"
                >
                    Running code...
                </p>
            </div>

            <iframe
                v-else
                :srcdoc="props.output"
                style="width: 100%; height: 100%"
            ></iframe>
        </div>
    </div>
</template>
