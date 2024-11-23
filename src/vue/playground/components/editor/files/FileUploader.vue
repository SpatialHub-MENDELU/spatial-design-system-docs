<template>
  <Toast />

  <input
    type="file"
    ref="folderInput"
    style="display: none"
    webkitdirectory
    @change="onFolderSelected"
  />

  <FileUpload
    name="fileUploader[]"
    :multiple="multiple"
    :accept="accept"
    :maxFileSize="1000000"
    @select="onSelectedFiles"
  >
    <template #header="{ chooseCallback, files }">
      <div class="w-full h-full">
        <div
          class="bg-light-primary w-full h-full cursor-pointer flex items-center justify-center px-4 py-8 flex-col"
          @click="folderUploader ? triggerFolderInput() : chooseCallback()"
        >
          <Button
            icon="pi pi-plus"
            class="bg-primary mt-0"
            :label="folderUploader ? 'New folder' : 'New file'"
          />
        </div>
      </div>
    </template>

    <template #content="{ files, removeFileCallback }">
      <div
        class="flex flex-col gap-8 pt-4"
        v-if="fileUploadState.files.length > 0"
      >
        <div>
          <div class="flex flex-col gap-4 w-full">
            <div
              v-for="(file, index) of fileUploadState.files as FolderItem[]"
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
                {{ formatSize(file.size ?? 0) }}
              </div>
              <Button
                icon="pi pi-times"
                class="delete-button"
                @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
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
              Total size: {{ fileUploadState.totalSize }}B / 1Mb
            </p>
            <div
              v-if="fileUploadState.files.length > 0"
              class="flex items-center py-4 justify-end"
            >
              <Button
                @click="handleUpload()"
                class="bg-primary w-max text-white"
                icon="pi pi-check"
                :label="folderUploader ? 'Upload folders' : 'Upload files'"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </FileUpload>
</template>

<script lang="ts" setup>
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';
import { inject, reactive, defineEmits, ref, onMounted } from 'vue';
import Button from 'primevue/button';
import { FolderService } from '../../../services/folderService';
import { FileType } from '../../../types/fileType';
import { WebContainerService } from '../../../services/webContainersService';
import { FolderItem } from '../../../types/fileItem';
import { formatSize } from '../../../utils/SizeFormatter';
import { getFileIcon } from '../../../utils/FileExtensionsAndIcons';
import { TreeNode } from 'primevue/treenode';

const folderInput = ref<HTMLElement | null>(null);
const emit = defineEmits();

const triggerFolderInput = () => {
  folderInput.value?.click();
};

const webContainersService = inject<WebContainerService>(
  'webContainersService'
);
const folderService = new FolderService(
  webContainersService as WebContainerService
);

const fileUploadState = reactive<{
  totalSize: number;
  files: FolderItem[];
}>({
  totalSize: 0,
  files: [],
});

const props = defineProps<{
  accept: string;
  multiple: boolean;
  folderUploader: boolean;
}>();

const onRemoveTemplatingFile = (
  file: FolderItem,
  removeFileCallback: (index: number) => void,
  index: number
) => {
  removeFileCallback(index);
  fileUploadState.totalSize -= parseInt(formatSize(file.size));
};

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  fileUploadState.files = event.files as FolderItem[];
  fileUploadState.files?.forEach((file) => {
    fileUploadState.totalSize += parseInt(formatSize((file as File).size));
  });
};

const handleUpload = async () => {
  for (const f of fileUploadState.files) {
    await folderService?.uploadItem(f);
  }

  await webContainersService?.fetchFolderStructure('/');
  emit('new-item');
};

const onFolderSelected = (event) => {
  const files = Array.from(event.target.files) as File[];

  const folder = files[0]?.webkitRelativePath.split('/')[0] || 'Unknown Folder';
  const totalSize = files.map((f) => f.size).reduce((sum, f) => sum + f, 0);

  fileUploadState.files = [
    ...fileUploadState.files,
    {
      name: folder,
      children: files,
      type: FileType.FOLDER,
      size: totalSize,
      path: folder,
    },
  ] as FolderItem[];

  fileUploadState.totalSize = fileUploadState.totalSize + totalSize;
};
</script>
