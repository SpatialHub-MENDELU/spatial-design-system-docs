<script setup lang="ts">
import { defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { IPropsTaskErrorDialog } from '../../types/props';

const props = defineProps<IPropsTaskErrorDialog>();
</script>

<template>
  <Dialog
    :visible="props.showDialog"
    header="Error"
    modal
    dismissableMask
    @update:visible="() => closeDialog()" 
    maximizable
    class="error-dialog"
  >
    <div class="error-content">
      <Image src="/task-error.svg" alt="Spatial Design System - empty editor" />

      <span class="title">
        {{ props.errors[0] ?? "Something is not correct" }}
      </span>

      <p>
        You can check the hint for additional guidance.
      </p>
    </div>

    <div class="flex justify-end mt-4">
      <Button label="Close" @click="props.closeDialog" class="bg-primary" />
    </div>
  </Dialog>
</template>
