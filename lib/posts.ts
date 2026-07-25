import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

/** Filenames (without extension) of every MDX file in content/posts. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return [];

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Reads and parses a single MDX file into frontmatter + body + reading time. */
export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    readingTime: readingTime(content).text,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
    coverImage: data.coverImage,
  };
}

/** Every post, newest first. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase())
  );
}

export interface TagCount {
  tag: string;
  count: number;
}

/** Every tag in use, sorted by how many posts reference it. */
export function getAllTags(): TagCount[] {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([tag, count]) => ({ tag, count })).sort(
    (a, b) => b.count - a.count
  );
}

export interface AdjacentPosts {
  previous: Post | null;
  next: Post | null;
}

/**
 * "Previous" / "next" relative to a post's position in the (newest-first)
 * post list, so previous = published before it, next = published after it.
 */
export function getAdjacentPosts(slug: string): AdjacentPosts {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
