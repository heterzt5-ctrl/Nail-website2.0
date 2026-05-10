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
    // FIX 1: Khoá scroll body khi overlay mở để tránh vortex bị scroll ngầm
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
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
        WebkitBackdropFilter: "blur(8px)", // Safari fix
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // FIX 2: padding nhỏ hơn trên mobile, đủ chỗ cho content
        padding: "clamp(16px, 4vw, 64px)",
        // FIX 3: Thêm paddingTop để không bị close button che
        paddingTop: "clamp(60px, 8vh, 96px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.35s ease",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {image && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            // FIX 4: Responsive grid — desktop: 2 cột, mobile: 1 cột
            // Dùng auto-fit với min-width thay vì fr cứng nhắc
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "clamp(24px, 4vw, 56px)",
            maxWidth: "1520px",
            width: "100%",
            alignItems: "center",
            transform: open ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* FIX 5: Image container — cần có kích thước rõ ràng để Next.js fill hoạt động */}
          <div
            style={{
              position: "relative",
              width: "100%",
              // Dùng aspect-ratio thay vì fill để container có chiều cao xác định
              aspectRatio: "3 / 4",
              // Giới hạn chiều cao tối đa để không tràn màn hình
              maxHeight: "70vh",
              // Khi aspect-ratio tạo ra container cao hơn maxHeight, dùng overflow hidden
              overflow: "hidden",
              borderRadius: "2px",
              boxShadow: "0 40px 100px rgba(22,18,14,0.6)",
            }}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              sizes="(max-width: 768px) 90vw, 55vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Text panel */}
          <div
            style={{
              color: "#F0EEE9",
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2.5vh, 24px)",
              // FIX 6: Không dùng maxHeight + overflow: auto ở đây
              // vì gây scroll trong overlay, confusing trên mobile
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
                  fontSize: "clamp(24px, 3vw, 40px)",
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
                  fontSize: "clamp(15px, 1.5vw, 18px)",
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
                  color: "rgba(240,238,233,0.7)",
                }}
              >
                {overlayConfig.fileLabel && (
                  <>
                    <span style={{ opacity: 0.6 }}>{overlayConfig.fileLabel}</span>
                    <span style={{ fontFamily: "monospace", wordBreak: "break-all" }}>
                      {image.src.split("/").pop()}
                    </span>
                  </>
                )}
                {overlayConfig.seriesLabel && (
                  <>
                    <span style={{ opacity: 0.6 }}>{overlayConfig.seriesLabel}</span>
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
                  marginTop: "8px",
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

      {/* Close X button — luôn hiển thị ở góc trên phải */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed",
          top: "16px",
          right: "20px",
          background: "transparent",
          border: "none",
          color: "#C9A96E",
          // FIX 7: Touch target đủ lớn cho mobile (44x44px tối thiểu theo Apple HIG)
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          lineHeight: 1,
          cursor: "pointer",
          opacity: 0.7,
          transition: "opacity 0.2s ease",
          zIndex: 101,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
      >
        ×
      </button>
    </div>
  );
}