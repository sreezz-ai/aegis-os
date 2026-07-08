import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  { id: "skill-linux", name: "Linux (Kali)", category: "offensive-security", level: "proficient" },
  { id: "skill-networking", name: "Networking Fundamentals", category: "offensive-security", level: "proficient" },
  { id: "skill-webapp-sec", name: "Web App Security", category: "offensive-security", level: "learning" },
  { id: "skill-ctf", name: "CTF Practice", category: "offensive-security", level: "learning" },

  { id: "skill-python", name: "Python", category: "ai-tooling", level: "proficient" },
  { id: "skill-rag", name: "RAG Pipelines", category: "ai-tooling", level: "proficient" },
  { id: "skill-ollama", name: "LLM Orchestration (Ollama)", category: "ai-tooling", level: "proficient" },
  { id: "skill-prompt-eng", name: "Prompt Engineering", category: "ai-tooling", level: "advanced" },

  { id: "skill-react", name: "React", category: "frontend-engineering", level: "advanced" },
  { id: "skill-tailwind", name: "Tailwind CSS", category: "frontend-engineering", level: "advanced" },
  { id: "skill-component-arch", name: "Component Architecture", category: "frontend-engineering", level: "proficient" },
  { id: "skill-motion", name: "Motion Design", category: "frontend-engineering", level: "proficient" },

  { id: "skill-dsa", name: "Data Structures", category: "foundations", level: "proficient" },
  { id: "skill-git", name: "Git", category: "foundations", level: "advanced" },
  { id: "skill-problem-solving", name: "Problem Solving", category: "foundations", level: "advanced" },
  { id: "skill-docs", name: "Documentation", category: "foundations", level: "proficient" },
];

export const skillCategoryTitles: Record<Skill["category"], string> = {
  "offensive-security": "Offensive Security",
  "ai-tooling": "AI & Tooling",
  "frontend-engineering": "Frontend Engineering",
  foundations: "Foundations",
};
