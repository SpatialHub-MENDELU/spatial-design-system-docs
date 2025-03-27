<script setup lang="ts">
import { defineProps, nextTick } from 'vue';
import HintDialog from '../dialogs/HintDialog.vue';
import TaskErrorDialog from '../dialogs/TaskErrorDialog.vue';
import TaskSuccessDialog from '../dialogs/TaskSuccessDialog.vue';
import { addCurrentLessonToSession } from '../../utils/Lessons';
import { IPropsLessonDetailDialogs } from '../../types/props';

const props = defineProps<IPropsLessonDetailDialogs>();

const closeHintDialog = () => {
  props.lessonDetailService.state.isHintVisible = false;
};

const closeErrorDialog = () => {
  props.lessonDetailService.state.isErrorDialogVisible = false;
};

const continueToNextLesson = async () => {
  if (props.lessonDetailService.sessionService) {
    addCurrentLessonToSession(
      props.lessonDetailService.sessionService,
      props.lessonDetailService.state.lessonById!,
      props.lessonDetailService.state.activeCourse!
    );
  }

  await nextTick();

  if (props.lessonDetailService.state) {
    props.lessonDetailService.state.isSuccessDialogVisible = false;
    window.location.href = props.lessonDetailService.state.nextLessonLink ?? '';
  } else {
    console.error('State is undefined in continueToNextLesson.');
  }
};
</script>
<template>
  <HintDialog
    :showDialog="props.lessonDetailService.state.isHintVisible"
    :closeDialog="closeHintDialog"
    :hint="props.lessonDetailService.state.activeLesson?.task?.hint"
  />

  <TaskErrorDialog
    :show-dialog="lessonDetailService.state.isErrorDialogVisible"
    :close-dialog="closeErrorDialog"
    :errors="lessonDetailService.state.testErrors"
  />

  <TaskSuccessDialog
    :show-dialog="lessonDetailService.state.isSuccessDialogVisible"
    :continue="continueToNextLesson"
    :link="lessonDetailService.state.nextLessonLink"
    :text="lessonDetailService.state.successDialogText"
    :success-message="lessonDetailService.state.successDialogTitle"
  />
</template>
