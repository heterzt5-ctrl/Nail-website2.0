"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { NAIL_DESIGNS } from "@/lib/mock-data";


// Height map for each item by its `span` property — creates true editorial asymmetry
const HEIGHT_CLASS: Record<string, string> = {
    tall: "aspect-[3/5]",
    short: "aspect-[4/3]",
};

export default function VirtualConsultant() {
    const [filter, setFilter] = useState({
        skinTone: "All",
        handShape: "All",
    });
    const [activeTab, setActiveTab] = useState<"skinTone" | "handShape">("skinTone");
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const filteredDesigns = NAIL_DESIGNS.filter((d) => {
        return (
            (filter.skinTone === "All" || d.skinTone === filter.skinTone) &&
            (filter.handShape === "All" || d.handShape === filter.handShape)
        );
    }).slice(0, 6);

    const skinTones = ["All", "Fair", "Tan", "Deep"];
    const handShapes = ["All", "Almond", "Square", "Round"];

    // Distribute into 3 columns — editorial pattern: [0,3], [1,4], [2,5]
    const col1 = filteredDesigns.filter((_, i) => i % 3 === 0);
    const col2 = filteredDesigns.filter((_, i) => i % 3 === 1);
    const col3 = filteredDesigns.filter((_, i) => i % 3 === 2);

    const renderCard = (design: (typeof NAIL_DESIGNS)[0], globalIndex: number) => (
        <motion.div
            key={design.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.8, delay: globalIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative cursor-pointer"
            onMouseEnter={() => setHoveredId(design.id)}
            onMouseLeave={() => setHoveredId(null)}
        >
            <div className={`relative ${HEIGHT_CLASS[design.span ?? "short"]} bg-surface-variant overflow-hidden`}>
                {/* Image */}
                <img
                    src={design.imageUrl}
                    alt={design.title}
                    className={`w-full h-full object-cover transition-all duration-[1800ms] ease-in-out
                        ${hoveredId === design.id ? "scale-105 grayscale-0" : "scale-100 grayscale-[0.25]"}`}
                />

                {/* Subtle overlay */}
                <div className={`absolute inset-0 bg-ink transition-opacity duration-700
                    ${hoveredId === design.id ? "opacity-20" : "opacity-0"}`} />

                {/* Trending badge */}
                {design.isTrending && (
                    <div className="absolute top-5 left-5 z-10">
                        <span className="font-sans text-[8px] font-bold tracking-[0.3em] uppercase bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5">
                            Trending
                        </span>
                    </div>
                )}

                {/* Hover info card — slides up from bottom */}
                <div className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ease-in-out
                    ${hoveredId === design.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <div className="bg-white/95 backdrop-blur-md px-7 py-6 space-y-3">
                        <div className="flex gap-2 flex-wrap">
                            {design.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[8px] font-sans font-bold text-primary border border-primary/20 px-3 py-1 uppercase tracking-[0.2em]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-end justify-between">
                            <h3 className="font-serif text-lg text-ink tracking-tight leading-tight">
                                {design.title}
                            </h3>
                            <ArrowUpRight className="w-4 h-4 text-primary flex-shrink-0 mb-0.5" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <section id="portfolio" className="py-32 px-8 md:px-20 bg-cloud relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto space-y-20 relative z-10">

                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 border-b border-gold-pale/10 pb-16">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <Filter className="w-4 h-4" />
                            <span>Precision Gallery</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ink leading-[1.1]">
                            The <span className="italic text-primary">Portfolio</span>
                        </h2>
                        <p className="max-w-md text-ink-light font-serif italic text-lg leading-relaxed">
                            Curated selections of bespoke nail architectural designs, filtered for your aesthetic identity.
                        </p>
                    </div>

                    {/* Filter Controls */}
                    <div className="w-full lg:max-w-md space-y-8">
                        <div className="flex gap-8 border-b border-gold-pale/10 pb-4">
                            <button
                                onClick={() => setActiveTab("skinTone")}
                                className={`text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-all cursor-pointer ${activeTab === "skinTone" ? "text-primary" : "text-ink-ghost hover:text-ink-mid"}`}
                                aria-pressed={activeTab === "skinTone"}
                            >
                                Skin Tone
                            </button>
                            <button
                                onClick={() => setActiveTab("handShape")}
                                className={`text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-all cursor-pointer ${activeTab === "handShape" ? "text-primary" : "text-ink-ghost hover:text-ink-mid"}`}
                                aria-pressed={activeTab === "handShape"}
                            >
                                Hand Shape
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {(activeTab === "skinTone" ? skinTones : handShapes).map((item) => (
                                <button
                                    key={item}
                                    onClick={() =>
                                        setFilter({ ...filter, [activeTab]: item })
                                    }
                                    className={`px-5 py-2.5 rounded-xs text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition-all border flex items-center gap-2 cursor-pointer
                                        ${(activeTab === "skinTone" ? filter.skinTone : filter.handShape) === item
                                            ? "bg-ink border-ink text-white shadow-xl"
                                            : "bg-transparent border-gold-pale/30 text-ink-ghost hover:border-primary/50"}`}
                                >
                                    {item}
                                    {(activeTab === "skinTone" ? filter.skinTone : filter.handShape) === item && (
                                        <Check className="w-3 h-3" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3-Column Masonry Grid */}
                <AnimatePresence mode="popLayout">
                    {filteredDesigns.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                            {/* Column 1 */}
                            <div className="flex flex-col gap-4">
                                {col1.map((d, i) => renderCard(d, i * 3))}
                            </div>
                            {/* Column 2 — offset top for editorial asymmetry */}
                            <div className="flex flex-col gap-4 lg:mt-16">
                                {col2.map((d, i) => renderCard(d, i * 3 + 1))}
                            </div>
                            {/* Column 3 */}
                            <div className="flex flex-col gap-4">
                                {col3.map((d, i) => renderCard(d, i * 3 + 2))}
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-32 text-center space-y-6"
                        >
                            <p className="font-serif text-3xl text-ink-ghost font-light italic">
                                No designs match your selection.
                            </p>
                            <button
                                onClick={() => setFilter({ skinTone: "All", handShape: "All" })}
                                className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary border-b border-primary/30 pb-1 hover:tracking-[0.4em] transition-all"
                            >
                                Clear Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA — links to Stitch full gallery */}
                <div className="flex flex-col items-center gap-4 pt-8">
                    <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-ink-ghost">
                        {filteredDesigns.length} of {NAIL_DESIGNS.length} curated works
                    </p>
                    <a
                        href="/gallery"
                        className="group inline-flex items-center gap-4 font-serif text-xs uppercase tracking-[0.4em] text-primary border-b border-primary/30 pb-2 hover:tracking-[0.5em] hover:border-primary transition-all duration-700"
                    >
                        View Full Atelier Catalog
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </a>
                </div>
            </div>
        </section>
    );
}
