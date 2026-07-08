import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { ROUTES } from "@/constants/routes";

export function ServerErrorPage(): JSX.Element {
  return (
    <>
      <SEO title="Server error" description="Something went wrong." path="/500" />
      <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <FiAlertTriangle size={28} color="var(--color-danger)" aria-hidden="true" />
        <p className="mt-4 font-mono text-xs text-text-faint">ERROR 500</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">Something broke on our end</h1>
        <p className="mt-2 max-w-sm text-sm text-text-muted">Please try again shortly.</p>
        <Link to={ROUTES.home} className="btn-primary focus-ring mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold no-underline">
          Back to home
        </Link>
      </Section>
    </>
  );
}
