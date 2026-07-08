import type { Variants } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: EASE_OUT } },
};

export const floatY: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export const hoverLift = {
  whileHover: { y: -4 },
  transition: { duration: 0.3, ease: EASE_OUT },
};
