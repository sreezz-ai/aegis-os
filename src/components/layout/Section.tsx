import type { ReactNode } from "react";
import { Container } from "./Container";
import { cn } from "@/utils/cn";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Section({ id, children, className, containerClassName }: SectionProps): JSX.Element {
  return (
    <section id={id} className={cn("relative z-10 py-16 md:py-22", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
