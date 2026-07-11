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
  "Penetration testing & Red Team fundamentals",
  "SOC (Security Operations Center) concepts",
  "Advanced Linux administration (Kali)",
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
          description={`I'm a cybersecurity-focused BCA graduate based in ${SITE.location}. I care less about collecting certificates and more about understanding how systems actually fail — then building things, including automation and AI-assisted tools, to help find and fix that failure sooner.`}
        />
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>Education</Eyebrow>
            <h3 className="font-display text-xl font-semibold">
              BCA — Bachelor of Computer Applications, Cybersecurity
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
              Bengaluru City University, via Sambhram Academy of Management and Studies (2021–2024). Core coursework in
              networking, systems, and programming, specialized toward cybersecurity, with hands-on practice
              through platforms like TryHackMe alongside the coursework.
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
              I&apos;m working toward a career in penetration testing and Red Team operations — with vulnerability
              assessment, security research, and SOC analysis as adjacent paths I&apos;m building skills in along
              the way. I intend to keep shipping tools, not stop once I&apos;m hired.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
