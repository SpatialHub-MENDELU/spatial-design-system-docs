<script lang="ts" setup>
import { defineProps, computed, watch, defineEmits, ref, onMounted, nextTick } from 'vue';
import { Layout } from '../../types/layout';
import { useStore } from 'vuex';
import { IPropsEditorOutput } from '../../types/props';
import { initEditorOutputState } from '../../states/EditorOutputState';

const playgroundStore = useStore();
const layout = computed(() => playgroundStore.getters.layout);
const props = defineProps<IPropsEditorOutput>();
const outputState = initEditorOutputState
const iframeRef = ref<HTMLIFrameElement | null>(null)
const loadCounter = ref<number>(0)
const iframeLoading = ref<boolean>(true)

const emit = defineEmits(['update:outputIsShown']);

const toggleVisibility = () => {
  outputState.isVisible = !outputState.isVisible;
  emit('update:outputIsShown', outputState.isVisible);
};

const outputIcon = () => {
  if (layout.value === Layout.HORIZONTAL && !props.isDetail) {
    return outputState.isVisible ? 'pi-angle-right' : 'pi-angle-left';
  }

  return outputState.isVisible ? 'pi-angle-down' : 'pi-angle-up';
};

const outputMobileIcon = () => {
  return outputState.isVisible ? 'pi-angle-down' : 'pi-angle-up';
}

watch(
  () => props.outputIsShown,
  (isShown: boolean) => {
    outputState.isVisible = isShown
  },
  { immediate: true }
);

const onIframeLoad = async () => {
  loadCounter.value++;

  /*
    1 = Init load (iframe created, no src yet)
    2 = Setting source (iframe src assigned, triggers onload)
    3 = Redirecting (internal navigation, triggers another onload and UI is loaded)
  */

  if (loadCounter.value === 3) {
    loadCounter.value = 0;
    iframeLoading.value = false;
  } 
}

</script>

<template>
  <div
    class="output duration-300 lg:w-full block border-border-color lg:h-full h-[30rem] lg:pb-6"
    :class="{
      'hidden-output--vertical':
        !outputState.isVisible && !props.loading.installing && !props.loading.running &&
        (layout === Layout.VERTICAL || props.isDetail),
      'hidden-output--horizontal':
        !outputState.isVisible &&
        layout === Layout.HORIZONTAL &&
        !props.isDetail,
      ' lg:border-0 lg:border-l border border-t-0':
        layout === Layout.HORIZONTAL &&
        !props.isDetail &&
        !props.loading.installing &&
        !props.loading.running,
      ' border-b border-x border-t-0':
        props.isDetail && !props.loading.installing && !props.loading.running,
      ' lg:border-0 border border-t-0':
        layout === Layout.VERTICAL &&
        !props.isDetail &&
        !props.loading.installing &&
        !props.loading.running,
      ' border-x-0':
        !props.isDetail &&
        !props.loading.installing &&
        !props.loading.running && outputState.isVisible,
      ' border':
        props.isDetail && (props.loading.installing || props.loading.running)
    }"
  >
    <div
      class="w-full px-2 py-1 justify-between flex items-center h-8 duration-300"
      :class="{
        'lg:border-b lg:border-t border-border-color ': outputState.isVisible,
        hidden: props.loading.installing || props.loading.running,
        'border-t ': props.isDetail && outputState.isVisible,
        'lg:border-t-0 border-t': props.isDetail && !outputState.isVisible,
        'lg:border-x-0 border-x': !props.isDetail && outputState.isVisible
      }"
    >
      <h2
        class="text-grey md:text-[15px] text-[14px]"
        :class="{
          'lg:hidden': !outputState.isVisible && layout !== Layout.VERTICAL && !props.isDetail
        }"
      >
        Output
      </h2>
      <div @click="toggleVisibility" class="cursor-pointer flex items-center duration-300">
        <i
          :class="[
            'pi',
            outputIcon(),
            'text-primary',
            'text-[20px]',
            'lg:block',
            'hidden',
            'duration-300',
          ]"
        ></i>

        <i
        :class="[
          'pi',
          outputMobileIcon(),
          'text-primary',
          'text-[20px]',
          'lg:hidden',
          'block',
          'duration-300',
        ]"
      ></i>
      </div>
    </div>

    <div
      v-show="outputState.isVisible"
      class="h-full lg:px-0 px-8 flex items-center justify-center"
      :class="{
        'lg:border-t-0 lg:border-b-0 lg:border-x-0 border border-border-color': loading,
        'border-x-0': props.isDetail
      }"
    >
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
        ref="iframeRef"
        id="webContainerIframe"
        name="webContainerIframe"
        @load="onIframeLoad"
        :class="{
          'w-full h-full': !iframeLoading,
          'w-0 h-0': iframeLoading
        }"
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
