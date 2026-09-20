import { notFound } from "next/navigation";
import { coursesData } from "@/data/coursesdata";
import type { Metadata } from "next";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = coursesData.find((item) => String(item.id) === String(id));

  if (!course) {
    notFound();
  }

  return (
    <article>
      <h1>{course.title} ({course.code})</h1>
      <p>หน่วยกิต: {course.credits}</p>
      <p>ผู้สอน: {course.instructor}</p>
    </article>
  );
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = coursesData.find((item) => String(item.id) === String(id));

  if (!course) {
    return {
      title: "ไม่พบรายวิชา",
    };
  }

  return {
    title: course.title,
    description: `รายวิชา ${course.title} รหัสวิชา ${course.code} สอนโดย ${course.instructor}`,
  };
}