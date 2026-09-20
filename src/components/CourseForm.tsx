"use client";

import { useState, useEffect, type FormEvent } from "react";
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
        name: initialData.name || "",
        credit: String(initialData.credit || 3),
        instructor: initialData.instructor || "",
      });
    } else {
      setDraft({ code: "", name: "", credit: "3", instructor: "" });
    }
  }, [initialData]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft.code || !draft.name) return;
    onSubmit(draft);
    setDraft({ code: "", name: "", credit: "3", instructor: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="course-form-grid">
        <div className="form-input-group">
          <label className="form-label">รหัสวิชา</label>
          <input
            type="text"
            placeholder="เช่น 10301231"
            value={draft.code}
            onChange={(e) => setDraft({ ...draft, code: e.target.value })}
            className="form-input"
            required
          />
        </div>

        <div className="form-input-group">
          <label className="form-label">ชื่อวิชา</label>
          <input
            type="text"
            placeholder="เช่น Web Technology"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="form-input"
            required
          />
        </div>

        <div className="form-input-group">
          <label className="form-label">หน่วยกิต</label>
          <input
            type="number"
            placeholder="3"
            value={draft.credit}
            onChange={(e) => setDraft({ ...draft, credit: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-input-group">
          <label className="form-label">ผู้สอน / สถานะ</label>
          <input
            type="text"
            placeholder="ระบุผู้สอน"
            value={draft.instructor}
            onChange={(e) => setDraft({ ...draft, instructor: e.target.value })}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-button-group">
        <button type="submit" className="btn-ui btn-ui-primary">
          {initialData ? "บันทึกการแก้ไข" : "เพิ่มรายวิชา"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-ui btn-ui-cancel">
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}