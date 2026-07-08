import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
}

export function Eyebrow({ children }: EyebrowProps): JSX.Element {
  return (
    <div className="mb-3.5 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
      <span aria-hidden="true" className="h-px w-[18px] bg-accent" />
      {children}
    </div>
  );
}
