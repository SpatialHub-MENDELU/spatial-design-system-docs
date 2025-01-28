<template>
  <Dialog
    :visible="showDialog"
    header="Success"
    modal
    maximizable
    :closable="false"
    class="success-dialog"
  >
    <div class="success-content">
      <Image src="/task-success.svg" alt="Task completed successfully" />

      <span class="title">
        {{ successMessage ?? "Great job! You've completed the task." }}
      </span>

      <p>
        You can move on to the next step or revisit the task if you want to review your work.
      </p>
    </div>

    <div class="flex justify-end mt-4">
      <a
      class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
      :href="props.link ?? ''"
      @click.prevent="props.continue"
      >Next</a
    >
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Image from 'primevue/image';

const props = defineProps<{
  successMessage?: string;
  showDialog: boolean;
  continue: () => void;
  link: string | null;
}>();
</script>
