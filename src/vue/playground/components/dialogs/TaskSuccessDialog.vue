<script setup lang="ts">
import { defineProps } from 'vue';
import Dialog from 'primevue/dialog';
import Image from 'primevue/image';
import { IPropsTaskSuccessDialog } from '../../types/props';

const props = defineProps<IPropsTaskSuccessDialog>();
</script>

<template>
  <Dialog
    :visible="props.showDialog"
    header="Success"
    modal
    maximizable
    :closable="false"
    class="success-dialog"
  >
    <div class="success-content">
      <Image src="/task-success.svg" alt="Task completed successfully" />

      <span class="title">
        {{ props.successMessage }}
      </span>

      <p>
       {{ props.text }}
      </p>
    </div>

    <div class="flex justify-end mt-4">
      <button
      class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
      @click.prevent="props.continue"
      >Continue</button
    >
    </div>
  </Dialog>
</template>
