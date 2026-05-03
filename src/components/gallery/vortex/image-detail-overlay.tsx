"use client";

import { useEffect } from "react";
import { ImageItem, overlayConfig } from "./types";
import { X } from "lucide-react";

interface Props {
  image: ImageItem | null;
  onClose: () => void;
}

export default function ImageDetailOverlay({ image, onClose }: Props) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [image, onClose]);

  const open = !!image;

  const eyebrow =
    image && image.category
      ? overlayConfig.frameDetailLabel
        ? `${image.category} — ${overlayConfig.frameDetailLabel}`
        : image.category
      : "";

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-16 backdrop-blur-xl transition-all duration-500 ease-out ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      style={{ background: "rgba(199, 181, 17, 0.94)" }}
    >
      {image && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative flex flex-col lg:flex-row w-full max-w-[1400px] bg-[#0A0807]/95 overflow-hidden transition-all duration-700 ease-out shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
            }`}
          style={{
            // Try to maintain 16:9 landscape on large screens, but cap at 85vh to fit screen
            aspectRatio: "16/9",
            maxHeight: "85vh",
          }}
        >
          {/* Image Container (Left, 55%) - Left-aligned composition */}
          <div className="relative w-full lg:w-[55%] h-1/2 lg:h-full flex items-center justify-start overflow-hidden">
            {/* Blend the image right edge into the text area for a seamless editorial look */}
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-r from-transparent via-[#0A0807]/50 to-[#0A0807]/95 z-10 pointer-events-none" />

            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-contain lg:object-left"
              style={{
                // Padding prevents cropping too tight
                padding: "1.5rem",
              }}
            />
          </div>

          {/* Text Container (Right, 45%) - Negative space & typography */}
          <div className="relative w-full lg:w-[45%] h-1/2 lg:h-full flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20 z-20">
            <div className="text-cloud font-sans flex flex-col gap-6 max-h-full overflow-y-auto pr-4 custom-scrollbar">
              {eyebrow && (
                <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary-light/80">
                  {eyebrow}
                </p>
              )}

              {image.title && (
                <h2 className="font-serif text-3xl md:text-5xl xl:text-6xl font-light leading-[1.1] tracking-tight text-white">
                  {image.title}
                </h2>
              )}

              {image.description && (
                <p className="font-serif italic text-lg md:text-xl xl:text-2xl leading-relaxed text-cloud/70 mt-2">
                  {image.description}
                </p>
              )}

              <div className="mt-6 pt-8 border-t border-white/10 grid grid-cols-[100px,1fr] gap-x-4 gap-y-3 text-xs md:text-sm text-cloud/50">
                <span className="uppercase tracking-widest">Collection</span>
                <span className="text-cloud/80">{image.category}</span>

                <span className="uppercase tracking-widest">Detail</span>
                <span className="font-mono text-cloud/80">#RM-{image.src.split("_").pop()?.split(".")[0]}</span>
              </div>

              <button
                onClick={onClose}
                className="mt-10 self-start px-8 py-3 border border-primary/30 text-xs font-bold uppercase tracking-widest text-cloud hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                {overlayConfig.closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Close X (always in corner) */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-8 right-8 text-primary-light/60 hover:text-white transition-colors duration-300 p-2"
      >
        <X className="w-8 h-8" />
      </button>
    </div>
  );
}
