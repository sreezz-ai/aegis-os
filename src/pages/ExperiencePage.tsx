import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { Reveal } from "@/components/motion/Reveal";
import { experience } from "@/data/experience";

export function ExperiencePage(): JSX.Element {
  return (
    <>
      <SEO title="Experience" description="Academic and hands-on experience." path="/experience" />

      <Section className="pb-0">
        <PageHeader eyebrow="Experience" title="Where I've spent my time" />
      </Section>

      <Section>
        <div className="flex flex-col gap-5">
          {experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <ExperienceCard experience={item} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
