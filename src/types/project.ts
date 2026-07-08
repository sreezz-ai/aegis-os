import type { ID } from "./common";

export type ProjectStatus = "completed" | "in-progress" | "concept";
export type ProjectDifficulty = "beginner" | "intermediate" | "advanced";

export interface ProjectLinks {
  github?: string;
  liveDemo?: string;
  documentation?: string;
}

export interface Project {
  id: ID;
  slug: string;
  title: string;
  summary: string;
  description: string;
  architecture: string;
  techStack: string[];
  features: string[];
  lessonsLearned: string[];
  challenges: string[];
  links: ProjectLinks;
  status: ProjectStatus;
  difficulty: ProjectDifficulty;
  featured: boolean;
  relatedProjectSlugs: string[];
  coverImageAlt: string;
}
