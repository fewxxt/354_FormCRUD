import Link from "next/link";
import type { Course } from "@/type/course";

type CourseCardProps = {
  course: Course;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function CourseCard({ course, onEdit, onDelete }: CourseCardProps) {
  return (
    <article className="course-card">
      <div>
        <div className="course-card-header">
          <span className="course-code-badge">รหัสวิชา: {course.code}</span>
          <span className="course-credits">{course.credit} หน่วยกิต</span>
        </div>

        <Link href={`/courses/${course.id}`} className="course-title-link">
          {course.name}
        </Link>

        {course.instructor && (
          <p className="course-instructor">ผู้สอน: {course.instructor}</p>
        )}
      </div>

      <div className="course-card-actions">
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="btn-action btn-action-edit"
          >
            แก้ไข
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="btn-action btn-action-delete"
          >
            ลบ
          </button>
        )}
      </div>
    </article>
  );
}