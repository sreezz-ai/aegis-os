import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className, ...rest }: InputProps): JSX.Element {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-mono text-xs uppercase tracking-wide text-text-muted">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "focus-ring rounded-lg border border-border-soft bg-transparent px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-faint",
          error && "border-danger",
          className,
        )}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
