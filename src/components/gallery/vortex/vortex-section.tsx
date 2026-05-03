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

      {/* Overlay UI */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-16">
        <div className="flex justify-between items-start">
          <div className="bg-ink/40 backdrop-blur-md px-6 py-3 border-l-2 border-primary">
            <h3 className="text-white font-serif text-2xl md:text-3xl tracking-tight">AI Ecosystem</h3>
            <p className="text-primary-light/80 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Infinite Design Matrix</p>
          </div>
          <div className="hidden md:block bg-white/5 backdrop-blur-sm p-4 text-right">
             <p className="text-cloud/40 text-[9px] uppercase tracking-widest leading-relaxed">
               Scroll to Navigate<br/>Click to Explore Detail
             </p>
          </div>
        </div>

        <div className="flex justify-between items-end">
           <div className="max-w-xs bg-ink/20 backdrop-blur-sm p-4">
              <p className="text-cloud/60 text-xs italic font-serif leading-relaxed">
                "Our AI ecosystem constantly evolves, generating thousands of unique nail archetypes based on your personal 'Muse' signature."
              </p>
           </div>
           <div className="text-right">
              <span className="text-white/20 text-7xl md:text-9xl font-serif italic select-none">MUSE</span>
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
