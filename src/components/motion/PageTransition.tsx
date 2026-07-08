import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/animations/variants";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps): JSX.Element {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      {children}
    </motion.div>
  );
}
