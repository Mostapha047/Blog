import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogIndex } from "@/components/blog-index";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts from my software development learning journey.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags().map(({ tag }) => tag);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        {`${posts.length} post${posts.length === 1 ? "" : "s"} on what I've been learning.`}
      </p>

      {/* useSearchParams (inside BlogIndex) requires a Suspense boundary. */}
      <Suspense>
        <BlogIndex posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
