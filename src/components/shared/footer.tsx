"use client";

import Link from "next/link";

export default function Footer() {
    const goldColor = "#735c06";

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
                        <p>  21 An Nhơn 6, Sơn Trà, Đà Nẵng</p>
                    </div>
                </div>

                {/* Điều hướng (Ở giữa) */}
                <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {['Portfolio', 'Services', 'Editorial', 'Location', 'Privacy'].map((link) => {
                        const href = 
                            link === 'Editorial' ? '/editorial' : 
                            link === 'Portfolio' ? '/gallery' : 
                            link === 'Services' ? '/#services' : 
                            `#${link.toLowerCase()}`;
                        return (
                            <Link
                                key={link}
                                href={href}
                                className="font-sans text-[0.65rem] tracking-[0.15em] text-gray-600 uppercase transition-opacity duration-300 hover:opacity-60"
                            >
                                {link}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bản quyền (Bên phải) */}
                <div className="font-sans text-[0.6rem] tracking-[0.1em] text-gray-500 uppercase text-center md:text-right space-y-1">
                    <p>© 2026 REMY MUSE.</p>
                    <p>ALL ARTISTRY RESERVED.</p>
                </div>

            </div>
        </footer>
    );
}
