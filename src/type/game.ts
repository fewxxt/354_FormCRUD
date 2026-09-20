export type GameStatus = 'ยังไม่เริ่ม' | 'กำลังเล่น' | 'เล่นจบแล้ว';

export interface Game {
  id: string;
  title: string;
  platform: string;
  estimatedHours: number;
  status: GameStatus;
}

export type GameFormData = Omit<Game, 'id'>;