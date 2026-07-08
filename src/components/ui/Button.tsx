import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  className,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  const base = "focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

  const variantClass =
    variant === "primary"
      ? "btn-primary border-none"
      : variant === "ghost"
        ? "btn-ghost bg-transparent"
        : "bg-transparent border-none text-accent underline-offset-4 hover:underline px-0 py-0";

  return (
    <button className={cn(base, variant !== "link" && SIZE_CLASSES[size], variantClass, className)} {...rest}>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
