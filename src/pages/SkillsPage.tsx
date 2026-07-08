import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { SkillCard } from "@/components/cards/SkillCard";
import { Dropdown } from "@/components/ui/Dropdown";
import { Reveal } from "@/components/motion/Reveal";
import { Loader } from "@/components/feedback/Loader";
import { useAsyncData } from "@/hooks/useAsyncData";
import { skillService } from "@/services/skillService";

const CATEGORY_OPTIONS = [
  { id: "all", label: "All categories" },
  { id: "offensive-security", label: "Offensive Security" },
  { id: "ai-tooling", label: "AI & Tooling" },
  { id: "frontend-engineering", label: "Frontend Engineering" },
  { id: "foundations", label: "Foundations" },
];

export function SkillsPage(): JSX.Element {
  const { data: groups, isLoading } = useAsyncData(() => skillService.getAll(), []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filteredGroups = useMemo(() => {
    if (!groups) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return groups
      .filter((group) => category === "all" || group.category === category)
      .map((group) => ({
        ...group,
        skills: group.skills.filter((skill) => skill.name.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((group) => group.skills.length > 0);
  }, [groups, query, category]);

  return (
    <>
      <SEO title="Skills" description="Skills across offensive security, AI tooling, and frontend engineering." path="/skills" />

      <Section className="pb-0">
        <PageHeader eyebrow="Capabilities" title="Skills" description="What I bring to a team, grouped by domain." />
      </Section>

      <Section>
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <div className="glass flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:max-w-xs">
            <FiSearch size={15} color="var(--color-text-faint)" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills..."
              aria-label="Search skills"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-faint"
            />
          </div>
          <Dropdown label="Category" options={CATEGORY_OPTIONS} selectedId={category} onSelect={setCategory} />
        </div>

        {isLoading && <Loader label="Loading skills" />}

        {!isLoading && filteredGroups.length === 0 && (
          <p className="py-16 text-center text-sm text-text-faint">No skills match your search.</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.07}>
              <SkillCard group={group} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
