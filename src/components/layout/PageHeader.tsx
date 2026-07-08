import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps): JSX.Element {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.15]">{title}</h1>
      {description && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{description}</p>
      )}
    </motion.div>
  );
}
