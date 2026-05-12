"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, Upload, ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { GALLERY_CATEGORIES } from "@/types/gallery";

interface StagedFile {
  file: File;
  preview: string;
  type: "image" | "video";
}

interface UploadModalProps {
  staged: StagedFile;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadModal({
  staged,
  onClose,
  onSuccess,
}: UploadModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [span, setSpan] = useState<"tall" | "short">("short");
  const [isTrending, setIsTrending] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setUploading(true);
    setError(null);
    setProgress(10);

    try {
      // Build storage path
      const ext = staged.file.name.split(".").pop()?.toLowerCase() || "jpg";
      const folder = staged.type === "video" ? "videos" : "images";
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const storagePath = `${folder}/${uniqueName}`;

      setProgress(30);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(storagePath, staged.file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw new Error(uploadError.message);

      setProgress(70);

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery").getPublicUrl(storagePath);

      // Parse tags
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      // Insert metadata to DB
      const { error: dbError } = await supabase.from("gallery_items").insert({
        src: publicUrl || "",
        image_url: publicUrl || null, // Explicitly send null if missing to satisfy DB
        storage_path: storagePath,
        type: staged.type,
        category,
        title: title.trim(),
        description: description.trim(),
        span,
        is_trending: isTrending,
        tags, // Pass array directly for jsonb
        order: 0,
        is_active: true,
      });

      if (dbError) {
        // Rollback storage upload
        await supabase.storage.from("gallery").remove([storagePath]);
        throw new Error(dbError.message);
      }

      setProgress(100);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 400);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setError(msg);
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/90 backdrop-blur-md p-4">
      <div className="relative bg-ink border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <div>
            <h2 className="text-white font-serif text-2xl tracking-tight">
              Configure Upload
            </h2>
            <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-sans mt-2">
              {staged.file.name} —{" "}
              {(staged.file.size / (1024 * 1024)).toFixed(1)}MB
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Preview */}
          <div className="p-8 flex items-center justify-center bg-black/40 min-h-[280px]">
            {staged.type === "image" ? (
              <div className="relative w-full aspect-[3/4] max-w-[200px]">
                <Image
                  src={staged.preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <video
                src={staged.preview}
                className="w-full max-h-[280px] object-contain"
                controls
                muted
              />
            )}
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-white/70 font-sans mb-2">
                Title <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Signature Glass"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-white/70 font-sans mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-white/10 text-white px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary/40 transition-colors pr-10"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-ink">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-white/70 font-sans mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the design..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary/40 transition-colors resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-white/70 font-sans mb-2">
                Tags{" "}
                <span className="text-white/40 normal-case tracking-normal">
                  (comma-separated)
                </span>
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="glass, chrome, editorial"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>

            {/* Span + Trending */}
            <div className="flex gap-4 items-start">
              {/* Span Toggle */}
              <div className="flex-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans mb-2">
                  Card Size
                </label>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setSpan("short")}
                    className={`flex-1 py-2.5 text-[10px] uppercase tracking-[0.15em] font-sans transition-colors border ${
                      span === "short"
                        ? "bg-primary text-white border-primary"
                        : "bg-transparent text-white/40 border-white/10 hover:text-white/60"
                    }`}
                  >
                    Short
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpan("tall")}
                    className={`flex-1 py-2.5 text-[10px] uppercase tracking-[0.15em] font-sans transition-colors border-t border-b border-r ${
                      span === "tall"
                        ? "bg-primary text-white border-primary"
                        : "bg-transparent text-white/40 border-white/10 hover:text-white/60"
                    }`}
                  >
                    Tall
                  </button>
                </div>
              </div>

              {/* Trending */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans mb-2">
                  Trending
                </label>
                <button
                  type="button"
                  onClick={() => setIsTrending(!isTrending)}
                  className={`w-full px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] font-sans transition-colors border ${
                    isTrending
                      ? "bg-primary/20 text-primary border-primary/40"
                      : "bg-transparent text-white/40 border-white/10 hover:text-white/60"
                  }`}
                >
                  {isTrending ? "✓ Yes" : "No"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400/80 text-xs font-sans">{error}</p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {uploading && (
          <div className="h-[2px] bg-white/10">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex gap-4 px-8 py-6 border-t border-white/10 bg-white/5">
          <button
            onClick={onClose}
            disabled={uploading}
            className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-sans font-medium text-white/60 border border-white/20 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading || !title.trim()}
            id="upload-confirm-btn"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-[0.2em] font-sans font-bold bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload to Gallery
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
