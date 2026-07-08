import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnimatedBackground } from "@/components/background/AnimatedBackground";
import { MouseGlow } from "@/components/background/MouseGlow";
import { Toast } from "@/components/feedback/Toast";
import { CommandPalette } from "@/features/commandPalette/CommandPalette";
import { TerminalWindow } from "@/features/terminal/TerminalWindow";

export function AppLayout(): JSX.Element {
  return (
    <MouseGlow>
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <Navbar />
        <main className="relative z-10">
          <Outlet />
        </main>
        <Footer />
        <Toast />
        <CommandPalette />
        <TerminalWindow />
      </div>
    </MouseGlow>
  );
}
