"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ImageItem, overlayConfig } from "./types";

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
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(22, 18, 14, 0.96)",
        backdropFilter: "blur(8px)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.35s ease",
      }}
    >
      {image && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(320px, 0.9fr)",
            gap: "56px",
            maxWidth: "1520px",
            width: "100%",
            maxHeight: "100%",
            alignItems: "center",
            transform: open ? "scale(1)" : "scale(0.98)",
            transition: "transform 0.35s ease",
          }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxHeight: "calc(100vh - 128px)",
            }}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              sizes="90vw"
              className="object-contain"
              style={{
                boxShadow: "0 40px 100px rgba(22,18,14,0.6)",
              }}
            />
          </div>

          {/* Text panel */}
          <div
            style={{
              color: "#F0EEE9",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              maxHeight: "calc(100vh - 128px)",
              overflow: "auto",
            }}
          >
            {eyebrow && (
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  margin: 0,
                }}
              >
                {eyebrow}
              </p>
            )}

            {image.title && (
              <h2
                style={{
                  fontFamily: "'Noto Serif', 'Times New Roman', serif",
                  fontSize: "clamp(28px, 2.6vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  margin: 0,
                  color: "#F0EEE9",
                }}
              >
                {image.title}
              </h2>
            )}

            {image.description && (
              <p
                style={{
                  fontFamily: "'Noto Serif', 'Times New Roman', serif",
                  fontSize: "18px",
                  lineHeight: 1.65,
                  color: "rgba(240,238,233,0.85)",
                  margin: 0,
                }}
              >
                {image.description}
              </p>
            )}

            {(overlayConfig.fileLabel || overlayConfig.seriesLabel) && (
              <div
                style={{
                  marginTop: "8px",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(201,169,110,0.3)",
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  rowGap: "8px",
                  fontSize: "13px",
                  opacity: 0.75,
                  color: "rgba(240,238,233,0.7)",
                }}
              >
                {overlayConfig.fileLabel && (
                  <>
                    <span style={{ opacity: 0.6 }}>
                      {overlayConfig.fileLabel}
                    </span>
                    <span style={{ fontFamily: "monospace" }}>
                      {image.src.split("/").pop()}
                    </span>
                  </>
                )}
                {overlayConfig.seriesLabel && (
                  <>
                    <span style={{ opacity: 0.6 }}>
                      {overlayConfig.seriesLabel}
                    </span>
                    <span>{image.title.split(" — ")[0]}</span>
                  </>
                )}
              </div>
            )}

            {overlayConfig.closeLabel && (
              <button
                onClick={onClose}
                style={{
                  alignSelf: "flex-start",
                  marginTop: "16px",
                  background: "transparent",
                  color: "#F0EEE9",
                  border: "1px solid rgba(201,169,110,0.5)",
                  padding: "10px 22px",
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,169,110,0.15)";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.8)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.5)";
                  e.currentTarget.style.color = "#F0EEE9";
                }}
              >
                {overlayConfig.closeLabel}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Close X (always in corner) */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed",
          top: "24px",
          right: "32px",
          background: "transparent",
          border: "none",
          color: "#C9A96E",
          fontSize: "28px",
          lineHeight: 1,
          cursor: "pointer",
          padding: "8px 12px",
          opacity: 0.7,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      >
        ×
      </button>
    </div>
  );
}
