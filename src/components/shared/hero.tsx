"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center px-8 md:px-20 pt-20 overflow-hidden bg-cloud">
            <div className="editorial-grid w-full items-center">
                <div className="col-span-12 md:col-span-6 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-ink mb-8">
                            The <span className="italic text-primary">Art</span> of <br /> Precision.
                        </h1>
                        <p className="font-serif text-secondary text-lg md:text-xl max-w-md mb-12 leading-relaxed font-light">
                            {t('h-quote').replace(/<\/?span>/g, '').replace('<br />', ' ')}
                        </p>
                        <div className="flex items-center space-x-8">
                            <button className="px-10 py-4 shimmer-gold text-white font-serif uppercase tracking-[0.2em] text-sm rounded-xs hover:scale-105 transition-transform duration-300">
                                Explore Atelier
                            </button>
                            <a className="font-serif uppercase tracking-widest text-xs border-b border-primary/30 pb-1 hover:border-primary transition-colors cursor-pointer" href="#philosophy">
                                The Philosophy
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="col-span-12 md:col-span-6 mt-12 md:mt-0 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="aspect-[4/5] w-full bg-surface-variant overflow-hidden relative shadow-2xl"
                    >
                        <img 
                            src="/images/hero-main.jpeg"
                            alt="Luxury macro nail art"
                            className="w-full h-full object-cover grayscale-[0.2] hover:scale-110 transition-transform duration-[2000ms]"
                        />
                    </motion.div>
                    
                    {/* Asymmetric Floating Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute -bottom-12 -left-12 hidden lg:block w-64 aspect-square bg-[#e4e2dd] shadow-2xl p-4 z-20"
                    >
                        <img 
                            src="/images/Luckycat.jpeg"
                            alt="Interior detail"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Subtle decorative shapes */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                <NailShape className="w-[120px] h-[160px] top-[10%] right-[5%] -rotate-12" />
                <NailShape className="w-[80px] h-[110px] bottom-[20%] left-[2%] rotate-45" />
            </div>
        </section>
    );
}

function NailShape({ className }: { className?: string }) {
    return (
        <div 
            className={`absolute rounded-[48%/52%_52%_48%_/_60%_60%_40%_40%] bg-gradient-to-br from-white/30 via-gold-pale/20 to-primary/5 border border-white/40 shadow-sm ${className}`}
        />
    );
}
