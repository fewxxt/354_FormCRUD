"use client";

import { useState } from "react";
import GameCard from "./GameCard";

export default function GameExplorer({ initialGames = [] }: { initialGames?: any[] }) {
  const [games] = useState(initialGames);

  return (
    <div className="courses-container">
      <div className="courses-header-row">
        <div>
          <h1 className="courses-page-title">🎮 รายชื่อเกมทั้งหมด</h1>
          <p className="courses-page-subtitle">จัดการและเรียกดูข้อมูลเกมในระบบ</p>
        </div>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}