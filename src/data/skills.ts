import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  { id: "skill-linux", name: "Kali Linux", category: "offensive-security", level: "proficient" },
  { id: "skill-wireshark", name: "Wireshark (Traffic Analysis)", category: "offensive-security", level: "learning" },
  { id: "skill-nmap", name: "Nmap", category: "offensive-security", level: "learning" },
  { id: "skill-burpsuite", name: "Burp Suite (Basics)", category: "offensive-security", level: "learning" },
  { id: "skill-owasp", name: "OWASP Top 10 & Vulnerability Assessment", category: "offensive-security", level: "learning" },
  { id: "skill-labs", name: "VirtualBox & QEMU (Lab Environments)", category: "offensive-security", level: "proficient" },

  { id: "skill-python", name: "Python", category: "ai-tooling", level: "proficient" },
  { id: "skill-rag", name: "RAG Pipelines", category: "ai-tooling", level: "proficient" },
  { id: "skill-ollama", name: "LLM Orchestration (Ollama)", category: "ai-tooling", level: "proficient" },
  { id: "skill-ml", name: "Machine Learning Basics", category: "ai-tooling", level: "learning" },
  { id: "skill-ocr", name: "OCR & Task Automation (Tesseract)", category: "ai-tooling", level: "proficient" },

  { id: "skill-js", name: "JavaScript", category: "frontend-engineering", level: "proficient" },
  { id: "skill-java", name: "Java", category: "frontend-engineering", level: "learning" },
  { id: "skill-cpp", name: "C / C++", category: "frontend-engineering", level: "learning" },
  { id: "skill-node", name: "Node.js & npm", category: "frontend-engineering", level: "proficient" },
  { id: "skill-mysql", name: "MySQL", category: "frontend-engineering", level: "proficient" },

  { id: "skill-networking", name: "Networking Fundamentals (TCP/IP, DNS, HTTP/HTTPS)", category: "foundations", level: "proficient" },
  { id: "skill-security-basics", name: "Linux & Windows Security Basics", category: "foundations", level: "proficient" },
  { id: "skill-git", name: "Git & GitHub", category: "foundations", level: "proficient" },
  { id: "skill-problem-solving", name: "Problem Solving", category: "foundations", level: "advanced" },
];

export const skillCategoryTitles: Record<Skill["category"], string> = {
  "offensive-security": "Offensive Security",
  "ai-tooling": "Automation & AI",
  "frontend-engineering": "Programming & Web",
  foundations: "Foundations",
};
