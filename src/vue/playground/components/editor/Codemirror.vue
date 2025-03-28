<script lang="ts" type="module" setup>
import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { IPropsCodemirror } from '../../types/props';
import { CodeMirrorService } from '../../services/codemirrorService';
import Codemirror from 'vue-codemirror6';

const playgroundStore = useStore();
const openedFilePath = computed(() => playgroundStore.getters.currentFilePath);
const openedFileContent = computed(
  () => playgroundStore.getters.currentFileContent
);

const props = defineProps<IPropsCodemirror>();
const codemirrorService = new CodeMirrorService();
const extensions = computed(() => codemirrorService.extensions(openedFilePath.value).value);
onMounted(() => {
  codemirrorService.loadCodemirror(playgroundStore);
});

watch(openedFileContent, (newCode) => {
  updateCode(newCode);
});

const updateCode = (newCode?: any) => {
  codemirrorService.updateCode(
    String(newCode),
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
    @update:modelValue="updateCode"
    :is-detail="props.isDetail"
    :autofocus="true"
    :extensions="extensions"
    :indent-with-tab="true"
    :tab-size="2"
    :style="{ fontSize: codemirrorService.state.fontSize + 'px' }"
  />
</template>
