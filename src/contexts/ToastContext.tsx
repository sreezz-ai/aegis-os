/* eslint-disable react-refresh/only-export-components -- context modules intentionally export both a Provider and its paired hook */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

interface ToastContextValue {
  message: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }): JSX.Element {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((next: string) => {
    setMessage(next);
  }, []);

  const clearToast = useCallback(() => setMessage(null), []);

  const value = useMemo<ToastContextValue>(
    () => ({ message, showToast, clearToast }),
    [message, showToast, clearToast],
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
