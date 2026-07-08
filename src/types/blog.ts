import type { ID } from "./common";

export interface BlogPost {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedOn: string;
  readingTimeMinutes: number;
  featured: boolean;
}
