export default function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="about-title">เกี่ยวกับเรา</h1>
      <p className="about-text">
        ยินดีต้อนรับสู่ <strong>Student Course Hub</strong> ระบบสารสนเทศสำหรับจัดการและค้นหารายวิชาเรียน 
        เรามุ่งมั่นที่จะช่วยให้นักศึกษาสามารถเข้าถึงข้อมูลวิชาเรียน ตรวจสอบสถานะการเปิดรับลงทะเบียน 
        และวางแผนการเรียนในแต่ละภาคการศึกษาได้อย่างสะดวกและมีประสิทธิภาพ
      </p>

      <h2 className="about-subtitle">วัตถุประสงค์ของระบบ</h2>
      <ul className="about-list">
        <li>รวบรวมรายวิชาในหลักสูตรให้ค้นหาง่ายในที่เดียว</li>
        <li>แสดงสถานะการเปิด-ปิดรับลงทะเบียนแบบ Real-time</li>
        <li>อำนวยความสะดวกแก่นักศึกษาในการตรวจสอบหน่วยกิตและรหัสวิชา</li>
      </ul>
    </div>
  );
}