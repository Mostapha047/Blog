import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 py-20 sm:px-6 sm:py-28">
      <p className="text-sm font-medium text-muted-foreground">Hi, I&apos;m Mostapha</p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Documenting my journey learning software development.
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        This is where I write down what I&apos;m learning as a developer: new languages, frameworks,
        mistakes I made along the way, and the small wins that came out of them.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button nativeButton={false} render={<Link href="/blog" />}>
          Read the blog
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
        <Button nativeButton={false} variant="outline" render={<Link href="/about" />}>
          About me
        </Button>
      </div>
    </section>
  );
}
