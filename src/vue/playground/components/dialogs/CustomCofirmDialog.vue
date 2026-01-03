<template>
  <div>
    <ConfirmDialog v-if="showConfirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { IPropsConfirmDialog } from '../../types/props';

const showConfirmDialog = ref(false);
const confirm = useConfirm();
const props = defineProps<IPropsConfirmDialog>();

watch(() => props.showDialog, (show) => {
  if (show) {
    showConfirmDialog.value = true;
    confirm.require({
      message: props.message,
      header: "Action Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",
      acceptClass: "p-button-danger",
      rejectClass: "p-button-secondary",
      blockScroll: true,
      modal: true,
      accept: () => {
        props.accept();
        confirm.close();
      },
      reject: () => {
        props.reject();
      },
      onHide: () => {
        props.reject();
      }
    });
  } else {
    confirm.close();
    showConfirmDialog.value = false;
  }
});
</script>
