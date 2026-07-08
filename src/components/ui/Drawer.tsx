import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Drawer({ isOpen, onClose, title, children }: DrawerProps): JSX.Element | null {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="glass fixed inset-y-0 right-0 z-[85] w-[min(320px,85vw)] p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold">{title}</h2>
              <button onClick={onClose} aria-label="Close menu" className="focus-ring text-text-muted">
                <FiX size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
