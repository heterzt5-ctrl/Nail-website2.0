"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";
import { Clock, User, ArrowUpRight, TrendingUp } from "lucide-react";
import { Post } from "@/lib/data/editorial";

const CATEGORIES = {
    VN: ["Tất cả", "Nghệ thuật", "Chăm sóc", "Xu hướng"],
    EN: ["All", "Artistry", "Care", "Trends"],
};

export default function EditorialListClient({ initialPosts }: { initialPosts: Post[] }) {
    const { language } = useLanguage();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    const lang = language === "VN" ? "VN" : "EN";
    const cats = CATEGORIES[lang];

    // Filter posts by category
    const filtered = initialPosts.filter((p) => {
        if (activeCategory === "All" || activeCategory === "Tất cả") return true;
        const postCat = lang === "VN" ? p.category_vn : p.category_en;
        return postCat === activeCategory;
    });

    // Trending post (editor-picked)
    const trending = initialPosts.find((p) => p.is_trending);

    return (
        <main className="relative bg-cloud min-h-screen selection:bg-primary-container/30">
            <Header onOpenBooking={() => setIsBookingOpen(true)} />

            {/* ── Hero ── */}
            <section className="pt-36 pb-20 px-6 md:px-20 max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-primary font-bold">
                        {lang === "VN" ? "Tạp chí" : "Editorial"}
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight text-ink font-light">
                        {lang === "VN" ? (
                            <>Nghệ Thuật &amp; <span className="italic text-primary">Cảm Hứng</span></>
                        ) : (
                            <>Art &amp; <span className="italic text-primary">Insights</span></>
                        )}
                    </h1>
                    <p className="font-serif italic text-base md:text-lg leading-relaxed text-secondary max-w-xl">
                        {lang === "VN"
                            ? "Khám phá thế giới nghệ thuật móng tay cao cấp, xu hướng thẩm mỹ tinh tế và triết lý chăm sóc từ REMY MUSE."
                            : "Explore the world of high-end nail art, refined aesthetic trends, and care philosophies from REMY MUSE."}
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-8 mt-16 border-b border-gold-pale/20 pb-8">
                    {cats.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 pb-1 ${
                                activeCategory === cat
                                    ? "text-ink border-b border-primary font-bold"
                                    : "text-ink-light hover:text-primary"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Trending / Editor's Pick ── */}
            {trending && (activeCategory === "All" || activeCategory === "Tất cả") && (
                <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20 mb-24">
                    <Link href={`/editorial/${trending.slug}`} className="group block">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/40 backdrop-blur-sm border border-gold-pale/10 overflow-hidden hover:shadow-2xl transition-shadow duration-700">
                            {/* Image */}
                            <div className="col-span-1 lg:col-span-7 aspect-[16/9] lg:aspect-auto relative overflow-hidden">
                                {trending.cover_image_url && (
                                    <Image
                                        src={trending.cover_image_url}
                                        alt={lang === "VN" ? trending.title_vn : trending.title_en}
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                    />
                                )}
                                {/* Trending badge */}
                                <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-primary/90 text-white px-4 py-1.5">
                                    <TrendingUp className="w-3 h-3" />
                                    <span className="font-sans text-[8px] font-bold tracking-[0.25em] uppercase">
                                        {lang === "VN" ? "Nổi Bật" : "Editor's Pick"}
                                    </span>
                                </div>
                            </div>
                            {/* Content */}
                            <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-8 p-10 md:p-14">
                                <div className="space-y-2">
                                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-primary font-bold">
                                        {lang === "VN" ? trending.category_vn : trending.category_en}
                                    </span>
                                    <h2 className="font-serif text-3xl md:text-4xl leading-tight text-ink font-light italic group-hover:text-primary transition-colors duration-500">
                                        {lang === "VN" ? trending.title_vn : trending.title_en}
                                    </h2>
                                </div>
                                <p className="font-serif text-sm md:text-base leading-relaxed text-secondary italic">
                                    {lang === "VN" ? trending.excerpt_vn : trending.excerpt_en}
                                </p>
                                <div className="flex items-center gap-6 text-ink-light">
                                    <span className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em]">
                                        <Clock className="w-3 h-3" /> {lang === "VN" ? trending.read_time_vn : trending.read_time_en}
                                    </span>
                                    <span className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.2em]">
                                        <User className="w-3 h-3" /> {trending.author}
                                    </span>
                                </div>
                                <div className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.25em] text-primary font-bold group-hover:gap-4 transition-all duration-300">
                                    {lang === "VN" ? "Đọc Bài Viết" : "Read Article"}
                                    <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* ── Article Grid ── */}
            <section className="w-full max-w-[1440px] mx-auto px-6 md:px-20 mb-40">
                {filtered.length === 0 ? (
                    <p className="font-serif italic text-ink-light text-center py-24">
                        {lang === "VN" ? "Chưa có bài viết trong danh mục này." : "No articles in this category yet."}
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                        {filtered.map((post, idx) => {
                            const postTitle = lang === "VN" ? post.title_vn : post.title_en;
                            const postCategory = lang === "VN" ? post.category_vn : post.category_en;
                            const postReadTime = lang === "VN" ? post.read_time_vn : post.read_time_en;
                            const postExcerpt = lang === "VN" ? post.excerpt_vn : post.excerpt_en;
                            const postDate = new Date(post.published_date).toLocaleDateString(lang === "VN" ? 'vi-VN' : 'en-US', {
                                year: 'numeric', month: 'short', day: 'numeric'
                            });

                            return (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    className="group cursor-pointer"
                                >
                                    <Link href={`/editorial/${post.slug}`} className="flex flex-col space-y-6">
                                        {/* Cover */}
                                        <div className="aspect-[4/5] overflow-hidden relative bg-cloud-3">
                                            {post.cover_image_url && (
                                                <Image
                                                    src={post.cover_image_url}
                                                    alt={postTitle}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                                />
                                            )}
                                            {post.is_trending && (
                                                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-primary/85 text-white px-3 py-1">
                                                    <TrendingUp className="w-2.5 h-2.5" />
                                                    <span className="font-sans text-[7px] font-bold tracking-[0.25em] uppercase">
                                                        {lang === "VN" ? "Nổi Bật" : "Trending"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Meta + Content */}
                                        <div className="flex flex-col space-y-4">
                                            <div className="flex items-center gap-4">
                                                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-primary font-bold">
                                                    {postCategory}
                                                </span>
                                                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-light">
                                                    {postReadTime}
                                                </span>
                                            </div>
                                            <h3 className="font-serif text-2xl text-ink group-hover:text-primary transition-colors duration-500 leading-tight font-light">
                                                {postTitle}
                                            </h3>
                                            <p className="font-serif text-sm leading-relaxed text-secondary italic line-clamp-3">
                                                {postExcerpt}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gold-pale/10">
                                                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-ghost">
                                                    {postDate}
                                                </span>
                                                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-primary font-bold inline-flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                                                    {lang === "VN" ? "Đọc tiếp" : "Read more"}
                                                    <ArrowUpRight className="w-3 h-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            );
                        })}
                    </div>
                )}
            </section>

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            <Footer />
        </main>
    );
}
