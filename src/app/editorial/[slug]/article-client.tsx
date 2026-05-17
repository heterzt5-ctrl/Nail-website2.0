"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, Clock, User, Tag, Share2, X, ZoomIn } from "lucide-react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";
import { useLanguage } from "@/lib/language-context";
import { Post } from "@/lib/data/editorial";

export default function ArticleClient({ post, related }: { post: Post, related: Post[] }) {
    const { language, t } = useLanguage();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const lightboxRef = useRef<HTMLDivElement>(null);

    const lang = language === "VN" ? "VN" : (language === "KR" ? "KR" : (language === "CN" ? "CN" : (language === "RU" ? "RU" : "EN")));

    // Scroll progress for the reading experience
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

    // Helper functions to get localized content (only VN + EN are in the Post schema)
    const getTitle = (p: Post) => lang === "VN" ? p.title_vn : p.title_en;
    const getCategory = (p: Post) => lang === "VN" ? p.category_vn : p.category_en;
    const getReadTime = (p: Post) => lang === "VN" ? p.read_time_vn : p.read_time_en;
    const getExcerpt = (p: Post) => lang === "VN" ? p.excerpt_vn : p.excerpt_en;
    const getBody = (p: Post) => lang === "VN" ? p.body_vn : p.body_en;

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (lang === "VN") {
            return `${date.getDate()} Thg ${date.getMonth() + 1}, ${date.getFullYear()}`;
        }
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    // Animation variants for staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
            }
        }
    };

    // Lightbox handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom === 1) return;
        setIsDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || zoom === 1) return;

        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        const maxPan = (zoom - 1) * 150;
        setPan({
            x: Math.max(-maxPan, Math.min(maxPan, newX)),
            y: Math.max(-maxPan, Math.min(maxPan, newY))
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const zoomSpeed = 0.15;
        const newZoom = e.deltaY > 0
            ? Math.max(1, zoom - zoomSpeed)
            : Math.min(4, zoom + zoomSpeed);

        setZoom(newZoom);

        if (newZoom === 1) {
            setPan({ x: 0, y: 0 });
        }
    };

    const handleClose = () => {
        setIsLightboxOpen(false);
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isLightboxOpen) {
                handleClose();
            }
        };

        if (isLightboxOpen) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isLightboxOpen]);

    return (
        <main className="relative bg-white min-h-screen selection:bg-[#735c00]/10">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-[#735c00] z-[100] origin-left"
                style={{ scaleX }}
            />

            <Header onOpenBooking={() => setIsBookingOpen(true)} />

            {/* Single-column editorial layout */}
            <article className="max-w-[860px] mx-auto px-6 md:px-12 pt-32 lg:pt-44 pb-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Back Link & Share */}
                    <motion.div variants={itemVariants} className="flex justify-between items-center mb-16">
                        <Link
                            href="/editorial"
                            className="group flex items-center gap-3 text-[#1b1c19]/40 hover:text-[#735c00] transition-all duration-300"
                        >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#735c00]/5 transition-all">
                                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            </div>
                            <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-medium">
                                {lang === "VN" ? "Quay lại" : (lang === "RU" ? "Назад" : (lang === "KR" ? "뒤로 가기" : (lang === "CN" ? "返回" : "Back")))}
                            </span>
                        </Link>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#735c00] hover:bg-[#735c00]/5 transition-all">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Metadata */}
                    <motion.div variants={itemVariants} className="flex items-center gap-8 mb-10 flex-wrap">
                        <span className="flex items-center gap-2.5 font-sans text-[9px] uppercase tracking-[0.35em] text-[#735c00] font-bold">
                            <Tag className="w-3 h-3" />
                            {getCategory(post)}
                        </span>
                        <span className="flex items-center gap-2.5 font-sans text-[9px] uppercase tracking-[0.25em] text-gray-400 font-medium">
                            <Clock className="w-3 h-3" />
                            {getReadTime(post)}
                        </span>
                        <span className="flex items-center gap-2.5 font-sans text-[9px] uppercase tracking-[0.25em] text-gray-400 font-medium">
                            <User className="w-3 h-3" />
                            {post.author}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-[#1b1c19] font-light tracking-tight mb-8">
                            {getTitle(post)}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-[#735c00]/30" />
                            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-gray-400">
                                {formatDate(post.published_date || post.created_at)}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </article>

            {/* ── HERO IMAGE BREAKOUT ── */}
            <motion.div variants={itemVariants} className="w-full mb-16 flex justify-center px-4">
                <div
                    className="relative w-full max-w-[90vw] md:max-w-[75vw] bg-[#F8F7F4] overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all group rounded-lg"
                    style={{ minHeight: "600px", maxHeight: "80vh" }}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <motion.div
                        style={{ scale: imageScale, opacity: imageOpacity }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={post.cover_image_url || "/placeholder.jpg"}
                            alt={getTitle(post) || ""}
                            fill
                            priority
                            sizes="(max-width: 768px) 90vw, 75vw"
                            className="object-contain"
                        />
                    </motion.div>

                    {/* Zoom Hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center rounded-lg">
                        <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-3"
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                        >
                            <ZoomIn className="w-6 h-6 text-white drop-shadow-lg" />
                            <span className="text-base text-white font-medium drop-shadow-lg">Nhấp để phóng to</span>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── LIGHTBOX MODAL ── */}
            {isLightboxOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-4 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    {/* ── UI Controls (anchored to viewport, outside the pan/zoom div) ── */}

                    {/* Close Button */}
                    <motion.button
                        onClick={handleClose}
                        className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full backdrop-blur-sm z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Close lightbox"
                    >
                        <X className="w-8 h-8" />
                    </motion.button>

                    {/* Zoom Controls */}
                    <div
                        className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-4 shadow-2xl hover:bg-black/30 transition-colors z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button
                            onClick={() => setZoom(Math.max(1, zoom - 0.2))}
                            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={zoom <= 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </motion.button>
                        <span className="text-white/90 text-sm font-medium min-w-[60px] text-center">
                            {Math.round(zoom * 100)}%
                        </span>
                        <motion.button
                            onClick={() => setZoom(Math.min(4, zoom + 0.2))}
                            className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                            disabled={zoom >= 4}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                        </motion.button>
                        <div className="w-px h-6 bg-white/10" />
                        <motion.button
                            onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
                            className="text-white/70 hover:text-white transition-colors px-4 py-1 hover:bg-white/10 rounded text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Reset
                        </motion.button>
                    </div>

                    {/* Instructions */}
                    <motion.div
                        className="absolute bottom-8 left-8 text-white/40 text-xs space-y-1.5 pointer-events-none z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="flex items-center gap-2">🖱 Cuộn chuột để phóng to/thu nhỏ</p>
                        <p className="flex items-center gap-2">✋ Kéo ảnh để di chuyển khi phóng to</p>
                        <p className="flex items-center gap-2">⌨ Nhấn ESC hoặc click X để thoát</p>
                    </motion.div>

                    {/* ── Image Container (handles pan/zoom mouse events) ── */}
                    <motion.div
                        ref={lightboxRef}
                        className="relative w-full h-full max-w-7xl max-h-[95vh] flex items-center justify-center select-none"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onWheel={handleWheel}
                    >
                        <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            animate={{ x: pan.x, y: pan.y }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        >
                            <motion.div
                                animate={{ scale: zoom }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="relative w-full h-full max-w-6xl max-h-[90vh]"
                            >
                                <Image
                                    src={post.cover_image_url || "/placeholder.jpg"}
                                    alt={getTitle(post) || ""}
                                    fill
                                    sizes="90vw"
                                    className="object-contain select-none pointer-events-none"
                                    priority
                                    draggable={false}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}

            {/* Back to Article */}
            <article className="max-w-[860px] mx-auto px-6 md:px-12 pb-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Excerpt */}
                    <motion.div variants={itemVariants} className="my-16 relative">
                        <p className="font-serif text-2xl md:text-3xl italic text-gray-700 leading-relaxed font-light">
                            {getExcerpt(post)}
                        </p>
                    </motion.div>

                    {/* Body */}
                    <motion.div variants={itemVariants} className="space-y-4 text-gray-800 pt-16">
                        {getBody(post)?.split("\n").map((line: string, i: number) => {
                            if (!line.trim()) return <div key={i} className="h-2" />;
                            return (
                                <p key={i} className="font-serif text-lg md:text-xl leading-[1.6] text-[#1b1c19]/90 font-light">
                                    {line}
                                </p>
                            );
                        })}
                    </motion.div>

                    {/* CTA Card */}
                    <motion.div variants={itemVariants} className="mt-32 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-[#1b1c19] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.21,0.47,0.32,0.98]" />
                        <div className="relative p-12 md:p-16 bg-white/50 backdrop-blur-sm flex flex-col items-start gap-10 transition-colors duration-500">
                            <div className="space-y-3">
                                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#735c00] font-bold group-hover:text-white/60 transition-colors">
                                    {t('ed-discover')}
                                </p>
                                <h3 className="font-serif text-3xl md:text-4xl text-[#1b1c19] font-light group-hover:text-white transition-colors">
                                    {t('ed-craft')}
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsBookingOpen(true)}
                                className="px-12 py-5 text-white font-serif uppercase tracking-[0.25em] text-xs transition-all duration-500 hover:shadow-[0_20px_50px_rgba(115,92,0,0.2)]"
                                style={{ background: "linear-gradient(90deg, #735c00 0%, #d4af37 100%)" }}
                            >
                                {t('ed-book')}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </article>

            {/* Related */}
            {related.length > 0 && (
                <section className="max-w-[860px] mx-auto px-6 md:px-12 pb-32">
                    <div className="pt-16">
                        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-16">
                            {t('ed-related')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            {related.map((r) => (
                                <Link key={r.id} href={`/editorial/${r.slug}`} className="group flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative w-full md:w-40 aspect-[4/3] flex-shrink-0 overflow-hidden bg-gray-100 rounded">
                                        <Image
                                            src={r.cover_image_url || '/placeholder-image.jpg'}
                                            alt={getTitle(r)}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                                        />
                                    </div>
                                    <div className="space-y-4 pt-2">
                                        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#735c00] font-bold">
                                            {getCategory(r)}
                                        </span>
                                        <h4 className="font-serif text-2xl text-[#1b1c19] font-light leading-snug group-hover:text-[#735c00] transition-colors duration-500">
                                            {getTitle(r)}
                                        </h4>
                                        <div className="flex items-center gap-4 text-gray-400">
                                            <div className="h-px w-6 bg-gray-200" />
                                            <p className="font-sans text-[9px] uppercase tracking-[0.25em]">
                                                {getReadTime(r)}
                                            </p>
                                        </div>
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