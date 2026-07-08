import type { IconType } from "react-icons";
import { Card } from "./Card";

interface StatCardProps {
  icon: IconType;
  label: string;
  value: string;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps): JSX.Element {
  return (
    <Card>
      <Icon size={17} color="var(--color-accent)" aria-hidden="true" />
      <div className="mt-3 font-mono text-[11px] uppercase tracking-wide text-text-faint">{label}</div>
      <div className="mt-1 font-display text-base font-semibold">{value}</div>
    </Card>
  );
}
