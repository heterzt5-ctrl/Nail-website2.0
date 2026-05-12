"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Filter, Check, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { GalleryItem } from "@/types/gallery";
import { useLanguage } from "@/lib/language-context";

// Static fallback: 6 ảnh sẵn có trong /gallery
const STATIC_ITEMS: GalleryItem[] = [
    { id: "s1", src: "/gallery/RemyMuse-nail1.jpeg", storage_path: "", type: "image", category: "Chrome", title: "Signature Glass", description: "", span: "tall", is_trending: true,  tags: "[]", order: 0, is_active: true, created_at: "", updated_at: "" },
    { id: "s2", src: "/gallery/RemyMuse-nail3.jpeg", storage_path: "", type: "image", category: "Bridal",  title: "Celestial Petals", description: "", span: "short", is_trending: false, tags: "[]", order: 1, is_active: true, created_at: "", updated_at: "" },
    { id: "s3", src: "/gallery/RemyMuse-nail5.jpeg", storage_path: "", type: "image", category: "Ombre",   title: "Aurora Bliss",    description: "", span: "short", is_trending: false, tags: "[]", order: 2, is_active: true, created_at: "", updated_at: "" },
    { id: "s4", src: "/gallery/RemyMuse-nail7.jpeg", storage_path: "", type: "image", category: "Marble Luxe", title: "Emerald Kintsugi", description: "", span: "tall", is_trending: false, tags: "[]", order: 3, is_active: true, created_at: "", updated_at: "" },
    { id: "s5", src: "/gallery/RemyMuse-nail9.jpeg", storage_path: "", type: "image", category: "Bridal",  title: "Pearl Bloom",     description: "", span: "short", is_trending: false, tags: "[]", order: 4, is_active: true, created_at: "", updated_at: "" },
    { id: "s6", src: "/gallery/RemyMuse-nail11.jpeg",storage_path: "", type: "image", category: "Nail art",title: "Gilded Line Art", description: "", span: "short", is_trending: false, tags: "[]", order: 5, is_active: true, created_at: "", updated_at: "" },
];

// Height map for each item by its `span` property — creates true editorial asymmetry
const HEIGHT_CLASS: Record<string, string> = {
    tall: "aspect-[3/5]",
    short: "aspect-[4/3]",
};

export default function VirtualConsultant() {
    const { language } = useLanguage();
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [designs, setDesigns] = useState<GalleryItem[]>(STATIC_ITEMS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDesigns = async () => {
            try {
                const { data, error } = await supabase
                    .from("gallery_items")
                    .select("*")
                    .eq("is_active", true)
                    .order("created_at", { ascending: false })
                    .limit(6);

                if (!error && data && data.length > 0) {
                    setDesigns(data);
                }
            } catch (e) {
                console.error("Failed to fetch gallery items", e);
            }
            setLoading(false);
        };
        fetchDesigns();
    }, []);

    // Distribute into 3 columns — editorial pattern: [0,3], [1,4], [2,5]
    const col1 = designs.filter((_, i) => i % 3 === 0);
    const col2 = designs.filter((_, i) => i % 3 === 1);
    const col3 = designs.filter((_, i) => i % 3 === 2);

    const renderCard = (design: GalleryItem, globalIndex: number) => {
        let tags: string[] = [];
        try {
            tags = typeof design.tags === 'string' ? JSON.parse(design.tags) : design.tags;
        } catch(e) {
            tags = [design.category];
        }

        return (
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
                <Image
                    src={design.src}
                    alt={design.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-all duration-[1800ms] ease-in-out
                        ${hoveredId === design.id ? "scale-105 grayscale-0" : "scale-100 grayscale-[0.25]"}`}
                    unoptimized={!design.src.includes("supabase")}
                />

                {/* Subtle overlay */}
                <div className={`absolute inset-0 bg-ink transition-opacity duration-700
                    ${hoveredId === design.id ? "opacity-20" : "opacity-0"}`} />

                {/* Trending badge */}
                {design.is_trending && (
                    <div className="absolute top-5 left-5 z-10">
                        <span className="font-sans text-[8px] font-bold tracking-[0.3em] uppercase bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5">
                            {language === "VN" ? "Xu Hướng" : "Trending"}
                        </span>
                    </div>
                )}

                {/* Hover info card — slides up from bottom */}
                <div className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ease-in-out
                    ${hoveredId === design.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                    <div className="bg-white/95 backdrop-blur-md px-7 py-6 space-y-3">
                        <div className="flex gap-2 flex-wrap">
                            {tags.map((tag) => (
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
    };

    return (
        <section id="portfolio" className="py-32 px-8 md:px-20 bg-cloud relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto space-y-20 relative z-10">

                {/* Header Row */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16 border-b border-gold-pale/10 pb-16">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <Filter className="w-4 h-4" />
                            <span>{language === "VN" ? "Bộ Sưu Tập" : "Precision Gallery"}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ink leading-[1.1]">
                            {language === "VN" ? "Thư Viện" : "The"} <span className="italic text-primary">{language === "VN" ? "Thiết Kế" : "Portfolio"}</span>
                        </h2>
                        <p className="max-w-md text-ink-light font-serif italic text-lg leading-relaxed">
                            {language === "VN" ? "Các mẫu thiết kế đơn giản, tinh tế cho ngày thường và dịp đặc biệt." : "Simple, clean designs for everyday and special moments."}
                        </p>
                    </div>
                </div>

                {/* 3-Column Masonry Grid */}
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="aspect-[4/3] bg-ink/5 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                            ))}
                        </div>
                    ) : designs.length > 0 ? (
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
                                {language === "VN" ? "Không có mẫu nào phù hợp với lựa chọn của bạn." : "No designs match your selection."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA — links to Stitch full gallery */}
                <div className="flex flex-col items-center gap-4 pt-8">
                    <p className="font-sans text-[9px] tracking-[0.4em] uppercase text-ink-ghost">
                        {language === "VN" ? "Các tác phẩm nổi bật mới nhất" : "Latest featured works"}
                    </p>
                    <a
                        href="/gallery"
                        className="group inline-flex items-center gap-4 font-serif text-xs uppercase tracking-[0.4em] text-primary border-b border-primary/30 pb-2 hover:tracking-[0.5em] hover:border-primary transition-all duration-700"
                    >
                        {language === "VN" ? "Xem Toàn Bộ Thư Viện" : "View Full Gallery"}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                    </a>
                </div>
            </div>
        </section>
    );
}
