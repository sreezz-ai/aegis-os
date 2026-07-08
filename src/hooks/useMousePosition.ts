import { useCallback, useState } from "react";
import type { MouseEvent } from "react";

interface MousePosition {
  x: number;
  y: number;
  visible: boolean;
}

interface UseMousePositionResult {
  position: MousePosition;
  onMouseMove: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
}

export function useMousePosition(): UseMousePositionResult {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0, visible: false });

  const onMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
    // Viewport-relative coordinates — paired with `position: fixed` in CSS.
    setPosition({
      x: event.clientX,
      y: event.clientY,
      visible: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setPosition((prev) => ({ ...prev, visible: false }));
  }, []);

  return { position, onMouseMove, onMouseLeave };
}
