import { notFound } from 'next/navigation';
import Link from 'next/link';
import { initialGames } from '@/data/GamesData';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

// 1. กำหนดชื่อแท็บของหน้ารายละเอียดตามชื่อเกมด้วย generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = initialGames.find((g) => g.id === params.id);
  if (!game) return { title: 'ไม่พบข้อมูลเกม' };
  return { title: `${game.title} | Game Details` };
}

// 2. หน้าแสดงรายละเอียดเกม
export default function GameDetailPage({ params }: Props) {
  const game = initialGames.find((g) => g.id === params.id);

  // เรียกใช้ notFound() เมื่อหา ID เกมไม่เจอ (จะเด้งไปหน้า 404)
  if (!game) {
    notFound();
  }

  return (
    <div className="courses-container">
      <Link href="/games" className="btn-ui btn-ui-cancel mb-4 inline-block">
        ← กลับหน้า Game Backlog
      </Link>

      <div className="course-form-card">
        <h1 className="courses-page-title mb-2">{game.title}</h1>
        <p className="form-label">
          <strong>แพลตฟอร์ม:</strong> {game.platform}
        </p>
        <p className="form-label mt-1">
          <strong>ชั่วโมงที่คาดว่าจะเล่น:</strong> {game.estimatedHours} ชั่วโมง
        </p>
        <p className="form-label mt-1">
          <strong>สถานะ:</strong> {game.status}
        </p>
      </div>
    </div>
  );
}