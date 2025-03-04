<script lang="ts" setup>
  import { inject, ref, nextTick, computed } from 'vue';
  import { TreeNode } from 'primevue/treenode';
  import Dialog from 'primevue/dialog';
  import Tree from 'primevue/tree';
  import { WebContainerService } from '../../services/webContainersService';
  import { useToast } from 'primevue/usetoast';
  import { IPropsMoveFileDialog } from '../../types/props';

  const toast = useToast()
  const emit = defineEmits()
  const props = defineProps<IPropsMoveFileDialog>();
  const selectedFolder = ref<TreeNode | null>(null);
    const webContainersService = inject<WebContainerService>(
    'webContainersService'
  );

  console.log(props.selectedItem)

  const rootNode = computed<TreeNode>(() => ({
    key: '/',
    label: 'SDS Project',
    data: { name: 'SDS Project' },
    children: props.folders || [],
    type: 'folder'
  }));

  const onFolderClick = (node: TreeNode) => {
    selectedFolder.value = node;
  };

  const moveFile = async () => {
    if (!selectedFolder) return
    props.updateLoading()
    
    try {

      await nextTick()
      await webContainersService?.moveFile(
        props.selectedItem?.key ?? '',
        `${selectedFolder.value?.key}/${props.selectedItem?.label}`
      )
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Item failed to move',
        life: 3000,
      });

    } finally {
      emit('updated-item')
      props.closeDialog()
    }
  }

</script>

<template>
  <Dialog
    :visible="props.showDialog"
    header="Select path"
    modal
    maximizable
    :closable="false"
    class="moving-file-dialog"
  >

    <div
      v-if="!rootNode.children || rootNode.children.length === 0"
      class="lg:min-w-[8rem] lg:h-auto h-[10rem] flex items-center justify-center relative overflow-visible duration-300 block pb-2"
    >
      <div class="spinner" />
    </div>

    <Tree
      v-else
      :value="[rootNode]"
      class="overflow-y-auto max-h-full duration-300"
    >
  
      <template #default="{ node }">
        <span 
          @click="onFolderClick(node)"
          v-if="node.children && node.children.length"
          :class="{
            'text-highlighted': selectedFolder?.label === node.label,
            'text-dark-text': selectedFolder?.label !== node?.label
          }"
        >
          {{ node.data.name }}
        </span>
        <span 
          class="opacity-50"
          v-else
        >
          {{ node.data.name }}
        </span>
      </template>
    </Tree>

    <template #footer>
      <div class="lg:text-[16px] text-[14px] pt-12 block">
        <span>
         Selected item: <strong>{{ props.selectedItem?.key }}</strong>
        </span>
      </div>

      <div class="lg:text-[16px] text-[14px] block">
        <span v-if="selectedFolder">
          Selected folder: <strong>{{ selectedFolder.data.name }}</strong>
        </span>
        <span v-else>
          No folder selected.
        </span>
      </div>

      
      <div class="flex justify-end mt-4 gap-3">
        <button
        class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
        :disabled="selectedFolder === null"
        :class="{
          'opacity-50': selectedFolder === null
        }"
        @click.prevent="moveFile"
        >Select</button>

        <button
        class="px-6 py-1 bg-red text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
        @click.prevent="closeDialog"
        >Cancel</button>
      </div>
    </template>
  </Dialog>
</template>
