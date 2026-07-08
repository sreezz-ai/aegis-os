import { Card } from "@/components/ui/Card";
import type { SkillGroup } from "@/types/skill";

interface SkillCardProps {
  group: SkillGroup;
}

export function SkillCard({ group }: SkillCardProps): JSX.Element {
  return (
    <Card>
      <div className="mb-3 font-mono text-[11px] uppercase tracking-wide text-text-faint">{group.title}</div>
      <ul className="flex flex-col gap-2">
        {group.skills.map((skill) => (
          <li key={skill.id} className="flex items-center gap-2 text-[13.5px] text-text-primary">
            <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-primary" />
            {skill.name}
          </li>
        ))}
      </ul>
    </Card>
  );
}
