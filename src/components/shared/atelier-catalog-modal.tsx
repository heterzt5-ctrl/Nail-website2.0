"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";


/* ── Catalog Data ─────────────────────────────────────────────── */
const catalogImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    src: `/images/catalog/${String(i + 1).padStart(2, "0")}.jpg`,
    alt: `Remy Muse Menu ${String(i + 1).padStart(2, "0")}`,
}));

/* ── Animation Variants ───────────────────────────────────────── */
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: "easeInOut" as const } },
};

const imageVariants = {
    enter: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
    center: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.3, ease: "easeOut" as const } },
    exit: { opacity: 0, scale: 1.01, filter: "blur(6px)", transition: { duration: 0.2, ease: "easeIn" as const } },
};

/* ── Trigger Button ───────────────────────────────────────────── */
export function CatalogTrigger({ onOpen }: { onOpen: () => void }) {
    const { t } = useLanguage();

    return (
        <motion.button
            onClick={onOpen}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="px-10 py-4 shimmer-gold text-white font-serif uppercase tracking-[0.2em] text-sm rounded-xs hover:scale-105 transition-transform duration-300 mx-auto mt-20 block cursor-pointer"
        >
            {t('catalog-btn')}
        </motion.button>
    );
}

/* ── Modal Component ──────────────────────────────────────────── */
export function AtelierCatalogModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { language, t } = useLanguage();
    const [index, setIndex] = useState(0);
    const [dragStartX, setDragStartX] = useState(0);

    const total = catalogImages.length;

    const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
    const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

    /* ── Keyboard Navigation ── */
    useEffect(() => {
        if (!isOpen) return;

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose, next, prev]);

    /* ── Lock body scroll ── */
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    /* ── Preload adjacent images ── */
    useEffect(() => {
        if (!isOpen) return;
        const preloadNext = new globalThis.Image();
        preloadNext.src = catalogImages[(index + 1) % total].src;
        const preloadPrev = new globalThis.Image();
        preloadPrev.src = catalogImages[(index - 1 + total) % total].src;
    }, [index, isOpen, total]);

    /* ── Touch / Swipe handlers ── */
    const handleTouchStart = (e: React.TouchEvent) => {
        setDragStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = dragStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {/* ── Backdrop ── */}
                    <div
                        className="absolute inset-0 bg-ink/90 backdrop-blur-md cursor-pointer"
                        onClick={onClose}
                    />

                    {/* ── Content Container ── */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center select-none">

                        {/* ── Close Button ── */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 z-10 flex items-center gap-2 px-4 py-2 border border-cloud/20 hover:border-cloud/60 bg-ink/40 hover:bg-ink/60 text-cloud/60 hover:text-cloud backdrop-blur-sm transition-all duration-300 cursor-pointer rounded-none group"
                            aria-label="Close catalog"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase">{t('catalog-close')}</span>
                        </button>

                        {/* ── Image Viewport ── */}
                        <div
                            className="relative"
                            style={{ width: "92vw", height: "82vh" }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    variants={imageVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ width: "100%", height: "100%" }}
                                >
                                    <Image
                                        src={catalogImages[index].src}
                                        alt={catalogImages[index].alt}
                                        fill
                                        priority
                                        sizes="92vw"
                                        className="object-contain"
                                        style={{
                                            boxShadow: "0 40px 100px rgba(0,0,0,0.4)",
                                        }}
                                        draggable={false}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── Arrow Left ── */}
                        <button
                            onClick={prev}
                            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cloud/30 hover:text-cloud/80 transition-all duration-300 cursor-pointer group"
                            aria-label="Previous menu page"
                        >
                            <svg className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* ── Arrow Right ── */}
                        <button
                            onClick={next}
                            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cloud/30 hover:text-cloud/80 transition-all duration-300 cursor-pointer group"
                            aria-label="Next menu page"
                        >
                            <svg className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        {/* ── Page Indicator ── */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                            {/* dot indicators */}
                            <div className="flex items-center gap-2">
                                {catalogImages.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIndex(i)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === index
                                            ? "bg-primary-container w-6"
                                            : "bg-cloud/20 hover:bg-cloud/40"
                                            }`}
                                        aria-label={`Go to page ${i + 1}`}
                                    />
                                ))}
                            </div>

                            {/* numeric */}
                            <span className="font-sans text-cloud/50 text-[11px] tracking-[0.3em]">
                                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
