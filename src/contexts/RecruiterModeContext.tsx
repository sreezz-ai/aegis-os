/* eslint-disable react-refresh/only-export-components -- context modules intentionally export both a Provider and its paired hook */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface RecruiterModeContextValue {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextValue | undefined>(undefined);

export function RecruiterModeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-recruiter", String(isRecruiterMode));
  }, [isRecruiterMode]);

  const value = useMemo<RecruiterModeContextValue>(
    () => ({
      isRecruiterMode,
      toggleRecruiterMode: () => setIsRecruiterMode((v) => !v),
    }),
    [isRecruiterMode],
  );

  return <RecruiterModeContext.Provider value={value}>{children}</RecruiterModeContext.Provider>;
}

export function useRecruiterMode(): RecruiterModeContextValue {
  const ctx = useContext(RecruiterModeContext);
  if (!ctx) {
    throw new Error("useRecruiterMode must be used within a RecruiterModeProvider");
  }
  return ctx;
}
