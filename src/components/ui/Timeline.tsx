import { Reveal } from "@/components/motion/Reveal";
import type { TimelineEntry } from "@/types/experience";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps): JSX.Element {
  return (
    <div className="relative pl-7">
      <div aria-hidden="true" className="absolute bottom-1.5 left-[5px] top-1.5 w-px bg-border-strong" />
      <ol className="flex flex-col gap-8">
        {entries.map((entry, i) => (
          <Reveal key={entry.id} delay={i * 0.08}>
            <li className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[28.5px] top-1 h-[11px] w-[11px] animate-pulseRing rounded-full border-2 border-void bg-primary"
              />
              <div className="font-mono text-[11px] text-text-faint">{`STAGE ${entry.stage}`}</div>
              <h3 className="font-display text-[17px] font-semibold">{entry.title}</h3>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-text-muted">{entry.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
