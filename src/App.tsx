import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/feedback/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { RecruiterModeProvider } from "@/contexts/RecruiterModeContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { AppRouter } from "@/app/router";

export function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <RecruiterModeProvider>
            <ToastProvider>
              <NavigationProvider>
                <AppRouter />
              </NavigationProvider>
            </ToastProvider>
          </RecruiterModeProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
