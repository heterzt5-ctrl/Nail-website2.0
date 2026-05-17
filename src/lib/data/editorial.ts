import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

// For server-side rendering where we just need anonymous read access
const getSupabase = () => {
    // If NEXT_PUBLIC_SUPABASE_URL isn't fully loaded in some server contexts,
    // this ensures we instantiate cleanly.
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
        { auth: { persistSession: false } }
    );
};

export type Post = {
    id: string;
    slug: string;
    title_vn: string;
    title_en: string;
    excerpt_vn: string;
    excerpt_en: string;
    body_vn: string;
    body_en: string;
    category_vn: string;
    category_en: string;
    read_time_vn: string;
    read_time_en: string;
    author: string;
    cover_image_url: string;
    is_trending: boolean;
    created_at: string;
    published_date: string;
};

export async function getPosts(): Promise<Post[]> {
    const sb = getSupabase();
    const { data, error } = await sb
        .from("posts")
        .select("*")
        .order("published_date", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
    return data as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const decodedSlug = decodeURIComponent(slug);
    const sb = getSupabase();
    const { data, error } = await sb
        .from("posts")
        .select("*")
        .eq("slug", decodedSlug)
        .single();

    if (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
    return data as Post;
}

export async function getTrendingPost(): Promise<Post | null> {
    const sb = getSupabase();
    const { data, error } = await sb
        .from("posts")
        .select("*")
        .eq("is_trending", true)
        .order("published_date", { ascending: false })
        .limit(1)
        .single();

    if (error) {
        // Might not have a trending post yet
        return null;
    }
    return data as Post;
}
