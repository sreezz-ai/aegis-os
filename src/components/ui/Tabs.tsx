import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
}

export function Tabs({ tabs, defaultTabId }: TabsProps): JSX.Element {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id ?? "");

  return (
    <div>
      <div role="tablist" aria-label="Tabs" className="flex gap-1 border-b border-border-soft">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "focus-ring -mb-px border-b-2 px-4 py-2.5 font-mono text-xs",
                isActive ? "border-accent text-text-primary" : "border-transparent text-text-muted",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="pt-5"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
