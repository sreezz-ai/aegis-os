import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "proj-cybermentor-v3",
    slug: "cybermentor-v3",
    title: "CyberMentor V3",
    summary:
      "A multi-agent AI cybersecurity learning assistant built for Kali Linux.",
    description:
      "CyberMentor V3 pairs a retrieval-augmented generation pipeline with local LLMs served through Ollama, wrapped in a live Gradio interface. It's designed to explain security concepts and guide practice on vulnerable machines, rather than just answering trivia.",
    architecture:
      "A coordinator agent routes requests to specialist agents (recon, exploitation theory, defense) which each query a shared vector store built from curated security documentation. Responses are streamed back through Gradio in real time.",
    techStack: ["Python", "Ollama", "RAG", "Gradio", "Vector DB", "Multi-Agent Orchestration"],
    features: [
      "Multi-agent routing between recon, exploitation, and defense specialists",
      "Local-first LLM inference via Ollama — no data leaves the machine",
      "RAG pipeline grounded in curated security documentation",
      "Live chat interface built with Gradio",
    ],
    lessonsLearned: [
      "Agent handoff logic matters more than any single agent's prompt quality",
      "Local inference tradeoffs between latency and model size on consumer hardware",
    ],
    challenges: [
      "Keeping retrieval relevant across very different security subdomains",
      "Running acceptable inference speed without a dedicated GPU",
    ],
    links: {},
    status: "in-progress",
    difficulty: "advanced",
    featured: true,
    relatedProjectSlugs: ["deep-sea-copilot"],
    coverImageAlt: "Terminal-style interface for the CyberMentor V3 learning assistant",
  },
  {
    id: "proj-deep-sea-copilot",
    slug: "deep-sea-copilot",
    title: "Deep Sea Co-pilot",
    summary:
      "A three-pane security operations console concept with live telemetry and a terminal-style chat UI.",
    description:
      "A production-grade React component exploring what an AI-assisted security operations console could feel like: a dark, glassmorphic 'Deep Sea' aesthetic, live telemetry visualization, and a terminal-style chat pane, all in one three-pane layout.",
    architecture:
      "Built as a set of composable React components (telemetry pane, chat pane, context pane) sharing state through hooks, styled with Tailwind CSS and animated with CSS transitions.",
    techStack: ["React", "Tailwind CSS", "Lucide Icons", "Space Mono", "Orbitron"],
    features: [
      "Three-pane layout: telemetry, chat, and context",
      "Glassmorphism with neon accent detailing",
      "Live-feeling telemetry visualization",
      "Terminal-style chat interaction pattern",
    ],
    lessonsLearned: [
      "High-fidelity dark UI needs disciplined contrast checks to stay accessible",
      "Componentizing each pane independently made iteration much faster",
    ],
    challenges: ["Balancing visual density with actual readability under WCAG contrast rules"],
    links: {},
    status: "concept",
    difficulty: "intermediate",
    featured: true,
    relatedProjectSlugs: ["cybermentor-v3", "aegis-os"],
    coverImageAlt: "Three-pane dark security operations console concept",
  },
  {
    id: "proj-aegis-os",
    slug: "aegis-os",
    title: "Aegis OS",
    summary: "This portfolio itself — an evolving system, not a template.",
    description:
      "Aegis OS is this very site: a production-grade portfolio built in phases with a real engineering process — design system first, then architecture, then features — rather than generated all at once.",
    architecture:
      "Vite + React + TypeScript, with a strict clean-architecture folder layout separating types, data, services, components, and pages. Routing via React Router, motion via Framer Motion.",
    techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion", "React Router"],
    features: [
      "Boot-sequence intro and Recruiter Mode",
      "Command palette and terminal mode",
      "Fully token-driven design system",
    ],
    lessonsLearned: [
      "Design tokens up front made every later phase faster, not slower",
    ],
    challenges: ["Sequencing a large scope into shippable, reviewable phases"],
    links: {},
    status: "in-progress",
    difficulty: "advanced",
    featured: true,
    relatedProjectSlugs: ["cybermentor-v3", "deep-sea-copilot"],
    coverImageAlt: "Aegis OS portfolio home screen with glassmorphic dark UI",
  },
];
