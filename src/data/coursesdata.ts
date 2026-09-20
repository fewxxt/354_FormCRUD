import type { Course } from '@/type/course';

export const coursesData: Course[] = [
  {
    id: 1,
    code: '10301231',
    title: 'Web Technology',
    credits: 3,
    isOpen: true,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
  {
    id: 2,
    code: '10301225',
    title: 'Software Engineering',
    credits: 3,
    isOpen: true,
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
  {
    id: 3,
    code: '10301101',
    title: 'Computer Programming',
    credits: 3,
    isOpen: false, 
    instructor: "อาจารย์ผู้สอนรายวิชา",
  },
];