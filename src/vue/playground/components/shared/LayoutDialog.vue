<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { defineProps, onMounted, inject } from 'vue';
import { Layout } from '../../types/layout';
import { SessionService } from '../../services/sessionService';
import { useStore } from 'vuex';
import { IPropsLayoutDialog } from '../../types/props';
import { initLayoutDialogState } from '../../states/LayoutDialogState';

const sessionService = inject<SessionService>('sessionService');
const playgroundStore = useStore()
const props = defineProps<IPropsLayoutDialog>();
const state = initLayoutDialogState

onMounted(() => {
  const editorSettings = sessionService?.getFromSession('editorSettings');
  if (editorSettings) {
    state.layout = editorSettings['selectedLayout'];
  } else {
    state.layout = Layout.HORIZONTAL
  }
});

const updateLayout = (layout: Layout) => {
  state.layout = layout;
};

const submitForm = () => {
  if (state.layout) {
    const editorSettings = sessionService?.getFromSession('editorSettings') || {};
    sessionService?.storeInSession('editorSettings', {
      ...editorSettings,
      selectedLayout: state.layout,
    });
    playgroundStore.commit('updateLayout', state.layout)
    props.closeDialog();
  } else {
    state.error = 'Please select a layout to proceed.';
  }
};
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    header="Change layout"
    :closable="false"
    :style="{ width: '25rem' }"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Choose the layout you prefer.</span
    >

    <div class="flex gap-8">
      <div
        class="flex items-center gap-4 flex-col p-2 rounded-md border-2 cursor-pointer md:w-36 md:h-36 w-28 h-28 justify-center duration-300"
        :class="
          state.layout === Layout.HORIZONTAL
            ? 'border-primary'
            : 'border-border-color'
        "
        @click="updateLayout(Layout.HORIZONTAL)"
      >
        <div class="flex gap-2 w-full h-full">
          <span class="bg-grey w-full h-full block" />
          <span class="bg-grey w-full h-full block" />
        </div>
        <p class="md:text-[16px] text-[15px] duration-300">Horizontal</p>
      </div>

      <div
        class="flex items-center gap-4 flex-col p-2 rounded-md border-2 cursor-pointer md:w-36 md:h-36 w-28 h-28 justify-center duration-300"
        :class="
          state.layout === Layout.VERTICAL
            ? 'border-primary'
            : 'border-border-color'
        "
        @click="updateLayout(Layout.VERTICAL)"
      >
        <div class="flex gap-2 w-full h-full flex-col">
          <span class="bg-grey w-full h-full block" />
          <span class="bg-grey w-full h-full block" />
        </div>
        <p class="md:text-[16px] text-[15px] duration-300">Vertical</p>
      </div>
    </div>

    <p class="text-red lg:text-[15px] text-[14px] mt-8">{{ state.error }}</p>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Close"
        severity="secondary"
        @click="closeDialog"
        class="bg-grey"
      />
      <Button
        type="button"
        label="Choose"
        @click="submitForm"
        class="bg-primary"
      />
    </div>
  </Dialog>
</template>
