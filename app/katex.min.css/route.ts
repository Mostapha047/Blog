import fs from "fs";
import path from "path";

// Served from a route handler instead of `public/` — this Next.js version
// 404s on any `.css` file placed directly under `public/`, regardless of
// content, so a route handler is used to set the `text/css` content type
// explicitly. Font URLs inside the file are relative ("fonts/..."), which
// still resolves correctly against this route's own path.
const css = fs.readFileSync(path.join(process.cwd(), "node_modules/katex/dist/katex.min.css"), "utf8");

export function GET() {
  return new Response(css, {
    headers: { "Content-Type": "text/css; charset=utf-8" },
  });
}
