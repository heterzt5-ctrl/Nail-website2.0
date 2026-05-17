"use client";

import { Phone, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

export default function FloatingActions() {
    const { t } = useLanguage();

    const [isVisible, setIsVisible] = useState(false);
    const [hovered, setHovered] = useState<"call" | "book" | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsVisible(window.scrollY > 200);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleBooking = () => {
        window.dispatchEvent(new CustomEvent("open-booking"));
    };

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