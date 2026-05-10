"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/mock-data";
import { useLanguage } from "@/lib/language-context";

export default function BlogPreview() {
    const { language } = useLanguage();
    const lang = language === "VN" ? "VN" : "EN";

    // 3 bài: trending trước, sau đó 2 bài mới nhất
    const trending = BLOG_POSTS.find((p) => p.isTrending);
    const latest = BLOG_POSTS.filter((p) => !p.isTrending).slice(0, 2);
    const posts = [trending, ...latest].filter(Boolean) as typeof BLOG_POSTS;

    return (
        <section id="blog" className="py-32 px-8 md:px-20 bg-cloud overflow-hidden">
            <div className="max-w-[1400px] mx-auto">

                {/* ── Header Row ── */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <BookOpen className="w-4 h-4" />
                            <span>{lang === "VN" ? "Góc Chia Sẻ" : "Insights"}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ink">
                            <span className="italic text-primary">
                                {lang === "VN" ? "Góc Chia Sẻ" : "Insights"}
                            </span>
                        </h2>
                    </div>
                    <p className="font-serif text-ink-light text-lg max-w-sm italic leading-relaxed">
                        {lang === "VN"
                            ? "Mẹo vặt, xu hướng và ý tưởng đơn giản cho đôi tay của bạn."
                            : "Simple tips, trends, and ideas for your nails."}
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
                                        src={post.coverImage}
                                        alt={post.title[lang]}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />

                                    {/* Trending badge — chỉ bài đầu */}
                                    {post.isTrending && (
                                        <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5">
                                            <TrendingUp className="w-3 h-3" />
                                            <span className="font-sans text-[8px] font-bold tracking-[0.3em] uppercase">
                                                {lang === "VN" ? "Nổi Bật" : "Editor's Pick"}
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
                                                {post.date[lang]}
                                            </span>
                                            <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-primary font-bold">
                                                {post.category[lang]}
                                            </span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-ink-ghost group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-400 flex-shrink-0" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="font-serif text-2xl font-light leading-snug text-ink group-hover:text-primary transition-colors duration-500 flex-1">
                                        {post.title[lang]}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="font-sans text-sm text-ink-mid leading-relaxed line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        {post.excerpt[lang]}
                                    </p>

                                    {/* Footer */}
                                    <div className="pt-5 border-t border-gold-pale/15 flex items-center justify-between">
                                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-ghost">
                                            {post.author}
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 font-sans text-[9px] tracking-[0.2em] uppercase text-primary font-bold">
                                            <Clock className="w-2.5 h-2.5" /> {post.readTime[lang]}
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
                            {lang === "VN" ? "Xem Tất Cả Bài Viết" : "Explore Full Library"}
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}