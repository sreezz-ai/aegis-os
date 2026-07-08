import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiCornerDownLeft } from "react-icons/fi";
import { useNavigationState } from "@/contexts/NavigationContext";
import { navItems } from "@/data/navigation";
import { projects } from "@/data/projects";
import { buildProjectPath } from "@/constants/routes";

interface PaletteEntry {
  id: string;
  label: string;
  hint: string;
  path: string;
}

export function CommandPalette(): JSX.Element | null {
  const { isCommandPaletteOpen, closeCommandPalette } = useNavigationState();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const entries = useMemo<PaletteEntry[]>(() => {
    const pageEntries: PaletteEntry[] = navItems.map((item) => ({
      id: `page-${item.id}`,
      label: item.label,
      hint: "Page",
      path: item.path,
    }));
    const projectEntries: PaletteEntry[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      hint: "Project",
      path: buildProjectPath(project.slug),
    }));
    return [...pageEntries, ...projectEntries];
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return entries;
    return entries.filter((entry) => entry.label.toLowerCase().includes(normalized));
  }, [entries, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setQuery("");
    }
  }, [isCommandPaletteOpen]);

  function handleSelect(entry: PaletteEntry): void {
    navigate(entry.path);
    closeCommandPalette();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }
    if (event.key === "Enter") {
      const entry = filtered[activeIndex];
      if (entry) handleSelect(entry);
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-start justify-center bg-black/60 px-4 pt-[12vh]"
          onClick={closeCommandPalette}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3.5">
              <FiSearch size={16} color="var(--color-text-faint)" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages and projects..."
                aria-label="Search pages and projects"
                className="flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-faint"
              />
              <kbd className="rounded border border-border-soft px-1.5 py-0.5 font-mono text-[10px] text-text-faint">
                esc
              </kbd>
            </div>
            <ul role="listbox" className="max-h-72 overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <li className="px-3.5 py-6 text-center text-xs text-text-faint">No results found.</li>
              )}
              {filtered.map((entry, index) => (
                <li key={entry.id}>
                  <button
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(entry)}
                    className={`flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm ${
                      index === activeIndex ? "bg-white/5 text-text-primary" : "text-text-muted"
                    }`}
                  >
                    <span>{entry.label}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-text-faint">
                      {entry.hint}
                      {index === activeIndex && <FiCornerDownLeft size={11} />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
