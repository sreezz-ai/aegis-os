import { FiTool } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { SITE } from "@/constants/site";

export function MaintenancePage(): JSX.Element {
  return (
    <>
      <SEO title="Under maintenance" description="This site is temporarily under maintenance." path="/maintenance" />
      <Section className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <FiTool size={28} color="var(--color-accent)" aria-hidden="true" />
        <p className="mt-4 font-mono text-xs text-text-faint">MAINTENANCE MODE</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">{SITE.name} is getting an upgrade</h1>
        <p className="mt-2 max-w-sm text-sm text-text-muted">Check back shortly — new phases are in progress.</p>
      </Section>
    </>
  );
}
