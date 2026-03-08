"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, Sparkles, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { NAIL_DESIGNS } from "@/lib/mock-data";
import GlassCard from "../shared/glass-card";
import { useLanguage } from "@/lib/language-context";

export default function VirtualConsultant() {
    const { language, t } = useLanguage();
    const [filter, setFilter] = useState({
        skinTone: "All",
        handShape: "All",
    });

    const [activeTab, setActiveTab] = useState<"skinTone" | "handShape">("skinTone");

    const filteredDesigns = NAIL_DESIGNS.filter((design) => {
        return (
            (filter.skinTone === "All" || design.skinTone === filter.skinTone) &&
            (filter.handShape === "All" || design.handShape === filter.handShape)
        );
    });

    const skinTones = ["All", "Fair", "Tan", "Deep"];
    const handShapes = ["All", "Almond", "Square", "Round"];

    return (
        <section id="portfolio" className="py-32 px-4 bg-brand-50 relative overflow-hidden">
            {/* Background energy */}
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-brand-purple/5 blur-[100px] rounded-full" />

            <div className="max-w-7xl mx-auto space-y-20 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 text-brand-orange text-xs font-black tracking-[0.3em] uppercase">
                            <Filter className="w-4 h-4" />
                            <span>Vibrant Library</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.9]">
                            Style <br /> <span className="text-brand-pink">Match</span>
                        </h2>
                        <p className="max-w-md text-brand-900/60 font-bold text-xl leading-relaxed">
                            {language === 'VN' ? 'Khám phá mẫu nail hoàn hảo cho màu da và dáng tay của bạn.' : 'Discover the perfect nail art for your skin tone and hand shape.'}
                        </p>
                    </div>

                    <div className="w-full lg:max-w-md space-y-6">
                        <div className="flex gap-4 p-2 bg-brand-pink/5 rounded-2xl">
                            <button
                                onClick={() => setActiveTab("skinTone")}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "skinTone" ? 'bg-white shadow-lg text-brand-pink' : 'text-brand-900/40'}`}
                            >
                                {t("skinTone")}
                            </button>
                            <button
                                onClick={() => setActiveTab("handShape")}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "handShape" ? 'bg-white shadow-lg text-brand-orange' : 'text-brand-900/40'}`}
                            >
                                {t("handShape")}
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {(activeTab === "skinTone" ? skinTones : handShapes).map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter({
                                        ...filter,
                                        [activeTab]: item
                                    })}
                                    className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border-2 flex items-center gap-2 ${(activeTab === "skinTone" ? filter.skinTone : filter.handShape) === item
                                        ? 'bg-brand-900 border-brand-900 text-white shadow-xl'
                                        : 'bg-white border-brand-900/5 text-brand-900/60 hover:border-brand-pink/30'
                                        }`}
                                >
                                    {item}
                                    {(activeTab === "skinTone" ? filter.skinTone : filter.handShape) === item && <Check className="w-3 h-3" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    <AnimatePresence mode="popLayout">
                        {filteredDesigns.map((design, index) => (
                            <motion.div
                                key={design.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative cursor-pointer"
                            >
                                <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl bg-brand-100 ring-1 ring-brand-900/5">
                                    <img
                                        src={design.imageUrl}
                                        alt={design.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/90 via-brand-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                                        <div className="space-y-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex gap-2 flex-wrap">
                                                {design.tags.map(tag => (
                                                    <span key={tag} className="text-[9px] font-black bg-white text-brand-pink px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-white font-display text-3xl font-black tracking-tight leading-tight">{design.title}</h3>
                                            <div className="flex items-center gap-3 text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">
                                                <span>{design.skinTone}</span>
                                                <span className="opacity-40">•</span>
                                                <span>{design.handShape}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {design.isTrending && (
                                        <div className="absolute top-8 left-8 bg-brand-orange text-white px-5 py-2 rounded-2xl flex items-center gap-2 shadow-2xl shadow-brand-orange/30 group-hover:bg-brand-purple transition-colors">
                                            <Sparkles className="w-4 h-4 animate-spin-slow" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Hot Trend</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="flex justify-center pt-8">
                    <button className="flex items-center gap-3 text-brand-900 font-black text-xs uppercase tracking-[0.3em] hover:text-brand-pink transition-all group">
                        Explore Full Art Catalog
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
