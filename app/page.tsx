import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import { TagBadge } from "@/components/tag-badge";
import { Button } from "@/components/ui/button";
import { getAllPosts, getAllTags } from "@/lib/posts";

const RECENT_POSTS_COUNT = 3;
const FEATURED_TAGS_COUNT = 8;

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, RECENT_POSTS_COUNT);
  const featuredTags = getAllTags().slice(0, FEATURED_TAGS_COUNT);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Recent posts</h2>
          <Button nativeButton={false} variant="ghost" size="sm" render={<Link href="/blog" />}>
            View all
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Button>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No posts yet. Add an .mdx file to content/posts to get started.
          </p>
        )}
      </section>

      {featuredTags.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6">
          <h2 className="mb-4 text-xl font-semibold tracking-tight">Featured tags</h2>
          <div className="flex flex-wrap gap-2">
            {featuredTags.map(({ tag }) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
