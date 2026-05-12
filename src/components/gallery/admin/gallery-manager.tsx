"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { GalleryItem } from "@/types/gallery";
import {
  Trash2,
  Eye,
  EyeOff,
  Film,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

interface GalleryManagerProps {
  refreshTrigger: number;
}

export default function GalleryManager({
  refreshTrigger,
}: GalleryManagerProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [refreshTrigger]);

  const toggleActive = async (item: GalleryItem) => {
    setActionLoading(item.id);
    const { error } = await supabase
      .from("gallery_items")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);

    if (!error) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_active: !i.is_active } : i
        )
      );
    }
    setActionLoading(null);
  };

  const deleteItem = async (item: GalleryItem) => {
    setActionLoading(item.id);

    // Delete from storage
    if (item.storage_path) {
      await supabase.storage.from("gallery").remove([item.storage_path]);
    }

    // Delete from DB
    const { error } = await supabase
      .from("gallery_items")
      .delete()
      .eq("id", item.id);

    if (!error) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }

    setActionLoading(null);
    setConfirmDelete(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-white/5 animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <AlertTriangle className="w-8 h-8 text-red-400/60" />
        <p className="text-red-400/60 text-sm font-sans">{error}</p>
        <button
          onClick={fetchItems}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-sans uppercase tracking-[0.2em] transition-colors"
        >
          <RefreshCw className="w-3 h-3" /> Retry
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
        <p className="text-white/60 font-serif text-3xl">
          No items yet
        </p>
        <p className="text-white/40 text-sm font-sans uppercase tracking-[0.2em] mt-4">
          Upload your first design above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex gap-8 text-xs font-sans uppercase tracking-[0.2em] bg-white/5 px-6 py-4 rounded-md border border-white/10 mb-8">
        <span className="text-white/60">
          <span className="text-white font-bold text-sm mr-2">{items.length}</span> total
        </span>
        <span className="text-white/60">
          <span className="text-white font-bold text-sm mr-2">
            {items.filter((i) => i.is_active).length}
          </span>{" "}
          active
        </span>
        <span className="text-white/60">
          <span className="text-white font-bold text-sm mr-2">
            {items.filter((i) => !i.is_active).length}
          </span>{" "}
          hidden
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group relative aspect-square overflow-hidden transition-opacity duration-300 ${
              !item.is_active ? "opacity-40" : "opacity-100"
            }`}
          >
            {/* Preview */}
            {item.type === "video" ? (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <Film className="w-8 h-8 text-white/30" />
              </div>
            ) : (
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover"
                unoptimized
              />
            )}

            {/* Overlay controls */}
            <div className="absolute inset-0 bg-ink/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
              {/* Title */}
              <p className="text-white text-[11px] font-sans leading-tight line-clamp-2">
                {item.title}
              </p>

              {/* Category */}
              <div className="space-y-2">
                <span className="inline-block text-[8px] font-sans uppercase tracking-[0.2em] text-primary/80 border border-primary/20 px-2 py-0.5">
                  {item.category}
                </span>

                {/* Actions */}
                <div className="flex gap-2">
                  {/* Toggle visibility */}
                  <button
                    onClick={() => toggleActive(item)}
                    disabled={actionLoading === item.id}
                    title={item.is_active ? "Hide from gallery" : "Show in gallery"}
                    className="flex-1 flex items-center justify-center py-1.5 bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                    {item.is_active ? (
                      <EyeOff className="w-3.5 h-3.5 text-white/70" />
                    ) : (
                      <Eye className="w-3.5 h-3.5 text-white/70" />
                    )}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setConfirmDelete(item.id)}
                    disabled={actionLoading === item.id}
                    title="Delete permanently"
                    className="flex-1 flex items-center justify-center py-1.5 bg-red-500/20 hover:bg-red-500/40 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Hidden badge */}
            {!item.is_active && (
              <div className="absolute top-2 left-2 pointer-events-none">
                <span className="text-[8px] font-sans uppercase tracking-[0.15em] bg-white/10 text-white/50 px-2 py-0.5">
                  Hidden
                </span>
              </div>
            )}

            {/* Trending badge */}
            {item.is_trending && item.is_active && (
              <div className="absolute top-2 left-2 pointer-events-none">
                <span className="text-[8px] font-sans uppercase tracking-[0.15em] bg-primary/80 text-white px-2 py-0.5">
                  Trending
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirm Dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-ink/80 backdrop-blur-sm">
          <div className="bg-ink border border-white/10 p-8 max-w-sm w-full space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-white font-serif text-lg">
                  Delete permanently?
                </h3>
                <p className="text-white/40 text-xs font-sans mt-1">
                  This will remove the file from storage and the gallery. This
                  cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-3 text-[11px] uppercase tracking-[0.2em] font-sans text-white/40 border border-white/10 hover:text-white/70 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const item = items.find((i) => i.id === confirmDelete);
                  if (item) deleteItem(item);
                }}
                disabled={!!actionLoading}
                className="flex-1 py-3 text-[11px] uppercase tracking-[0.2em] font-sans font-bold bg-red-500/80 text-white hover:bg-red-500 transition-colors disabled:opacity-40"
              >
                {actionLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
