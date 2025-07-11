<script setup lang="ts">
import { defineProps, computed } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { IPropsTaskDialog } from '../../types/props';

const props = defineProps<IPropsTaskDialog>();

const stateMap = {
  success: {
    header: 'Success',
    alt: 'Task completed successfully',
    buttonLabel: 'Continue',
    buttonClass: 'bg-primary',
    buttonAction: props.continue,
    closable: true,
    message: computed(() => props.successMessage),
  },
  error: {
    header: 'Error',
    alt: 'Error',
    buttonLabel: 'Close',
    buttonClass: 'bg-red',
    buttonAction: props.closeDialog,
    closable: false,
    message: computed(() => props.errors?.[0] ?? 'Something is not correct'),
  },
} as const;

const state = stateMap[props.type];
</script>

<template>
  <Dialog
    :visible="props.showDialog"
    :header="state.header"
    modal
    dismissableMask
    :closable="state.closable"
    @update:visible="() => props.closeDialog?.()" 
    maximizable
    :class="`${props.type}-dialog`"
  >
    <div :class="`${props.type}-content`">
      <Image :src="`/task-${props.type}.svg`" :alt="state.alt" />
      
      <span class="title">
        {{ state.message }}
      </span>

      <p>
        {{ props.text ?? 'You can check the hint for additional guidance.' }}
      </p>
    </div>

    <div class="flex justify-end mt-4">
      <Button
        :label="state.buttonLabel"
        @click="state.buttonAction"
        :class="state.buttonClass"
      />
    </div>
  </Dialog>
</template>
