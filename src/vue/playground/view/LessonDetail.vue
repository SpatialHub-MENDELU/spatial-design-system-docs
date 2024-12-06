<script setup lang="ts">
import Sidebar from '../components/shared/Sidebar.vue';

import { useData } from 'vitepress';
import { lessonsData } from '../data/courses/Lessons';
import { courseDetailData } from '../data/courses/CourseDetail';
import { lessonByCourseVariant } from '../utils/Lessons';
import { ILesson, ILessonVariants } from '../types/courses/Lessons';
import { render, inject, onMounted, reactive, ref, nextTick, h, Fragment } from 'vue';
import { ICourseDetail } from '../types/courses/CourseDetail';
import CoursesOverview from '../components/courses/CoursesOverview.vue';
import { COURSE, LESSON } from '../constants/routes';
import { SessionService } from '../services/sessionService';
import ComponentExample from '../../../vue/ComponentExample.vue';
import "spatial-design-system/primitives/ar-menu.js";

import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; 

import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-javascript.js';

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

const toast = useToast();
const sessionService = inject<SessionService>('sessionService');
const { params } = useData();

const state = reactive<{
  activeCourse: ICourseDetail | null;
  lessonById: ILessonVariants | null;
  activeLesson: ILesson | null;
  nextLessonLink: string | null;
  isOverviewVisible: boolean;
  completedIn: string | null;
  canBeDisplayed: boolean;
  lessonsFromSession: ILessonVariants[];
}>({
  activeCourse: null,
  lessonById: null,
  activeLesson: null,
  nextLessonLink: null,
  isOverviewVisible: false,
  completedIn: null,
  canBeDisplayed: false,
  lessonsFromSession: [],
});

onMounted(async () => {
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
    (sessionService?.getFromSession('completedLessons') as ILessonVariants[]) ||
    [];
  state.lessonsFromSession = completedLessonsFromSession;

  const currentLessonId = Number(lessonId);
  const currentLesson = completedLessonsFromSession.find(
    (l) => l.id === currentLessonId
  ) as ILessonVariants;
  const previousLesson = completedLessonsFromSession.find(
    (l) => l.id === currentLessonId - 1
  ) as ILessonVariants;

  state.canBeDisplayed = Boolean(
    completedLessonsFromSession &&
      (currentLessonId === 1 ||
        lessonByCourseVariant(activeCourse.slug, currentLesson)?.completed ||
        lessonByCourseVariant(activeCourse.slug, previousLesson)?.completed)
  );

  state.completedIn = currentLesson
    ? String(lessonByCourseVariant(activeCourse.slug, currentLesson)?.completed)
    : null;

  if (currentLessonId < lessonsData.length) {
    state.nextLessonLink = `${LESSON}/${activeCourse.slug}-${currentLessonId + 1}`;
  }

  nextTick(() => replacePlaceholder());
});

function replacePlaceholder() {
  const placeholder = document.querySelector('#placeholder');

  if (placeholder) {
    const vnode = h(
      ComponentExample,
      { fixed: true },
      {
        output: () => h('a-entity', { innerHTML: state.activeLesson?.contentOutput }),
        code: () => {
          return h('div', {}, [
            ...(state.activeLesson?.contentCode?.map((code) =>
              h('div', { class: 'code-block' }, [
                h('p', { class: 'language-label' }, code.lang),
                h(
                  'button',
                  {
                    class: 'copy-button p-button p-button-text',
                    onClick: () => copyToClipboard(code.content),
                  },
                  [
                    h('i', { class: 'pi pi-copy' }),
                  ]
                ),
                h('pre', [
                  h('code', { class: `language-${code.lang}` }, code.content),
                ]),
              ])
            ) || []),
          ]);
        },
      }
    );

    render(vnode, placeholder);
    Prism.highlightAll();
  }
}

function copyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  toast.add({ severity: 'info', summary: 'Copied', detail: 'Code copied to clipboard!', life: 3000 });
}

function addCurrentLessonToSession() {
  const completedLessonsFromSession =
    (sessionService?.getFromSession('completedLessons') as ILessonVariants[]) ||
    [];

  const existingLesson = completedLessonsFromSession.find(
    (lesson: ILessonVariants) => lesson.id === state.lessonById?.id
  );

  const currentLessonVariant = lessonByCourseVariant(
    String(state.activeCourse?.slug),
    state.lessonById as ILessonVariants
  );
  (currentLessonVariant as ILesson).completed = new Date().toLocaleString(
    'cs-CS'
  );

  if (state.lessonById && currentLessonVariant) {
    if (!existingLesson) {
      completedLessonsFromSession.push({
        ...state.lessonById,
        ...currentLessonVariant,
      });
    }

    sessionService?.storeInSession(
      'completedLessons',
      completedLessonsFromSession
    );
  }
}
</script>

<template>
  <div class="lesson flex gap-0 mx-auto w-full justify-center lg:max-h-screen">
    <Toast position="bottom-center" />

    <div
      class="main-content courses lg:h-full h-full mx-auto relative flex w-full lg:flex-row flex-col"
    >
      <Sidebar />
      <div
        class="relative w-full xl:p-16 lg:p-12 pt-6 h-auto overflow-y-hidden flex gap-16"
        v-if="state.canBeDisplayed"
      >
        <CoursesOverview
          :is-visible="state.isOverviewVisible"
          :active-course="state.activeCourse as ICourseDetail"
          :lessons-from-session="state.lessonsFromSession"
          v-on:close="state.isOverviewVisible = false"
        />

        <div class="flex flex-col w-full">
          <div
            class="flex items-center gap-2 lg:mb-12 mb-6 cursor-pointer"
            @click="state.isOverviewVisible = true"
          >
            <i
              class="pi pi-th-large text-grey lg:text-[16px] text-[15px] duration-300 cursor-pointer"
            />
            <p class="lg:text-[16px] text-[15px] text-grey">Lesson overview</p>
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
            <p>
              Lesson content could not be loaded. Please check the course and
              lesson parameters.
            </p>
          </div>
          <div class="flex items-end justify-end flex-col gap-3">
            <a
              class="px-6 py-1 bg-primary text-white rounded-2xl font-semibold transition duration-300 ease-in-out mt-4 md:text-[16px] text-[15px] coursor-pointer"
              :href="state.nextLessonLink"
              @click.prevent="addCurrentLessonToSession"
              v-if="state.nextLessonLink && !state.activeLesson?.task"
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
      <div v-else class="flex justify-center items-center w-full h-full">
        <div
          class="flex flex-col items-center justify-center border border-border-color rounded-lg lg:p-8 p-6 lg:mt-0 mt-12"
        >
          <div class="flex items-center gap-3 mb-4">
            <i class="pi pi-exclamation-circle text-primary text-[36px]"></i>
            <span class="text-primary lg:text-[28px] text-[20px] font-bold"
              >Oops...</span
            >
          </div>
          <p class="text-center text-grey lg:text-[18px] text-[16px]">
            Course or lesson data is not available.<br />
            Please check if you have access and try again.
          </p>
          <a
            class="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-medium text-[16px] hover:bg-primary-dark transition-colors"
            :href="COURSE"
          >
            Go to course list
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
