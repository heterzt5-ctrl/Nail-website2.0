"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage, Language } from "@/lib/language-context";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: "VN", label: "Tiếng Việt", flag: "🇻🇳" },
        { code: "EN", label: "English", flag: "🇺🇸" },
        { code: "KR", label: "한국어", flag: "🇰🇷" },
        { code: "CN", label: "中文", flag: "🇨🇳" },
        { code: "RU", label: "Русский", flag: "🇷🇺" },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 bg-brand-pink rounded-xl flex flex-col items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-brand-pink/30 text-white font-black text-[10px]"
            >
                <Globe className="w-4 h-4 mb-0.5" />
                <span className="leading-none">{language}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute top-14 left-0 bg-white/90 backdrop-blur-xl border border-brand-pink/10 rounded-2xl shadow-2xl p-2 w-40 z-50"
                    >
                        <div className="space-y-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${language === lang.code
                                            ? "bg-brand-pink text-white"
                                            : "text-brand-900/60 hover:bg-brand-pink/10 hover:text-brand-pink"
                                        }`}
                                >
                                    <span className="text-sm">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
