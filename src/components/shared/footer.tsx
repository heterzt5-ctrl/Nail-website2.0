"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
    const { language } = useLanguage();
    const goldColor = "#735c06";

    const links = [
        { label: language === "VN" ? "Bộ Sưu Tập" : "Portfolio", href: "/gallery" },
        { label: language === "VN" ? "Dịch Vụ" : "Services", href: "/#services" },
        { label: language === "VN" ? "Bài Viết" : "Editorial", href: "/editorial" },
        { label: language === "VN" ? "Vị Trí" : "Location", href: "/#location" },
        { label: language === "VN" ? "Quyền Riêng Tư" : "Privacy", href: "#privacy" },
    ];

    return (
        <footer id="privacy" className="w-full bg-[#f5f3ee] py-12 px-6 md:px-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">

                {/* Thương hiệu & Liên hệ (Bên trái) */}
                <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                    <Link href="/" className="font-serif text-xl md:text-2xl font-semibold text-gray-800 uppercase tracking-widest hover:opacity-70 transition-opacity">
                        REMY MUSE
                    </Link>
                    <div className="font-sans text-[0.65rem] tracking-[0.15em] text-gray-600 uppercase">
                        Nail — Shampoo — Foot Care Studio
                    </div>
                    <div className="font-sans text-[0.65rem] tracking-[0.15em] text-gray-500 uppercase mt-2 space-y-1.5">
                        <p>
                            <a href="tel:+840945598001" className="hover:opacity-60 transition-opacity duration-300">
                                +84 094 559 8001
                            </a>
                        </p>
                        <p>21 An Nhơn 6, An Hải, Đà Nẵng (ngã tư Phan Bôi x An Nhơn 6)</p>
                    </div>
                </div>

                {/* Điều hướng (Ở giữa) */}
                <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="font-sans text-[0.65rem] tracking-[0.15em] text-gray-600 uppercase transition-opacity duration-300 hover:opacity-60"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bản quyền (Bên phải) */}
                <div className="font-sans text-[0.6rem] tracking-[0.1em] text-gray-500 uppercase text-center md:text-right space-y-1">
                    <p>© 2026 REMY MUSE.</p>
                    <p>{language === "VN" ? "Đã đăng ký bản quyền" : "All rights reserved"}</p>
                </div>

            </div>
        </footer>
    );
}
