import Link from "next/link";

type Game = {
  id: string;
  title: string;
  genre: string;
  price: number;
  description?: string;
};

type GameCardProps = {
  game: Game;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <article className="game-card">
      <div>
        <div className="game-card-header">
          <span className="game-genre-badge">{game.genre}</span>
          <span className="game-price-tag">
            {game.price === 0 ? "ฟรี" : `฿${game.price.toLocaleString()}`}
          </span>
        </div>

        <Link href={`/games/${game.id}`} className="game-title-link">
          {game.title}
        </Link>

        {game.description && (
          <p className="game-description">{game.description}</p>
        )}
      </div>

      <div className="game-card-actions">
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="btn-action btn-action-edit"
          >
            แก้ไข
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="btn-action btn-action-delete"
          >
            ลบ
          </button>
        )}
      </div>
    </article>
  );
}