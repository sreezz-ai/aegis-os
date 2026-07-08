import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import { resolveAfter } from "./apiClient";

export const projectService = {
  async getAll(): Promise<Project[]> {
    return resolveAfter(projects);
  },

  async getFeatured(): Promise<Project[]> {
    return resolveAfter(projects.filter((p) => p.featured));
  },

  async getBySlug(slug: string): Promise<Project | null> {
    const found = projects.find((p) => p.slug === slug) ?? null;
    return resolveAfter(found);
  },

  async getRelated(project: Project): Promise<Project[]> {
    const related = projects.filter((p) => project.relatedProjectSlugs.includes(p.slug));
    return resolveAfter(related);
  },
};
