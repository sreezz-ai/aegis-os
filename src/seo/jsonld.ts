import { SITE } from "@/constants/site";
import type { Project } from "@/types/project";
import type { BlogPost } from "@/types/blog";

export function personJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.owner,
    jobTitle: SITE.role,
    url: SITE.baseUrl,
    address: { "@type": "PostalAddress", addressRegion: SITE.location },
  };
}

export function projectJsonLd(project: Project): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    author: { "@type": "Person", name: SITE.owner },
    keywords: project.techStack.join(", "),
  };
}

export function blogPostJsonLd(post: BlogPost): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedOn,
    author: { "@type": "Person", name: SITE.owner },
  };
}
