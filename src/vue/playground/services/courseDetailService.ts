import { inject } from 'vue';
import { initCourseDetailState } from '../states/CourseDetailState';
import { SessionService } from './sessionService';
import { ILessonVariants } from '../types/courses/Lessons';
import { courseDetailData } from '../data/courses/CourseDetail';
import { ICourseDetail } from '../types/courses/CourseDetail';
import { lessonByCourseVariant } from '../utils/Lessons';
import { lessonsData } from '../data/courses/Lessons';
import { IStateCourseDetail } from '../types/States';
import { VANILLA_JS_COURSE } from '../constants/courses';

export class CourseDetailService {
  private _state = initCourseDetailState;
  private _sessionService = inject<SessionService>('sessionService');

  loadDetail = (params) => {
    const completedLessonsFromSession =
      (this._sessionService?.getFromSession(
        'completedLessons'
      ) as ILessonVariants[]) || [];
    this._state.lessonsFromSession = completedLessonsFromSession;
    const activeCourse = courseDetailData.find(
      (c) => c.slug === params.value?.slug
    ) as ICourseDetail;
    this._state.activeCourse = activeCourse;

    const filteredLessonsByCourse = completedLessonsFromSession
      .map((l) => lessonByCourseVariant(activeCourse.slug, l))
      .filter((l) => l?.completed);
    this._state.percentage = Math.round(
      (filteredLessonsByCourse.length / lessonsData.length) * 100
    );

    this._state.completedLessons = filteredLessonsByCourse.length;
  };

  resetSession = () => {
    let completedLessonsFromSession =
      (this._sessionService?.getFromSession(
        'completedLessons'
      ) as ILessonVariants[]) || [];

    const courseKey =
      this._state.activeCourse?.slug === VANILLA_JS_COURSE
        ? 'vanillaJSVariant'
        : 'vueVariant';
    const modifiedLessons = completedLessonsFromSession.map((l) => ({
      ...l,
      [courseKey]: {
        ...l[courseKey],
        completed: undefined,
      },
    }));

    this._sessionService?.storeInSession('completedLessons', modifiedLessons);
  };

  get state(): IStateCourseDetail {
    return this._state
  }
}
