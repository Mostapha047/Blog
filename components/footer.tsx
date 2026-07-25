import Link from "next/link";
import { Briefcase, Code2, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-muted-foreground">
          &copy; {year} {siteConfig.author.name}. Built while learning.
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link
            href={siteConfig.author.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="transition-colors hover:text-foreground"
          >
            <Code2 className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={siteConfig.author.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className="transition-colors hover:text-foreground"
          >
            <Briefcase className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={`mailto:${siteConfig.author.email}`}
            aria-label="Send an email"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
