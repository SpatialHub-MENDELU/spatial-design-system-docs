<script lang="ts" setup>
import { defineProps, computed, watch, defineEmits, ref, onMounted, nextTick } from 'vue';
import { Layout } from '../../types/layout';
import { useStore } from 'vuex';
import { IPropsEditorOutput } from '../../types/props';
// import { initEditorOutputState } from '../../states/EditorOutputState';

const playgroundStore = useStore();
const layout = computed(() => playgroundStore.getters.layout);
const props = defineProps<IPropsEditorOutput>();
// const outputState = initEditorOutputState;
const iframeRef = ref<HTMLIFrameElement | null>(null);
const loadCounter = ref<number>(0);
const iframeLoading = ref<boolean>(true);

const emit = defineEmits(['update:outputIsShown']);

// watch(
//   () => props.outputIsShown,
//   (isShown: boolean) => {
//     outputState.isVisible = isShown;
//   },
//   { immediate: true }
// );

const onIframeLoad = async () => {
  loadCounter.value++;

  if (loadCounter.value === 3) {
    loadCounter.value = 0;
    iframeLoading.value = false;
  }
};

</script>

<template>
  <div
    class="output duration-300 block border-border-color lg:pb-6"
    :class="{
      'lg:border-0 lg:border-l border border-t-0': layout === Layout.HORIZONTAL && !props.isDetail &&
        !props.loading.installing && !props.loading.running,
      'border-b border-x border-t-0': props.isDetail && !props.loading.installing && !props.loading.running,
      'lg:border-x-0 lg:border-b-0 border border-t-0': layout === Layout.VERTICAL && !props.isDetail &&
        !props.loading.installing && !props.loading.running,
      'border': props.isDetail && (props.loading.installing || props.loading.running),
      'output--full-height': props.loading.installing || props.loading.running
    }"
  >
    <div
      class="w-full px-2 py-1 justify-between flex items-center h-8 duration-300 border-b border-border-color"
      v-if="!props.loading.installing && !props.loading.running"
    >
      <h2
        class="text-grey md:text-[15px] text-[14px]"
       
      >
        Output
      </h2>
    </div>

    <div
      class="h-full lg:px-0 px-8 flex items-center justify-center output-container"
      :class="{
        'lg:border-t-0 lg:border-b-0 lg:border-x-0 border border-border-color': loading,
        'border-x-0': props.isDetail
      }"
    >
      <div v-if="props.loading.installing || props.loading.running" class="lg:h-full flex flex-col items-center justify-center">
        <div class="spinner" />
        <p v-if="props.loading.installing" class="text-grey md:text-[16px] text-[15px] text-center">
          Installing dependencies...
        </p>
        <p v-if="props.loading.running && !props.loading.installing" class="text-grey md:text-[16px] text-[15px] text-center">
          Running code...
        </p>
      </div>

      <iframe
        v-else
        v-show="!props.isResizing"
        ref="iframeRef"
        id="webContainerIframe"
        name="webContainerIframe"
        @load="onIframeLoad"
        :class="{
          'w-full h-full': !iframeLoading,
          'w-0 h-0': iframeLoading
        }"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms"
      ></iframe>

      <div v-if="iframeLoading && !props.loading.installing" class="loading-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
</template>
