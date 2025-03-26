import { reactive } from 'vue';
import { IStateLessonDetail } from '../types/States';

export const initLessonDetailState = reactive<IStateLessonDetail>({
  activeCourse: null,
  lessonById: null,
  activeLesson: null,
  nextLessonLink: null,
  successDialogTitle: "Great job! You've completed the task.",
  successDialogText: "You can move on to the next step or revisit the task if you want to review your work.",
  isOverviewVisible: false,
  isContentVisible: true,
  isHintVisible: false,
  isErrorDialogVisible: false,
  isSuccessDialogVisible: false,
  completedIn: null,
  canBeDisplayed: false,
  lessonsFromSession: [],
  testErrors: [],
  loading: {
    installing: true,
    running: false,
  },
});
