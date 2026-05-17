"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-expect-error react-masonry-css has no types
import Masonry from "react-masonry-css";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import BookingModal from "@/components/booking/booking-modal";
import {
  ChevronRight,
  Grid,
  LayoutTemplate,
  Heart,
  Share,
  Bookmark,
  Play,
  X,
  Loader2,
} from "lucide-react";
import VortexSection from "@/components/gallery/vortex/vortex-section";
import { supabase } from "@/lib/supabase";
import type { GalleryItem } from "@/types/gallery";
import { useLanguage } from "@/lib/language-context";

// ─── Fallback static data (shown when DB is empty or fetch fails) ────────────
const GALLERY_FALLBACK: GalleryItem[] = [
  { id: "g1", src: "/gallery/RemyMuse-nail1.jpeg", storage_path: "", type: "image", category: "Chrome", title: "Signature Glass", description: "", span: "tall", is_trending: true, tags: "[]", order: 0, is_active: true, created_at: "", updated_at: "" },
  { id: "g2", src: "/gallery/RemyMuse-nail2.jpeg", storage_path: "", type: "image", category: "Chrome Luxe", title: "Golden Chrome Luxe", description: "", span: "short", is_trending: false, tags: "[]", order: 1, is_active: true, created_at: "", updated_at: "" },
  { id: "g3", src: "/gallery/RemyMuse-nail3.jpeg", storage_path: "", type: "image", category: "Bridal", title: "Celestial Petals", description: "", span: "short", is_trending: false, tags: "[]", order: 2, is_active: true, created_at: "", updated_at: "" },
  { id: "g4", src: "/gallery/RemyMuse-nail4.jpeg", storage_path: "", type: "image", category: "Glass Nails", title: "Midnight Velvet", description: "", span: "tall", is_trending: false, tags: "[]", order: 3, is_active: true, created_at: "", updated_at: "" },
  { id: "g5", src: "/gallery/RemyMuse-nail5.jpeg", storage_path: "", type: "image", category: "Ombre", title: "Aurora Bliss", description: "", span: "short", is_trending: false, tags: "[]", order: 4, is_active: true, created_at: "", updated_at: "" },
  { id: "g6", src: "/gallery/RemyMuse-nail6.jpeg", storage_path: "", type: "image", category: "Minimalist", title: "Rose Quartz Minimal", description: "", span: "short", is_trending: false, tags: "[]", order: 5, is_active: true, created_at: "", updated_at: "" },
  { id: "g7", src: "/gallery/RemyMuse-nail7.jpeg", storage_path: "", type: "image", category: "Marble Luxe", title: "Emerald Kintsugi", description: "", span: "tall", is_trending: false, tags: "[]", order: 6, is_active: true, created_at: "", updated_at: "" },
  { id: "g8", src: "/gallery/RemyMuse-nail8.jpeg", storage_path: "", type: "image", category: "Crystal", title: "Onyx Sculptural", description: "", span: "short", is_trending: false, tags: "[]", order: 7, is_active: true, created_at: "", updated_at: "" },
  { id: "g9", src: "/gallery/RemyMuse-nail9.jpeg", storage_path: "", type: "image", category: "Bridal", title: "Pearl Bloom", description: "", span: "short", is_trending: false, tags: "[]", order: 8, is_active: true, created_at: "", updated_at: "" },
  { id: "g10", src: "/gallery/RemyMuse-nail10.jpeg", storage_path: "", type: "image", category: "Chrome Luxe", title: "Tortoise Luxe", description: "", span: "tall", is_trending: false, tags: "[]", order: 9, is_active: true, created_at: "", updated_at: "" },
  { id: "g11", src: "/gallery/RemyMuse-nail11.jpeg", storage_path: "", type: "image", category: "Nail art", title: "Gilded Line Art", description: "", span: "short", is_trending: false, tags: "[]", order: 10, is_active: true, created_at: "", updated_at: "" },
  { id: "g12", src: "/gallery/RemyMuse-nail12.jpeg", storage_path: "", type: "image", category: "Glass Nails", title: "Prism Glow", description: "", span: "short", is_trending: false, tags: "[]", order: 11, is_active: true, created_at: "", updated_at: "" },
];

const ALL_CATEGORIES = ["All", "French tip", "Ombre", "Chrome", "Cat eye", "3D floral", "Character", "Nail art", "Glass Nails", "Chrome Luxe", "Bridal", "Minimalist", "Marble Luxe", "Botanical", "Crystal"];

// ─── Video card with hover-to-play ──────────────────────────────────────────
function VideoCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative group overflow-hidden bg-surface-variant transition-all duration-500 mb-8 cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      {/* Play badge */}
      <div className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md rounded-full p-2 pointer-events-none group-hover:scale-90 transition-transform duration-300">
        <Play className="w-4 h-4 text-white fill-white ml-[1px]" />
      </div>

      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[1200ms]"
      />

      <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none">
        <h3 className="text-white font-serif text-xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

// ─── Skeleton loader ─────────────────────────────────────────────────────────
function GallerySkeleton() {
  const heights = [280, 380, 240, 320, 400, 260, 360, 300];
  return (
    <Masonry
      breakpointCols={{ default: 4, 1024: 3, 640: 2 }}
      className="flex -ml-8 w-auto mb-32"
      columnClassName="pl-8 bg-clip-padding"
    >
      {heights.map((h, i) => (
        <div
          key={i}
          className="mb-8 bg-surface-variant animate-pulse"
          style={{ height: h }}
        />
      ))}
    </Masonry>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const { t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(ALL_CATEGORIES);

  // Fetch from Supabase
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("is_active", true)
        .order("order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to static data
        setItems(GALLERY_FALLBACK);
      } else {
        setItems(data);
        // Build category list from actual data
        const cats = Array.from(new Set(data.map((d: GalleryItem) => d.category)));
        setCategories(["All", ...cats]);
      }

      setLoading(false);
    };

    fetchItems();
  }, []);

  // Filtered items
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  const masonryBreakpoints = { default: 4, 1024: 3, 640: 2 };

  return (
    <main className="relative overflow-x-hidden selection:bg-primary-container/30 bg-cloud min-h-screen font-sans text-ink">
      <Header onOpenBooking={() => setIsBookingOpen(true)} />

      <div className="pt-32 px-6 md:px-12 lg:px-20 min-h-screen max-w-[1800px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.15rem] text-ink-light font-sans font-medium">
          <Link className="hover:text-primary transition-colors" href="/">
            {t("Home")}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-primary transition-colors cursor-pointer">
            {t("Portfolio")}
          </span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ink">{t("Gallery")}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight text-ink mb-4">
            {t("The Muse Gallery")}
          </h1>
          <p className="text-ink-light max-w-xl font-serif italic leading-relaxed text-lg">
            {t("A curated exhibition of our finest artistry. From timeless French tips to avant-garde 3D floral expressions.")}
          </p>
        </div>

        {/* Vortex Section */}
        <div className="mb-24">
          <VortexSection />
        </div>

        {/* Filter Bar */}
        <div className="sticky top-[88px] z-40 bg-cloud/95 backdrop-blur-sm py-6 mb-12 flex items-center justify-between border-b border-ink/5">
          <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth w-full lg:w-auto pr-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-sans uppercase tracking-widest flex-shrink-0 transition-all duration-300 pb-1 ${activeCategory === cat
                  ? "text-primary border-b border-primary font-bold"
                  : "text-ink-light hover:text-primary"
                  }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4 text-ink-light text-xs font-sans tracking-widest uppercase pl-8 border-l border-ink/10">
            <span>{t("View:")}</span>
            <Grid className="w-4 h-4 cursor-pointer text-primary transition-colors" />
            <LayoutTemplate className="w-4 h-4 cursor-pointer text-ink-light hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Count */}
        {!loading && (
          <div className="mb-8 flex items-center gap-3">
            <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-ink-ghost">
              {filteredItems.length} {filteredItems.length !== 1 ? t("works") : t("work")}
              {activeCategory !== "All" && ` · ${t(activeCategory)}`}
            </p>
            {loading && <Loader2 className="w-3 h-3 animate-spin text-ink-ghost" />}
          </div>
        )}

        {/* Masonry Grid */}
        {loading ? (
          <GallerySkeleton />
        ) : (
          <AnimatePresence mode="popLayout">
            <Masonry
              breakpointCols={masonryBreakpoints}
              className="flex -ml-8 w-auto mb-32"
              columnClassName="pl-8 bg-clip-padding"
            >
              {filteredItems.map((item, i) =>
                item.type === "video" ? (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                  >
                    <VideoCard item={item} onClick={() => setSelectedItem(item)} />
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                    className="relative group overflow-hidden bg-surface-variant transition-all duration-500 mb-8 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={800}
                      height={item.span === "tall" ? 1200 : 800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                      className="w-full h-auto object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-[1200ms] ease-out"
                      unoptimized={item.src.includes("supabase")}
                    />

                    {/* Trending badge */}
                    {item.is_trending && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[8px] font-sans font-bold uppercase tracking-[0.2em] bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5">
                          {t("Trending")}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 pointer-events-none">
                      <h3 className="text-white font-serif text-xl mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {item.title}
                      </h3>
                      <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 pointer-events-auto">
                        <button
                          className="text-white hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                        <button
                          className="text-white hover:text-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Share className="w-5 h-5" />
                        </button>
                        {item.span === "tall" && (
                          <button
                            className="text-white hover:text-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Bookmark className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </Masonry>
          </AnimatePresence>
        )}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Title + category */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-[110] pointer-events-none">
              <p className="text-white/40 text-[10px] font-sans uppercase tracking-[0.3em] mb-1">
                {t(selectedItem.category)}
              </p>
              <h3 className="text-white font-serif text-xl">
                {selectedItem.title}
              </h3>
            </div>

            {selectedItem.type === "video" ? (
              <motion.video
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={selectedItem.src}
                controls
                autoPlay
                className="max-w-[90vw] max-h-[80vh] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-w-[90vw] max-h-[80vh] object-contain shadow-2xl rounded-sm"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
