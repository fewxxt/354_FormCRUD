import CourseExplorer from "@/components/CourseExplorer";
import { coursesData } from "@/data/coursesdata";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 py-4">
      <CourseExplorer initialCourses={coursesData} />
    </main>
  );
}