import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
};

// Typed as an explicit tuple so it satisfies unified's `Pluggable` shape —
// a plain array literal here gets widened to `(plugin | options)[]`, which
// loses the fixed [plugin, options] positions unified expects.
const prettyCodePlugin: [typeof rehypePrettyCode, PrettyCodeOptions] = [
  rehypePrettyCode,
  prettyCodeOptions,
];

// Shared compile options for <MDXRemote>. Its type is inferred structurally
// rather than imported, since next-mdx-remote doesn't publicly export
// `SerializeOptions` from its "/rsc" entry point.
export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [rehypeKatex, prettyCodePlugin],
  },
};
