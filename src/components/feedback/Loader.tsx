interface LoaderProps {
  label?: string;
}

export function Loader({ label = "Loading" }: LoaderProps): JSX.Element {
  return (
    <div role="status" className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-3">
      <div
        aria-hidden="true"
        className="h-8 w-8 animate-spin rounded-full border-2 border-border-soft border-t-accent"
      />
      <span className="font-mono text-xs text-text-faint">{label}...</span>
    </div>
  );
}
