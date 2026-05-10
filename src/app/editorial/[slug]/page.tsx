import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/mock-data";
import ArticleClient from "./article-client";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) return { title: "Article Not Found | REMY MUSE" };

    return {
        title: `${post.title.EN} | REMY MUSE Editorial`,
        description: post.excerpt.EN,
        openGraph: {
            title: post.title.EN,
            description: post.excerpt.EN,
            images: [post.coverImage],
        },
    };
}

export default async function EditorialArticlePage({ params }: Props) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) return notFound();

    return <ArticleClient post={post} />;
}
