import { FiBriefcase } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import type { Experience } from "@/types/experience";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps): JSX.Element {
  return (
    <Card padding="lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">{experience.role}</h3>
          <p className="mt-1 text-sm text-text-muted">{experience.organization}</p>
        </div>
        <FiBriefcase size={18} color="var(--color-primary)" aria-hidden="true" />
      </div>
      {experience.period && (
        <p className="mt-1.5 font-mono text-xs text-text-faint">{experience.period}</p>
      )}
      <p className="mt-3.5 text-sm leading-relaxed text-text-muted">{experience.summary}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {experience.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-[13.5px] text-text-primary">
            <span aria-hidden="true" className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
            {highlight}
          </li>
        ))}
      </ul>
    </Card>
  );
}
