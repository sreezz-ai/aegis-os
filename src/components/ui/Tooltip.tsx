import { useId, useState } from "react";
import type { ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <span aria-describedby={tooltipId}>{children}</span>
      {isVisible && (
        <span
          id={tooltipId}
          role="tooltip"
          className="glass pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1.5 font-mono text-[11px] text-text-primary"
        >
          {label}
        </span>
      )}
    </span>
  );
}
