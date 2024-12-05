import { ICourseDetail } from "../../types/courses/CourseDetail";
import { courseListData } from "./CoursesList";
import { lessonsData } from "./Lessons";

export const courseDetailData: ICourseDetail[] = courseListData.map(course => {
  return {
    ...course,
    description: 'Ready to bring your AR/VR ideas to life? Don’t just imagine the future—create it. Take the leap into immersive technology and start your journey with Spatial Design System today. Your next breakthrough is just a click away!',
    whatYouWillLearn: 'Throughout the course, you will explore the various components that make up Spatial Design System. Each lesson is carefully structured to introduce you to new components and features, building on your knowledge as you progress. By the end of this course, you will have a solid understanding of how to use Spatial Design System to create sophisticated AR/VR projects. You will be able to implement core components, customize them to fit your needs, and deploy your applications with confidence.',
    lessons: lessonsData
  };
});
