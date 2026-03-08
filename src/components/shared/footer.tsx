"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Share2, Sparkles, Navigation } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function VibrantFooter() {
    const { t } = useLanguage();

    return (
        <footer className="bg-white pt-32 pb-12 px-4 relative overflow-hidden border-t border-brand-pink/10">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-brand-pink/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto space-y-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <Link href="/" className="flex flex-col group">
                            <span className="font-display font-black text-3xl tracking-tighter text-brand-900 leading-none">Website 2.0</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-pink mt-1">Digital Salon Ecosystem</span>
                        </Link>
                        <p className="text-brand-900/50 font-bold leading-relaxed max-w-xs">
                            Nâng tầm trải nghiệm làm đẹp bằng công nghệ và nghệ thuật nail tinh xảo bậc nhất 2026.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Instagram, Facebook, Youtube].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-xl bg-brand-pink/5 flex items-center justify-center text-brand-pink hover:bg-brand-pink hover:text-white transition-all shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink">Navigation</h4>
                        <nav className="flex flex-col gap-4 text-brand-900/70 font-bold">
                            <Link href="#portfolio" className="hover:text-brand-pink transition-colors">Portfolio</Link>
                            <Link href="#services" className="hover:text-brand-pink transition-colors">Services</Link>
                            <Link href="#booking" className="hover:text-brand-pink transition-colors">Booking</Link>
                            <Link href="#blog" className="hover:text-brand-pink transition-colors">Insights</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink">Visit Us</h4>
                        <div className="space-y-4 text-brand-900/70 font-bold">
                            <p className="flex items-start gap-3">
                                <Navigation className="w-5 h-5 text-brand-orange shrink-0" />
                                Level 2, 88 Aesthetic St.<br />Saigon Center, District 1
                            </p>
                            <p className="text-brand-900 font-black">+84 2026 888 999</p>
                            <p className="text-brand-900/40">hello@website2.salon</p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-pink">Get Inspired</h4>
                        <div className="space-y-4">
                            <p className="text-sm text-brand-900/60 font-medium">Nhận thông tin về các xu hướng nail mới nhất mỗi tuần.</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full bg-brand-pink/5 border-2 border-transparent focus:border-brand-pink/20 rounded-2xl px-5 py-4 outline-none font-bold text-sm transition-all"
                                />
                                <button className="absolute right-2 top-2 w-10 h-10 rounded-xl bg-brand-900 text-white flex items-center justify-center hover:bg-brand-pink transition-all">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-brand-900/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-[10px] font-black text-brand-900/30 uppercase tracking-[0.5em]">
                        © 2026 Website 2.0 • All Rights Reserved
                    </p>
                    <div className="flex items-center gap-10 text-[10px] font-black text-brand-900/40 uppercase tracking-widest">
                        <Link href="#" className="hover:text-brand-pink">Privacy Policy</Link>
                        <Link href="#" className="hover:text-brand-pink">Terms of Service</Link>
                        <div className="flex items-center gap-2 text-brand-orange">
                            <Sparkles className="w-3 h-3" />
                            <span>Built by Antigravity AI</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
