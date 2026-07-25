import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, Code2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "A bit about me, why I'm learning in public, and what I'm currently working toward.",
};

const learningGoals = [
  "Get comfortable building full-stack apps end to end, not just following tutorials.",
  "Understand fundamentals well enough to explain them simply, not just use them.",
  "Ship small, real projects regularly instead of collecting half-finished ones.",
  "Get better at reading source code and documentation instead of always reaching for a tutorial.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>

      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        <p>
          Hi, I&apos;m {siteConfig.author.name}. I&apos;m learning software development, mostly by building
          small projects, breaking them, and writing down what I figure out along the way. This blog is
          that written trail.
        </p>
        <p>
          I don&apos;t come from a traditional CS background — most of what I know so far has come from
          documentation, reading other people&apos;s code, and a lot of trial and error. I&apos;m sharing
          that process here in case it&apos;s useful to someone else doing the same thing.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Learning goals</h2>
      <ul className="mt-4 space-y-3">
        {learningGoals.map((goal) => (
          <li key={goal} className="flex gap-3 text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
            <span>{goal}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Find me elsewhere</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href={siteConfig.author.github} target="_blank" rel="noreferrer noopener" />}
        >
          <Code2 className="size-4" aria-hidden="true" />
          GitHub
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          render={<Link href={siteConfig.author.linkedin} target="_blank" rel="noreferrer noopener" />}
        >
          <Briefcase className="size-4" aria-hidden="true" />
          LinkedIn
        </Button>
        <Button nativeButton={false} variant="outline" render={<Link href={`mailto:${siteConfig.author.email}`} />}>
          <Mail className="size-4" aria-hidden="true" />
          Email
        </Button>
      </div>
    </div>
  );
}
