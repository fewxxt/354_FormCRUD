import Link from "next/link";
export default function Navbar() {

  return (
    <nav className="navbar">
      <ul className="navList">
        <li><Link href="/" className="navLink">หน้าแรก</Link></li>
        <li><Link href="/courses" className="navLink">รายวิชา</Link></li>
        <li><Link href="/about" className="navLink">เกี่ยวกับ</Link></li>
        <li><Link href="/bands" className="navLink">วงดนตรีที่ชอบ</Link></li>
        <li><Link href="/games" className="navLink">รายการเกม</Link></li>
      </ul>
    </nav>
  );
}
