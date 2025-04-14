<script setup lang="ts">
import { onMounted, watch, computed, inject } from 'vue';
import Codemirror from './Codemirror.vue';
import EditorOutput from './EditorOutput.vue';
import { ILoading } from '../../types/loading';
import OpenedFiles from './files/OpenedFiles.vue';
import { useStore } from 'vuex';
import EmptyState from './EmptyState.vue';
import { Layout } from '../../types/layout';
import Breadcrumbs from '../shared/Breadcrumbs.vue';
import { EditorService } from '../../services/editorService';
import { SessionService } from '../../services/sessionService';

const sessionService = inject<SessionService>('sessionService');
const playgroundStore = useStore()
const openedFilePath = computed(() => playgroundStore.getters.currentFilePath);
const projectType = computed(() => playgroundStore.getters.projectType)
const layout = computed(() => playgroundStore.getters.layout)
const editorService = new EditorService()

const props = defineProps<{
  loading: ILoading
  updateShowError: () => void
}>();

onMounted(async () => {
  try {
    await editorService.loadEditor(projectType.value, props.loading)
  } catch (e) {
    props.updateShowError()
  }

  const editorSettings = sessionService?.getFromSession('editorSettings');
  if (editorSettings) {
    playgroundStore.commit('updateLayout', editorSettings['selectedLayout'] )
  }
});

watch(props.loading, () => {
  editorService.state.editorIsShown = !props.loading.installing && !props.loading.running
});

watch(projectType, async () => {
  try {
    await editorService.loadEditor(projectType.value, props.loading)
  } catch(e) {
    props.updateShowError()
  }
})

</script>

<template>
  <div class="flex gap-0 h-full flex-1" :class="layout === Layout.HORIZONTAL ? 'lg:flex-row flex-col lg:w-[10px]' : 'flex-col'">
    <div :class="{
      'editor-hidden': !editorService.state.editorIsShown || props.loading.installing,
      [layout === Layout.HORIZONTAL ? 'lg:w-full lg:h-full' : ' w-full']: true,
      [layout === Layout.HORIZONTAL && editorService.state.outputIsShown ? 'lg:max-w-[50%]': '']: true,
      [layout === Layout.VERTICAL ? 'lg:h-full h-[20rem] overflow-hidden': '']: true
    }" class="lg:border-0 border border-border-color">
      <EmptyState v-if="!openedFilePath" />

      <div v-if="openedFilePath" class="w-full h-full flex flex-col items-stretch"
      :class="{
        [layout === Layout.HORIZONTAL ? '' : '']: true
      }">
        <div
          class="px-2 py-1 border-b border-border-color overflow-x-auto whitespace-nowrap w-full h-8 flex items-center">
          <OpenedFiles />
        </div>
        <div class="px-2 overflow-x-auto whitespace-nowrap w-full h-8 flex items-center">
          <Breadcrumbs :path="openedFilePath" />
        </div>
        <Codemirror
        :is-detail="false"
          :dynamic-class="{
          'editor-hidden': !editorService.state.editorIsShown,
          [layout === Layout.HORIZONTAL ? 'lg:h-full' : 'w-full editor--vertical']: true
        }" />
      </div>
    </div>

    <EditorOutput :loading="loading"
      :is-detail="false"
      v-model:outputIsShown="editorService.state.outputIsShown"  />

  </div>
</template>
