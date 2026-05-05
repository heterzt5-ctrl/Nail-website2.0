"use client";

import { useState } from "react";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";
import { ChevronRight, Grid, LayoutTemplate, Heart, Share, Bookmark, Play } from "lucide-react";
import VortexSection from "@/components/gallery/vortex/vortex-section";

// MOCK DATA for masonry
const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Liquid Gold Chrome",
    span: 45, // tall
    imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g2",
    title: "Celestial French",
    span: 30, // standard
    imageUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800",
    hasVideo: true,
  },
  {
    id: "g3",
    title: "Cloud Nude Ombre",
    span: 25, // short
    imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g4",
    title: "Renaissance Florals",
    span: 45, // tall
    imageUrl: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g5",
    title: "Velvet Emerald",
    span: 30, // standard
    imageUrl: "/gallery/nail-velvet-rose.png",
  },
  {
    id: "g6",
    title: "Glass Nails Reflection",
    span: 25, // short
    imageUrl: "/gallery/nail-glass-gold.png",
  },
  {
    id: "g7",
    title: "Midnight Onyx",
    span: 45, // tall
    imageUrl: "/gallery/nail-midnight-onyx.png",
  },
  {
    id: "g8",
    title: "Aurora Borealis",
    span: 30, // standard
    imageUrl: "https://images.unsplash.com/photo-1595868615174-8bba23101880?auto=format&fit=crop&q=80&w=800",
  }
];

export default function GalleryPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden selection:bg-primary-container/30 bg-cloud min-h-screen font-sans text-ink">
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      <div className="pt-32 px-6 md:px-12 lg:px-20 min-h-screen max-w-[1800px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.15rem] text-ink-light font-sans font-medium">
          <a className="hover:text-primary transition-colors" href="/">Home</a>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4 tracking-tight text-ink">REMY MUSE AI Ecosystem</h2>
            <p className="text-ink-light font-serif italic text-lg max-w-2xl mx-auto">
              Step into our infinite design matrix. A living archive of AI-generated nail archetypes, curated for the modern muse.
            </p>
          </div>
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
        <div 
          className="mb-32 grid gap-8 w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gridAutoRows: "10px"
          }}
        >
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="relative group overflow-hidden bg-surface-variant transition-all duration-500"
              style={{ gridRowEnd: `span ${item.span}` }}
            >
              {item.hasVideo && (
                <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md rounded-full p-2">
                  <Play className="w-4 h-4 text-white fill-white ml-[1px]" />
                </div>
              )}
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out" 
              />
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="text-white font-serif text-xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <button className="text-white hover:text-primary transition-colors"><Heart className="w-5 h-5" /></button>
                  <button className="text-white hover:text-primary transition-colors"><Share className="w-5 h-5" /></button>
                  {item.span > 25 && (
                    <button className="text-white hover:text-primary transition-colors"><Bookmark className="w-5 h-5" /></button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      <Footer />
    </main>
  );
}
