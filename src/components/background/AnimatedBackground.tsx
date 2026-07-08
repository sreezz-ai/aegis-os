import { useRecruiterMode } from "@/contexts/RecruiterModeContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AnimatedBackground(): JSX.Element | null {
  const { isRecruiterMode } = useRecruiterMode();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (isRecruiterMode) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      {!prefersReducedMotion && (
        <div className="scanline absolute top-0 animate-scanline" />
      )}
    </div>
  );
}
