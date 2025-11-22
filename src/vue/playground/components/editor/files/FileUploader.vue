<script lang="ts" setup>
import FileUpload from 'primevue/fileupload';
import { nextTick, ref } from 'vue';
import Button from 'primevue/button';
import { FolderItem } from '../../../types/fileItem';
import { formatSize } from '../../../utils/SizeFormatter';
import { getFileIcon } from '../../../utils/FileExtensionsAndIcons';
import { IPropsFileUploader } from '../../../types/props';
import { FileUplaoderService } from '../../../services/fileUploaderService';
import { usePrimeVue } from 'primevue/config';
import { useToast } from 'primevue';

const emit = defineEmits()
const primevue = usePrimeVue()

const folderInput = ref<HTMLElement | null>(null);
const triggerFolderInput = () => {
  folderInput.value?.click();
};

const fileUploaderService = new FileUplaoderService();
const props = defineProps<IPropsFileUploader>();

const fileUploadRef = ref<FileUpload | null>(null);
const toast = useToast()

const handleClear = () => {
  fileUploaderService.removeFiles();
  nextTick(() => {
    emit('clear');
  });
};

</script>

<template>
  <Toast />

  <input
    type="file"
    ref="folderInput"
    style="display: none"
    webkitdirectory
    @change="fileUploaderService.onFolderSelected"
  />

  <FileUpload
    name="fileUploader[]"
    :multiple="props.multiple"
    :accept="props.accept"
    :maxFileSize="1000000"
    ref="fileUploadRef"
    @select="(event) => fileUploaderService.onSelectedFiles(event, primevue)"
  >
    <template #header="{ chooseCallback, files }">
      <div class="w-full h-full">
        <div
          class="bg-light-primary w-full h-full cursor-pointer flex items-center justify-center px-4 py-8 flex-col"
          @click="
            props.folderUploader ? triggerFolderInput() : chooseCallback()
          "
        >
          <Button
            icon="pi pi-plus"
            class="bg-primary mt-0"
            :label="props.folderUploader ? 'New folder' : 'New file'"
          />
        </div>
      </div>
    </template>

    <template #content="{ files, removeFileCallback }">
      <div
        class="flex flex-col gap-8 pt-4"
        v-if="fileUploaderService.state.files.length > 0"
      >
        <div>
          <div class="flex flex-col gap-4 w-full">
            <div
              v-for="(file, index) of fileUploaderService.state
                .files as FolderItem[]"
              :key="file.name + file.type + file.size"
              class="flex items-center gap-4 justify-between flex-1"
            >
              <div class="flex items-center gap-2 w-full">
                <div
                  class="bg-primary rounded-full p-2 text-white h-8 w-8 flex items-center justify-center"
                >
                  <i :class="getFileIcon(file)" />
                </div>
                <span
                  class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                  >{{ file.name }}</span
                >
              </div>
              <div class="w-max whitespace-nowrap md:text-[15px] text-[14px]">
                {{ formatSize(file.size ?? 0, primevue) }}
              </div>
              <Button
                icon="pi pi-times"
                class="delete-button"
                @click="
                  fileUploaderService.onRemoveTemplatingFile(
                    file,
                    removeFileCallback,
                    index,
                    primevue
                  )
                "
                outlined
                rounded
                severity="danger"
              />
            </div>
          </div>

          <div
            class="mt-4 md:text-[16px] text-[15px] border-t pt-0 flex items-center justify-between"
          >
            <p class="whitespace-nowrap">
              Total size: {{ fileUploaderService.state.totalSize }}B / 1Mb
            </p>
            <div
              v-if="fileUploaderService.state.files.length > 0"
              class="flex items-center py-4 justify-end"
            >
              <Button
                @click="fileUploaderService.handleUpload(() => {
                  emit('new-item')
                  handleClear()
                }, props.parentNode?.parent, toast)"
                class="bg-primary w-max text-white"
                icon="pi pi-check"
                :label="
                  props.folderUploader ? 'Upload folders' : 'Upload files'
                "
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </FileUpload>
</template>
