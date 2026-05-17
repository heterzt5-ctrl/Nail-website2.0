"use client";

import { Phone, CalendarDays, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
    const { t, language, setLanguage } = useLanguage();

    const [isVisible, setIsVisible] = useState(false);
    const [hovered, setHovered] = useState<"call" | "book" | "lang" | null>(null);
    const [isLangOpen, setIsLangOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isLangOpen) return;
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".lang-switcher-container")) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [isLangOpen]);

    const handleBooking = () => {
        window.dispatchEvent(new CustomEvent("open-booking"));
    };

    const langLabels: Record<string, string> = {
        VN: "Ngôn ngữ",
        EN: "Language",
        KR: "언어",
        CN: "语言",
        RU: "Язык",
    };

    const languages: { code: typeof language; label: string; flag: string }[] = [
        { code: "VN", label: "Tiếng Việt", flag: "🇻🇳" },
        { code: "EN", label: "English", flag: "🇺🇸" },
        { code: "KR", label: "한국어", flag: "🇰🇷" },
        { code: "CN", label: "中文", flag: "🇨🇳" },
        { code: "RU", label: "Русский", flag: "🇷🇺" },
    ];

    return (
        <div
            style={{
                position: "fixed",
                bottom: "2rem",
                right: "1.5rem",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "0.75rem",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(2rem)",
                pointerEvents: isVisible ? "auto" : "none",
            }}
        >
            {/* CALL */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#5d5e5f",
                    background: "rgba(255,255,255,0.92)",
                    padding: "0.375rem 0.75rem",
                    border: "1px solid rgba(212,175,55,0.25)",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    opacity: hovered === "call" ? 1 : 0,
                    transform: hovered === "call" ? "translateX(0)" : "translateX(8px)",
                    pointerEvents: hovered === "call" ? "auto" : "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                    {t('fa-call')}
                </span>

                <a
                    href="tel:+84945598001"
                    aria-label="Call Remy Muse"
                    onMouseEnter={() => setHovered("call")}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        width: "2.75rem",
                        height: "2.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255,255,255,0.92)",
                        border: hovered === "call" ? "1px solid rgba(115,92,0,0.4)" : "1px solid rgba(212,175,55,0.3)",
                        color: hovered === "call" ? "#735c00" : "#1b1c19",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                        transition: "all 0.4s ease",
                        cursor: "pointer",
                        textDecoration: "none",
                        flexShrink: 0,
                    }}
                >
                    <Phone size={16} />
                </a>
            </div>

            {/* BOOKING */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#fff",
                    background: "#735c00",
                    padding: "0.375rem 0.75rem",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    opacity: hovered === "book" ? 1 : 0,
                    transform: hovered === "book" ? "translateX(0)" : "translateX(8px)",
                    pointerEvents: hovered === "book" ? "auto" : "none",
                }}>
                    {t('fa-book')}
                </span>

                <button
                    onClick={handleBooking}
                    aria-label="Open booking"
                    onMouseEnter={() => setHovered("book")}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        width: "2.75rem",
                        height: "2.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #735c00 0%, #d4af37 100%)",
                        color: "#fff",
                        border: "none",
                        boxShadow: "0 6px 24px rgba(115,92,0,0.35)",
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                        transform: hovered === "book" ? "scale(1.06)" : "scale(1)",
                        flexShrink: 0,
                    }}
                >
                    <CalendarDays size={16} />
                </button>
            </div>

            {/* LANGUAGE */}
            <div 
                className="lang-switcher-container"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", position: "relative" }}
            >
                <AnimatePresence>
                    {isLangOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{
                                position: "absolute",
                                right: "3.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.375rem",
                                background: "rgba(255, 255, 255, 0.95)",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)",
                                padding: "0.25rem",
                                borderRadius: "2rem",
                                border: "1px solid rgba(212, 175, 55, 0.25)",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                                zIndex: 10,
                            }}
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsLangOpen(false);
                                    }}
                                    style={{
                                        width: "2.25rem",
                                        height: "2.25rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: "50%",
                                        border: "none",
                                        background: language === lang.code ? "#735c00" : "transparent",
                                        color: language === lang.code ? "#fff" : "#5d5e5f",
                                        fontFamily: "var(--font-sans, sans-serif)",
                                        fontSize: "9px",
                                        fontWeight: "700",
                                        letterSpacing: "0.05em",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (language !== lang.code) {
                                            e.currentTarget.style.background = "rgba(212, 175, 55, 0.12)";
                                            e.currentTarget.style.color = "#1b1c19";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (language !== lang.code) {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "#5d5e5f";
                                        }
                                    }}
                                >
                                    <span style={{ fontSize: "11px", lineHeight: "1" }}>{lang.flag}</span>
                                    <span style={{ fontSize: "7px", marginTop: "1px" }}>{lang.code}</span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <span style={{
                    fontFamily: "var(--font-serif, serif)",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#5d5e5f",
                    background: "rgba(255,255,255,0.92)",
                    padding: "0.375rem 0.75rem",
                    border: "1px solid rgba(212,175,55,0.25)",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    opacity: hovered === "lang" ? 1 : 0,
                    transform: hovered === "lang" ? "translateX(0)" : "translateX(8px)",
                    pointerEvents: hovered === "lang" ? "auto" : "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                    {langLabels[language] || "Language"}
                </span>

                <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    aria-label="Change Language"
                    onMouseEnter={() => setHovered("lang")}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        width: "2.75rem",
                        height: "2.75rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: isLangOpen ? "rgba(212, 175, 55, 0.15)" : "rgba(255,255,255,0.92)",
                        border: hovered === "lang" || isLangOpen ? "1px solid rgba(115,92,0,0.4)" : "1px solid rgba(212,175,55,0.3)",
                        color: hovered === "lang" || isLangOpen ? "#735c00" : "#1b1c19",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                        transition: "all 0.4s ease",
                        cursor: "pointer",
                        flexShrink: 0,
                    }}
                >
                    <Globe size={16} />
                    <span style={{ fontSize: "7px", fontWeight: "bold", marginTop: "2px", lineHeight: "1" }}>{language}</span>
                </button>
            </div>

            {/* Connector line */}
            <div style={{
                width: "1px",
                height: "1.5rem",
                background: "linear-gradient(to bottom, rgba(212,175,55,0.4), transparent)",
                marginRight: "1.375rem",
            }} />
        </div>
    );
}