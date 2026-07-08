import { FiDownload, FiPrinter } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { experience } from "@/data/experience";
import { skillCategoryTitles, skills } from "@/data/skills";
import { SITE } from "@/constants/site";

export function ResumePage(): JSX.Element {
  const categories = Object.keys(skillCategoryTitles) as Array<keyof typeof skillCategoryTitles>;

  return (
    <>
      <SEO title="Resume" description={`Resume for ${SITE.owner}.`} path="/resume" />

      <Section className="pb-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <PageHeader eyebrow="Resume" title={SITE.owner} description={SITE.role} />
          <div className="flex gap-3 print:hidden">
            <Button variant="ghost" icon={<FiPrinter size={14} />} onClick={() => window.print()}>
              Print
            </Button>
            <Button icon={<FiDownload size={14} />} disabled title="Resume file coming in a later phase">
              Download PDF
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <Card padding="lg">
          <h2 className="font-display text-lg font-semibold">Education</h2>
          <p className="mt-2 text-sm text-text-muted">
            BCA — Bachelor of Computer Applications (in progress). Core coursework in computer architecture,
            networks, and programming.
          </p>
        </Card>
      </Section>

      <Section>
        <Card padding="lg">
          <h2 className="font-display text-lg font-semibold">Experience</h2>
          <div className="mt-3 flex flex-col gap-4">
            {experience.map((item) => (
              <div key={item.id}>
                <p className="font-semibold text-text-primary">
                  {item.role} · {item.organization}
                </p>
                <p className="font-mono text-xs text-text-faint">{item.period}</p>
                <ul className="mt-1.5 list-disc pl-5 text-sm text-text-muted">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section>
        <Card padding="lg">
          <h2 className="font-display text-lg font-semibold">Skills</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <div key={category}>
                <p className="font-mono text-xs uppercase tracking-wide text-text-faint">
                  {skillCategoryTitles[category]}
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  {skills
                    .filter((s) => s.category === category)
                    .map((s) => s.name)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </>
  );
}
