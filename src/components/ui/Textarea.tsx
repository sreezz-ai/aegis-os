import type { TextareaHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/utils/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className, ...rest }: TextareaProps): JSX.Element {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="font-mono text-xs uppercase tracking-wide text-text-muted">
        {label}
      </label>
      <textarea
        id={textareaId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        rows={5}
        className={cn(
          "focus-ring resize-y rounded-lg border border-border-soft bg-transparent px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-faint",
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
