import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TagBadge({ tag, className }: { tag: string; className?: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn("transition-colors hover:bg-muted-foreground/15", className)}
      render={<Link href={`/blog?tag=${encodeURIComponent(tag)}`} />}
    >
      {tag}
    </Badge>
  );
}
