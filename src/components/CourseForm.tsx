"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import type { Course } from "@/type/course";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

type CourseFormProps = {
  initialData?: Course;
  onSubmit: (draft: CourseDraft) => void;
  onCancel?: () => void;
};

export default function CourseForm({ initialData, onSubmit, onCancel }: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>({
    code: "",
    name: "",
    credit: "3",
    instructor: "",
  });

  useEffect(() => {
    if (initialData) {
      setDraft({
        code: initialData.code || "",
        name: initialData.name || initialData.title || "",
        credit: String(initialData.credit || 3),
        instructor: initialData.instructor || "",
      });
    } else {
      setDraft({ code: "", name: "", credit: "3", instructor: "" });
    }
  }, [initialData]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft.code || !draft.name) return;
    onSubmit(draft);
    setDraft({ code: "", name: "", credit: "3", instructor: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <div className="form-grid">
        <input
          type="text"
          name="code"
          placeholder="รหัสวิชา (เช่น 10301231)"
          value={draft.code}
          onChange={handleChange}
          className="course-input"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="ชื่อรายวิชา"
          value={draft.name}
          onChange={handleChange}
          className="course-input"
          required
        />
        <input
          type="number"
          name="credit"
          placeholder="หน่วยกิต"
          value={draft.credit}
          onChange={handleChange}
          className="course-input"
          required
        />
        <input
          type="text"
          name="instructor"
          placeholder="ชื่ออาจารย์ผู้สอน"
          value={draft.instructor}
          onChange={handleChange}
          className="course-input"
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {initialData ? "อัปเดตข้อมูล" : "บันทึกรายวิชา"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-cancel">
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}