import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";

export function Toast(): JSX.Element {
  const { message, clearToast } = useToast();

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(clearToast, 2400);
    return () => clearTimeout(timeout);
  }, [message, clearToast]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="glass fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl px-4 py-3 font-mono text-sm"
        >
          {message}
          <button onClick={clearToast} aria-label="Dismiss notification" className="focus-ring text-text-muted">
            <FiX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
