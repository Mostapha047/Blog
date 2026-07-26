import type { ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const CALLOUT_STYLES = {
  note: {
    icon: Info,
    className: "border-border bg-muted/50 text-foreground",
    iconClassName: "text-muted-foreground",
  },
  tip: {
    icon: Lightbulb,
    className: "border-emerald-500/30 bg-emerald-500/10 text-foreground",
    iconClassName: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: TriangleAlert,
    className: "border-amber-500/30 bg-amber-500/10 text-foreground",
    iconClassName: "text-amber-600 dark:text-amber-400",
  },
} as const;

interface CalloutProps {
  type?: keyof typeof CALLOUT_STYLES;
  title?: string;
  children: ReactNode;
}

/** A styled aside for MDX content — `<Callout type="tip">...</Callout>`. */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const { icon: Icon, className, iconClassName } = CALLOUT_STYLES[type];

  return (
    <div className={cn("not-prose my-6 flex gap-3 rounded-lg border p-4 text-sm leading-relaxed", className)}>
      <Icon className={cn("mt-0.5 size-4 shrink-0", iconClassName)} aria-hidden="true" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {title && <p className="mb-1 font-medium">{title}</p>}
        {children}
      </div>
    </div>
  );
}
