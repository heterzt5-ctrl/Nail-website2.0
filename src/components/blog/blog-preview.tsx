"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/mock-data";

export default function BlogPreview() {
    return (
        <section id="blog" className="py-32 px-8 md:px-20 bg-cloud overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 text-primary text-[10px] font-sans font-bold tracking-[0.4em] uppercase">
                            <BookOpen className="w-4 h-4" />
                            <span>Editorial Intelligence</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-ink">
                            Luxury <span className="italic text-primary">Insights</span>
                        </h2>
                    </div>
                    <p className="font-serif text-ink-light text-lg max-w-sm italic leading-relaxed">
                        Curated intelligence for the modern aesthetician and trend-focused salon client.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-gold-pale/20 border border-gold-pale/20">
                    {BLOG_POSTS.slice(0, 3).map((post, index) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-cloud p-12 transition-all hover:bg-white/40">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="space-y-10"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ink-ghost">{post.date}</span>
                                        <span className="block font-serif text-[12px] italic text-primary">{post.author}</span>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-ink-ghost group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                                </div>
                                
                                <h3 className="text-3xl font-serif font-light leading-[1.2] text-ink group-hover:text-primary transition-colors h-[72px] overflow-hidden">
                                    {post.title}
                                </h3>
                                
                                <p className="text-ink-mid text-sm leading-relaxed font-sans line-clamp-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {post.excerpt}
                                </p>

                                <div className="pt-4 border-t border-gold-pale/10 inline-block font-sans text-[10px] tracking-[0.2em] uppercase text-primary font-bold group-hover:tracking-[0.3em] transition-all">
                                    Read Article
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <button className="px-12 py-5 border border-gold-pale/40 text-ink font-serif uppercase tracking-[0.3em] text-xs hover:bg-ink hover:text-white transition-all duration-700">
                        Explore Full Library
                    </button>
                </div>
            </div>
        </section>
    );
}
