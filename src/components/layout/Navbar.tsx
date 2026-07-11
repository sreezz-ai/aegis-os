import type { MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiShield, FiSun, FiMonitor, FiCommand, FiDownload } from "react-icons/fi";
import { navItems } from "@/data/navigation";
import { useRecruiterMode } from "@/contexts/RecruiterModeContext";
import { useToast } from "@/contexts/ToastContext";
import { useNavigationState } from "@/contexts/NavigationContext";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

const COMING_SOON_IDS = new Set(["blog", "certificates"]);

export function Navbar(): JSX.Element {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();
  const { showToast } = useToast();
  const { openCommandPalette } = useNavigationState();
  const navigate = useNavigate();

  function handleNavClick(id: string, event: MouseEvent): void {
    if (COMING_SOON_IDS.has(id)) {
      event.preventDefault();
      showToast("That section is coming in a later build phase.");
    }
  }

  return (
    <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <button
          onClick={() => navigate(ROUTES.home)}
          className="focus-ring flex items-center gap-2 bg-transparent font-display text-lg font-semibold"
        >
          <FiShield size={19} color="var(--color-accent)" aria-hidden="true" />
          AEGIS<span className="text-accent">OS</span>
          <span className="sr-only">— {SITE.owner}</span>
        </button>

        <nav aria-label="Primary" className="hidden gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={(e) => handleNavClick(item.id, e)}
              className={({ isActive }) =>
                `focus-ring font-mono text-[13px] ${isActive ? "text-text-primary" : "text-text-muted"}`
              }
            >
              {({ isActive }) => (
                <span data-active={isActive} className="nav-link inline-flex items-center gap-1.5 py-1.5">
                  {item.label}
                  {COMING_SOON_IDS.has(item.id) && (
                    <span className="rounded-md border border-border-soft px-1.5 py-0.5 text-[9px] text-text-faint">
                      soon
                    </span>
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className="btn-ghost focus-ring hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs sm:flex"
            aria-label="Download resume as PDF"
          >
            <FiDownload size={13} /> Resume
          </a>
          <button
            onClick={openCommandPalette}
            className="btn-ghost focus-ring hidden items-center gap-1.5 rounded-lg bg-transparent px-2.5 py-1.5 font-mono text-xs sm:flex"
            aria-label="Open command palette"
          >
            <FiCommand size={13} /> K
          </button>
          <button
            onClick={toggleRecruiterMode}
            aria-pressed={isRecruiterMode}
            className="btn-ghost focus-ring flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-1.5 font-mono text-xs"
          >
            {isRecruiterMode ? <FiMonitor size={13} /> : <FiSun size={13} />}
            {isRecruiterMode ? "Exit Recruiter Mode" : "Recruiter Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}
