"use client";

import Link from "next/link";
import { Facebook, Instagram, MessageCircle, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
    const { t } = useLanguage();
    const goldColor = "#735c06";

    const links = [
        { label: t('nav-portfolio'), href: "/gallery" },
        { label: t('nav-services'), href: "/#services" },
        { label: t('nav-editorial'), href: "/editorial" },
        { label: t('nav-location'), href: "/#location" },
        { label: t('nav-privacy'), href: "#privacy" },
    ];

    return (
        <footer id="privacy" className="w-full bg-[#f5f3ee] py-12 px-6 md:px-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">

                {/* Thương hiệu & Liên hệ (Bên trái) */}
                <div className="flex flex-col items-center gap-3 text-center w-full md:w-auto">
                    <Link href="/" className="font-serif text-xl md:text-2xl font-semibold text-gray-800 uppercase tracking-widest hover:opacity-70 transition-opacity">
                        REMY MUSE
                    </Link>
                    <div className="font-sans text-[0.85rem] tracking-wider text-gray-600 uppercase">
                        {t('ft-studio-desc')}
                    </div>
                    <div className="font-sans text-[0.85rem] tracking-wider text-gray-500 uppercase mt-2 space-y-1.5">
                        <p>
                            <a href="tel:+840945598001" className="hover:opacity-60 transition-opacity duration-300">
                                +84 094 559 8001
                            </a>
                        </p>
                        <div className="flex flex-col items-center gap-4">
                            <p>{t('map-address')}</p>
                            {/* Social Icons */}
                            <div className="flex items-center gap-4">
                                <a href="https://www.facebook.com/remymusenail" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#735c06] transition-colors duration-300" aria-label="Facebook">
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a href="https://www.instagram.com/remymuse_nail_studio/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#735c06] transition-colors duration-300" aria-label="Instagram">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="https://zalo.me/84945598001" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#735c06] transition-colors duration-300" aria-label="Zalo">
                                    <MessageSquare className="w-4 h-4" />
                                </a>
                                <a href="https://wa.me/84945598001" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#735c06] transition-colors duration-300" aria-label="WhatsApp">
                                    <MessageCircle className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Điều hướng (Ở giữa) */}
                <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="font-sans text-sm font-medium tracking-wide text-gray-700 uppercase transition-opacity duration-300 hover:opacity-60"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Bản quyền (Bên phải) */}
                <div className="font-sans text-xs tracking-wider text-gray-500 uppercase text-center md:text-right space-y-1">
                    <p>© 2026 REMY MUSE.</p>
                    <p>{t('ft-rights')}</p>
                </div>

            </div>
        </footer>
    );
}
