import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps): JSX.Element {
  return <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>{children}</div>;
}
