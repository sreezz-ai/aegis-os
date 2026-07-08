import { useRecruiterMode } from "@/contexts/RecruiterModeContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";
import type { ReactNode } from "react";

interface MouseGlowProps {
  children: ReactNode;
}

export function MouseGlow({ children }: MouseGlowProps): JSX.Element {
  const { isRecruiterMode } = useRecruiterMode();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { position, onMouseMove, onMouseLeave } = useMousePosition();

  const showGlow = !isRecruiterMode && !prefersReducedMotion && position.visible;

  return (
    <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="relative">
      {showGlow && (
        <div
          className="mouse-glow"
          style={{ left: position.x, top: position.y }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
