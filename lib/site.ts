// Central place for personal / site-wide info used across metadata,
// the footer, and the about page. Update these values to make the
// blog yours.
export const siteConfig = {
  name: "Learning Log",
  title: "Learning Log — a software development learning journal",
  description:
    "A personal blog documenting my journey learning software development: notes, projects, and things I get stuck on.",
  // Update this once you have a real domain (or your *.vercel.app URL).
  url: "https://your-blog.vercel.app",
  author: {
    name: "Mostapha",
    email: "elansarimostapha011@gmail.com",
    github: "https://github.com/Mostapha047",
    linkedin: "https://linkedin.com/in/your-linkedin-handle",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
