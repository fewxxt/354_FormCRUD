import BandCard from "@/components/BandCard";
import { bandsData } from "@/data/bandsData";

export default function BandsPage() {
  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>

      <div className="bands-header-container">
        <div className="bands-badge">
          <span>MY FAVORITE ARTISTS</span>
        </div>
        <h1 className="bands-title">วงดนตรีที่ชอบ</h1>
      </div>

      {/* การ์ดวงดนตรี */}
      <div className="band-cards-grid">
        {bandsData.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </main>
  );
}