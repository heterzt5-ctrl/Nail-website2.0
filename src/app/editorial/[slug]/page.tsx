import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/data/editorial";
import ArticleClient from "./article-client";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return { title: "Article Not Found | REMY MUSE" };

    return {
        title: `${post.title_en} | REMY MUSE Editorial`,
        description: post.excerpt_en,
        openGraph: {
            title: post.title_en,
            description: post.excerpt_en,
            images: [post.cover_image_url],
        },
    };
}

export default async function EditorialArticlePage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) return notFound();
    
    const allPosts = await getPosts();
    const related = allPosts.filter(p => p.slug !== slug).slice(0, 2);

    return <ArticleClient post={post} related={related} />;
}
