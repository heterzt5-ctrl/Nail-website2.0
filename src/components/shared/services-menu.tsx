"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Heart, Star, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import GlassCard from "./glass-card";

const services = [
    {
        id: "glass",
        icon: <Star className="w-6 h-6" />,
        name: "Glass Nails Signature",
        price: "650k+",
        desc: "Hiệu ứng gương trong suốt đỉnh cao, xu hướng hot nhất 2026.",
        tag: "Most Popular",
        color: "brand-pink",
    },
    {
        id: "3d",
        icon: <Zap className="w-6 h-6" />,
        name: "3D Art Sculpture",
        price: "1.200k+",
        desc: "Nghệ thuật đắp nổi thủ công, biến móng tay thành tác phẩm điêu khắc.",
        tag: "Expert Choice",
        color: "brand-orange",
    },
    {
        id: "biotin",
        icon: <Heart className="w-6 h-6" />,
        name: "Biotin Recovery Ritual",
        price: "450k+",
        desc: "Liệu trình phục hồi móng yếu bằng tinh chất Biotin & Collagen.",
        tag: "Essential",
        color: "brand-purple",
    }
];

export default function ServicesMenu() {
    const { t } = useLanguage();

    return (
        <section id="services" className="py-32 px-4 bg-white relative">
            <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-brand-orange/5 blur-[100px] -z-10 rounded-full" />

            <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 text-brand-pink text-xs font-black tracking-[0.3em] uppercase">
                        <Sparkles className="w-4 h-4" />
                        <span>Master Menu</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none">
                        {t("servicesTitle")} <br />
                        <span className="italic font-light text-brand-pink">{t("servicesSubtitle")}</span>
                    </h2>
                    <p className="text-brand-900/50 text-xl font-bold">{t("servicesDesc")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <GlassCard className={`h-full p-10 relative overflow-hidden group hover:border-${service.color}/40 transition-all border-2 border-transparent bg-brand-50/30`}>
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${service.color}/5 blur-3xl -z-10 group-hover:bg-${service.color}/20 transition-all`} />

                                <div className="space-y-8 h-full flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <div className={`p-4 rounded-2xl bg-${service.color}/10 text-${service.color} shadow-lg shadow-${service.color}/10 group-hover:scale-110 transition-transform`}>
                                            {service.icon}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-${service.color}/10 text-${service.color}`}>
                                            {service.tag}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-brand-900 leading-tight">{service.name}</h3>
                                        <p className="text-brand-900/60 font-medium leading-relaxed">{service.desc}</p>
                                    </div>

                                    <div className="mt-auto pt-8 flex items-end justify-between">
                                        <div>
                                            <p className="text-[10px] font-black text-brand-900/30 uppercase tracking-widest">Starting from</p>
                                            <p className={`text-3xl font-black text-${service.color}`}>{service.price}</p>
                                        </div>
                                        <button className={`w-12 h-12 rounded-full border-2 border-brand-900/5 flex items-center justify-center text-brand-900 hover:bg-brand-900 hover:text-white transition-all group-hover:rotate-45`}>
                                            <ArrowUpRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="px-12 py-6 rounded-full bg-brand-900 text-white font-black text-lg hover:bg-brand-pink hover:scale-105 transition-all shadow-2xl shadow-brand-900/20">
                        View All Services & Add-ons
                    </button>
                </div>
            </div>
        </section>
    );
}
