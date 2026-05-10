"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export default function Hero() {
    const { t, language } = useLanguage();

    return (
        <section className="relative min-h-screen flex items-center px-8 md:px-20 pt-20 pb-24 bg-[#F0EEE9]">

            {/* === EDITORIAL GRID === */}
            <div
                className="w-full items-center"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: "1rem",
                }}
            >

                {/* === LEFT COLUMN: Text Content === */}
                <div className="col-span-12 md:col-span-6 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >


                        {/* Main Heading */}
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-[#1b1c19] mb-8">
                            The{" "}
                            <span className="italic text-[#735c00]">Art</span>
                            {" "}of{" "}
                            <br />
                            Precision.
                        </h1>

                        {/* Subheading */}
                        <p className="font-serif text-[#5d5e5f] text-lg md:text-xl max-w-md mb-12 leading-relaxed font-light">
                            {t("h-quote")
                                .replace(/<\/?span>/g, "")
                                .replace("<br />", " ")}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex items-center space-x-8">
                            <Link
                                href="/#services"
                                className="px-10 py-4 text-white font-serif uppercase tracking-[0.2em] text-sm rounded-sm hover:scale-[1.02] transition-transform duration-300"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #735c00 0%, #d4af37 100%)",
                                }}
                            >
                                {language === "VN"
                                    ? "Khám Phá Atelier"
                                    : "Explore Atelier"}
                            </Link>
                            <Link
                                className="font-serif uppercase tracking-widest text-xs border-b border-[#735c00]/30 pb-1 hover:border-[#735c00] transition-colors cursor-pointer text-[#1b1c19]"
                                href="/#philosophy"
                            >
                                {language === "VN" ? "Về Chúng Tôi" : "About Us"}
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* === RIGHT COLUMN: Images === */}
                <div className="col-span-12 md:col-span-6 mt-12 md:mt-0 flex justify-center">

                    {/* Image composition wrapper — both images positioned relative to this */}
                    <div className="relative" style={{ width: "90%", paddingBottom: "3rem" }}>

                        {/* Main Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="aspect-[4/5] w-full bg-[#e4e2dd] overflow-hidden relative shadow-2xl"
                        >
                            <Image
                                src="/images/hero-main.jpeg"
                                alt="Luxury macro nail art"
                                fill
                                priority
                                className="object-cover grayscale-[0.2] hover:scale-110 transition-transform duration-[2000ms]"
                            />

                            {/* Decorative Gold Label — top-right, inside main image */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                                className="absolute top-4 right-4 z-10"
                            >
                                <span className="font-serif uppercase tracking-[0.25em] text-[10px] text-[#735c00] bg-[#F0EEE9]/80 px-3 py-1 border border-[#d4af37]/30">
                                    Digital Atelier
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Secondary Image — overlaps bottom-left of main image */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="absolute hidden lg:block z-20"
                            style={{
                                width: 200,
                                height: 200,
                                bottom: "1.5rem",   /* sits above the paddingBottom gap */
                                left: "-2.5rem",    /* bleeds left of the main image */
                            }}
                        >
                            <div className="w-full h-full bg-[#e4e2dd] shadow-2xl relative" style={{ padding: "10px" }}>
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src="/images/Luckycat.jpeg"
                                        alt="Lucky cat studio detail"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* === DECORATIVE BACKGROUND SHAPES === */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ overflow: "clip" }}>
                <NailShape className="w-[120px] h-[160px] top-[10%] right-[5%] -rotate-12" />
                <NailShape className="w-[80px] h-[110px] bottom-[20%] left-[2%] rotate-45" />
            </div>
        </section>
    );
}

function NailShape({ className }: { className?: string }) {
    return (
        <div
            className={`absolute rounded-[48%/52%_52%_48%_/_60%_60%_40%_40%] bg-gradient-to-br from-white/30 via-[#ffe08820] to-[#735c0010] border border-white/40 shadow-sm ${className}`}
        />
    );
}