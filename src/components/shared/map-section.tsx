"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, Sparkles } from "lucide-react";
import GlassCard from "./glass-card";

export default function MapSection() {
    return (
        <section id="location" className="py-32 px-4 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-pink/20 to-transparent" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-12 order-2 lg:order-1">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-brand-orange text-xs font-black tracking-[0.3em] uppercase">
                            <MapPin className="w-4 h-4" />
                            <span>Visit Us</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-[0.9]">
                            Find Our <br /> <span className="text-brand-pink">Sanctuary</span>
                        </h2>
                        <p className="max-w-md text-brand-900/60 font-bold text-lg">
                            Located in the heart of District 1, our salon is a haven for digital art and physical relaxation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-black text-brand-900">Opening Hours</h4>
                                <p className="text-sm text-brand-900/50 font-bold uppercase tracking-widest">Mon - Sun • 09:00 - 21:00</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-brand-pink/10 rounded-2xl flex items-center justify-center text-brand-pink">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-black text-brand-900">Direct Line</h4>
                                <p className="text-sm text-brand-900/50 font-bold uppercase tracking-widest">+84 2026 888 999</p>
                            </div>
                        </div>
                    </div>

                    <button className="bg-brand-900 text-white px-10 py-5 rounded-full font-black text-lg shadow-xl shadow-brand-900/20 hover:scale-105 hover:bg-brand-pink transition-all flex items-center gap-3 w-fit">
                        Get Directions
                        <Navigation className="w-5 h-5" />
                    </button>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative order-1 lg:order-2"
                >
                    <div className="relative z-10 rounded-[50px] overflow-hidden aspect-[4/3] shadow-2xl border-8 border-brand-50">
                        <img
                            src="/mockups/map.png"
                            alt="Salon Location Map"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-brand-pink/5 pointer-events-none" />

                        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="relative">
                                <div className="absolute -inset-8 bg-brand-pink/20 blur-2xl animate-pulse rounded-full" />
                                <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center relative border-4 border-brand-pink">
                                    <Sparkles className="w-8 h-8 text-brand-pink fill-brand-pink animate-spin-slow" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <GlassCard className="absolute -bottom-8 -right-8 max-w-[280px] z-20 glass-vibrant p-8">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-brand-pink uppercase tracking-widest">Aesthetic Hub</p>
                            <p className="text-lg font-black leading-tight text-brand-900">Level 2, 88 Aesthetic St. Saigon Center</p>
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-brand-100 shadow-sm">
                                        <img src={`https://i.pravatar.cc/100?u=visitor-${i}`} alt="Visitor" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-4 border-white bg-brand-orange flex items-center justify-center text-[10px] font-black text-white shadow-sm">
                                    +800
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
