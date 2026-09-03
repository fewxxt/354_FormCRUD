import CoursesCard from "@/components/CourseCard";
import { coursesData } from "@/data/coursesdata";

export default function CoursesPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">รายวิชาทั้งหมด</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coursesData.map((course) => (
          <CoursesCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}