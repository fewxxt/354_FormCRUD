import { Band, BandMember } from "@/type/band";

type BandCardProps = {
  band: Band; // ข้อมูลวง
  isFollowed: boolean; // สถานะการกดติดตาม T/F
  isLiked: boolean;  // สถานะการกดถูกใจของวง T/F
  onToggleFollow: () => void; // ฟังก์ชัน สลับการติดตาม
  onLike: () => void; // ฟังก์ชันสลับ กดถูกใจ};
}

// Sub-component สำหรับแสดงข้อมูลสมาชิกแต่ละคนในวงดนตรี
function MemberItem({ member }: { member: BandMember }) {
  // ลิงก์รูปภาพโปรไฟล์สำรอง (กรณีไม่มี imageUrl)
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="band-member-item">
      <div className="band-member-avatar-box">
        <img
          src={member.imageUrl || defaultAvatar} //เช็คว่าถ้ามีรูปสมาชิกให้ใช้รูปนั้น แต่ถ้าไม่มีให้ใช้รูปสำรอง
          alt={member.name}
          className="band-member-avatar-img"
        />
      </div>
      <div className="band-member-info">
        <span className="band-member-name">{member.name}</span> //แสดงชื่อของสมาชิก
        {member.role && <span className="band-member-role">{member.role}</span>}
      </div>
    </div>
  );
}

// แสดงรายละเอียดของแต่ละวงดนตรี
export default function BandCard({
  band,
  isFollowed,
  isLiked,
  onToggleFollow,
  onLike,
}: BandCardProps) {
  // ฟังก์ชันเปิดเพลงใน YouTube เมื่อกดปุ่มเล่นเพลง
  const handlePlay = () => {
    if (band.latestSong?.youtubeUrl) {
      window.open(band.latestSong.youtubeUrl, "_blank");
    }
  };

  // คำนวณจำนวนสมาชิกวงดนตรีจากความยาวของ array ในข้อมูลที่มีอยู่เดิม
  const totalMembersCount = band.members ? band.members.length : 0;

  return (
    <article className="band-card">
      {/* รูปปกวงดนตรี */}
      {band.imageUrl && (
        <div className="band-card-cover">
          <img src={band.imageUrl} alt={band.name} />
        </div>
      )}

      <div className="band-card-content">
        <div>
          {/* ส่วนหัวการ์ด: ชื่อวง และ จำนวนสมาชิก */}
          <div className="band-card-header">
            <h2 className="band-card-title">{band.name}</h2>
            {/* แสดงจำนวนสมาชิกที่คำนวณสดจากข้อมูลที่มีอยู่ */}
          <span className="band-card-count">สมาชิก {totalMembersCount} คน</span>
          </div>
          <p className="band-card-meta">
            แนวเพลง: {band.genre} | ค่าย: {band.label}
          </p>
        </div>

        {/* ปุ่มควบคุม Interaction (ติดตาม และ กด Like) */}
        <div className="band-card-actions">
          {/* ปุ่มติดตาม/เลิกติดตาม เปลี่ยนคลาส (สี) และข้อความตามสถานะ */}
          <button
            onClick={onToggleFollow}
            className={`btn-follow ${isFollowed ? "followed" : ""}`}
          >
            {isFollowed ? "ติดตามแล้ว" : "+ ติดตาม"}
          </button>

          {/* ปุ่มกด Like และแสดงสถานะ */}
          <button
            onClick={onLike}
            className={`btn-like ${isLiked ? "liked" : ""}`}
          >
            {isLiked ? "❤️ ถูกใจแล้ว 1" : "🤍 ถูกใจ 0"}
          </button>
        </div>

          {/* รายชื่อสมาชิกในวง */}
          {band.members && band.members.length > 0 && (
            <div className="band-card-members">
              <p className="band-card-members-title">สมาชิกในวง</p>
              <div className="band-card-members-list">
                {band.members.map((member, index) => (
                  <MemberItem key={member.id || index} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* รายละเอียดเพลงล่าสุดและปุ่มเล่นเพลง */}
          {band.latestSong && (
            <div className="band-card-latest-song-card">
              <div className="band-card-latest-song-info">
                <p className="band-card-latest-song-label">เพลงล่าสุด</p>
                <p className="band-card-latest-song-title">
                  {band.latestSong.title}
                </p>
              </div>
              <button onClick={handlePlay} className="band-play-button">
                <span className="band-play-button-icon">▶</span> เล่นเพลง
              </button>
            </div>
          )}
        </div>
    </article>
  );
}