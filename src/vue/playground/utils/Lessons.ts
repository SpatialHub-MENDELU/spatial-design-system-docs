import { VANILLA_JS_COURSE, VUE_COURSE } from '../constants/courses';
import {
  IContentCode,
  ILesson,
  ILessonVariants,
} from '../types/courses/Lessons';
import ComponentExample from '../../ComponentExample.vue';
import { h, render } from 'vue';
import { codeLanguage } from '../data/courses/Lessons';
import prettier from 'prettier';
import parserHTML from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';
import parserTypescript from 'prettier/parser-typescript';

import * as shiki from 'shiki';

import { ToastServiceMethods } from 'primevue/toastservice';
import { SessionService } from '../services/sessionService';
import { ICourseDetail } from '../types/courses/CourseDetail';
import { ProjectType } from '../types/projectType';
import CodeExample from '../components/shared/CodeExample.vue';

export const lessonByCourseVariant = (
  courseSlug: string,
  lesson: ILessonVariants
) => {
  if (!lesson) return;

  switch (courseSlug) {
    case VANILLA_JS_COURSE:
      return lesson.vanillaJSVariant;
    case VUE_COURSE:
      return lesson.vueVariant;
  }
};

export const replacePlaceholder = async (
  placeholder: HTMLElement,
  output: string | undefined = undefined,
  codes: IContentCode[] | undefined = undefined,
  toast: ToastServiceMethods
) => {
  if (placeholder) {
    const vnode = h(
      output ? ComponentExample : CodeExample,
      { fixed: true },
      {
        output: () =>
          output
            ? h('a-entity', { innerHTML: output })
            : h('div', {}, 'No output available'),
        code: () => {
          if (codes) {
            return h('div', {}, [
              ...(codes.map((code) =>
                h('div', { class: 'code-block' }, [
                  h('p', { class: 'language-label' }, codeLanguage[code.lang]?.label),
                  h('button', {
                    class: 'copy-button p-button p-button-text',
                    onClick: () => copyToClipboard(code.content, toast),
                  }, [h('i', { class: 'pi pi-copy' })]),
                  h('pre', [h('code', { class: `language-${code.lang}` }, code.content)]),
                ])
              ) || []),
            ]);
          }

          return null;
        },
      }
    );

    render(vnode, placeholder);

    const highlighter = await shiki.createHighlighter({
      themes: ['github-light-default'],
      langs: ['javascript', 'css', 'html', 'vue', 'vue-html', 'typescript'],
    });

    const formatAndHighlightCode = async (code: string, lang: string) => {
      let formattedCode: string;

      try {
        if (lang === 'html') {
          formattedCode = await prettier.format(code, {
            parser: 'html',
            plugins: [parserHTML],
          });
        } else if (lang === 'javascript') {
          formattedCode = await prettier.format(code, {
            parser: 'babel',
            plugins: [parserBabel],
          });
        } else if (lang === 'typescript') {
          formattedCode = await prettier.format(code, {
            parser: 'typescript',
            plugins: [parserTypescript],
          });
        } else {
          formattedCode = code;
        }
      } catch (error) {
        console.error('Prettier formatting failed:', error);
        formattedCode = code;
      }

      console.log(formattedCode)

      const highlightedCode = highlighter.codeToHtml(formattedCode, {
        lang,
        theme: 'github-light-default',
      });

      return highlightedCode;
    };

    if (codes) {
      codes.forEach(async (code) => {
        console.log(code)
        const highlightedCode = await formatAndHighlightCode(code.content, code.lang);
        const codeBlock = placeholder.querySelector(`.language-${code.lang}`);
        if (codeBlock) {
          codeBlock.innerHTML = highlightedCode;
        }
      });
    }
  }
};

export const copyToClipboard = (text: string, toast: ToastServiceMethods) => {
  const textArea = document.createElement(
    'textarea'
  ) as unknown as HTMLTextAreaElement;
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);

  toast.add({
    severity: 'info',
    summary: 'Copied',
    detail: 'Code copied to clipboard!',
    life: 3000,
  });
};

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
};

export const createTaskTemplate = (
  projectType: ProjectType,
  prompt: string,
  code: IContentCode
) => {
  if (projectType === ProjectType.VANILLA) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
    <script type="module">

    /*
      ${prompt}
    */

    // add imports

    document.addEventListener('DOMContentLoaded', function() {
        const app = document.getElementById("app");
        const scene = document.createElement("a-scene");

        ${code.content}
      })
    </script>
    
    <div id="app"></div>
    </body>
    </html>
`;
  }
};
