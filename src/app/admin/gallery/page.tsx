"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import AdminLogin from "@/components/gallery/admin/admin-login";
import UploadPanel from "@/components/gallery/admin/upload-panel";
import GalleryManager from "@/components/gallery/admin/gallery-manager";
import { LogOut, Upload, LayoutGrid } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

type Tab = "upload" | "manage";

export default function AdminGalleryPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("upload");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleUploadSuccess = () => {
    setRefreshTrigger((n) => n + 1);
    // Switch to manage tab to see new upload
    setTimeout(() => setActiveTab("manage"), 500);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <div className="w-5 h-5 border border-white/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated → show login
  if (!session) {
    return <AdminLogin onLogin={() => {}} />;
  }

  // Authenticated → admin panel
  return (
    <div className="min-h-screen bg-ink text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-ink border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div>
            <span className="font-serif text-white text-lg tracking-tight">
              REMY MUSE
            </span>
            <span className="text-white/25 text-[10px] font-sans uppercase tracking-[0.3em] ml-3">
              Admin
            </span>
          </div>

          {/* Tabs */}
          <div className="flex border border-white/10">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-colors ${
                activeTab === "upload"
                  ? "bg-primary text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Upload className="w-3 h-3" />
              Upload
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-colors border-l border-white/10 ${
                activeTab === "manage"
                  ? "bg-primary text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Manage
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white/25 text-[10px] font-sans hidden md:block">
            {session.user.email}
          </span>
          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="flex items-center gap-2 text-white/30 hover:text-white text-[10px] uppercase tracking-[0.2em] font-sans transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Sign out</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-[1400px] mx-auto px-8 py-12">
        {activeTab === "upload" && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-4xl text-white tracking-tight">
                Upload Media
              </h1>
              <p className="text-white/60 text-base font-sans mt-3">
                Drag & drop images or videos. Each file can be configured with
                metadata before uploading.
              </p>
            </div>
            <UploadPanel onUploadSuccess={handleUploadSuccess} />
          </div>
        )}

        {activeTab === "manage" && (
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-4xl text-white tracking-tight">
                Manage Gallery
              </h1>
              <p className="text-white/60 text-base font-sans mt-3">
                Toggle visibility or permanently delete uploaded items.
              </p>
            </div>
            <GalleryManager refreshTrigger={refreshTrigger} />
          </div>
        )}
      </main>
    </div>
  );
}
