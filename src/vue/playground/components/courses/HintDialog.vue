<template>
  <Dialog
    :visible="showDialog"
    header="Hint"
    modal
    maximizable
    :closable="false"
  >
    <div id="hint" />

    <div class="flex justify-end mt-2">
      <Button label="Close" @click="closeDialog" class="bg-primary" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { defineProps, onMounted, nextTick, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { IContentCode } from '../../types/courses/Lessons';
import { replacePlaceholder } from '../../utils/Lessons';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps<{
  hint?: IContentCode | undefined;
  showDialog: boolean;
  closeDialog: () => void;
}>();

const updateHint = () => {
  nextTick(() => {
    const hintElement = document.querySelector('#hint');
    if (hintElement && props.hint) {
      replacePlaceholder(hintElement as HTMLElement, '', [props.hint], toast);
    }
  });
};

watch(() => props.showDialog, (show) => {
  if (show) {
    updateHint();
  }
}, { immediate: true });

onMounted(() => {
  updateHint();
});
</script>
