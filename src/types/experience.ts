import type { ID } from "./common";

export interface Experience {
  id: ID;
  role: string;
  organization: string;
  period?: string;
  summary: string;
  highlights: string[];
}

export interface TimelineEntry {
  id: ID;
  stage: number;
  title: string;
  body: string;
}
