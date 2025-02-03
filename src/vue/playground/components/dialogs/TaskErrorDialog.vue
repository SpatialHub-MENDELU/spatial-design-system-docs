<script setup lang="ts">
import { defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Image from 'primevue/image';

const props = defineProps<{
  errors: string[];
  showDialog: boolean;
  closeDialog: () => void;
}>();
</script>

<template>
  <Dialog
    :visible="showDialog"
    header="Error"
    modal
    maximizable
    :closable="false"
    class="error-dialog"
  >
    <div class="error-content">
      <Image src="/task-error.svg" alt="Spatial Design System - empty editor" />

      <span class="title">
        {{ errors[0] ?? "Something is not correct" }}
      </span>

      <p>
        You can check the hint for additional guidance.
      </p>
    </div>

    <div class="flex justify-end mt-4">
      <Button label="Close" @click="closeDialog" class="bg-primary" />
    </div>
  </Dialog>
</template>
