import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Button } from "@/components/ui/button";
import { TagBadge } from "@/components/tag-badge";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { mdxOptions } from "@/lib/mdx-options";
import { getAdjacentPosts, getPostBySlug, getPostSlugs, type Post } from "@/lib/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  let post: Post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: Post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(slug);

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Button nativeButton={false} variant="ghost" size="sm" render={<Link href="/blog" />} className="mb-8 -ml-2.5">
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Back to blog
      </Button>

      <header>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt=""
          className="mt-8 aspect-[1200/630] w-full rounded-xl border border-border object-cover"
        />
      )}

      <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
        <MDXRemote source={post.content} components={mdxComponents} options={mdxOptions} />
      </div>

      {(previous || next) && (
        <nav aria-label="More posts" className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          {previous && (
            <Link
              href={`/blog/${previous.slug}`}
              className="group rounded-lg border border-border p-4 transition-colors hover:border-foreground/30"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ArrowLeft className="size-3" aria-hidden="true" />
                Previous
              </span>
              <span className="mt-1 block font-medium group-hover:underline">{previous.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-foreground/30 sm:col-start-2"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                Next
                <ArrowRight className="size-3" aria-hidden="true" />
              </span>
              <span className="mt-1 block font-medium group-hover:underline">{next.title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
