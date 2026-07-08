import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // In a real deployment this would report to an error-tracking service.
    console.error("AegisOS render error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, message: null });
    window.location.assign("/");
  };

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <FiAlertTriangle size={32} color="var(--color-danger)" aria-hidden="true" />
        <h1 className="font-display text-2xl font-semibold">Something broke, unexpectedly</h1>
        <p className="max-w-md text-sm text-text-muted">
          {this.state.message ?? "An unexpected error occurred while rendering this page."}
        </p>
        <button onClick={this.handleReset} className="btn-primary focus-ring rounded-xl px-5 py-2.5 text-sm font-semibold">
          Back to home
        </button>
      </div>
    );
  }
}
