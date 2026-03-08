"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import GlassCard from "./glass-card";
import Link from "next/link";
import { useState } from "react";
import BookingModal from "../booking/booking-modal";
import { useLanguage } from "@/lib/language-context";

export default function Hero() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const { t } = useLanguage();

    return (
        <>
            <section className="relative pt-44 pb-20 px-4 overflow-hidden">
                {/* Background Dynamic Shapes */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-pink/10 blur-[150px] -z-10 rounded-full animate-pulse" />
                <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/10 blur-[120px] -z-10 rounded-full" />

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="inline-flex items-center gap-2 bg-brand-pink/10 px-4 py-2 rounded-full text-brand-pink text-xs font-black tracking-widest uppercase border border-brand-pink/20"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Lively Salon • 2026 Vibes</span>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-7xl md:text-9xl font-display font-black leading-[0.85] tracking-tighter text-brand-900"
                            >
                                {t("heroTitle")} <br />
                                <span className="text-brand-orange italic font-light drop-shadow-sm">{t("heroSubtitle")}</span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-md text-xl text-brand-900/60 font-sans tracking-tight leading-relaxed"
                        >
                            {t("heroDesc")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap items-center gap-6"
                        >
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="bg-brand-pink text-white px-10 py-5 rounded-full font-black text-lg shadow-xl shadow-brand-pink/30 hover:scale-105 hover:bg-brand-purple transition-all flex items-center gap-3 group"
                            >
                                {t("startBooking")}
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <Link href="#portfolio" className="px-10 py-5 rounded-full border-2 border-brand-orange/30 text-brand-orange font-bold text-lg hover:bg-brand-orange/10 transition-all">
                                {t("seeTrends")}
                            </Link>
                        </motion.div>
                    </div>

                    <div className="relative group">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            className="relative z-10 rounded-[50px] overflow-hidden aspect-[4/5] shadow-2xl ring-1 ring-white/20"
                        >
                            <div className="absolute inset-0 bg-brand-orange/10 animate-pulse" />
                            <img
                                src="https://images.unsplash.com/photo-1604654894610-df490651e10c?auto=format&fit=crop&q=80&w=1200"
                                alt="Vibrant Nail Art"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                            />
                        </motion.div>

                        <GlassCard className="absolute -bottom-10 -left-10 max-w-[300px] z-20 glass-vibrant" delay={0.8}>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-brand-pink shadow-lg shadow-brand-pink/30">
                                    <img src="https://i.pravatar.cc/150?u=vibrant-girl" alt="AI Stylist" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-brand-pink uppercase tracking-[0.2em]">{t("stylistAI")}</p>
                                    <p className="text-sm font-bold leading-tight">{t("analyzing")}</p>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        </>
    );
}
