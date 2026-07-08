import { useCallback } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useScrollTo(): (elementId: string) => void {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      element?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    },
    [prefersReducedMotion],
  );
}
