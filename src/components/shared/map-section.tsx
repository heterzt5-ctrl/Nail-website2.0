"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, X, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const GOOGLE_MAPS_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9304823831353!2d108.23281477387397!3d16.069096839443958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142193889388167%3A0x633e70e641ebdf2f!2sRemy%20Muse%20Nail%20-%20Shampoo%20-%20Foot%20care%20studio!5e0!3m2!1svi!2s!4v1777901349014!5m2!1svi!2s";

const GOOGLE_MAPS_LINK =
    "https://www.google.com/maps/place/Remy+Muse+Nail+-+Shampoo+-+Foot+care+studio/@16.069097,108.232815,17z";

const springTransition = {
    type: "spring" as const,
    stiffness: 120,
    damping: 20
};

export default function MapSection() {
    const { language } = useLanguage();
    const [isMapOpen, setIsMapOpen] = useState(false);

    const handleEsc = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMapOpen(false);
        },
        []
    );

    useEffect(() => {
        if (isMapOpen) {
            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isMapOpen, handleEsc]);

    return (
        <section id="location" className="py-32 px-8 md:px-20 bg-cloud relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16 order-2 lg:order-1">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <MapPin className="w-4 h-4" />
                            <span>{language === "VN" ? "Đến Với Chúng Tôi" : "Visit Us"}</span>
                        </div>
                        <p className="max-w-md text-ink-light font-serif italic text-lg leading-relaxed">
                            {language === "VN" ? "Một studio làm móng hiện đại tại An Hải, Đà Nẵng." : "A modern nail studio in An Hai, Da Nang."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-gold-pale/15 pt-16">
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-surface-variant flex items-center justify-center text-primary group hover:bg-ink hover:text-white transition-all duration-700">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-serif text-xl font-normal text-ink">{language === "VN" ? "Giờ Mở Cửa" : "Opening Hours"}</h4>
                                <p className="font-sans text-[10px] text-ink-ghost tracking-[0.3em] uppercase">{language === "VN" ? "Thứ 2 - Chủ Nhật" : "Mon - Sun"} · 09:30 - 21:00</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-surface-variant flex items-center justify-center text-primary group hover:bg-ink hover:text-white transition-all duration-700">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-serif text-xl font-normal text-ink">{language === "VN" ? "Hotline" : "Direct Line"}</h4>
                                <p className="font-sans text-[10px] text-ink-ghost tracking-[0.3em] uppercase">+84 094 559 8001</p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsMapOpen(true)}
                        className="px-14 py-6 shimmer-gold text-white font-serif uppercase tracking-[0.3em] text-xs rounded-xs hover:scale-105 transition-transform duration-500 shadow-2xl flex items-center gap-4 cursor-pointer"
                    >
                        {language === "VN" ? "Chỉ Đường" : "Get Directions"}
                        <Navigation className="w-4 h-4" />
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative order-1 lg:order-2"
                >
                    {/* MOCK IMAGE */}
                    <motion.div
                        layoutId="map-expand"
                        transition={springTransition}
                        onClick={() => setIsMapOpen(true)}
                        className="relative z-10 bg-surface-variant overflow-hidden aspect-[4/3] shadow-2xl cursor-pointer group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80&w=1200"
                            alt="Salon Location Map"
                            fill
                            className="object-cover grayscale-[0.5] group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

                        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="relative">
                                <div className="absolute -inset-12 bg-primary/20 blur-3xl animate-pulse rounded-full" />
                                <div className="w-20 h-20 bg-white shadow-2xl flex items-center justify-center relative border border-gold-pale/30">
                                    <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="absolute -bottom-10 -right-10 bg-white/95 backdrop-blur-md p-10 shadow-2xl max-w-[320px] z-30 hidden xl:block pointer-events-none">
                        <div className="space-y-6">
                            <span className="font-sans text-[10px] font-bold text-primary tracking-[0.4em] uppercase">{language === "VN" ? "Vị Trí" : "Aesthetic Hub"}</span>
                            <p className="font-serif text-2xl text-ink leading-tight italic">{language === "VN" ? "21 An Nhơn 6, An Hải, Đà Nẵng (ngã tư Phan Bôi x An Nhơn 6)" : "21 An Nhon 6, An Hai, Da Nang (Phan Boi x An Nhon 6 intersection)"}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* EXPANDED MAP MODAL */}
            <AnimatePresence>
                {isMapOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center">
                        {/* CLICK OUTSIDE & BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                            onClick={() => setIsMapOpen(false)}
                        />

                        {/* MAP CONTAINER */}
                        <motion.div
                            layoutId="map-expand"
                            transition={springTransition}
                            className="relative z-10 w-[90vw] max-w-6xl h-[80vh] rounded-2xl overflow-hidden bg-surface-variant shadow-2xl"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setIsMapOpen(false)}
                                className="absolute top-4 right-4 z-20 w-10 h-10 bg-ink/50 hover:bg-ink/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <iframe
                                src={GOOGLE_MAPS_EMBED_URL}
                                className="w-full h-full border-0 grayscale-[0.2]"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            {/* Open in Maps button */}
                            <a
                                href={GOOGLE_MAPS_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute bottom-6 right-6 z-20 bg-white/95 hover:bg-white text-ink px-6 py-3 text-xs font-sans font-bold tracking-[0.2em] uppercase rounded-full shadow-lg transition-all flex items-center gap-2"
                            >
                                {language === "VN" ? "Mở Bản Đồ" : "Open in Maps"}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
