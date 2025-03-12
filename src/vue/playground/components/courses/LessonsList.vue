<script lang="ts" setup>
import { defineProps } from 'vue';
import { ICourseDetail } from '../../types/courses/CourseDetail';
import { lessonByCourseVariant } from '../../utils/Lessons';
import { ILessonVariants } from '../../types/courses/Lessons';
import { LESSON } from '../../constants/routes';

const props = defineProps<{
  activeCourse: ICourseDetail;
  lessonsFromSession: ILessonVariants[]
}>();
</script>

<template>
  <a
    v-for="lesson in activeCourse?.lessons"
    :href="`${LESSON}/${activeCourse?.slug}-${lesson.id}`"
    class="flex gap-2 justify-between py-1.5 border-b border-border-color"
  >
    <div class="flex gap-2 items-center lg:text-[16px] text-[15px]">
      <span>Lesson {{ lesson.id }}:</span>
      <p>{{ lesson.title  }}</p>
    </div>
    <span
      class="w-5 h-5 flex items-center justify-center rounded-full border-2 md:text-[16px] text-[15px]"
      :class="{
        'border-grey': !lessonByCourseVariant(
          String(activeCourse?.slug),
          lessonsFromSession?.find(l => l.id === lesson.id) as ILessonVariants
        )?.completed,
        'border-primary': lessonByCourseVariant(
          String(activeCourse?.slug),
          lessonsFromSession?.find(l => l.id === lesson.id) as ILessonVariants
        )?.completed,
      }"
    >
      <i
        class="fas fa-check text-primary lg:text-[12px] text-[11px]"
        :class="{
          hidden: !lessonByCourseVariant(
            String(activeCourse?.slug),
            lessonsFromSession?.find(l => l.id === lesson.id) as ILessonVariants
          )?.completed,
        }"
      />
    </span>
  </a>
</template>
