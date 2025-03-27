<script setup lang="ts">
import { defineProps, onMounted, nextTick, watch } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { replacePlaceholder } from '../../utils/Lessons';
import { useToast } from 'primevue/usetoast';
import { IPropsHintDialog } from '../../types/props';

const toast = useToast();
const props = defineProps<IPropsHintDialog>();

const updateHint = () => {
  nextTick(() => {
    const hintElement = document.querySelector('#hint');
    const importsElement = document.querySelector('#imports');

    if (hintElement && props.hint) {
      if (props.hint.imports) {
        replacePlaceholder(
          importsElement as HTMLElement,
          '',
          [
            {
              lang: 'js',
              content: props.hint.imports,
            },
          ],
          toast
        );
      }

      replacePlaceholder(hintElement as HTMLElement, '', [props.hint], toast);
    }
  });
};

watch(
  () => props.showDialog,
  (show) => {
    if (show) {
      updateHint();
    }
  },
  { immediate: true }
);

onMounted(() => {
  updateHint();
});
</script>

<template>
  <Dialog
    :visible="showDialog"
    header="Hint"
    modal
    maximizable
    :closable="false"
  >
    <div id="imports" />
    <div id="hint" />

    <div class="flex justify-end mt-2">
      <Button label="Close" @click="closeDialog" class="bg-primary" />
    </div>
  </Dialog>
</template>
