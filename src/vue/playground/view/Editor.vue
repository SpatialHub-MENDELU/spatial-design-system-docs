<script setup lang="ts">
  import CodeMirrorEditor from '../components/editor/CodeMirrorEditor.vue';
  import FileTree from '../components/editor/files/FileTree.vue';
</script>

<template>
  <div class="flex h-full">
    <FileTree/>
    <CodeMirrorEditor />
  </div>
</template>
