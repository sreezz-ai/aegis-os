import { blogPosts } from "@/data/blog";
import type { BlogPost } from "@/types/blog";
import { resolveAfter } from "./apiClient";

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    return resolveAfter(blogPosts);
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    return resolveAfter(blogPosts.find((p) => p.slug === slug) ?? null);
  },
};
