"use client";

import { motion } from "framer-motion";
import { BookOpen, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/mock-data";
import GlassCard from "../shared/glass-card";

export default function BlogPreview() {
    return (
        <section id="blog" className="py-32 px-4 bg-white relative">
            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-brand-pink/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto space-y-20">
                <div className="text-center max-w-3xl mx-auto space-y-8">
                    <div className="inline-flex items-center gap-2 text-brand-orange text-xs font-black tracking-[0.3em] uppercase">
                        <BookOpen className="w-4 h-4" />
                        <span>Salon Intelligence</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none">
                        Expert <span className="text-brand-purple">Insights</span>
                    </h2>
                    <p className="text-brand-900/50 text-xl font-bold max-w-xl mx-auto">Master your session with safety tips and 2026 trend deep-dives.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {BLOG_POSTS.map((post, index) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                            <GlassCard className="h-full p-12 hover:shadow-2xl transition-all border-brand-orange/10 group-hover:border-brand-pink/30 hover-lift bg-brand-50/50" delay={index * 0.1}>
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] uppercase text-brand-orange">
                                            <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span>{post.author}</span>
                                            <span className="opacity-30">•</span>
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-2 border-brand-pink/20 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-all transform group-hover:rotate-45 shadow-lg shadow-brand-pink/5">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-display font-black leading-tight text-brand-900 group-hover:text-brand-pink transition-colors">{post.title}</h3>
                                    <p className="text-brand-900/60 leading-relaxed font-bold text-lg">{post.excerpt}</p>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>

                <div className="pt-8 flex justify-center">
                    <button className="px-14 py-5 rounded-full bg-brand-900 text-white font-black text-lg hover:bg-brand-orange hover:scale-105 transition-all shadow-xl shadow-brand-900/20">
                        Explore Full Library
                    </button>
                </div>
            </div>
        </section>
    );
}
