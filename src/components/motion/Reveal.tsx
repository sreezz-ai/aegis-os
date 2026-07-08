import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps): JSX.Element {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
