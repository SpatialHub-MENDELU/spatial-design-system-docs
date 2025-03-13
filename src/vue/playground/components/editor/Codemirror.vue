<script lang="ts" setup>
import { Codemirror } from 'vue-codemirror';
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { IPropsCodemirror } from '../../types/props';
import { CodeMirrorService } from '../../services/codemirrorService';

const playgroundStore = useStore();
const openedFilePath = computed(() => playgroundStore.getters.currentFilePath);
const openedFileContent = computed(
  () => playgroundStore.getters.currentFileContent
);

const props = defineProps<IPropsCodemirror>();
const codemirrorService = new CodeMirrorService();
const extensions = computed(() => codemirrorService.extensions(openedFilePath.value).value);
console.log(extensions.value)
onMounted(() => {
  codemirrorService.loadCodemirror(playgroundStore);
});

watch(openedFileContent, (newCode) => {
  updateCode(newCode);
});

const updateCode = (newCode: string) => {
  codemirrorService.updateCode(
    newCode,
    playgroundStore,
    openedFilePath.value,
    openedFileContent.value,
    !props.isDetail
  );
};
</script>

<template>
  <codemirror
    class="editor lg:w-full block overflow-y-auto lg:h-full h-[20rem]"
    :class="props.dynamicClass"
    v-model="openedFileContent"
    :extensions="extensions"
    @update:modelValue="updateCode"
    :is-detail="props.isDetail"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :style="{ fontSize: codemirrorService.state.fontSize + 'px' }"
  />
</template>
