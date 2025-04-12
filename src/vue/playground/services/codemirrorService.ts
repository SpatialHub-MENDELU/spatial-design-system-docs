import { computed, inject, ref } from 'vue';
import { initEditorState } from '../states/EditorState';
import { SessionService } from './sessionService';
import { WebContainerService } from './webContainersService';
import { IStatePlaygroundEditor } from '../types/states';
import { LanguageSupport } from '@codemirror/language';
import { FileExtensions } from '../types/fileType';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { getFileExtension } from '../utils/FileExtensionsAndIcons';
import { autocompletion } from '@codemirror/autocomplete';
import {
  getAframeAutocomplete,
  getAutompleteByFileExtension,
  getSDSAutocomplete,
} from '../utils/Autocomplete';
import { AutocompleteMatch } from '../types/autocomplete';
import { Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import {tomorrow} from 'thememirror';

import { basicSetup } from 'codemirror';

export class CodeMirrorService {
  private _state = initEditorState;
  private _sessionService = inject<SessionService>('sessionService');
  private _webContainersService = inject<WebContainerService>(
    'webContainersService'
  );

  private _debounceTimer: any = null;
  private _theme = ref<any>();
  private _observer: MutationObserver

  constructor() {
    this._observer = new MutationObserver(this.updateTheme);

    this._observer.observe(document.documentElement, {
      attributes: true, 
      attributeFilter: ['class'],
    });
  }

  loadCodemirror(playgroundStore) {
    const editorSettings =
      this._sessionService?.getFromSession('editorSettings');
    if (editorSettings) {
      this._state.fontSize = editorSettings['selectedFontSize'];
      playgroundStore.commit('updateLayout', editorSettings['selectedLayout']);
    }
  }

  updateCode = (
    newCode: string,
    playgroundStore,
    path: string,
    fileContent: string,
    isDetail: boolean
  ) => {
    if (!this._webContainersService) return;
    this._webContainersService.state.isLoading = true;

    playgroundStore.commit('updateCurrentFileContent', newCode);
    if (this._debounceTimer) clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(async () => {
      try {
        await this._webContainersService?.writeFile(
          path,
          fileContent,
          !isDetail
        );
      } catch (error) {
        console.error('Error during runCode execution:', error.message);
      } finally {
        if (this._webContainersService) {
          this._webContainersService.state.isLoading = false;
        }
      }
    }, 100);
  };

  updateTheme = async () => {
    const isDark = document.documentElement.classList.contains('dark');
    this._theme.value = isDark ? oneDark : tomorrow;
  };

  extensions = (path: string) =>
    computed(() => {
      const fileExtension = getFileExtension(path);

      const isDark = document.documentElement.classList.contains('dark');
      const themeByDocumentBgColor = isDark ? oneDark : tomorrow;

      const theme = this._theme.value ?? themeByDocumentBgColor;

      const customAutocomplete = autocompletion({
        override: [
          (context) => {
            const word = context.matchBefore(/[\w-]*/);
            if (!word || word.from === word.to) return null;

            // Get the code before the cursor (last 50 characters) to check the context.
            const textBeforeCursor = context.state?.sliceDoc(
              word.from - 50,
              word.from
            );
            const isInsideString = /["'`]/.test(
              textBeforeCursor.charAt(textBeforeCursor.length - 1)
            );
            const isInsideTag = /<[^>]*$/.test(textBeforeCursor);
            const autocompleteForString =
              isInsideString || isInsideTag
                ? getAutompleteByFileExtension(FileExtensions.HTML).filter(
                    (comp) => comp.value.startsWith(word.text)
                  )
                : [];

            const matches = [
              ...autocompleteForString,
              ...getSDSAutocomplete(),
              ...getAframeAutocomplete(),
              ...getAutompleteByFileExtension(fileExtension).filter((comp) =>
                comp.value.startsWith(word.text)
              ),
            ];

            if (matches.length === 0) return null;

            const uniqueMatches: AutocompleteMatch[] = [
              ...new Set(matches.map((comp) => comp.value)),
            ].map((value) => {
              return matches.find(
                (comp) => comp.value === value
              ) as AutocompleteMatch;
            });

            return {
              from: word.from,
              to: word.to,
              options: uniqueMatches.map((match) => ({
                label: typeof match === 'string' ? match : match.value,
                type: match.type,
              })),
            };
          },
        ],
      });

      return [
        basicSetup,
        customAutocomplete,
        this._getlanguageExtensions(fileExtension) as Extension,
        theme
      ];
    });

  private _getlanguageExtensions(
    fileExtension: FileExtensions
  ): LanguageSupport {
    if (
      [FileExtensions.JS, FileExtensions.TS, FileExtensions.HTML].includes(
        fileExtension
      )
    ) {
      return javascript();
    } else if (fileExtension === FileExtensions.HTML) {
      return html();
    } else if (fileExtension === FileExtensions.CSS) {
      return css();
    } else {
      return javascript();
    }
  }

  get debounceTimer(): any {
    return this._debounceTimer;
  }

  get state(): IStatePlaygroundEditor {
    return this._state;
  }
}
