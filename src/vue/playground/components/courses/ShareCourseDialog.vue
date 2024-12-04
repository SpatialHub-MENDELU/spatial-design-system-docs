<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { defineProps, reactive } from 'vue';
import InputText from 'primevue/inputtext'
import Button from 'primevue/button';

const props = defineProps<{
  dialogIsVisible: boolean,
  url: string,
  onClose: () => void
}>()

const state = reactive<{ buttonText: string }>({
  buttonText: 'Copy'
})

const copyTextToClipboard = async () => {
  console.log('clicked')
  try {
    await navigator.clipboard.writeText(props.url);
    state.buttonText = 'Copied'
    setTimeout(() => state.buttonText = 'Copy', 2000);
  } catch (error) {
    console.error('Failed to copy text: ', error);
  }
}

</script>
<template>
  <Dialog v-model:visible="props.dialogIsVisible" modal header="Share course" :style="{ width: '25rem' }"
    :closable="false">
    <div class="flex items-end gap-4 mb-4">
      <InputText id="username" class="flex-auto border border-primary" autocomplete="off" readonly="true"
        :value="url" />

        <Button :label="state.buttonText" icon="fas fa-copy" class="bg-primary" @click="copyTextToClipboard()"/>
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="onClose"></Button>
    </div>
  </Dialog>
</template>