"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/type/course";
import CourseCard from "./CourseCard";
import CourseForm, { type CourseDraft } from "./CourseForm";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({ initialCourses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: Date.now().toString(),
      code: draft.code,
      title: draft.name,
      credit: Number(draft.credit) || 3,
      instructor: draft.instructor,
    };
    setCourses([newCourse, ...courses]);
  }

  function handleDelete(id: string) {
    setCourses(courses.filter((course) => String(course.id) !== String(id)));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        String(course.id) === String(id)
          ? {
              ...course,
              code: draft.code,
              title: draft.name,
              credit: Number(draft.credit) || course.credit,
              instructor: draft.instructor,
            }
          : course
      )
    );
    setEditingId(null);
  }

  const filteredCourses = courses.filter((c) => {
    const courseTitle = c.title || c.name || "";
    const courseCode = c.code || "";
    return (
      courseTitle.toLowerCase().includes(keyword.toLowerCase()) ||
      courseCode.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  return (
    <div className="courses-container">
      <div className="course-form-card">
        <h2 className="course-form-title">
          <span className="title-dot"></span>
          {editingId ? "แก้ไขข้อมูลรายวิชา" : "เพิ่มรายวิชาใหม่"}
        </h2>
        <CourseForm
          initialData={courses.find((c) => String(c.id) === String(editingId))}
          onSubmit={(draft) =>
            editingId ? handleUpdate(editingId, draft) : handleCreate(draft)
          }
          onCancel={editingId ? () => setEditingId(null) : undefined}
        />
      </div>

      <div className="courses-header-row">
        <div>
          <h1 className="courses-page-title">
            รายวิชาทั้งหมด ({filteredCourses.length})
          </h1>
          <p className="courses-page-subtitle">ค้นหาและจัดการข้อมูลรายวิชาในระบบ</p>
        </div>

        <input
          type="text"
          placeholder="ค้นหาชื่อวิชา หรือ รหัสวิชา..."
          value={keyword}
          onChange={handleKeywordChange}
          className="courses-search-input"
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => setEditingId(String(course.id))}
              onDelete={() => handleDelete(String(course.id))}
            />
          ))}
        </div>
      ) : (
        <div className="empty-courses-state">
          <p>ไม่พบรายวิชาที่ตรงกับการค้นหา</p>
        </div>
      )}
    </div>
  );
}