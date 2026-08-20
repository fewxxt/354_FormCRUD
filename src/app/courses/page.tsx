export default function CoursesPage() {



    type Course = {
        id: number;
        code: string;
        title: string;
        credits: number;
        isOpen: boolean;
    };

    const courses: Course[] = [
        {
            id: 1,
            code: "10301231",
            title: "Web Technology",
            credits: 3,
            isOpen: true,
        },
        {
            id: 2,
            code: "10301232",
            title: "Database Systems",
            credits: 3,
            isOpen: false,
        },
        {
            id: 3,
            code: "10301211",
            title: "Mathematics for Computer Science",
            credits: 3,
            isOpen: false,
        },
        {
            id: 4,
            code: "10301225",
            title: "Software Engineering",
            credits: 3,
            isOpen: true,
        },
    ];
    /* return (
        <div>
            {courses.map((course, index)=> (
                <article key={course.id}> 

                    <h2>{index+1}. {course.title}</h2> 
                    <p>รหัสวิชา: {course.code}</p> 
                    <p>{course.credits} หน่วยกิต</p> 
                    <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p> 
                </article>
            ))}
        </div>
    ); */

    return (
        <div className="courses-container">
            <h1 className="courses-title">รายวิชาทั้งหมด</h1>
            <div className="courses-grid">
                {courses.map((course, index) => (
                    <article key={course.id} className="course-card">
                        <h2>{index + 1}. {course.title}</h2>
                        <p className="course-code">รหัสวิชา: {course.code}</p>
                        <p className="course-credits">{course.credits} หน่วยกิต</p>
                        <p className={course.isOpen ? "badge-open" : "badge-closed"}>
                            {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );

}