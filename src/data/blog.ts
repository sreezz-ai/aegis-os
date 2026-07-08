import type { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    id: "post-welcome",
    slug: "welcome-to-aegis-os",
    title: "Welcome to Aegis OS",
    excerpt: "Why this portfolio is built as a system, in phases, instead of a template dropped in all at once.",
    content:
      "This is the first post on Aegis OS. Future posts will cover write-ups from labs, notes on tools I'm building, and lessons learned along the way.",
    category: "Meta",
    publishedOn: "2026-07-06",
    readingTimeMinutes: 2,
    featured: true,
  },
];
