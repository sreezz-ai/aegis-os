import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type BadgeTone = "accent" | "primary" | "success" | "warning" | "danger" | "neutral";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  accent: "text-accent bg-accent-soft",
  primary: "text-primary bg-primary-soft",
  success: "text-success bg-[rgba(52,211,153,0.12)]",
  warning: "text-warning bg-[rgba(251,191,36,0.12)]",
  danger: "text-danger bg-[rgba(248,113,113,0.12)]",
  neutral: "text-text-muted bg-white/5",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 font-mono text-[10.5px] font-medium",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
