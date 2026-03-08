"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "../booking/booking-modal";
import LanguageSwitcher from "./language-switcher";
import { useLanguage } from "@/lib/language-context";

export default function Header() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <>
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="glass rounded-full px-8 py-3 flex items-center gap-10"
                >
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />
                        <Link href="/" className="flex flex-col group">
                            <span className="font-display font-black text-xl tracking-tighter text-brand-900 leading-none">Website 2.0</span>
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-pink">Beauty Hub</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-[11px] font-black tracking-[0.2em] uppercase text-brand-900/40">
                        <Link href="#portfolio" className="hover:text-brand-pink transition-colors">{t("portfolio")}</Link>
                        <Link href="#booking" className="hover:text-brand-pink transition-colors">{t("booking")}</Link>
                        <Link href="#blog" className="hover:text-brand-pink transition-colors">{t("insights")}</Link>
                    </div>

                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="flex items-center gap-3 bg-brand-pink text-white px-8 py-2.5 rounded-full text-xs font-black tracking-widest uppercase hover:bg-brand-purple hover:scale-105 transition-all shadow-xl shadow-brand-pink/20"
                    >
                        <Calendar className="w-4 h-4" />
                        <span>{t("bookNow")}</span>
                    </button>
                </motion.nav>
            </header>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
