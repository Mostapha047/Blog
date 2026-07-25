import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagBadge } from "@/components/tag-badge";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="h-full">
      {post.coverImage && (
        // Plain <img>, not next/image: cover images are optional,
        // author-supplied paths (including SVG placeholders), and don't
        // need to go through the image optimizer for a blog this size.
        // Kept as Card's literal first child so its own
        // `has-[>img:first-child]` styles pick it up automatically.
        <img
          src={post.coverImage}
          alt=""
          className="aspect-[1200/630] w-full border-b border-border object-cover"
        />
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-t-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <CardHeader>
          <CardTitle className="text-lg leading-snug group-hover:underline">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{post.description}</CardDescription>
        </CardHeader>
      </Link>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
