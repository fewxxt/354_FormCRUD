'use client';

import { useState, useMemo } from 'react';
import BandCard from "@/components/BandCard";
import { bandsData } from "@/data/bandsData";

export default function BandsPage() {

  // การจัดการสถานะ component
  const [searchQuery, setSearchQuery] = useState<string>(''); //เก็บคำค้นหาชื่อวงดนตรี
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'year'>('default'); //เก็บเงื่อนไขการเรียงลำดับ
  const [followedBandIds, setFollowedBandIds] = useState<(number | string)[]>([]); //เก็บ ID ของวงดนตรีที่กดติดตาม
  const [likedBandIds, setLikedBandIds] = useState<(number | string)[]>([]); //เก็บจำนวน ถูกใจ ของแต่ละวง

  // ฟังก์ชันติดตาม/เลิกติดตาม
  const toggleFollow = (id: number | string) => { //รับพารามิเตอร์ id ของวงดนตรี (เป็นตัวเลขหรือตัวอักษรก็ได้)
    setFollowedBandIds((prev) =>
      prev.includes(id) //ตรวจสอบใน Array ว่ามี id ของวงดนตรีนี้อยู่แล้วหรือยัง
        ? prev.filter((item) => item !== id) //ถ้าติดตามอยู่สั่งคัดออกด้วย .filter() เพื่อลบ id นี้ออกจาก Array ส่งผลให้เป็นการ "เลิกติดตาม"
        : [...prev, id]
    );
  };

  // ฟังก์ชันกด ถูกใจ
  const handleLike = (id: number | string) => {
    setLikedBandIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // ฟังก์ชันล้างเงื่อนไขการค้นหาและเรียงลำดับกลับเป็นค่าเริ่มต้น
  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('default');
  };

  // การค้นหาและเรียงลำดับใหม่
  const filteredAndSortedBands = useMemo(() => {
    
    let result = bandsData.filter((band) => // กรองข้อมูลในช่องค้นหา //ค้นหาโดยใช้ชื่อสมาชิก
      band.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    // เรียงลำดับข้อมูลตามเงื่อนไขที่เลือกไว้ใน State
    if (sortBy === 'name') {
      // เรียงตามชื่อจาก A-Z / ก-ฮ
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'year') {
      // เรียงตามปีที่ปล่อยเพลงจากน้อยไปมาก
      result = [...result].sort((a, b) => {
        const yearA = parseInt(a.latestSong?.releaseYear || '0', 10);
        const yearB = parseInt(b.latestSong?.releaseYear || '0', 10);
        return yearA - yearB;
      });
    }

    return result;
  }, [searchQuery, sortBy]);

  return (
    <main className="bands-container">
      {/* ส่วนหัวหน้าเว็บ */}
      <div className="bands-header-container">
        <div className="bands-badge">
          <span>MY FAVORITE ARTISTS</span>
        </div>
        <h1 className="bands-title">วงดนตรีที่ชอบ</h1>

        {/* จำนวนวงดนตรีที่กำลังติดตามอยู่ */}
        <p className="following-count-badge">
          กำลังติดตามอยู่: {followedBandIds.length} วง
        </p>
      </div>



      {/* //// ค้นหา เรียงลำดับ ล้างเงื่อนไข //// */}
      <div className="controls-container">

        {/* ช่องค้นหาชื่อวงดนตรี */}
        <input
          type="text"
          className="search-input"
          placeholder="ค้นหาชื่อวงดนตรี"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* ตัวเลือกการเรียงลำดับ */}
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'default' | 'name' | 'year')}
        >
          <option value="default">เรียงตามเริ่มต้น</option>
          <option value="name">เรียงตามชื่อวง (A-Z)</option>
          <option value="year">เรียงตามปีที่ปล่อยเพลงล่าสุด</option>
        </select>

        {/* ปุ่มล้างเงื่อนไขทั้งหมด */}
        <button onClick={handleResetFilters} className="btn-reset">
          ล้างเงื่อนไขทั้งหมด
        </button>
      </div>



      {/* แสดงรายการการ์ด */}
      {filteredAndSortedBands.length > 0 ? (
        <div className="bands-cards-grid">
          {filteredAndSortedBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}

              isFollowed={followedBandIds.includes(band.id)} // ตรวจสอบว่าวงนี้ถูกติดตามอยู่หรือไม่
              isLiked={likedBandIds.includes(band.id)} // ดึงจำนวน Like ของวงนี้มาจาก State
              onToggleFollow={() => toggleFollow(band.id)} // ส่งการทำงานไปยัง Component
              onLike={() => handleLike(band.id)}
            />
          ))}
        </div>
      ) : (
        // แสดงผลเมื่อไม่พบข้อมูลการค้นหา
        <div className="empty-state">
          <h2 className="empty-state-title">ไม่พบข้อมูลวงดนตรี</h2>
          <p className="empty-state-description">ลองเปลี่ยนคำค้นหาหรือกดปุ่มล้างเงื่อนไขเพื่อเริ่มต้นใหม่</p>
        </div>
      )}
    </main>
  );
}