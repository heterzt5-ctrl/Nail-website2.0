"use client";

import { useEffect, useRef, useState } from "react";
import VortexGallery from "./vortex-gallery-class";
import { VORTEX_IMAGES } from "./types";
import ImageDetailOverlay from "./image-detail-overlay";
import { useLanguage } from "@/lib/language-context";

export default function VortexSection() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vortexRef = useRef<VortexGallery | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || VORTEX_IMAGES.length === 0) return;

    // FIX 1: requestAnimationFrame để đảm bảo canvas đã được layout
    // trước khi VortexGallery đọc clientWidth/clientHeight
    let raf: number;
    const canvas = canvasRef.current;

    const startVortex = () => {
      const vortex = new VortexGallery(
        canvas,
        VORTEX_IMAGES.map((i) => i.src)
      );
      vortexRef.current = vortex;
    };

    // Dùng setTimeout 0 thay vì RAF — đảm bảo paint đầu tiên đã xảy ra
    const timer = setTimeout(startVortex, 0);

    return () => {
      clearTimeout(timer);
      vortexRef.current?.destroy();
      vortexRef.current = null;
    };
  }, []);

  useEffect(() => {
    vortexRef.current?.setPaused(selectedIdx !== null);
  }, [selectedIdx]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const vortex = vortexRef.current;
    const canvas = canvasRef.current;
    if (!vortex || !canvas) return;
    const idx = vortex.pickAtScreen(
      e.clientX,
      e.clientY,
      canvas.getBoundingClientRect()
    );
    if (idx !== null) {
      setSelectedIdx(idx);
    }
  };

  // FIX 2: Thêm touch tap handler cho mobile
  // (touch events đã được handle trong VortexGallery cho scroll,
  //  nhưng cần handle tap riêng ở React level để trigger overlay)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const start = touchStartRef.current;
    if (!start) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = Math.abs(endX - start.x);
    const dy = Math.abs(endY - start.y);
    const dt = Date.now() - start.time;

    // Chỉ trigger click nếu là tap (di chuyển ít, thời gian ngắn)
    const isTap = dx < 10 && dy < 10 && dt < 250;
    if (!isTap) return;

    const vortex = vortexRef.current;
    const canvas = canvasRef.current;
    if (!vortex || !canvas) return;

    const idx = vortex.pickAtScreen(
      endX,
      endY,
      canvas.getBoundingClientRect()
    );
    if (idx !== null) {
      setSelectedIdx(idx);
    }

    touchStartRef.current = null;
  };

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] bg-ink overflow-hidden group">
      {/* FIX 3: Canvas wrapper dùng absolute inset-0 để canvas luôn fill đúng
          parent section. Canvas element cần w-full h-full để layout đúng. */}
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full cursor-pointer touch-none"
          // FIX 4: touch-action: none ngăn browser scroll khi swipe trên canvas
          style={{ touchAction: "none", display: "block" }}
        />
      </div>

      {/* Overlay UI - Tonal Layering (No Borders) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-16">
        <div className="flex justify-between items-start">
          <div className="bg-surface-variant/5 backdrop-blur-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-2">
            <h3 className="text-white font-serif text-2xl md:text-5xl tracking-tight leading-none uppercase">
              REMY MUSE NAIL STUDIO
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-6 h-[1px] bg-primary/60" />
              <p className="text-primary-light/90 text-[10px] uppercase tracking-[0.3em] font-bold">
                {t("Infinite Design Matrix")}
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 bg-ink/30 backdrop-blur-md px-6 py-4">
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse mb-1" />
            <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] leading-relaxed text-right">
              {t("Scroll to Navigate")}
              <br />
              {t("Click to Explore")}
            </p>
          </div>
        </div>

        {/* FIX 5: Thêm hint cho mobile vì instruction chỉ hiện trên md+ */}
        <div className="flex md:hidden justify-center mb-2">
          <p className="text-white/30 text-[9px] uppercase tracking-[0.3em]">
            {t("Swipe · Tap to Explore")}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-right flex flex-col items-end mix-blend-overlay">
            <span className="text-white/20 text-6xl md:text-[10rem] font-serif italic select-none leading-none tracking-tighter">
              MUSE
            </span>
          </div>
        </div>
      </div>

      {/* Detail Overlay */}
      <ImageDetailOverlay
        image={selectedIdx !== null ? VORTEX_IMAGES[selectedIdx] : null}
        onClose={() => setSelectedIdx(null)}
      />

      {/* Gradient Borders */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cloud to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cloud to-transparent z-20 pointer-events-none" />
    </section>
  );
}