"use client";
import CourseForm from "@/components/CourseForm";

export default function TestPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">หน้าทดสอบฟอร์ม</h1>
      
      {/* เพิ่ม prop onSubmit ลงไปตรงนี้ */}
      <CourseForm onSubmit={(draft) => console.log("Form Submitted:", draft)} />
    </div>
  );
}