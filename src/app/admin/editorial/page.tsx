"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, Plus, LogOut, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

type Post = {
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
};

const initialPostState: Omit<Post, 'id'> = {
    slug: "",
    title_vn: "",
    title_en: "",
    excerpt_vn: "",
    excerpt_en: "",
    body_vn: "",
    body_en: "",
    category_vn: "Chăm sóc",
    category_en: "Care",
    read_time_vn: "4 phút",
    read_time_en: "4 min read",
    author: "Remy Muse",
    cover_image_url: "",
    is_trending: false,
};

export default function AdminEditorialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    
    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<Omit<Post, 'id'> & { id?: string }>(initialPostState);
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        checkUserAndFetchData();
    }, []);

    const checkUserAndFetchData = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/admin/login");
            return;
        }
        await fetchPosts();
    };

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setPosts(data as Post[]);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        
        setUploadingImage(true);
        setErrorMsg("");

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from('editorial_images')
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            setErrorMsg(`Upload failed: ${uploadError.message}`);
            setUploadingImage(false);
            return;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('editorial_images')
            .getPublicUrl(filePath);

        setCurrentPost({ ...currentPost, cover_image_url: publicUrl });
        setUploadingImage(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg("");

        if (currentPost.id) {
            // Update
            const { error } = await supabase
                .from("posts")
                .update(currentPost)
                .eq("id", currentPost.id);
            if (error) setErrorMsg(error.message);
        } else {
            // Insert
            const { error } = await supabase
                .from("posts")
                .insert([currentPost]);
            if (error) setErrorMsg(error.message);
        }

        setSaving(false);
        if (!errorMsg) {
            setIsEditing(false);
            setCurrentPost(initialPostState);
            fetchPosts();
        }
    };

    const editPost = (post: Post) => {
        setCurrentPost(post);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const deletePost = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        
        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", id);
            
        if (!error) {
            fetchPosts();
        } else {
            alert(error.message);
        }
    };

    if (loading && !isEditing && posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cloud">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cloud text-ink pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gold-pale/20 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="font-serif text-2xl italic font-light">Editorial Admin</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-white font-sans text-[10px] uppercase tracking-[0.1em] hover:bg-primary transition-colors"
                            >
                                <Plus className="w-3 h-3" /> New Post
                            </button>
                        )}
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gold-pale/30 text-ink-light font-sans text-[10px] uppercase tracking-[0.1em] hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-3 h-3" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 mt-10">
                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 font-sans text-sm">
                        {errorMsg}
                    </div>
                )}

                {isEditing ? (
                    /* EDIT / CREATE FORM */
                    <div className="bg-white p-8 border border-gold-pale/20 shadow-sm">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold-pale/20">
                            <h2 className="font-serif text-3xl italic font-light">
                                {currentPost.id ? "Edit Post" : "Create New Post"}
                            </h2>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setCurrentPost(initialPostState);
                                    setErrorMsg("");
                                }}
                                className="text-ink-light hover:text-ink font-sans text-xs underline"
                            >
                                Cancel
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* General */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Slug (URL)</label>
                                    <input required type="text" value={currentPost.slug} onChange={e => setCurrentPost({...currentPost, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" placeholder="e.g. glass-nails-trend" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Author</label>
                                    <input required type="text" value={currentPost.author} onChange={e => setCurrentPost({...currentPost, author: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" />
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div className="space-y-4 p-6 bg-cloud-1 border border-gold-pale/20">
                                <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Cover Image</label>
                                <div className="flex items-start gap-6">
                                    {currentPost.cover_image_url ? (
                                        <div className="relative w-40 h-40 border border-gold-pale/20">
                                            <Image src={currentPost.cover_image_url} alt="Cover" fill className="object-cover" />
                                        </div>
                                    ) : (
                                        <div className="w-40 h-40 bg-white border border-dashed border-gold-pale flex items-center justify-center text-ink-ghost">
                                            <ImageIcon className="w-8 h-8" />
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-2">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-ink-light file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-sans file:uppercase file:tracking-widest file:bg-ink file:text-white hover:file:bg-primary cursor-pointer" />
                                        {uploadingImage && <p className="text-xs text-primary animate-pulse font-sans">Uploading...</p>}
                                        <p className="text-xs text-ink-ghost font-sans">Or paste URL below:</p>
                                        <input type="text" value={currentPost.cover_image_url} onChange={e => setCurrentPost({...currentPost, cover_image_url: e.target.value})} className="w-full p-2 bg-white border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-xs" placeholder="https://..." />
                                    </div>
                                </div>
                            </div>

                            {/* Two Columns: VN and EN */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* VN Column */}
                                <div className="space-y-6">
                                    <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-primary uppercase border-b border-primary/20 pb-2">Vietnamese (VN)</h3>
                                    
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Title (VN)</label>
                                        <input required type="text" value={currentPost.title_vn} onChange={e => setCurrentPost({...currentPost, title_vn: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Category (VN)</label>
                                        <input required type="text" value={currentPost.category_vn} onChange={e => setCurrentPost({...currentPost, category_vn: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Read Time (VN)</label>
                                        <input required type="text" value={currentPost.read_time_vn} onChange={e => setCurrentPost({...currentPost, read_time_vn: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Excerpt (VN)</label>
                                        <textarea required rows={3} value={currentPost.excerpt_vn} onChange={e => setCurrentPost({...currentPost, excerpt_vn: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Body (VN)</label>
                                        <textarea required rows={10} value={currentPost.body_vn} onChange={e => setCurrentPost({...currentPost, body_vn: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm resize-y" placeholder="Nhập nội dung bài viết. Có thể xuống dòng." />
                                    </div>
                                </div>

                                {/* EN Column */}
                                <div className="space-y-6">
                                    <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-primary uppercase border-b border-primary/20 pb-2">English (EN)</h3>
                                    
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Title (EN)</label>
                                        <input required type="text" value={currentPost.title_en} onChange={e => setCurrentPost({...currentPost, title_en: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Category (EN)</label>
                                        <input required type="text" value={currentPost.category_en} onChange={e => setCurrentPost({...currentPost, category_en: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Read Time (EN)</label>
                                        <input required type="text" value={currentPost.read_time_en} onChange={e => setCurrentPost({...currentPost, read_time_en: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Excerpt (EN)</label>
                                        <textarea required rows={3} value={currentPost.excerpt_en} onChange={e => setCurrentPost({...currentPost, excerpt_en: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm resize-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block font-sans text-[10px] uppercase tracking-[0.1em] text-ink-light">Body (EN)</label>
                                        <textarea required rows={10} value={currentPost.body_en} onChange={e => setCurrentPost({...currentPost, body_en: e.target.value})} className="w-full p-3 bg-cloud-1 border border-gold-pale/30 focus:border-primary focus:outline-none font-sans text-sm resize-y" placeholder="Enter article body. Newlines are supported." />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Options */}
                            <div className="flex items-center justify-between pt-6 border-t border-gold-pale/20">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" checked={currentPost.is_trending} onChange={e => setCurrentPost({...currentPost, is_trending: e.target.checked})} className="w-4 h-4 text-primary bg-cloud-1 border-gold-pale/30 focus:ring-primary focus:ring-2" />
                                    <span className="font-sans text-sm text-ink font-bold">Mark as "Editor's Pick" (Trending)</span>
                                </label>
                                
                                <button type="submit" disabled={saving || uploadingImage} className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-sans text-[10px] uppercase tracking-[0.2em] hover:bg-ink transition-colors disabled:opacity-50">
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* LISTING */
                    <div className="bg-white border border-gold-pale/20 shadow-sm overflow-hidden">
                        {posts.length === 0 ? (
                            <div className="p-12 text-center text-ink-ghost font-serif italic">
                                No posts found. Click "New Post" to create one.
                            </div>
                        ) : (
                            <table className="w-full text-left font-sans text-sm">
                                <thead className="bg-cloud-1 border-b border-gold-pale/20 text-[10px] uppercase tracking-[0.1em] text-ink-light">
                                    <tr>
                                        <th className="px-6 py-4 font-normal">Cover</th>
                                        <th className="px-6 py-4 font-normal">Title (EN)</th>
                                        <th className="px-6 py-4 font-normal">Category</th>
                                        <th className="px-6 py-4 font-normal">Trending</th>
                                        <th className="px-6 py-4 font-normal text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gold-pale/10">
                                    {posts.map(post => (
                                        <tr key={post.id} className="hover:bg-cloud-1/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-12 relative bg-cloud border border-gold-pale/20">
                                                    {post.cover_image_url && <Image src={post.cover_image_url} alt="" fill className="object-cover" sizes="64px" />}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-serif text-base text-ink">{post.title_en}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-block px-2 py-1 bg-cloud-1 border border-gold-pale/20 text-[9px] uppercase tracking-widest text-secondary">
                                                    {post.category_en}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {post.is_trending ? <span className="text-primary text-xs font-bold uppercase tracking-wider">Yes</span> : "-"}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-3">
                                                <button onClick={() => editPost(post)} className="text-ink hover:text-primary transition-colors p-1" title="Edit">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => deletePost(post.id)} className="text-ink-light hover:text-red-500 transition-colors p-1" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
