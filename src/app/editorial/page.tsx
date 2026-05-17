import { Metadata } from "next";
import EditorialListClient from "./editorial-list-client";
import { getPosts } from "@/lib/data/editorial";

export const metadata: Metadata = {
    title: "Editorial | REMY MUSE",
    description: "Explore the world of high-end nail art, refined aesthetic trends, and care philosophies.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function EditorialPage() {
    const posts = await getPosts();

    return <EditorialListClient initialPosts={posts} />;
}
