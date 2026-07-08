import { Link } from "react-router-dom";
import { FiCompass } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { ROUTES } from "@/constants/routes";

export function NotFoundPage(): JSX.Element {
  return (
    <>
      <SEO title="Page not found" description="This page doesn't exist." path="/404" />
      <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <FiCompass size={28} color="var(--color-accent)" aria-hidden="true" />
        <p className="mt-4 font-mono text-xs text-text-faint">ERROR 404</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">This route doesn&apos;t exist</h1>
        <p className="mt-2 max-w-sm text-sm text-text-muted">
          Try the command palette (Ctrl+K) to find what you&apos;re looking for.
        </p>
        <Link to={ROUTES.home} className="btn-primary focus-ring mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold no-underline">
          Back to home
        </Link>
      </Section>
    </>
  );
}
