"use client";

import React from "react";
import type { Band, BandMember } from "@/type/band";

type BandCardProps = {
  band: Band;
};

function MemberItem({ member }: { member: BandMember }) {
  const initial = member.name ? member.name.trim().charAt(0).toUpperCase() : "?";

  return (
    <div className="band-member-item">
      <div className="band-member-avatar-box">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="band-member-avatar-img"
          />
        ) : (
          <span className="band-member-avatar-initial">{initial}</span>
        )}
      </div>

      <div className="band-member-info">
        <span className="band-member-name">{member.name}</span>
        {member.role && <span className="band-member-role">{member.role}</span>}
      </div>
    </div>
  );
}

export default function BandCard({ band }: BandCardProps) {
  const handlePlay = () => {
    if (band.latestSong?.youtubeUrl) {
      window.open(band.latestSong.youtubeUrl, "_blank");
    }
  };

  return (
    <article className="band-card">
      {/* รูปใหญ่ */}
      {band.imageUrl && (
        <div className="band-card-cover">
          <img src={band.imageUrl} alt={band.name} />
        </div>
      )}

      {/* รายละเอียดวง */}
      <div className="band-card-content">
        <div>
          <div className="band-card-header">
            <h2 className="band-card-title">{band.name}</h2>
            <span className="band-card-count">มีสมาชิก {band.memberCount} คน</span>
          </div>
          <p className="band-card-meta">
            แนวเพลง: {band.genre} | ค่าย: {band.label}
          </p>
        </div>

        {/* รายชื่อสมาชิก */}
        <div className="band-card-members">
          <p className="band-card-members-title">รายชื่อสมาชิก</p>
          <div className="band-card-members-list">
            {band.members.map((member, index) => (
              <MemberItem key={member.id || index} member={member} />
            ))}
          </div>
        </div>

        {/* การ์ดเล่นเพลงล่าสุด */}
        {band.latestSong && (
          <div className="band-latest-song-card">
            <div className="band-latest-song-info">
              <p className="band-latest-song-label">เพลงล่าใหม่สุด</p>
              <p className="band-latest-song-title">{band.latestSong.title}</p>
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