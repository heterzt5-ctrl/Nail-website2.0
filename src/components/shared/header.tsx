"use client";

import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
    onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
    const { language, setLanguage } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const langs: { id: typeof language, label: string }[] = [
        { id: "VN", label: "VI" },
        { id: "EN", label: "EN" },
        { id: "KR", label: "한국어" },
        { id: "CN", label: "中文" },
        { id: "RU", label: "RU" },
    ];

    const navLinks = [
        { href: "/gallery", label: language === "VN" ? "Bộ Sưu Tập" : "Portfolio" },
        { href: "/#services", label: language === "VN" ? "Dịch Vụ" : "Services" },
        { href: "/editorial", label: language === "VN" ? "Bài Viết" : "Editorial" },
        { href: "/#location", label: language === "VN" ? "Vị Trí" : "Location" },
    ];

    return (
        <>
            <nav className="glass-header w-full px-8 md:px-20 py-6 max-w-[1920px] mx-auto flex justify-between items-center top-0 sticky z-50">
                <Link href="/" className="text-2xl font-serif tracking-[0.2em] text-ink uppercase group">
                    REMY <span className="italic text-primary group-hover:text-ink transition-colors">MUSE</span>
                </Link>

                <div className="hidden md:flex items-center space-x-12">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="font-serif tracking-tight uppercase text-ink-ghost hover:text-primary transition-all duration-700 ease-in-out">
                            {link.label}
                        </Link>
                    ))}
                    <button 
                        onClick={onOpenBooking}
                        className="font-serif tracking-tight uppercase text-primary font-bold border-b border-primary/30 pb-0.5 hover:border-primary transition-all duration-700 cursor-pointer"
                    >
                        {language === "VN" ? "Đặt Lịch" : "Booking"}
                    </button>
                </div>

                <div className="flex items-center space-x-8">
                    <div className="hidden lg:flex gap-4">
                        {langs.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => setLanguage(l.id)}
                                className={`font-serif tracking-tight uppercase text-xs font-medium cursor-pointer ${language === l.id ? 'text-primary border-b border-primary/40' : 'text-ink-ghost hover:text-ink-mid transition-colors'}`}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                    <User className="hidden md:block w-5 h-5 text-ink cursor-pointer hover:text-primary transition-colors" />
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                        className="md:hidden text-ink hover:text-primary transition-colors cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 top-[80px] z-40 bg-cloud/98 backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col items-center justify-center h-full space-y-12 -mt-20">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="font-serif text-3xl tracking-[0.15em] uppercase text-ink hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <button 
                                    onClick={() => { onOpenBooking(); setIsMobileMenuOpen(false); }}
                                    className="px-12 py-5 shimmer-gold text-white font-serif uppercase tracking-[0.3em] text-sm cursor-pointer"
                                >
                                    {language === "VN" ? "Đặt Lịch" : "Booking"}
                                </button>
                            </motion.div>

                            {/* Language Switcher in Mobile */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex gap-6 pt-8 border-t border-gold-pale/20"
                            >
                                {langs.map((l) => (
                                    <button
                                        key={l.id}
                                        onClick={() => setLanguage(l.id)}
                                        className={`font-serif uppercase text-xs cursor-pointer ${language === l.id ? 'text-primary' : 'text-ink-ghost'}`}
                                    >
                                        {l.label}
                                    </button>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
