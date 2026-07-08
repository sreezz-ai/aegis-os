import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function Dropdown({ label, options, selectedId, onSelect }: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.id === selectedId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={label}
        className="focus-ring btn-ghost flex items-center gap-2 rounded-lg bg-transparent px-3.5 py-2 font-mono text-xs"
      >
        {selected?.label ?? label}
        <FiChevronDown size={12} className={isOpen ? "rotate-180" : ""} aria-hidden="true" />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="glass absolute right-0 z-30 mt-2 min-w-[160px] rounded-xl p-1.5"
        >
          {options.map((option) => (
            <li key={option.id}>
              <button
                role="option"
                aria-selected={option.id === selectedId}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className="focus-ring w-full rounded-lg px-3 py-2 text-left font-mono text-xs text-text-muted hover:bg-white/5 hover:text-text-primary"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
