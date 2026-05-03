"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";

export default function MapSection() {
    return (
        <section id="location" className="py-32 px-8 md:px-20 bg-cloud relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-16 order-2 lg:order-1">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <MapPin className="w-4 h-4" />
                            <span>Atelier Finder</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ink leading-[1.1]">
                            The <span className="italic text-primary">Sanctuary</span>
                        </h2>
                        <p className="max-w-md text-ink-light font-serif italic text-lg leading-relaxed">
                            Located in the heart of District 1, our salon is a haven for digital art and physical restoration.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-gold-pale/15 pt-16">
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-surface-variant flex items-center justify-center text-primary group hover:bg-ink hover:text-white transition-all duration-700">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-serif text-xl font-normal text-ink">Opening Hours</h4>
                                <p className="font-sans text-[10px] text-ink-ghost tracking-[0.3em] uppercase">Mon - Sun · 09:00 - 21:00</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="w-12 h-12 bg-surface-variant flex items-center justify-center text-primary group hover:bg-ink hover:text-white transition-all duration-700">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-serif text-xl font-normal text-ink">Direct Line</h4>
                                <p className="font-sans text-[10px] text-ink-ghost tracking-[0.3em] uppercase">+84 2026 888 999</p>
                            </div>
                        </div>
                    </div>

                    <button className="px-14 py-6 shimmer-gold text-white font-serif uppercase tracking-[0.3em] text-xs rounded-xs hover:scale-105 transition-transform duration-500 shadow-2xl flex items-center gap-4">
                        Get Directions
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
                    <div className="relative z-10 bg-surface-variant overflow-hidden aspect-[4/3] shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80&w=1200"
                            alt="Salon Location Map"
                            className="w-full h-full object-cover grayscale-[0.5]"
                        />
                        <div className="absolute inset-0 bg-gold-pale/10 pointer-events-none" />

                        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="relative">
                                <div className="absolute -inset-12 bg-primary/20 blur-3xl animate-pulse rounded-full" />
                                <div className="w-20 h-20 bg-white shadow-2xl flex items-center justify-center relative border border-gold-pale/30">
                                    <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute -bottom-10 -right-10 bg-white/95 backdrop-blur-md p-10 shadow-2xl max-w-[320px] z-30 hidden xl:block">
                        <div className="space-y-6">
                            <span className="font-sans text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Aesthetic Hub</span>
                            <p className="font-serif text-2xl text-ink leading-tight italic">Level 2, 88 Aesthetic St. Saigon Center</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
