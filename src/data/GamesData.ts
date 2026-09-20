import { Game } from '@/type/game';

export const initialGames: Game[] = [
  { id: '1', title: 'The Witcher 3', platform: 'PC', estimatedHours: 50, status: 'เล่นจบแล้ว' },
  { id: '2', title: 'Elden Ring', platform: 'PlayStation 5', estimatedHours: 80, status: 'กำลังเล่น' },
  { id: '3', title: 'Zelda: Tears of the Kingdom', platform: 'Nintendo Switch', estimatedHours: 60, status: 'ยังไม่เริ่ม' },
  { id: '4', title: 'Cyberpunk 2077', platform: 'PC', estimatedHours: 40, status: 'กำลังเล่น' },
  { id: '5', title: 'Hollow Knight', platform: 'PC', estimatedHours: 30, status: 'ยังไม่เริ่ม' },
];