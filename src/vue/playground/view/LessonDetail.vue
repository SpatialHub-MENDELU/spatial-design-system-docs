<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';
import { useData } from 'vitepress';
import { lessonsData } from '../data/courses/Lessons';
import { courseDetailData } from '../data/courses/CourseDetail';
import {
  addCurrentLessonToSession,
  createTaskTemplate,
  lessonByCourseVariant,
  replacePlaceholder,
} from '../utils/Lessons';
import {
  IContentCode,
  ILesson,
  ILessonVariants,
} from '../types/courses/Lessons';
import { inject, onMounted, reactive, nextTick, computed } from 'vue';
import { ICourseDetail } from '../types/courses/CourseDetail';
import CoursesOverview from '../components/courses/CoursesOverview.vue';
import { LESSON } from '../constants/routes';
import { SessionService } from '../services/sessionService';
import LessonError from '../components/courses/LessonError.vue';
import { IStateLessonDetail } from '../types/States';
import Codemirror from '../components/editor/Codemirror.vue';
import EditorOutput from '../components/editor/EditorOutput.vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import { WebContainerService } from '../services/webContainersService';
import { ProjectType } from '../types/projectType';

import 'spatial-design-system/primitives/ar-menu.js';
import HintDialog from '../components/courses/HintDialog.vue';
import TaskErrorDialog from '../components/dialogs/TaskErrorDialog.vue';
import { useStore } from 'vuex';
import TaskSuccessDialog from '../components/dialogs/TaskSuccessDialog.vue';

const toast = useToast();

const sessionService = inject<SessionService>('sessionService');
const webContainersService = inject<WebContainerService>(
  'webContainersService'
);
const { params } = useData();
const playgroundStore = useStore()

const openedFileContent = computed(() => playgroundStore.getters.currentFileContent);

const state = reactive<IStateLessonDetail>({
  activeCourse: null,
  lessonById: null,
  activeLesson: null,
  nextLessonLink: null,
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

onMounted(async () => {
  try {
    const lessonId = params.value?.lesson;
    const courseSlug = params.value?.course;

    await import('aframe');

    if (!lessonId || !courseSlug) {
      state.canBeDisplayed = false;
      return;
    }

    const lessonById = lessonsData.find(
      (c) => c.id === lessonId
    ) as ILessonVariants;

    const activeCourse = courseDetailData.find(
      (c) => c.slug === courseSlug
    ) as ICourseDetail;

    if (!lessonById || !activeCourse) {
      state.canBeDisplayed = false;
      return;
    }

    state.activeCourse = activeCourse;
    state.lessonById = lessonById;

    state.activeLesson = lessonByCourseVariant(
      activeCourse.slug,
      lessonById
    ) as ILesson;

    const completedLessonsFromSession =
      (sessionService?.getFromSession(
        'completedLessons'
      ) as ILessonVariants[]) || [];
    state.lessonsFromSession = completedLessonsFromSession;

    const currentLessonId = Number(lessonId);
    const currentLesson = completedLessonsFromSession.find(
      (l) => l.id === currentLessonId
    ) as ILessonVariants;
    const previousLesson = completedLessonsFromSession.find(
      (l) => l.id === currentLessonId - 1
    ) as ILessonVariants;

    state.completedIn = currentLesson
      ? String(
          lessonByCourseVariant(activeCourse.slug, currentLesson)?.completed
        )
      : null;

    if (currentLessonId < lessonsData.length) {
      state.nextLessonLink = `${LESSON}/${activeCourse.slug}-${currentLessonId + 1}`;
    }

    state.canBeDisplayed = Boolean(
      currentLessonId === 1 ||
        (completedLessonsFromSession &&
          (lessonByCourseVariant(activeCourse.slug, currentLesson)?.completed ||
            lessonByCourseVariant(activeCourse.slug, previousLesson)
              ?.completed))
    );

    nextTick(() =>
      replacePlaceholder(
        document.querySelector('#placeholder') as HTMLElement,
        String(state.activeLesson?.contentOutput),
        state.activeLesson?.contentCode as IContentCode[],
        toast
      )
    );

    if (state.activeLesson.task) {
      await webContainersService?.ensureInitialized();
      const template = createTaskTemplate(
        state.activeCourse?.type,
        state.activeLesson.task.prompt,
        state.activeLesson.task.code
      );
      await webContainersService?.createProject(
        state.activeCourse?.type ?? ProjectType.VANILLA,
        template
      );

      playgroundStore.commit('readFile', {
        content: template,
        path: '/index.html',
      });
      state.loading.installing = false;
    }
  } catch (error) {
    console.error('Error during project creation:', error);
  }
});

const addLessonToSession = () => {
  if (sessionService) {
    addCurrentLessonToSession(
      sessionService,
      state.lessonById as ILessonVariants,
      state.activeCourse as ICourseDetail
    );
  }
};

const closeHintDialog = () => {
  state.isHintVisible = false;
};

const closeErrorDialog = () => {
  state.isErrorDialogVisible = false;
};

const showHintDialog = () => {
  if (state.activeLesson?.task?.hint) {
    state.isHintVisible = true;
  } else {
    toast.add({ severity: 'info', summary: 'No hint available' });
  }
};

const toggleVisibility = () => {
  state.isContentVisible = !state.isContentVisible;
};

const submitTask = async () => {
  const test = state.activeLesson?.task?.test;

  if (!test) {
    state.testErrors.push('No test found.');
    state.isErrorDialogVisible = true;
    return;
  }

  state.testErrors = [];

  try {
    const data = await webContainersService?.checkTask(state.activeCourse?.type ?? ProjectType.VANILLA, test)
    if (data?.errors) {
      state.testErrors = data?.errors as string[]
    } else {
      state.isSuccessDialogVisible = true
    }
  } catch (error) {
    state.testErrors.push(`Test failed: ${error.message}`);
  }

  if (state.testErrors.length > 0) {
    state.isErrorDialogVisible = true;
  }
};

const continueToNextLesson = () => {
  addLessonToSession()
  state.isSuccessDialogVisible = false
  window.location.href = state.nextLessonLink ?? ''
}

</script>

<template>
  <div class="lesson flex gap-0 mx-auto w-full justify-center lg:max-h-screen">
    <Toast position="bottom-center" />

    <div
      class="main-content courses lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col w-screen"
    >
      <Sidebar />
      <div
        class="relative w-full xl:p-16 lg:p-12 pt-6 h-auto overflow-y-hidden flex lg:flex-row flex-col duration-300"
        v-if="state.canBeDisplayed"
        style="max-width: 100%"
        :class="{
          ' lg:gap-16 gap-8': state.isContentVisible,
        }"
      >
        <CoursesOverview
          :is-visible="state.isOverviewVisible"
          :active-course="state.activeCourse as ICourseDetail"
          :active-lesson="state.lessonById"
          :lessons-from-session="state.lessonsFromSession"
          v-on:close="state.isOverviewVisible = false"
        />
        <div
          class="h-full block overflow-x-auto relative duration-300"
          :class="{
            ' w-0 overflow-hidden': !state.isContentVisible,
            ' lg:w-1/2 w-full':
              state.isContentVisible && state.activeLesson?.task,
            ' w-full': !state.activeLesson?.task,
          }"
        >
          <div class="flex flex-col w-full h-full">
            <div
              class="flex items-center gap-2 lg:mb-6 mb-4 cursor-pointer"
              @click="state.isOverviewVisible = true"
            >
              <i
                class="pi pi-th-large text-grey lg:text-[16px] text-[15px] duration-300 cursor-pointer"
              />
              <p class="lg:text-[16px] text-[15px] text-grey">
                Lesson overview
              </p>
            </div>
            <span class="lg:text-[17px] text-[16px] text-grey"
              >Lesson {{ state.lessonById?.id }}</span
            >
            <h1
              class="lg:text-[32px] md:text-[26px] text-[24px] font-medium mb-3 text-primary md:mt-3 mt-2 md:mb-6 mb-4"
            >
              {{ state.lessonById?.title }}
            </h1>

            <div
              v-if="state.activeLesson && state.activeLesson.content"
              v-html="state.activeLesson.content"
              ref="lessonContent"
              class="lesson__content h-full overflow-y-auto"
            ></div>

            <div v-else>
              <p class="lg:text-[16px] text-[15px]">
                Lesson content could not be loaded. Please check the course and
                lesson parameters.
              </p>
            </div>
            <div
              class="flex items-end justify-end flex-col gap-3"
              v-if="state.nextLessonLink && !state.activeLesson?.task"
            >
              <a
                class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
                :href="state.nextLessonLink"
                @click.prevent="addLessonToSession"
                >Next</a
              >
              <span
                class="text-primary lg:text-[16px] text-[15px]"
                v-if="state.completedIn"
                >Completed: {{ state.completedIn }}</span
              >
            </div>
          </div>
        </div>

        <div
          class="flex flex-col relative duration-300"
          :class="{
            ' lg:w-1/2 w-full': state.isContentVisible,
            ' w-full': !state.isContentVisible,
          }"
          v-if="state.activeLesson?.task"
        >
          <Codemirror
            :dynamic-class="{
              'border border-b-0 border-border-color lg:h-full':
                !state.loading.installing && !state.loading.running,
              ' editor-hidden':
                state.loading.installing || state.loading.running,
            }"
          />
          <EditorOutput :loading="state.loading" :is-detail="true" />

          <button
            class="absolute bottom-16 right-3 h-12 w-12 cursor-pointer block z-40 lg:block hidden"
            @click="toggleVisibility"
          >
            <i
              :class="[
                'pi',
                state.isContentVisible
                  ? 'pi-window-maximize'
                  : 'pi-window-minimize',
                'text-primary border border-primary text-[20px] duration-300 rounded-xl p-1.5 bg-white',
              ]"
            />
          </button>

          <div
            v-if="state.activeLesson?.task"
            class="flex items-center gap-3 py-2 justify-end"
          >
            <button
              class="px-6 py-1 bg-primary text-white rounded-2xl transition duration-300 ease-in-out md:text-[16px] text-[15px] coursor-pointer"
              @click.prevent="submitTask"
            >
              Submit
            </button>

            <button
              class="px-6 py-1 bg-extra-light-background text-black rounded-2xl transition duration-300 ease-in-out md:text-[16px] text-[15px] coursor-pointer"
              @click="showHintDialog"
            >
              Hint
            </button>
          </div>
        </div>
      </div>
      <LessonError v-else />
    </div>
  </div>

  <HintDialog
    :showDialog="state.isHintVisible"
    :closeDialog="closeHintDialog"
    :hint="state.activeLesson?.task?.hint"
  />

  <TaskErrorDialog
    :show-dialog="state.isErrorDialogVisible"
    :close-dialog="closeErrorDialog"
    :errors="state.testErrors"
  />

  <TaskSuccessDialog
    :show-dialog="state.isSuccessDialogVisible"
    :continue="continueToNextLesson"
    :link="state.nextLessonLink"
  />
</template>
