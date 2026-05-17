"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Check if already logged in
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                router.push("/admin/editorial");
            } else {
                setLoading(false);
            }
        });
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin/editorial");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cloud">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cloud p-6">
            <div className="w-full max-w-md bg-white p-8 border border-gold-pale/20 shadow-xl">
                <div className="mb-8 text-center space-y-2">
                    <h1 className="font-serif text-3xl text-ink font-light italic">Admin Portal</h1>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
                        REMY MUSE
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-sans">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none transition-colors font-sans text-sm"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none transition-colors font-sans text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-ink text-white font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-primary transition-colors disabled:opacity-50"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
