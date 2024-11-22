<template>
    <Dialog
        :visible="showDialog"
        :header="state.dialogHeader"
        modal
        maximizable
        :closable="false"
    >
        <div class="flex gap-2 items-center">
            <div class="flex flex-col gap-1 w-full justify-start relative">
                <InputText
                    v-model="newItemName"
                    placeholder="Enter name"
                    :class="{'p-invalid': errorMessage}"
                />
                <span v-if="errorMessage"
                    class="absolute h-4 right-0 bottom-2"
                    v-tooltip.bottom="errorMessage">
                    <i class="pi pi-info-circle" style="color: red;"></i>
                </span>
            </div>

            <template v-if="props.dialogType === FileType.FILE">
                <div class="flex flex-col gap-1 w-max justify-start relative">
                    <Dropdown
                        v-model="newFileExtension"
                        :options="fileNameExtensions"
                        placeholder="Select"
                        optionLabel="label"
                        optionValue="value"
                        :class="{'p-invalid': errorExtensionMessage}"
                    />
                    <span v-if="errorExtensionMessage"
                        class="absolute h-4 right-0 bottom-2"
                        v-tooltip.bottom="errorExtensionMessage">
                        <i class="pi pi-info-circle" style="color: red;"></i>
                    </span>
                </div>
            </template>
        </div>

        <div class="flex justify-end mt-2">
            <Button label="Cancel" icon="pi pi-times" @click="closeDialog" />
            <Button 
                :label="state.buttonLabel" 
                :icon="state.buttonIcon" 
                @click="handleAction" 
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
    import { ref, defineProps, inject, defineEmits, onMounted, watch, reactive } from "vue";
    import Dialog from "primevue/dialog";
    import InputText from "primevue/inputtext";
    import Button from "primevue/button";
    import Dropdown from "primevue/dropdown";
    import { FolderService } from "../../services/folderService";
    import { FileType } from "../../types/fileType";
    import { WebContainerService } from "../../services/webContainersService";
import { FolderItem } from "../../types/fileItem";

    const emit = defineEmits();
    const webContainersService = inject<WebContainerService>("webContainersService");
    const folderService = new FolderService(webContainersService as WebContainerService);

    const props = defineProps<{
        showDialog: boolean;
        dialogType: FileType;
        closeDialog: () => void;
        itemToRename: FolderItem | null;
    }>();

    const newItemName = ref(props.itemToRename?.name || "");
    const newFileExtension = ref("");
    const errorMessage = ref("");
    const errorExtensionMessage = ref("");

    const fileNameExtensions = [
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'JS', value: 'js' }
    ];

    const state = reactive({
        dialogHeader: '',
        buttonLabel: 'Create',
        buttonIcon: 'pi pi-check'
    });

    watch(() => props.itemToRename, (newValue) => {
        if (newValue) {
            newItemName.value = folderService.getFileWithoutExtension(newValue);
            newFileExtension.value = folderService.getFileExtension(newValue);
            state.dialogHeader = `Rename ${props.dialogType}`;
            state.buttonLabel = "Rename";
            state.buttonIcon = "pi pi-pencil";
        }
    }, {immediate: true});

    watch(() => props.dialogType, (newDialogType) => {
        if (newDialogType === FileType.FILE && fileNameExtensions.length > 0) {
            newFileExtension.value = fileNameExtensions[0].value;
        }

        if (newDialogType === FileType.FILE && !props.itemToRename) {
            state.dialogHeader = 'New file';
        } else {
            state.dialogHeader = 'New folder';
        }
    }, {immediate: true});

    const handleAction = async () => {
        errorMessage.value = "";
        errorExtensionMessage.value = "";

        if (newItemName.value.trim() === "") {
            errorMessage.value = "Name cannot be empty.";
            return;
        }

        if (props.dialogType === FileType.FILE && !newFileExtension.value) {
            errorExtensionMessage.value = "Extension is required.";
            return;
        }

        const fullName = props.dialogType === FileType.FILE && newFileExtension.value
            ? `${newItemName.value}.${newFileExtension.value}`
            : newItemName.value;

        const parentFolder = props.dialogType === "file" ? folderService?.getOpenFolder() : undefined;

        if (props.itemToRename) {
            const result = await folderService?.renameItem(props.itemToRename.name, fullName);
            if (result?.error) {
                errorMessage.value = result.error;
            } else {
                newItemName.value = "";
                emit("rename-item");
                props.closeDialog();
            }
        } else {
            const result = await folderService?.createNewItem(fullName, props.dialogType, parentFolder);
            if (result?.error) {
                errorMessage.value = result.error;
            } else {
                newItemName.value = "";
                emit("new-item");
                props.closeDialog();
            }
        }
    };
</script>
