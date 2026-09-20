'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// TYPES & INITIAL DATA
export type GameStatus = 'ยังไม่เริ่ม' | 'กำลังเล่น' | 'เล่นจบแล้ว';

export interface Game {
    id: string;
    title: string;
    platform: string;
    estimatedHours: number;
    status: GameStatus;
}

export type GameFormData = Omit<Game, 'id'>;

const initialGames: Game[] = [
    { id: '1', title: 'The Witcher 3', platform: 'PC', estimatedHours: 50, status: 'เล่นจบแล้ว' },
    { id: '2', title: 'Elden Ring', platform: 'PlayStation 5', estimatedHours: 80, status: 'กำลังเล่น' },
    { id: '3', title: 'Zelda: Tears of the Kingdom', platform: 'Nintendo Switch', estimatedHours: 60, status: 'ยังไม่เริ่ม' },
    { id: '4', title: 'Cyberpunk 2077', platform: 'PC', estimatedHours: 40, status: 'กำลังเล่น' },
    { id: '5', title: 'Hollow Knight', platform: 'PC', estimatedHours: 30, status: 'ยังไม่เริ่ม' },
];


// MAIN COMPONENT
export default function GameBacklogApp() {
    const [games, setGames] = useState<Game[]>(initialGames);
    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ทั้งหมด');

    const [formData, setFormData] = useState<GameFormData>({
        title: '',
        platform: '',
        estimatedHours: 0,
        status: 'ยังไม่เริ่ม',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = 'กรุณากรอกชื่อเกม';
        if (!formData.platform.trim()) newErrors.platform = 'กรุณาเลือกหรือระบุแพลตฟอร์ม';
        if (formData.estimatedHours <= 0 || !Number.isInteger(Number(formData.estimatedHours))) {
            newErrors.estimatedHours = 'จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const totalUnstartedHours = useMemo(() => {
        return games
            .filter((game) => game.status === 'ยังไม่เริ่ม')
            .reduce((sum, game) => sum + Number(game.estimatedHours), 0);
    }, [games]);

    const filteredGames = useMemo(() => {
        return games.filter((game) => {
            const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'ทั้งหมด' || game.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [games, searchQuery, statusFilter]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        if (editingId) {
            setGames(games.map((g) => (g.id === editingId ? { ...formData, id: editingId } : g)));
            setEditingId(null);
        } else {
            const newGame: Game = { ...formData, id: Date.now().toString() };
            setGames([...games, newGame]);
        }

        setFormData({ title: '', platform: '', estimatedHours: 0, status: 'ยังไม่เริ่ม' });
        setErrors({});
    };

    const handleEdit = (game: Game) => {
        setEditingId(game.id);
        setSelectedGameId(null);
        setFormData({
            title: game.title,
            platform: game.platform,
            estimatedHours: game.estimatedHours,
            status: game.status,
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleQuickStatusChange = (id: string, newStatus: GameStatus) => {
        setGames(games.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
    };

    const handleDelete = (id: string) => {
        setGames(games.filter((g) => g.id !== id));
        setDeleteConfirmId(null);
    };

    // VIEW: List Page (/games)
    return (
        <div className="courses-container">
            <h1 className="courses-page-title">รายการเกมทั้งหมด</h1>

            <form onSubmit={handleSubmit} className="course-form-card">
                <h3 className="course-form-title">{editingId ? 'แก้ไขข้อมูลเกม' : '+ เพิ่มเกมใหม่'}</h3>

                <div className="form-input-group">
                    <label className="form-label">ชื่อเกม:</label><input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="form-input"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">แพลตฟอร์ม:</label>
                    <select
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="form-input"
                    >
                        <option value="">-- เลือกแพลตฟอร์ม --</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation 5">PlayStation 5</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="Xbox Series X">Xbox Series X</option>
                    </select>
                    {errors.platform && <span className="error-message">{errors.platform}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">จำนวนชั่วโมงที่คาดว่าจะเล่น:</label>
                    <input
                        type="number"
                        value={formData.estimatedHours || ''}
                        onChange={(e) => setFormData({ ...formData, estimatedHours: Number(e.target.value) })}
                        className="form-input"
                    />
                    {errors.estimatedHours && <span className="error-message">{errors.estimatedHours}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">สถานะ:</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as GameStatus })}
                        className="form-input"
                    >
                        <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                        <option value="กำลังเล่น">กำลังเล่น</option>
                        <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
                    </select>
                </div>

                <div className="form-actions-center">
                    <button type="submit" className="btn-submit-primary">
                        {editingId ? 'บันทึกการแก้ไข' : 'บันทึกรายการ'}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setFormData({ title: '', platform: '', estimatedHours: 0, status: 'ยังไม่เริ่ม' });
                            }}
                            className="btn-ui btn-ui-cancel"
                        >
                            ยกเลิก
                        </button>
                    )}
                </div>
            </form>

            <div className="summary-card">
                <strong>จำนวนชั่วโมงรวมของเกมที่ "ยังไม่เริ่ม":</strong> {totalUnstartedHours} ชั่วโมง
            </div>
            {/* Filter Section */}
            <div className="courses-header-row">
                <input
                    type="text"
                    placeholder="ค้นหาชื่อเกม..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="courses-search-input"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-input sm:w-48"
                >
                    <option value="ทั้งหมด">แสดงสถานะทั้งหมด</option>
                    <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                    <option value="กำลังเล่น">กำลังเล่น</option>
                    <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
                </select>
            </div>

            {/* Games List Grid */}
            {filteredGames.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-medium">
                    ไม่พบข้อมูลเกมที่ค้นหา
                </div>
            ) : (
                <div className="games-grid">
                    {filteredGames.map((game) => (
                        <div key={game.id} className="game-card">
                            <div className="game-card-header">
                                <div>
                                    <Link
                                        href={`/games/${game.id}`}
                                        className="game-title-link text-left"
                                    >
                                        {game.title}
                                    </Link>

                                    <p className="game-description">
                                        {game.platform} | {game.estimatedHours} ชั่วโมง
                                    </p>
                                </div>
                            </div>

                            <select
                                value={game.status}
                                onChange={(e) => handleQuickStatusChange(game.id, e.target.value as GameStatus)}
                                className="form-input mt-2"
                            >
                                <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
                                <option value="กำลังเล่น">กำลังเล่น</option>
                                <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
                            </select>

                            <div className="course-card-actions">
                                <button
                                    type="button"
                                    onClick={() => handleEdit(game)}
                                    className="btn-action btn-action-edit"
                                >
                                    แก้ไข
                                </button>

                                {deleteConfirmId === game.id ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(game.id)}
                                            className="btn-action btn-action-delete"
                                        >
                                            ยืนยันลบ
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeleteConfirmId(null)}
                                            className="btn-action"
                                        >
                                            ยกเลิก
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setDeleteConfirmId(game.id)}
                                        className="btn-action btn-action-delete"
                                    >
                                        ลบ
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}