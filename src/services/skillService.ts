import { skillCategoryTitles, skills } from "@/data/skills";
import type { SkillGroup } from "@/types/skill";
import { resolveAfter } from "./apiClient";

export const skillService = {
  async getAll(): Promise<SkillGroup[]> {
    const categories = Object.keys(skillCategoryTitles) as Array<keyof typeof skillCategoryTitles>;
    const groups: SkillGroup[] = categories.map((category) => ({
      category,
      title: skillCategoryTitles[category],
      skills: skills.filter((s) => s.category === category),
    }));
    return resolveAfter(groups);
  },
};
