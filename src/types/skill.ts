import type { ID } from "./common";

export type SkillCategory =
  | "offensive-security"
  | "ai-tooling"
  | "frontend-engineering"
  | "foundations";

export type SkillLevel = "learning" | "proficient" | "advanced";

export interface Skill {
  id: ID;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export interface SkillGroup {
  category: SkillCategory;
  title: string;
  skills: Skill[];
}
