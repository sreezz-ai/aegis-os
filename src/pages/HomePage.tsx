import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiGithub, FiMapPin, FiCompass, FiCpu, FiRadio } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { personJsonLd } from "@/seo/jsonld";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { SkillCard } from "@/components/cards/SkillCard";
import { Reveal } from "@/components/motion/Reveal";
import { BootSequence } from "@/components/motion/BootSequence";
import { useTypewriter } from "@/hooks/useTypewriter";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useAsyncData } from "@/hooks/useAsyncData";
import { projectService } from "@/services/projectService";
import { skillService } from "@/services/skillService";
import { TYPE_PHRASES, SITE } from "@/constants/site";
import { ROUTES } from "@/constants/routes";
import { fadeUp } from "@/animations/variants";

const STATS = [
  { icon: FiRadio, label: "Focus", value: "Offensive Security" },
  { icon: FiCpu, label: "Currently Building", value: "AI-powered security tooling" },
  { icon: FiMapPin, label: "Base", value: SITE.location },
  { icon: FiCompass, label: "Status", value: "Open to opportunities" },
];

export function HomePage(): JSX.Element {
  const [booted, setBooted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const headline = useTypewriter(TYPE_PHRASES, { active: booted && !prefersReducedMotion });
  const scrollTo = useScrollTo();

  const { data: featuredProjects } = useAsyncData(() => projectService.getFeatured(), []);
  const { data: skillGroups } = useAsyncData(() => skillService.getAll(), []);

  useEffect(() => {
    if (prefersReducedMotion) setBooted(true);
  }, [prefersReducedMotion]);

  return (
    <>
      <SEO title={SITE.name} description={SITE.defaultDescription} path="/" jsonLd={personJsonLd()} />
      <BootSequence onDone={() => setBooted(true)} skip={prefersReducedMotion} />

      <Section className="pb-0">
        <div className="flex min-h-[62vh] flex-col justify-center">
          <motion.div initial="hidden" animate={booted ? "visible" : "hidden"} variants={fadeUp}>
            <Eyebrow>{SITE.role}</Eyebrow>
            <h1 className="min-h-[2.4em] font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.08] tracking-tight">
              <span className="glow-text">{headline || "\u00A0"}</span>
              <span className="animate-caret text-accent">▍</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-text-muted">
              {SITE.owner} — a BCA student building real offensive-security skills and the AI-powered tools to go
              with them. This site is the system, not the résumé.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button onClick={() => scrollTo("home-projects")} icon={<FiArrowRight size={15} />}>
                See projects
              </Button>
              <Link
                to={ROUTES.about}
                className="btn-ghost focus-ring rounded-xl px-5 py-2.5 text-sm font-medium no-underline"
              >
                Read the journey
              </Link>
            </div>
          </motion.div>
        </div>
        {!prefersReducedMotion && (
          <div aria-hidden="true" className="flex justify-center pb-6 pt-10 text-text-faint">
            <FiChevronDown size={20} className="animate-bounceDown" />
          </div>
        )}
      </Section>

      <Section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.09}>
              <StatCard icon={stat.icon} label={stat.label} value={stat.value} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="home-projects">
        <Eyebrow>Selected Work</Eyebrow>
        <h2 className="mb-8 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">
          Tools I&apos;ve actually shipped
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects?.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Capabilities</Eyebrow>
        <h2 className="mb-8 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">What I bring to a team</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups?.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <SkillCard group={group} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Card padding="lg" className="relative overflow-hidden text-center" hoverable={false}>
          <span aria-hidden="true" className="mx-auto mb-5 block h-2 w-2 animate-pulseRing rounded-full bg-primary" />
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold">
            Looking for someone who builds, not just studies.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-text-muted">
            Reach out directly, or open Terminal Mode with{" "}
            <kbd className="rounded border border-border-soft px-1.5 py-0.5 font-mono text-xs">Ctrl+Shift+T</kbd>.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3.5">
            <Link to={ROUTES.contact} className="btn-primary focus-ring rounded-xl px-5 py-2.5 text-sm font-semibold no-underline">
              Get in touch
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost focus-ring flex items-center gap-2 rounded-xl bg-transparent px-5 py-2.5 text-sm font-medium no-underline"
            >
              <FiGithub size={15} /> GitHub
            </a>
          </div>
        </Card>
      </Section>
    </>
  );
}
