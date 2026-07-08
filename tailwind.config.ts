import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--color-bg-void)",
        surface: "var(--color-bg-surface)",
        card: "var(--color-bg-card)",
        border: {
          soft: "var(--color-border-soft)",
          strong: "var(--color-border-strong)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          soft: "var(--color-primary-soft)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          soft: "var(--color-accent-soft)",
        },
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        text: {
          primary: "var(--color-text-primary)",
          muted: "var(--color-text-muted)",
          faint: "var(--color-text-faint)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      boxShadow: {
        glow: "0 8px 24px -8px var(--color-primary-soft)",
      },
      keyframes: {
        caret: {
          "0%, 45%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        bounceDown: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.5" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 var(--color-primary-soft)" },
          "70%": { boxShadow: "0 0 0 12px rgba(99,102,241,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(99,102,241,0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        caret: "caret 1s steps(1) infinite",
        fadeUp: "fadeUp 0.7s cubic-bezier(.22,.61,.36,1) both",
        bounceDown: "bounceDown 2s ease-in-out infinite",
        pulseRing: "pulseRing 2.4s ease-out infinite",
        scanline: "scanline 9s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
