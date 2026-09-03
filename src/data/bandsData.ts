import type { Band } from "@/type/band";

export const bandsData: Band[] = [
    {
        id: 1,
        name: "PROXIE",
        label: "bROTHERS Music",
        genre: "T-Pop",
        memberCount: 6,
        imageUrl: "/images/proxie/proxie.jpeg",
        latestSong: {
            title: "ขี้แง (Boys Don’t Cry)",
            releaseYear: "2026",
            youtubeUrl: "https://youtu.be/_X4p4oPlGLU?si=EFoVRNJCU_418l2z",
        },
        members: [
            {
                name: "รัชชานนท์ เรือนเพ็ชร์ (กัน)",
                role: "นักร้องนำ",
                imageUrl: "/images/proxie/gun.jpg"
            },
            {
                name: "ปัณณธร จิรศาสตร์ (คิม)",
                role: "นักร้อง / เต้น",
                imageUrl: "/images/proxie/kim.jpg"
            },
            {
                name: "ปวริศร์ ศรีชัยชนะ (โชกุน)",
                role: "นักร้องหลัก / Rap",
                imageUrl: "/images/proxie/chokun.jpg"
            },
            {
                name: "กร วรรณไพโรจน์ (กร)",
                role: "นักร้อง / เต้น",
                imageUrl: "/images/proxie/gorn.jpg"
            },
            {
                name: "ออสการ์ เอ็ดเวิร์ด วัตราเศรษฐ์ (อองรี)",
                role: "นักร้อง / Rap",
                imageUrl: "/images/proxie/onglee.jpg"
            },
            {
                name: "วรเมธ กอนุประพันธ์ (วิคเตอร์)",
                role: "นักร้อง",
                imageUrl: "/images/proxie/victor.jpg"
            },
        ],
    },
    {
        id: 2,
        name: "PiXXiE",
        label: "LIT ENTERTAINMENT",
        genre: "T-Pop",
        memberCount: 3,
        imageUrl: "/images/pixxie/pixie.jpeg",
        latestSong: {
            title: "หงุดหงิด (tsk)",
            releaseYear: "2026",
            youtubeUrl: "https://youtu.be/OsKIZbOomec?si=erJcZeY2R8UPRvWC",
        },
        members: [
            {
                name: "สุชาดา สอนพันธ์ (มาเบล)",
                role: "นักร้องนำ",
                imageUrl: "/images/pixxie/mabelz.jpeg"
            },
            {
                name: "พิมพ์มาดา ใจสักเสริญ (พิมมา)",
                role: "เต้น / Rap",
                imageUrl: "/images/pixxie/pimma.jpeg"
            },
            {
                name: "อินท์ปาลี โชติหิรัญธนนนท์ (อิงโกะ)",
                role: "นักร้องเสียงหลัก",
                imageUrl: "/images/pixxie/ingkho.jpeg"
            },
        ],
    },
    {
        id: 3,
        name: "Polycat",
        label: "Smallroom",
        genre: "Synth-pop",
        memberCount: 3,
        imageUrl: "/images/polycat/polycat.jpeg",
        latestSong: {
            title: "เครื่องหมายมากกว่า",
            releaseYear: "2025",
            youtubeUrl: "https://youtu.be/w5f7U2Gv6q0?si=L2MbghWeIsjWTGGP", // ใส่ URL จริง
        },
        members: [
            {
                name: "	รัตน จันทร์ประสิทธิ์ (นะ)",
                role: "นักร้องนำ / คีย์บอร์ด",
                imageUrl: "/images/polycat/na.jpeg"
            },
            {
                name: "เพียว วาตานาเบะ (เพียว)",
                role: "มือเบส",
                imageUrl: "/images/polycat/pure.jpeg"
            },
            {
                name: "พลากร กันจินะ (โต้ง)",
                role: "มือกลอง",
                imageUrl: "/images/polycat/tong.jpeg"
            },
        ],
    },

];