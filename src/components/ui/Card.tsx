import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverable?: boolean;
  padding?: "sm" | "md" | "lg";
}

const PADDING_CLASSES = { sm: "p-4", md: "p-5", lg: "p-6" };

export function Card({ children, hoverable = true, padding = "md", className, ...rest }: CardProps): JSX.Element {
  return (
    <div
      className={cn("glass rounded-2xl", hoverable && "card-hover", PADDING_CLASSES[padding], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
