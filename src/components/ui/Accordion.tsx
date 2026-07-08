import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps): JSX.Element {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-border-soft border-y border-border-soft">
      {items.map((item) => {
        const isOpen = item.id === openId;
        return (
          <div key={item.id}>
            <h3>
              <button
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
                id={`accordion-trigger-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="focus-ring flex w-full items-center justify-between bg-transparent py-4 text-left font-display text-sm font-medium"
              >
                {item.question}
                <FiChevronDown
                  size={16}
                  className={`shrink-0 text-text-faint transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-sm leading-relaxed text-text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
