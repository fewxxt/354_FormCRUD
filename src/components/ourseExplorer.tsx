"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/type/course";
import CourseCard from "./CourseCard";

type CourseExplorerProps = {
    courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
    const [keyword, setKeyword] = useState("");

    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }
    const searchText = keyword.trim().toLowerCase();

    // เก็บผลการค้นหาไว้ที่ตัวแปรใหม่
    const visibleCourses = courses.filter(
        (course) =>
            // ค้นหาตามชื่อวิชา หรือรหัสวิชา
            course.title.toLowerCase().includes(searchText) ||
            course.code.includes(searchText)
    );

    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    function handleToggleFavorite(id: number) {
        setFavoriteIds((prevIds) =>
            prevIds.includes(id)
                ? prevIds.filter((favoriteId) => favoriteId !== id)
                : [...prevIds, id]
        );
    }

    return (
        <div>
            <input
                type="search"
                aria-label="ค้นหารายวิชา"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
                className="w-full max-w-md px-5 py-3 text-base text-slate-800 bg-white border-2 border-transparent rounded-xl outline-none bg-origin-border [background-clip:padding-box,_border-box] [background-image:linear-gradient(to_bottom_right,#fff,#fff),linear-gradient(to_bottom_right,#3b82f6,#8b5cf6,#ec4899)] shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 focus:shadow-indigo-500/40 focus:-translate-y-0.5 transition-all duration-300 placeholder:text-slate-400"
            />

            {visibleCourses.length === 0 ? (
                <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
            ) : (
                <section>
                    {visibleCourses.map((course) => (
                        // <CourseCard key={course.id} course={course} />
                        <CourseCard
                            key={course.id}
                            course={course}
                            isFavorite={favoriteIds.includes(course.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />    
                    ))}
                </section>
            )}

        </div>
    );
} 