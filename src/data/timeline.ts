import type { TimelineEntry } from "@/types/experience";

export const timeline: TimelineEntry[] = [
  {
    id: "stage-1",
    stage: 1,
    title: "Started the BCA program",
    body: "First real exposure to systems, networks, and how software actually breaks — not just how it's built.",
  },
  {
    id: "stage-2",
    stage: 2,
    title: "Built a home lab",
    body: "Started running Kali Linux, working through vulnerable machines, and learning by breaking things safely.",
  },
  {
    id: "stage-3",
    stage: 3,
    title: "Started building tools, not just using them",
    body: "Moved from following tutorials to shipping AI-assisted security tooling of my own.",
  },
  {
    id: "stage-4",
    stage: 4,
    title: "Now: combining AI and security",
    body: "Building multi-agent systems and RAG-powered assistants aimed at security education and defense.",
  },
];
