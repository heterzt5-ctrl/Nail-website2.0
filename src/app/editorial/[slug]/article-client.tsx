"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";
import { useLanguage } from "@/lib/language-context";
import { BLOG_POSTS } from "@/lib/mock-data";

export default function ArticleClient({ post }: { post: any }) {
    const { language } = useLanguage();
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const lang = language === "VN" ? "VN" : "EN";
    const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
        <main className="relative bg-cloud min-h-screen selection:bg-primary-container/30">
            <Header onOpenBooking={() => setIsBookingOpen(true)} />

            {/* Hero */}
            <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
                <Image
                    src={post.coverImage}
                    alt={post.title[lang]}
                    fill
                    priority
                    className="object-cover grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cloud via-cloud/60 to-transparent" />

                {/* Back link */}
                <div className="absolute top-28 left-6 md:left-20 z-10">
                    <Link
                        href="/editorial"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[10px] font-sans uppercase tracking-[0.25em] transition-colors group"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        {lang === "VN" ? "Quay lại Editorial" : "Back to Editorial"}
                    </Link>
                </div>
            </section>

            {/* Article Content */}
            <article className="max-w-[780px] mx-auto px-6 md:px-8 -mt-24 relative z-10 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-8"
                >
                    <div className="flex items-center gap-6 flex-wrap">
                        <span className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.3em] text-primary font-bold">
                            <Tag className="w-3 h-3" />
                            {post.category[lang]}
                        </span>
                        <span className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.25em] text-ink-light">
                            <Clock className="w-3 h-3" />
                            {post.readTime[lang]}
                        </span>
                        <span className="inline-flex items-center gap-2 font-sans text-[9px] uppercase tracking-[0.25em] text-ink-light">
                            <User className="w-3 h-3" />
                            {post.author}
                        </span>
                    </div>

                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-ink font-light tracking-tight">
                        {post.title[lang]}
                    </h1>

                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-ink-light border-t border-gold-pale/20 pt-6">
                        {post.date[lang]}
                    </p>
                </motion.div>

                <motion.blockquote
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="my-12 border-l-2 border-primary/40 pl-8 py-2"
                >
                    <p className="font-serif text-xl md:text-2xl italic text-ink-mid leading-relaxed">
                        {post.excerpt[lang]}
                    </p>
                </motion.blockquote>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="space-y-6"
                >
                    {post.body[lang].split("\n\n").map((paragraph: string, i: number) => (
                        <p
                            key={i}
                            className="font-serif text-base md:text-lg leading-[1.9] text-secondary"
                        >
                            {paragraph}
                        </p>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-20 bg-surface-container-low border border-gold-pale/15 p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                >
                    <div className="space-y-2">
                        <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-primary font-bold">
                            {lang === "VN" ? "Sẵn sàng trải nghiệm?" : "Ready to experience it?"}
                        </p>
                        <h3 className="font-serif text-2xl text-ink font-light">
                            {lang === "VN" ? "Đặt lịch tại REMY MUSE" : "Book your appointment"}
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsBookingOpen(true)}
                        className="flex-shrink-0 px-10 py-4 text-white font-serif uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-transform duration-300"
                        style={{ background: "linear-gradient(90deg, #735c00 0%, #d4af37 100%)" }}
                    >
                        {lang === "VN" ? "Đặt Lịch Ngay" : "Book Now"}
                    </button>
                </motion.div>
            </article>

            {/* Related */}
            {related.length > 0 && (
                <section className="max-w-[1200px] mx-auto px-6 md:px-20 pb-32">
                    <div className="border-t border-gold-pale/20 pt-16">
                        <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-ink-light mb-12">
                            {lang === "VN" ? "Bài viết liên quan" : "Related Articles"}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {related.map((r) => (
                                <Link key={r.id} href={`/editorial/${r.slug}`} className="group flex gap-6 items-start">
                                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                                        <Image
                                            src={r.coverImage}
                                            alt={r.title[lang]}
                                            fill
                                            className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-primary font-bold">
                                            {r.category[lang]}
                                        </span>
                                        <h4 className="font-serif text-lg text-ink font-light leading-snug group-hover:text-primary transition-colors duration-500">
                                            {r.title[lang]}
                                        </h4>
                                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-ink-light">
                                            {r.readTime[lang]}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
            <Footer />
        </main>
    );
}
