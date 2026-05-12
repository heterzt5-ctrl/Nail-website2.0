"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { UploadCloud, Film, ImageIcon, X, Plus } from "lucide-react";
import UploadModal from "./upload-modal";

interface StagedFile {
  file: File;
  preview: string;
  type: "image" | "video";
  id: string;
}

interface UploadPanelProps {
  onUploadSuccess: () => void;
}

const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

export default function UploadPanel({ onUploadSuccess }: UploadPanelProps) {
  const [staged, setStaged] = useState<StagedFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [activeModal, setActiveModal] = useState<StagedFile | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback((files: FileList | File[]) => {
    setSizeError(null);
    const fileArr = Array.from(files);
    const newStaged: StagedFile[] = [];

    for (const file of fileArr) {
      if (!ACCEPTED_TYPES.includes(file.type)) continue;

      const isVideo = file.type.startsWith("video/");
      const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;

      if (file.size > maxSize) {
        setSizeError(
          `"${file.name}" exceeds the ${isVideo ? "100MB (video)" : "15MB (image)"} limit.`
        );
        continue;
      }

      const preview = URL.createObjectURL(file);
      newStaged.push({
        file,
        preview,
        type: isVideo ? "video" : "image",
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      });
    }

    setStaged((prev) => [...prev, ...newStaged]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files.length) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const removeStagedFile = (id: string) => {
    setStaged((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleUploadSuccess = (stagedId: string) => {
    removeStagedFile(stagedId);
    onUploadSuccess();
  };

  return (
    <div className="space-y-8">
      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed transition-all duration-300 cursor-pointer flex flex-col items-center justify-center py-16 px-8 text-center select-none ${
          dragging
            ? "border-primary/60 bg-primary/5"
            : "border-white/15 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(e) => e.target.files && processFiles(e.target.files)}
        />

        <div
          className={`transition-transform duration-300 ${dragging ? "scale-110" : "scale-100"}`}
        >
          <UploadCloud
            className={`w-12 h-12 mb-5 transition-colors ${dragging ? "text-primary" : "text-white/20"}`}
          />
        </div>

        <p className="text-white/90 font-serif text-2xl mb-3">
          {dragging ? "Drop files here" : "Drag & drop files"}
        </p>
        <p className="text-white/50 text-sm font-sans uppercase tracking-[0.2em]">
          or click to browse
        </p>

        <div className="flex items-center gap-6 mt-8 text-xs font-sans uppercase tracking-[0.15em] text-white/40">
          <span className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> JPG · PNG · WebP · 15MB max
          </span>
          <span className="w-px h-4 bg-white/20" />
          <span className="flex items-center gap-2">
            <Film className="w-4 h-4" /> MP4 · MOV · WebM · 100MB max
          </span>
        </div>
      </div>

      {/* Error */}
      {sizeError && (
        <p className="text-red-400/70 text-xs font-sans text-center">
          {sizeError}
        </p>
      )}

      {/* Staged Files Queue */}
      {staged.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-md border border-white/10">
            <p className="text-white/80 text-xs uppercase tracking-[0.2em] font-sans font-medium">
              {staged.length} file{staged.length !== 1 ? "s" : ""} ready to configure
            </p>
            <button
              onClick={() => {
                staged.forEach((f) => URL.revokeObjectURL(f.preview));
                setStaged([]);
              }}
              className="text-white/50 hover:text-white text-xs uppercase tracking-[0.2em] font-sans transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {staged.map((sf) => (
              <div
                key={sf.id}
                className="group relative aspect-square bg-white/5 overflow-hidden"
              >
                {/* Preview */}
                {sf.type === "image" ? (
                  <Image
                    src={sf.preview}
                    alt={sf.file.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/60">
                    <Film className="w-8 h-8 text-white/40" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <button
                    onClick={() => setActiveModal(sf)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-[10px] uppercase tracking-[0.15em] font-sans font-bold hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Configure
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStagedFile(sf.id);
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-ink/80 flex items-center justify-center text-white/50 hover:text-white hover:bg-ink transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>

                {/* Type badge */}
                <div className="absolute bottom-2 left-2">
                  <span className="text-[8px] font-sans uppercase tracking-[0.15em] bg-ink/80 text-white/60 px-2 py-0.5">
                    {sf.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white/50 text-xs font-sans text-center uppercase tracking-[0.2em] mt-6 bg-white/5 py-4 rounded-md border border-white/5">
            Hover each file → Configure → Upload
          </p>
        </div>
      )}

      {/* Upload Modal */}
      {activeModal && (
        <UploadModal
          staged={activeModal}
          onClose={() => setActiveModal(null)}
          onSuccess={() => handleUploadSuccess(activeModal.id)}
        />
      )}
    </div>
  );
}
