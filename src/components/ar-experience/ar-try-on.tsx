"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Camera, Smartphone } from "lucide-react";

export default function ARTryOn() {
    const [activeColor, setActiveColor] = useState("#bf953f"); // Gold
    const [activeShape, setActiveShape] = useState("Almond");

    const shapes = [
        { name: "Almond", path: "M50,10 C70,10 90,40 90,70 C90,85 70,100 50,100 C30,100 10,85 10,70 C10,40 30,10 50,10 Z" },
        { name: "Square", path: "M10,10 L90,10 L90,90 C90,95 85,100 80,100 L20,100 C15,100 10,95 10,90 Z" },
        { name: "Stiletto", path: "M50,0 C65,20 85,60 85,85 C85,95 70,100 50,100 C30,100 15,95 15,85 C15,60 35,20 50,0 Z" }
    ];

    const colors = [
        { name: "Pure Gold", hex: "#bf953f", label: "01" },
        { name: "Onyx Ink", hex: "#1B1C19", label: "02" },
        { name: "Cloud Mist", hex: "#EAE7E1", label: "03" },
        { name: "Rose Quartz", hex: "#D4AF37", label: "04" }
    ];

    return (
        <section id="ar" className="py-32 px-8 md:px-20 bg-ink relative overflow-hidden text-white">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <Sparkles className="w-4 h-4" />
                            <span>Neural Artistry</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-serif font-light tracking-tight leading-[1.05]">
                            The <span className="italic text-primary">Digital Mirror</span>
                        </h2>
                        <p className="font-serif text-ink-ghost italic text-lg leading-relaxed max-w-md">
                            Experience our Muse Sculpt shapes and bespoke palettes in real-time through augmented precision.
                        </p>
                    </div>

                    <div className="space-y-10 pt-8 border-t border-gold-pale/10">
                        <div className="space-y-4">
                            <span className="font-sans text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Architectural Shape</span>
                            <div className="flex gap-6">
                                {shapes.map((s) => (
                                    <button 
                                        key={s.name}
                                        onClick={() => setActiveShape(s.name)}
                                        className={`font-serif text-sm tracking-widest uppercase transition-all border-b pb-1 cursor-pointer ${activeShape === s.name ? 'text-white border-primary' : 'text-ink-ghost border-transparent hover:text-white'}`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <span className="font-sans text-[9px] font-bold text-primary uppercase tracking-[0.3em]">Signature Palette</span>
                            <div className="flex gap-4">
                                {colors.map((c) => (
                                    <button 
                                        key={c.name}
                                        onClick={() => setActiveColor(c.hex)}
                                        className="relative group p-1"
                                        aria-label={c.name}
                                    >
                                        <div 
                                            className={`w-10 h-10 rounded-full transition-transform duration-500 group-hover:scale-110 cursor-pointer ${activeColor === c.hex ? 'ring-1 ring-white ring-offset-2 ring-offset-ink' : ''}`}
                                            style={{ backgroundColor: c.hex }}
                                        />
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-sans text-ink-ghost opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest whitespace-nowrap">
                                            {c.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 flex items-center gap-12">
                        <div className="flex items-center gap-3">
                            <Camera className="w-5 h-5 text-primary" />
                            <span className="font-serif text-[10px] uppercase tracking-[0.3em]">Live Feed</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Smartphone className="w-5 h-5 text-ink-ghost" />
                            <span className="font-serif text-[10px] uppercase tracking-[0.3em] text-ink-ghost">Mobile Ready</span>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-square md:aspect-[4/5] bg-cloud/5 overflow-hidden border border-gold-pale/10 shadow-2xl">
                    {/* Simulated Camera Feed */}
                    <img 
                        src="https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=1200" 
                        alt="Macro hand shot"
                        className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                    />
                    
                    {/* Interaction Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center p-20">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeShape + activeColor}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative w-48 aspect-[1/3]"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                    <path 
                                        d={shapes.find(s => s.name === activeShape)?.path} 
                                        fill={activeColor} 
                                        className="transition-all duration-1000"
                                    />
                                    {/* Lustre Polish Highlight */}
                                    <path 
                                        d={shapes.find(s => s.name === activeShape)?.path} 
                                        fill="url(#gold-shine)" 
                                        className="opacity-40 mix-blend-overlay"
                                    />
                                    <defs>
                                        <linearGradient id="gold-shine" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                                            <stop offset="50%" stopColor="white" stopOpacity="0" />
                                            <stop offset="100%" stopColor="white" stopOpacity="0.5" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="absolute top-8 left-8 flex items-center gap-4">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="font-sans text-[8px] font-bold tracking-[0.5em] uppercase">Processing Core Vision</span>
                    </div>

                    {/* Scanner Line */}
                    <motion.div 
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-px bg-primary/20 pointer-events-none z-10"
                    />
                </div>
            </div>
        </section>
    );
}
