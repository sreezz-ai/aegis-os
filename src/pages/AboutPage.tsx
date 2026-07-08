import { FiStar } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Timeline } from "@/components/ui/Timeline";
import { timeline } from "@/data/timeline";
import { SITE } from "@/constants/site";

const LEARNING_NOW = [
  "Penetration testing methodology",
  "Cloud security fundamentals",
  "Securing AI-integrated systems",
];

export function AboutPage(): JSX.Element {
  return (
    <>
      <SEO
        title="About"
        description={`About ${SITE.owner} — cybersecurity student and builder.`}
        path="/about"
      />

      <Section className="pb-0">
        <PageHeader
          eyebrow="About"
          title="Who I am"
          description={`I'm a cybersecurity student pursuing my BCA, based in ${SITE.location}. I care less about collecting certificates and more about understanding how systems actually fail — then building things, including AI-assisted tools, to help find and fix that failure sooner.`}
        />
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Education</Eyebrow>
            <h3 className="font-display text-xl font-semibold">BCA — Bachelor of Computer Applications</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
              Currently in progress. Core coursework in computer architecture, networks, and programming, paired
              with self-directed study in offensive security.
            </p>
          </div>
          <div>
            <Eyebrow>Mission</Eyebrow>
            <h3 className="font-display text-xl font-semibold">Build the tools I wish existed</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
              Most security learning resources are static. I want to make them adaptive — using AI to explain, not
              just to automate.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Journey</Eyebrow>
        <h2 className="mb-9 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">How I got here</h2>
        <Timeline entries={timeline} />
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card padding="lg">
            <Eyebrow>Learning right now</Eyebrow>
            <ul className="mt-1 flex flex-col gap-2.5">
              {LEARNING_NOW.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm">
                  <FiStar size={14} color="var(--color-accent)" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card padding="lg">
            <Eyebrow>Career vision</Eyebrow>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              I&apos;m aiming for a role as a penetration tester or security engineer — and I intend to keep
              building tools along the way, not stop once I&apos;m hired.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
