"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-expect-error react-masonry-css has no types
import Masonry from "react-masonry-css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";
import { ChevronRight, Grid, LayoutTemplate, Heart, Share, Bookmark, Play, X } from "lucide-react";
import VortexSection from "@/components/gallery/vortex/vortex-section";

// MOCK DATA for masonry
const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Signature Glass",
    span: 45, // tall
    imageUrl: "/gallery/RemyMuse-nail1.jpeg",
  },
  {
    id: "g2",
    title: "Golden Chrome Luxe",
    span: 30, // standard
    imageUrl: "/gallery/RemyMuse-nail2.jpeg",
    hasVideo: true,
  },
  {
    id: "g3",
    title: "Celestial Petals",
    span: 25, // short
    imageUrl: "/gallery/RemyMuse-nail3.jpeg",
  },
  {
    id: "g4",
    title: "Midnight Velvet",
    span: 45, // tall
    imageUrl: "/gallery/RemyMuse-nail4.jpeg",
  },
  {
    id: "g5",
    title: "Aurora Bliss",
    span: 30, // standard
    imageUrl: "/gallery/RemyMuse-nail5.jpeg",
  },
  {
    id: "g6",
    title: "Rose Quartz Minimal",
    span: 25, // short
    imageUrl: "/gallery/RemyMuse-nail6.jpeg",
  },
  {
    id: "g7",
    title: "Emerald Kintsugi",
    span: 45, // tall
    imageUrl: "/gallery/RemyMuse-nail7.jpeg",
  },
  {
    id: "g8",
    title: "Onyx Sculptural",
    span: 30, // standard
    imageUrl: "/gallery/RemyMuse-nail8.jpeg",
  },
  {
    id: "g9",
    title: "Pearl Bloom",
    span: 25, // short
    imageUrl: "/gallery/RemyMuse-nail9.jpeg",
  },
  {
    id: "g10",
    title: "Tortoise Luxe",
    span: 45, // tall
    imageUrl: "/gallery/RemyMuse-nail10.jpeg",
  },
  {
    id: "g11",
    title: "Gilded Line Art",
    span: 30, // standard
    imageUrl: "/gallery/RemyMuse-nail11.jpeg",
  },
  {
    id: "g12",
    title: "Prism Glow",
    span: 25, // short
    imageUrl: "/gallery/RemyMuse-nail12.jpeg",
  }
];

export default function GalleryPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const masonryBreakpoints = {
    default: 4,
    1024: 3,
    640: 2
  };

  return (
    <main className="relative overflow-x-hidden selection:bg-primary-container/30 bg-cloud min-h-screen font-sans text-ink">
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      <div className="pt-32 px-6 md:px-12 lg:px-20 min-h-screen max-w-[1800px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.15rem] text-ink-light font-sans font-medium">
          <Link className="hover:text-primary transition-colors" href="/">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-primary transition-colors cursor-pointer">Portfolio</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink">Gallery</span>
        </nav>

        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-ink mb-4">The Muse Gallery</h1>
          <p className="text-ink-light max-w-xl font-serif italic leading-relaxed text-lg">
            A curated exhibition of our finest artistry. From timeless French tips to avant-garde 3D floral expressions.
          </p>
        </div>

        {/* AI Ecosystem Section */}
        <div className="mb-24">

          <VortexSection />
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-[88px] z-40 bg-cloud/95 backdrop-blur-sm py-6 mb-12 flex items-center justify-between border-b border-ink/5">
          <div className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth w-full lg:w-auto pr-4">
            <button className="text-xs font-sans font-bold uppercase tracking-widest text-primary border-b border-primary pb-1 flex-shrink-0">All</button>
            <button className="text-xs font-sans uppercase tracking-widest text-ink-light hover:text-primary transition-colors flex-shrink-0">French tip</button>
            <button className="text-xs font-sans uppercase tracking-widest text-ink-light hover:text-primary transition-colors flex-shrink-0">Ombre</button>
            <button className="text-xs font-sans uppercase tracking-widest text-ink-light hover:text-primary transition-colors flex-shrink-0">Chrome</button>
            <button className="text-xs font-sans uppercase tracking-widest text-ink-light hover:text-primary transition-colors flex-shrink-0">Cat eye</button>
            <button className="text-xs font-sans uppercase tracking-widest text-ink-light hover:text-primary transition-colors flex-shrink-0">3D floral</button>
            <button className="text-xs font-sans uppercase tracking-widest text-ink-light hover:text-primary transition-colors flex-shrink-0">Character</button>
            <button className="text-xs font-sans uppercase tracking-widest text-ink-light hover:text-primary transition-colors flex-shrink-0">Nail art</button>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-ink-light text-xs font-sans tracking-widest uppercase pl-8 border-l border-ink/10">
            <span>View:</span>
            <Grid className="w-4 h-4 cursor-pointer text-primary transition-colors" />
            <LayoutTemplate className="w-4 h-4 cursor-pointer text-ink-light hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={masonryBreakpoints}
          className="flex -ml-8 w-auto mb-32"
          columnClassName="pl-8 bg-clip-padding"
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden bg-surface-variant transition-all duration-500 mb-8 cursor-pointer"
              onClick={() => setSelectedImage(item.imageUrl)}
            >
              {item.hasVideo && (
                <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md rounded-full p-2 pointer-events-none">
                  <Play className="w-4 h-4 text-white fill-white ml-[1px]" />
                </div>
              )}
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={800}
                height={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1200ms] ease-out"
              />
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none">
                <h3 className="text-white font-serif text-xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 pointer-events-auto">
                  <button className="text-white hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}><Heart className="w-5 h-5" /></button>
                  <button className="text-white hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}><Share className="w-5 h-5" /></button>
                  {item.span > 25 && (
                    <button className="text-white hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}><Bookmark className="w-5 h-5" /></button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Masonry>

      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedImage}
              alt="Zoomed Design"
              className="max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
