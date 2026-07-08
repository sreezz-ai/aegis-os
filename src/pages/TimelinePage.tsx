import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Timeline } from "@/components/ui/Timeline";
import { timeline } from "@/data/timeline";

export function TimelinePage(): JSX.Element {
  return (
    <>
      <SEO title="Timeline" description="The stages of the journey so far." path="/timeline" />

      <Section className="pb-0">
        <PageHeader eyebrow="Timeline" title="The journey, stage by stage" />
      </Section>

      <Section>
        <Timeline entries={timeline} />
      </Section>
    </>
  );
}
