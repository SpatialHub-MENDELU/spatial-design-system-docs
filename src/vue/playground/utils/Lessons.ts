import { VANILLA_JS_COURSE, VUE_COURSE } from "../constants/courses";
import { IContentCode, ILesson, ILessonVariants } from "../types/courses/Lessons"
import ComponentExample from "../../ComponentExample.vue";
import { h, render } from 'vue'
import { codeLanguage } from '../data/courses/Lessons'

import * as shiki from 'shiki';

import { ToastServiceMethods } from "primevue/toastservice";
import { SessionService } from "../services/sessionService";
import { ICourseDetail } from "../types/courses/CourseDetail";
import { ProjectType } from "../types/projectType";

export const lessonByCourseVariant = (courseSlug: string, lesson: ILessonVariants) => {
  if (!lesson) return

  switch (courseSlug) {
    case VANILLA_JS_COURSE:
      return lesson.vanillaJSVariant
    case VUE_COURSE:
      return lesson.vueVariant
  }
}

export const replacePlaceholder = async (
  placeholder: HTMLElement,
  output: string,
  codes: IContentCode[],
  toast: ToastServiceMethods
) => {

  if (placeholder) {
    const vnode = h(
      ComponentExample,
      { fixed: true },
      {
        output: () => h('a-entity', { innerHTML: output }),
        code: () => {
          return h('div', {}, [
            ...(codes?.map((code) =>
              h('div', { class: 'code-block' }, [
                h('p', { class: 'language-label' }, codeLanguage[code.lang].label),
                h(
                  'button',
                  {
                    class: 'copy-button p-button p-button-text',
                    onClick: () => copyToClipboard(code.content, toast),
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
    const highlighter = await shiki.createHighlighter({
      themes: ['github-light-default'],
      langs: ['javascript', 'css', 'html', 'vue', 'vue-html', 'typescript'],
    });
    
    codes.forEach(code => {
      const lang = code.lang;
      const highlightedCode = highlighter.codeToHtml(code.content, {
        lang: 'javascript',
        theme: 'github-light-default'
      });
      const codeBlock = placeholder.querySelector(`.language-${lang}`);
      
      if (codeBlock) {
        codeBlock.innerHTML = highlightedCode;
      }
    });
  }
}

export const  copyToClipboard = (text: string, toast: ToastServiceMethods) => {
  const textArea = document.createElement('textarea') as unknown as HTMLTextAreaElement;
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  toast.add({ severity: 'info', summary: 'Copied', detail: 'Code copied to clipboard!', life: 3000 });
}

export const addCurrentLessonToSession = (
  sessionService: SessionService,
  lessonById: ILessonVariants,
  activeCourse: ICourseDetail
) => {
  const completedLessonsFromSession =
    (sessionService?.getFromSession('completedLessons') as ILessonVariants[]) ||
    [];

  const existingLesson = completedLessonsFromSession.find(
    (lesson: ILessonVariants) => lesson.id === lessonById.id
  );

  const currentLessonVariant = lessonByCourseVariant(
    String(activeCourse?.slug),
    lessonById as ILessonVariants
  );
  (currentLessonVariant as ILesson).completed = new Date().toLocaleString(
    'cs-CS'
  );

  if (lessonById && currentLessonVariant) {
    if (!existingLesson) {
      completedLessonsFromSession.push({
        ...lessonById,
        ...currentLessonVariant,
      });
    }

    sessionService?.storeInSession(
      'completedLessons',
      completedLessonsFromSession
    );
  }
}

export const createTaskTemplate = (
  projectType: ProjectType,
  prompt: string,
  code: IContentCode
) => {
  if (projectType === ProjectType.VANILLA) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
    <!-- ${prompt} -->
    <script>
      const app = document.getElementById("app");
      const scene = document.createElement("a-scene");
      ${code.content}
    </script>
    
    <div id="app"></div>
    </body>
    </html>
`
  }
}
