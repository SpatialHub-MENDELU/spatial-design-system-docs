import { VANILLA_JS_COURSE, VUE_COURSE } from '../constants/courses';
import {
  IContentCode,
  ILesson,
  ILessonVariants,
} from '../types/courses/Lessons';
import ComponentExample from '../../ComponentExample.vue';
import { h, render } from 'vue';
import { LanguageEnum, codeLanguage } from '../data/courses/Lessons';
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

    const getCurrentTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        return 'github-dark-default';
      } else {
        return 'github-light-default';
      }
    };
    
    const highlighter = await shiki.createHighlighter({
      langs: ['javascript', 'css', 'html', 'vue', 'vue-html', 'typescript'],
      themes: []
    });
    
    const loadThemes = async () => {
      const currentTheme = getCurrentTheme();
      await highlighter.loadTheme(currentTheme); 
    };
    
    const observer = new MutationObserver(async () => {
      await initializeTheme()
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const initializeTheme = async () => {
      const currentTheme = getCurrentTheme();
      await loadThemes();
      
      if (codes) {
        codes.forEach(async (code) => {
          const highlightedCode = await formatAndHighlightCode(code.content, code.lang);
          const codeBlock = placeholder.querySelector(`.language-${code.lang}`);
          if (codeBlock) {
            codeBlock.innerHTML = highlightedCode;
          }
        });
      }
    };
    
    initializeTheme();
    
    const formatAndHighlightCode = async (code: string, lang: string) => {
      let formattedCode: string;

      try {
        if (lang === 'html') {
          formattedCode = await prettier.format(code, {
            parser: 'html',
            plugins: [parserHTML, parserBabel, parserTypescript].filter(Boolean),
          });
        } else if (lang === 'javascript') {
          formattedCode = await prettier.format(code, {
            parser: 'babel',
            plugins: [parserHTML, parserBabel, parserTypescript].filter(Boolean),
          });
        } else if (lang === 'typescript') {
          formattedCode = await prettier.format(code, {
            parser: 'typescript',
            plugins: [parserHTML, parserBabel, parserTypescript].filter(Boolean),
          });
        } else {
          formattedCode = code;
        }
      } catch (error) {
        console.error('Prettier formatting failed:', error);
        formattedCode = code;
      }
      const highlightedCode = highlighter.codeToHtml(formattedCode, {
        lang,
        theme: getCurrentTheme(),
      });

      return highlightedCode;
    };

    if (codes) {
      codes.forEach(async (code) => {
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
  activeCourse: ICourseDetail,
) => {
  let completedLessonsFromSession =
    (sessionService?.getFromSession('completedLessons') as ILessonVariants[]) ||
    [];

  const currentLessonVariant = lessonByCourseVariant(
    String(activeCourse?.slug),
    lessonById as ILessonVariants
  );
  (currentLessonVariant as ILesson).completed = new Date().toLocaleString(
    'cs-CS'
  );

  const existingLessonIndex = completedLessonsFromSession.findIndex(
    (lesson: ILessonVariants) => lesson.id === lessonById.id
  );

  if (lessonById && currentLessonVariant) {
    if (existingLessonIndex === -1) {
      completedLessonsFromSession.push({
        ...lessonById,
        ...currentLessonVariant,
      });
    } else {
      if (activeCourse.slug === VUE_COURSE) {
        completedLessonsFromSession[existingLessonIndex].vueVariant = currentLessonVariant
      } else if (activeCourse.slug === VANILLA_JS_COURSE) {
        completedLessonsFromSession[existingLessonIndex].vanillaJSVariant = currentLessonVariant
      }
    }

    sessionService?.storeInSession('completedLessons', completedLessonsFromSession);
  }
};

export const createTaskTemplate = (
  projectType: ProjectType,
  prompt: string,
  codes: IContentCode[]
) => {
  if (projectType === ProjectType.VANILLA) {
    return `<html>
  <body>
    <div id="app"></div>
    <script type="module">

      /*
        ${prompt}
      */

      // add imports

          
      const app = document.getElementById("app");
      const scene = document.createElement("a-scene");

      ${codes.map(c => c.content)}

    </script>
    
  </body>
</html>
`;
  } else if (projectType === ProjectType.VUE) {
    return `<script setup>
    /*
      ${prompt}
    */

      // add imports

      ${codes.filter(c => c.lang === LanguageEnum.JS).map(c => c.content)}
    </script>
    <template>
      <a-scene>
        ${codes.filter(c => c.lang === LanguageEnum.MARKUP).map(c => c.content)}
      </a-scene>
    </template>`
  }
};
