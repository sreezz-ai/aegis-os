import { Link } from "react-router-dom";
import { FiCode, FiArrowUpRight } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buildProjectPath } from "@/constants/routes";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

const STATUS_TONE = {
  completed: "success",
  "in-progress": "accent",
  concept: "neutral",
} as const;

export function ProjectCard({ project }: ProjectCardProps): JSX.Element {
  return (
    <Card padding="lg" className="flex flex-col">
      <Link
        to={buildProjectPath(project.slug)}
        className="focus-ring flex flex-1 flex-col no-underline"
        aria-label={`View ${project.title} case study`}
      >
        <div className="flex items-center justify-between">
          <FiCode size={18} color="var(--color-primary)" aria-hidden="true" />
          <FiArrowUpRight size={14} color="var(--color-text-faint)" aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">{project.title}</h3>
        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <Badge tone={STATUS_TONE[project.status]}>{project.status.replace("-", " ")}</Badge>
          {project.techStack.slice(0, 3).map((tag) => (
            <Badge key={tag} tone="accent">
              {tag}
            </Badge>
          ))}
        </div>
      </Link>
    </Card>
  );
}
