"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function Hero() {
    const { t, language } = useLanguage();

    return (
        <section className="relative h-screen min-h-[640px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-cloud" aria-label="Cover">
            {/* Left Column: Typography */}
            <div className="flex flex-col justify-center px-8 md:px-20 lg:px-16 xl:px-24 pt-32 pb-20 relative z-10 w-full">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
                    className="text-[12px] tracking-[5px] text-gold uppercase mb-16 flex items-center gap-4"
                >
                    <div className="w-8 h-px bg-gold-pale" />
                    <span>{t('h-eyebrow')}</span>
                </motion.div>

                <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="font-serif font-light text-[clamp(52px,7vw,88px)] leading-none tracking-[0.06em] text-ink uppercase"
                >
                    <span>REMY</span><br />
                    <span className="italic text-gold-deep tracking-[0.08em]">Muse</span>
                </motion.h1>

                <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="text-[12px] tracking-[5px] text-ink-light uppercase mt-6"
                >
                    {t('h-sub')}
                </motion.p>

                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: 40, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="h-px bg-gold my-10"
                />

                <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    className="font-serif italic font-light text-[18px] leading-[1.8] text-ink-mid max-w-xs"
                    dangerouslySetInnerHTML={{ __html: t('h-quote') }}
                />
            </div>

            {/* Right Column: Visual Collage */}
            <div className="relative overflow-hidden hidden lg:block h-full">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                        backgroundImage: `linear-gradient(to right, var(--color-cloud) 0%, transparent 15%), url('https://images.unsplash.com/photo-1632345031435-09506637dae6?auto=format&fit=crop&q=80&w=1200')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cloud via-cloud/30 to-transparent" />
                
                {/* Floating CSS Nail Shapes */}
                <NailShape className="w-[90px] h-[120px] top-[15%] left-[52%] -rotate-8 animate-float1" />
                <NailShape className="w-[70px] h-[94px] top-[10%] left-[68%] rotate-5 animate-float2" />
                <NailShape className="w-[60px] h-[80px] top-[32%] left-[78%] -rotate-3 animate-float3" />
                <NailShape className="w-[80px] h-[108px] top-[48%] left-[58%] rotate-12 animate-float1 [animation-direction:reverse]" />
                <NailShape className="w-[54px] h-[72px] top-[62%] left-[76%] -rotate-18 animate-float2" />
                <NailShape className="w-[100px] h-[134px] top-[25%] left-[42%] rotate-2 animate-float3 [animation-direction:reverse]" />
            </div>

            {/* Scroll Cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="absolute bottom-10 left-8 md:left-20 z-10 flex flex-col items-center gap-2"
            >
                <div className="w-px h-[50px] bg-gradient-to-b from-gold-pale to-transparent relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-5 bg-gold animate-scroll" />
                </div>
                <span className="text-[10px] tracking-[3px] text-ink-ghost uppercase [writing-mode:vertical-rl] font-sans">
                    {t('h-scroll')}
                </span>
            </motion.div>
        </section>
    );
}

function NailShape({ className }: { className?: string }) {
    return (
        <div 
            className={`absolute rounded-[48%/52%_52%_48%_/_60%_60%_40%_40%] bg-gradient-to-br from-white/80 via-cloud-3/40 to-gold/15 border border-white/85 shadow-[0_12px_40px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(196,169,106,0.2)] ${className}`}
        >
            <div className="absolute top-[8%] left-[15%] w-[30%] h-[35%] rounded-full bg-gradient-radial from-white/90 to-transparent -rotate-[30deg]" />
        </div>
    );
}

