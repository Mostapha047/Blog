# Learning Log

A minimal, developer-focused personal blog for documenting a software development learning journey. Built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX.

## Features

- Light and dark mode (`next-themes`)
- Home page with hero section, recent posts, and featured tags
- Blog index with client-side search and tag filtering
- Individual post pages rendered from MDX, with reading time, syntax-highlighted code blocks (with a copy button), and previous/next navigation
- About page
- SEO metadata (per-page titles/descriptions, Open Graph, Twitter cards, `sitemap.xml`, `robots.txt`)
- Accessible, responsive UI built with shadcn/ui components and Lucide icons

## Project structure

```
app/                  Routes (App Router): /, /blog, /blog/[slug], /about
components/           Reusable UI components
components/ui/        shadcn/ui components
components/mdx/       MDX rendering pieces (component map, copyable code block)
content/posts/        Blog posts as MDX files
lib/                  Post loading utilities, MDX config, site config
public/               Static assets (images, favicon)
styles/               Global CSS (Tailwind + theme tokens)
```

## Writing a post

Add a new `.mdx` file to `content/posts/`. Frontmatter fields:

```yaml
---
title: "Post title"
description: "One or two sentences, used in cards and SEO metadata."
date: "2026-01-15" # YYYY-MM-DD
tags: ["Tag One", "Tag Two"]
coverImage: "/images/my-cover.svg" # optional
---
```

The post is picked up automatically: `lib/posts.ts` reads every file in `content/posts/`, sorts them by `date` (newest first), computes a reading time estimate from the content, and `generateStaticParams` in `app/blog/[slug]/page.tsx` turns each slug into a statically generated route at build time.

## Dependencies

Core:

- `next`, `react`, `react-dom` — framework
- `typescript` — types
- `tailwindcss`, `@tailwindcss/postcss`, `@tailwindcss/typography` — styling
- `shadcn` (CLI, dev-only) plus its generated `components/ui/*` (built on `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`)
- `lucide-react` — icons
- `next-themes` — light/dark mode
- `gray-matter` — MDX frontmatter parsing
- `next-mdx-remote` — MDX rendering
- `remark-gfm` — GitHub-flavored markdown (tables, strikethrough, etc.)
- `rehype-pretty-code`, `shiki` — syntax highlighting
- `reading-time` — reading time estimates
- `date-fns` — date formatting
- `eslint`, `eslint-config-next` — linting

All of these are already listed in `package.json`, so a single install pulls in everything (see below).

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

## Before you deploy

A few placeholders in `lib/site.ts` are worth updating first: `url` (your real domain, used for metadata/sitemap), and `author.github` / `author.linkedin`. The email address is already set from your profile.

## Deploying to Vercel (free)

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and sign in (GitHub login is easiest).
3. Import the repository. Vercel auto-detects Next.js — no configuration needed (build command `next build`, output handled automatically).
4. Click **Deploy**. You'll get a free `*.vercel.app` URL.
5. Update `url` in `lib/site.ts` to that URL (or a custom domain added later under Project Settings → Domains), then push the change — Vercel redeploys automatically on every push to the main branch.

New posts: just add an `.mdx` file to `content/posts/` and push — Vercel rebuilds and the new post appears at `/blog/<filename-without-extension>`.
