export type Band = {
  id: string | number;
  name: string; // ชื่อวง
  genre: string; // ประเภทวง
  label: string; // ค่ายเพลง
  memberCount: number; // จำนวนสมาชิก
  imageUrl?: string; // รูปวง
  members: BandMember[]; // รายชื่อสมาชิก
  latestSong?: Song; // เพลงล่าสุด
};

export type BandMember = {
  id?: string | number;
  name: string; // ชื่อสมาชิก
  role?: string; // ตำแหน่งในวง
  imageUrl?: string; // รูปภาพสมาชิก
};

export type Song = {
  title: string; // ชื่อเพลง
  releaseYear?: string; 
  youtubeUrl?: string; 
};
