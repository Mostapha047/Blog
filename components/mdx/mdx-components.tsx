import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { CopyablePre } from "@/components/mdx/copyable-pre";

/** Maps HTML tags produced by MDX to custom renderers. */
export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  pre: CopyablePre,
};
