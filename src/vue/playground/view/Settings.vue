<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';

import { ref, watch, inject, onMounted } from 'vue';
import { SessionService } from '../services/sessionService';
import { Layout } from '../types/layout';
import { useStore } from 'vuex';
import { initViewSettingsState } from '../states/ViewSettingsState';

const playgroundStore = useStore()
const sessionService = inject<SessionService>('sessionService');
const state = initViewSettingsState

const layoutOptions = ref([
  { label: 'Horizontal', value: Layout.HORIZONTAL },
  { label: 'Vertical', value: Layout.VERTICAL },
]);

const fontSizeOptions = ref([
  { label: '12', value: 12 },
  { label: '14', value: 14 },
  { label: '16', value: 16 },
]);

watch(
  () => ({ ...state }),
  (newState, oldState) => {
    sessionService?.storeInSession('editorSettings', newState);
    playgroundStore.commit('updateLayout', newState.selectedLayout)
  },
  { deep: true }
);

onMounted(async () => {
  const editorSettings = sessionService?.getFromSession('editorSettings');
  if (editorSettings) {
    state.selectedFontSize = editorSettings['selectedFontSize'];
    state.selectedLayout = editorSettings['selectedLayout'];
    playgroundStore.commit('updateLayout', editorSettings['selectedLayout'])
  }
});
</script>

<template>
  <div class="h-full flex gap-0 mx-auto w-full justify-center">
    <div
      class="main-content settings lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col"
    >
      <Sidebar />

      <div class="w-full xl:p-16 lg:p-12 pt-6 lg:h-auto h-full">
        <div class="w-full border-b border-border-color pb-2 text-left">
          <h1
            class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3"
          >
            Settings
          </h1>
          <p class="lg:text-[16px] text-[14px]">
            Customize Appearance and Layout
          </p>
        </div>

        <div class="lg:py-16 py-8 space-y-8 text-left">
          <div class="flex items-center justify-between gap-3">
            <div class="w-2/3">
              <p class="font-semibold lg:text-[17px] text-[16px]">Font Size</p>
              <p class="lg:text-[16px] text-[15px]">
                Select the preferred font size in editor for better readability
              </p>
            </div>
            <Dropdown
              v-model="state.selectedFontSize"
              :options="fontSizeOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select font size"
            />
          </div>

          <div class="flex items-center justify-between gap-3">
            <div class="w-2/3">
              <p class="font-semibold lg:text-[17px] text-[16px]">
                Change Layout
              </p>
              <p class="lg:text-[16px] text-[15px]">
                Adjust the interface layout to suit your preferences.
              </p>
            </div>
            <Dropdown
              v-model="state.selectedLayout"
              :options="layoutOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select layout"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
