"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Lock } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Thông tin đăng nhập không hợp lệ.");
      setLoading(false);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-10">
        {/* Logo mark */}
        <div className="text-center space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-white/10">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-serif text-white text-3xl tracking-tight">
              REMY MUSE
            </h1>
            <p className="text-white/25 text-[10px] uppercase tracking-[0.4em] font-sans mt-2">
              Studio Admin
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              autoComplete="email"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 text-sm font-sans focus:outline-none focus:border-primary/40 transition-colors"
            />
          </div>

          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-5 py-4 pr-14 text-sm font-sans focus:outline-none focus:border-primary/40 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-400/70 text-xs font-sans text-center py-1">
              {error}
            </p>
          )}

          <button
            type="submit"
            id="admin-login-btn"
            disabled={loading}
            className="w-full bg-primary text-white py-4 text-[11px] font-sans font-bold uppercase tracking-[0.3em] hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              "Enter Studio"
            )}
          </button>
        </form>

        <p className="text-center text-white/15 text-[10px] font-sans tracking-[0.2em] uppercase">
          Restricted Access
        </p>
      </div>
    </div>
  );
}
