<script lang="ts" setup>
import { defineProps, reactive, computed } from 'vue';
import { ILoading } from '../../types/loading';
import { Layout } from '../../types/layout';
import { useStore } from 'vuex';

const playgroundStore = useStore()
const layout = computed(() => playgroundStore.getters.layout);

const props = defineProps<{
  loading: ILoading;
  isDetail: boolean
}>();

const outputState = reactive({
  isVisible: true,
});

const toggleVisibility = () => {
  outputState.isVisible = !outputState.isVisible;
};

const outputIcon = () => {
  if (layout.value === Layout.HORIZONTAL) {
    return outputState.isVisible ? 'pi-angle-right' : 'pi-angle-left';
  }

  return outputState.isVisible ? 'pi-angle-down' : 'pi-angle-up';
};
</script>

<template>
  <div
    class="output duration-300 lg:w-full block border-border-color border-border-color lg:h-full h-[30rem] pb-6"
    :class="{
      'hidden-output--vertical':
        !outputState.isVisible && layout === Layout.VERTICAL,
      'hidden-output--horizontal':
        !outputState.isVisible && layout === Layout.HORIZONTAL,
      ' lg:border-0 lg:border-l border border-t-0': layout === Layout.HORIZONTAL && !props.isDetail && !props.loading.installing && !props.loading.running,
      ' border border-t-0': props.isDetail && !props.loading.installing && !props.loading.running,
      ' lg:border-0 border border-t-0': layout === Layout.VERTICAL && !props.isDetail && !props.loading.installing && !props.loading.running,
    }"
  >
    <div
      class="w-full px-2 py-1 justify-between flex items-center h-8"
      :class="{
        'lg:border-b lg:border-t border-border-color': outputState.isVisible,
        hidden: props.loading.installing || props.loading.running,
        'border-t': props.isDetail,
      }"
    >
      <h2
        v-if="outputState.isVisible || layout === Layout.VERTICAL"
        class="text-grey md:text-[15px] text-[14px]"
      >
        Output
      </h2>
      <div @click="toggleVisibility" class="cursor-pointer flex items-center">
        <i
          :class="[
            'pi',
            outputIcon(),
            'text-primary',
            'text-[20px]',
            'duration-300',
          ]"
        ></i>
      </div>
    </div>

    <div
      v-if="outputState.isVisible"
      class="h-full lg:px-0 px-8 flex items-center justify-center"
      :class="{
        'border-t-0 border-border-color': loading
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
        style="width: 100%; height: 100%"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  </div>
</template>
