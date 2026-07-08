import { useEffect, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiTerminal, FiX } from "react-icons/fi";
import { useNavigationState } from "@/contexts/NavigationContext";
import { runTerminalCommand } from "./commands";

interface HistoryLine {
  id: number;
  type: "input" | "output";
  text: string;
}

let lineCounter = 0;

export function TerminalWindow(): JSX.Element | null {
  const { isTerminalOpen, closeTerminal } = useNavigationState();
  const [history, setHistory] = useState<HistoryLine[]>([
    { id: lineCounter++, type: "output", text: "AEGIS OS terminal mode. Type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isTerminalOpen) {
      inputRef.current?.focus();
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function appendLines(lines: string[], type: HistoryLine["type"] = "output"): void {
    setHistory((prev) => [...prev, ...lines.map((text) => ({ id: lineCounter++, type, text }))]);
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    const trimmed = input.trim();
    appendLines([`> ${trimmed}`], "input");

    if (trimmed.toLowerCase() === "history") {
      appendLines(commandHistory.length ? commandHistory : ["No commands yet."]);
    } else {
      const result = runTerminalCommand(trimmed);
      if (result.clear) {
        setHistory([]);
      } else {
        appendLines(result.lines);
      }
      if (result.navigateTo) {
        navigate(result.navigateTo);
      }
      if (trimmed.toLowerCase() === "exit") {
        closeTerminal();
      }
    }

    if (trimmed) setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(null);
    setInput("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer = historyPointer === null ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInput(commandHistory[nextPointer] ?? "");
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyPointer === null) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(null);
        setInput("");
      } else {
        setHistoryPointer(nextPointer);
        setInput(commandHistory[nextPointer] ?? "");
      }
    }
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isTerminalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-label="Terminal mode"
          className="glass fixed bottom-6 left-1/2 z-[95] w-[min(640px,92vw)] -translate-x-1/2 rounded-2xl p-0 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
              <FiTerminal size={14} color="var(--color-accent)" />
              aegis-os — terminal
            </div>
            <button onClick={closeTerminal} aria-label="Close terminal" className="focus-ring text-text-muted">
              <FiX size={16} />
            </button>
          </div>

          <div ref={scrollRef} className="max-h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
            {history.map((line) => (
              <div key={line.id} className={line.type === "input" ? "text-text-primary" : "text-text-muted"}>
                {line.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border-soft px-4 py-3">
            <span className="font-mono text-xs text-accent">{">"}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 bg-transparent font-mono text-[13px] text-text-primary outline-none"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
