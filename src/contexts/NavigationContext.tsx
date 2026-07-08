/* eslint-disable react-refresh/only-export-components -- context modules intentionally export both a Provider and its paired hook */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface NavigationContextValue {
  isCommandPaletteOpen: boolean;
  isTerminalOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  openTerminal: () => void;
  closeTerminal: () => void;
}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isTerminalOpen, setTerminalOpen] = useState(false);

  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);
  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modifierPressed = isMac ? event.metaKey : event.ctrlKey;

      if (modifierPressed && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandPaletteOpen((v) => !v);
      }

      if (modifierPressed && event.shiftKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        setTerminalOpen((v) => !v);
      }

      if (event.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo<NavigationContextValue>(
    () => ({
      isCommandPaletteOpen,
      isTerminalOpen,
      openCommandPalette,
      closeCommandPalette,
      openTerminal,
      closeTerminal,
    }),
    [isCommandPaletteOpen, isTerminalOpen, openCommandPalette, closeCommandPalette, openTerminal, closeTerminal],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

export function useNavigationState(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigationState must be used within a NavigationProvider");
  }
  return ctx;
}
