import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiShield } from "react-icons/fi";
import { BOOT_LINES } from "@/constants/site";

interface BootSequenceProps {
  onDone: () => void;
  skip: boolean;
}

export function BootSequence({ onDone, skip }: BootSequenceProps): JSX.Element | null {
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }

    if (lineIndex < BOOT_LINES.length) {
      const timeout = setTimeout(() => setLineIndex((i) => i + 1), lineIndex === 0 ? 350 : 420);
      return () => clearTimeout(timeout);
    }

    const exitTimeout = setTimeout(() => setExiting(true), 500);
    const doneTimeout = setTimeout(onDone, 1000);
    return () => {
      clearTimeout(exitTimeout);
      clearTimeout(doneTimeout);
    };
  }, [lineIndex, skip, onDone]);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          role="status"
          aria-live="polite"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
        >
          <div className="w-[min(520px,90vw)] font-mono">
            <div className="mb-4 flex items-center gap-2 text-text-muted">
              <FiShield size={16} color="var(--color-accent)" aria-hidden="true" />
              <span className="text-[13px]">AEGIS OS — boot sequence</span>
            </div>
            <div className="text-sm leading-loose">
              {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
                <div key={line} className={i === BOOT_LINES.length - 1 ? "text-accent" : "text-text-primary"}>
                  <span className="text-text-faint">{"> "}</span>
                  {line}
                </div>
              ))}
              {lineIndex < BOOT_LINES.length && (
                <div className="text-text-faint">
                  <span>{"> "}</span>
                  <span className="animate-caret">▍</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
