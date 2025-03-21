import { useToast } from "primevue/usetoast";
import { initLessonDetailState } from "../states/LessonDetailState";
import { addCurrentLessonToSession, createTaskTemplate, lessonByCourseVariant, replacePlaceholder } from "../utils/Lessons";
import { SessionService } from "./sessionService";
import { inject, nextTick } from 'vue';
import { WebContainerService } from "./webContainersService";
import { ProjectType } from "../types/projectType";
import { lessonsData } from "../data/courses/Lessons";
import { IContentCode, ILesson, ILessonVariants } from "../types/courses/Lessons";
import { courseDetailData } from "../data/courses/CourseDetail";
import { ICourseDetail } from "../types/courses/CourseDetail";
import { COURSE, LESSON } from "../constants/routes";
import { IStateLessonDetail } from "../types/states";
import { ToastServiceMethods } from "primevue/toastservice";

export class LessonDetailService {

  private _state = initLessonDetailState
  private _sessionService = inject<SessionService>('sessionService');
  private _webContainersService = inject<WebContainerService>(
    'webContainersService'
  );

  private _toast = useToast();

  async loadDetail(params, playgroundStore) {
    await import('aframe');
  
    const lessonId = params.value?.lesson;
    const courseSlug = params.value?.course;
    if (!lessonId || !courseSlug) {
      this._state.canBeDisplayed = false;
      return;
    }
  
    this._loadLessonAndCourse(lessonId, courseSlug);
    this._loadSessionData(lessonId);
    this._setLessonNavigation(lessonId);
  
    if (this._state.activeLesson?.task) {
      await this._initializeProject(playgroundStore);
    }
  }
  
  private _loadLessonAndCourse(lessonId, courseSlug) {
    const lessonById = lessonsData.find((c) => c.id === lessonId) as ILessonVariants;
    const activeCourse = courseDetailData.find((c) => c.slug === courseSlug) as ICourseDetail;
  
    if (!lessonById || !activeCourse) {
      this._state.canBeDisplayed = false;
      return;
    }
  
    this._state.activeCourse = activeCourse;
    this._state.lessonById = lessonById;
    this._state.activeLesson = lessonByCourseVariant(activeCourse.slug, lessonById) as ILesson;

    nextTick(() => {
      try {
        replacePlaceholder(
          document.querySelector('#placeholder') as HTMLElement,
          String(this._state.activeLesson?.contentOutput),
          this._state.activeLesson?.contentCode as IContentCode[],
          this._toast
        )
       } catch (e) {
        console.log(e)
       }
    });
  }
  
  private _loadSessionData(lessonId) {
    const completedLessonsFromSession = (this._sessionService?.getFromSession('completedLessons') as ILessonVariants[]) || [];
    this._state.lessonsFromSession = completedLessonsFromSession;
  
    const currentLesson = completedLessonsFromSession.find((l) => l.id === Number(lessonId)) as ILessonVariants;
    this._state.completedIn = lessonByCourseVariant(this._state.activeCourse?.slug ?? "", currentLesson)?.completed ?? null;
  }
  
  private _setLessonNavigation(lessonId) {
    const completedLessonsFromSession = (this._sessionService?.getFromSession('completedLessons') as ILessonVariants[]) || [];
    
    const currentLessonId = Number(lessonId);
    if (currentLessonId < lessonsData.length) {
      this._state.nextLessonLink = `${LESSON}/${this._state.activeCourse?.slug}-${currentLessonId + 1}`;
    } else {
      this._state.successDialogTitle = "Congratulations!";
      this._state.successDialogText = "You have successfully completed the course. Great job!";
      this._state.nextLessonLink = `${COURSE}/${this._state.activeCourse?.slug}`;
    }
  
    const currentLesson = completedLessonsFromSession.find(
      (l) => l.id === currentLessonId
    ) as ILessonVariants;

    const previousLesson = this._state.lessonsFromSession.find((l) => l.id === currentLessonId - 1) as ILessonVariants;
    this._state.canBeDisplayed = Boolean(
      currentLessonId === 1 ||
        (completedLessonsFromSession &&
          (lessonByCourseVariant(String(this._state.activeCourse?.slug), currentLesson)?.completed ||
            lessonByCourseVariant(String(this._state.activeCourse?.slug), previousLesson)
              ?.completed))
    );
  }
  
  private async _initializeProject(playgroundStore) {
    await this._webContainersService?.ensureInitialized();
    const template = createTaskTemplate(
      this._state.activeCourse?.type ?? ProjectType.VANILLA,
      this._state.activeLesson?.task?.codes ?? []
    );
  
    await this._webContainersService?.createProject(
      this._state.activeCourse?.type ?? ProjectType.VANILLA,
      template
    );
  
    playgroundStore.commit('readFile', {
      content: template,
      path: this.getMainProjectFile(this._state.activeCourse?.type ?? ProjectType.VANILLA),
    });
  
    this._state.loading.installing = false;
  }

  addLessonToSession() {
    if (this._sessionService) {
      addCurrentLessonToSession(this._sessionService, this._state.lessonById!, this._state.activeCourse!);
    }
  }
  
  showHintDialog() {
    if (this._state.activeLesson?.task?.hint) {
      this._state.isHintVisible = true;
    } else {
      this._toast.add({ severity: 'info', summary: 'No hint available' });
    }
  };
  
  toggleVisibility() {
    this._state.isContentVisible = !this._state.isContentVisible;
  };

  async submitTask() {
    const test = this._state.activeLesson?.task?.test;
  
    if (!this._webContainersService) return
  
    if (!test) {
      this._state.testErrors.push('No test found.');
      this._state.isErrorDialogVisible = true;
      return;
    }
  
    this._state.testErrors = [];
    this._webContainersService.state.isLoading = true
  
    try {
      const data = await this._webContainersService?.checkTask(this._state.activeCourse?.type ?? ProjectType.VANILLA, test)
      if (data?.errors) {
        this._state.testErrors = data?.errors as string[]
      } else {
        this._state.isSuccessDialogVisible = true
      }
    } catch (error) {
      this._state.testErrors.push(`Test failed: ${error.message}`);
    } finally {
      this._webContainersService.state.isLoading = false
    }
  
    if (this._state.testErrors.length > 0) {
      this._state.isErrorDialogVisible = true;
    }
  };

  private getMainProjectFile(projectType: ProjectType): string {
    return projectType === ProjectType.VANILLA ? '/index.html' : '/src/App.vue';
  }

  get state(): IStateLessonDetail {
    return this._state ?? initLessonDetailState
  }

  get toast(): ToastServiceMethods {
    return this._toast
  }

  get webContainersService(): WebContainerService | null {
    return this._webContainersService ?? null
  }

  get sessionService(): SessionService | null {
    return this._sessionService ?? null
  }
  
}
