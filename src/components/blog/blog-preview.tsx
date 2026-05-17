"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { getPosts, Post } from "@/lib/data/editorial";

export default function BlogPreview() {
    const { t, language } = useLanguage();
    const lang = language === "VN" ? "VN" : "EN";
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            const data = await getPosts();
            if (data && data.length > 0) {
                // 3 bài: trending trước, sau đó 2 bài mới nhất
                const trending = data.find((p) => p.is_trending);
                const latest = data.filter((p) => !p.is_trending).slice(0, trending ? 2 : 3);
                const selectedPosts = [trending, ...latest].filter(Boolean) as Post[];
                setPosts(selectedPosts);
            }
            setLoading(false);
        }
        fetchPosts();
    }, []);

    // Helper functions to get localized content
    const getTitle = (p: Post) => lang === "VN" ? p.title_vn : p.title_en;
    const getCategory = (p: Post) => lang === "VN" ? p.category_vn : p.category_en;
    const getReadTime = (p: Post) => lang === "VN" ? p.read_time_vn : p.read_time_en;
    const getExcerpt = (p: Post) => lang === "VN" ? p.excerpt_vn : p.excerpt_en;
    
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (lang === "VN") {
            return `${date.getDate()} Thg ${date.getMonth() + 1}, ${date.getFullYear()}`;
        }
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    if (loading) {
        return (
            <section id="blog" className="py-32 px-8 md:px-20 bg-cloud overflow-hidden min-h-[600px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </section>
        );
    }

    if (posts.length === 0) return null;

    return (
        <section id="blog" className="py-32 px-8 md:px-20 bg-cloud overflow-hidden">
            <div className="max-w-[1400px] mx-auto">

                {/* ── Header Row ── */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <BookOpen className="w-4 h-4" />
                            <span>{t('bp-label')}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ink">
                            <span className="italic text-primary">
                                {t('bp-title')}
                            </span>
                        </h2>
                    </div>
                    <p className="font-serif text-ink-light text-lg max-w-sm italic leading-relaxed">
                        {t('bp-desc')}
                    </p>
                </div>

                {/* ── 3-Column Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold-pale/15 border border-gold-pale/15">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.12 }}
                        >
                            <Link
                                href={`/editorial/${post.slug}`}
                                className="group flex flex-col bg-cloud hover:bg-white/40 transition-all duration-500 h-full"
                            >
                                {/* Cover Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={post.cover_image_url || '/placeholder-image.jpg'}
                                        alt={getTitle(post)}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />

                                    {/* Trending badge — chỉ bài đầu */}
                                    {post.is_trending && index === 0 && (
                                        <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5">
                                            <TrendingUp className="w-3 h-3" />
                                            <span className="font-sans text-[8px] font-bold tracking-[0.3em] uppercase">
                                                {t('bp-trending')}
                                            </span>
                                        </div>
                                    )}

                                    {/* Index number — góc phải dưới */}
                                    <span className="absolute bottom-4 right-5 font-serif text-white/30 text-5xl font-light leading-none select-none">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-8 space-y-5">
                                    {/* Meta */}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <span className="block font-sans text-[9px] tracking-[0.3em] uppercase text-ink-ghost">
                                                {formatDate(post.published_date || post.created_at)}
                                            </span>
                                            <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-primary font-bold">
                                                {getCategory(post)}
                                            </span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-ink-ghost group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400 flex-shrink-0" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-serif text-2xl font-light leading-snug text-ink group-hover:text-primary transition-colors duration-500 flex-1">
                                        {getTitle(post)}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="font-sans text-sm text-ink-mid leading-relaxed line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        {getExcerpt(post)}
                                    </p>

                                    {/* Footer */}
                                    <div className="pt-5 border-t border-gold-pale/15 flex items-center justify-between">
                                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-ghost">
                                            {post.author}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 font-sans text-[9px] tracking-[0.2em] uppercase text-primary font-bold">
                                            <Clock className="w-2.5 h-2.5" /> {getReadTime(post)}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* ── View All CTA ── */}
                <div className="mt-16 flex justify-center">
                    <Link href="/editorial">
                        <button className="px-12 py-5 border border-gold-pale/40 text-ink font-serif uppercase tracking-[0.3em] text-xs hover:bg-ink hover:text-white transition-all duration-700">
                            {t('bp-view-all')}
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}