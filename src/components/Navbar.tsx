import Link from "next/link";
export default function Navbar() {

  /* return (
    <nav className="navbar" aria-label="เมนูหลัก">
      <ul className="navList">
        <li><Link className="navLink" href="/">หน้าแรก</Link></li>
        <li><Link className="navLink" href="/courses">รายวิชา</Link></li>
        <li><Link className="navLink" href="/about">เกี่ยวกับ</Link></li>
      </ul>
    </nav>
  ); */

  return (
        <nav className="navbar" aria-label="เมนูหลัก">
            <ul className="navList">
                <li><Link href="/" className="navLink">หน้าแรก</Link></li>
                <li><Link href="/courses" className="navLink">รายวิชา</Link></li>
                <li><Link href="/about" className="navLink">เกี่ยวกับ</Link></li>
            </ul>
        </nav>
    );
}

