"use client";

import { useEffect, useRef, useState } from "react";
import VortexGallery from "./vortex-gallery-class";
import { VORTEX_IMAGES } from "./types";
import ImageDetailOverlay from "./image-detail-overlay";

export default function VortexSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vortexRef = useRef<VortexGallery | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || VORTEX_IMAGES.length === 0) return;

    // We pass the canvas and the image paths
    const vortex = new VortexGallery(
      canvasRef.current,
      VORTEX_IMAGES.map((i) => i.src)
    );
    vortexRef.current = vortex;

    // Note: Lenis is handled globally or at the page level in many projects, 
    // but here the VortexGallery class has its own wheel event listener on the canvas.
    // If we want it to respond to global scroll, we might need to sync it.

    return () => {
      vortex.destroy();
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

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] bg-ink overflow-hidden group">
      <div className="absolute inset-0 z-0">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-full cursor-pointer"
        />
      </div>

      {/* Overlay UI - Tonal Layering (No Borders) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-16">
        <div className="flex justify-between items-start">
          <div className="bg-surface-variant/5 backdrop-blur-2xl p-8 shadow-2xl flex flex-col gap-2">
            <h3 className="text-white font-serif text-3xl md:text-5xl tracking-tight leading-none">AI Ecosystem</h3>
            <div className="flex items-center gap-3 mt-2">
                <div className="w-6 h-[1px] bg-primary/60" />
                <p className="text-primary-light/90 text-[10px] uppercase tracking-[0.3em] font-bold">Infinite Design Matrix</p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2 bg-ink/30 backdrop-blur-md px-6 py-4">
             <div className="w-1 h-1 bg-primary rounded-full animate-pulse mb-1" />
             <p className="text-white/40 text-[9px] uppercase tracking-[0.4em] leading-relaxed text-right">
               Scroll to Navigate<br/>Click to Explore
             </p>
          </div>
        </div>

        <div className="flex justify-between items-end">
           <div className="max-w-sm bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
              <p className="text-cloud/70 text-sm md:text-base italic font-serif leading-relaxed">
                &quot;Our AI ecosystem constantly evolves, generating thousands of unique nail archetypes based on your personal &apos;Muse&apos; signature.&quot;
              </p>
           </div>
           <div className="text-right flex flex-col items-end mix-blend-overlay">
              <span className="text-white/20 text-8xl md:text-[10rem] font-serif italic select-none leading-none tracking-tighter">MUSE</span>
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
