"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";

/**
 * Client-side search + tag filtering over a pre-fetched post list.
 * The active tag is mirrored into the `?tag=` query param so links like
 * the home page's "Featured tags" can deep-link into a filtered view.
 */
export function BlogIndex({ posts, tags }: { posts: Post[]; tags: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(searchParams.get("tag"));

  function toggleTag(tag: string) {
    const nextTag = activeTag === tag ? null : tag;
    setActiveTag(nextTag);

    const params = new URLSearchParams(searchParams.toString());
    if (nextTag) {
      params.set("tag", nextTag);
    } else {
      params.delete("tag");
    }
    router.replace(params.size > 0 ? `/blog?${params}` : "/blog", { scroll: false });
  }

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.description.toLowerCase().includes(normalizedQuery);
      const matchesTag = !activeTag || post.tags.includes(activeTag);

      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  return (
    <div className="mt-8">
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search posts"
          className="pl-9"
        />
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <button key={tag} type="button" onClick={() => toggleTag(tag)} aria-pressed={activeTag === tag}>
              <Badge variant={activeTag === tag ? "default" : "secondary"} className="cursor-pointer select-none">
                {tag}
              </Badge>
            </button>
          ))}
          {activeTag && (
            <button
              type="button"
              onClick={() => toggleTag(activeTag)}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3" aria-hidden="true" />
              Clear filter
            </button>
          )}
        </div>
      )}

      {filteredPosts.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted-foreground">No posts match your search.</p>
      )}
    </div>
  );
}
