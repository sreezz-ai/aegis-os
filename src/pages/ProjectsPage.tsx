import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Dropdown } from "@/components/ui/Dropdown";
import { Pagination } from "@/components/ui/Pagination";
import { Reveal } from "@/components/motion/Reveal";
import { Loader } from "@/components/feedback/Loader";
import { useAsyncData } from "@/hooks/useAsyncData";
import { projectService } from "@/services/projectService";
import type { ProjectStatus } from "@/types/project";

const PAGE_SIZE = 6;

const STATUS_OPTIONS = [
  { id: "all", label: "All statuses" },
  { id: "completed", label: "Completed" },
  { id: "in-progress", label: "In Progress" },
  { id: "concept", label: "Concept" },
];

export function ProjectsPage(): JSX.Element {
  const { data: projects, isLoading } = useAsyncData(() => projectService.getAll(), []);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!projects) return [];
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesQuery =
        !normalizedQuery ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(normalizedQuery));
      const matchesStatus = statusFilter === "all" || project.status === (statusFilter as ProjectStatus);
      return matchesQuery && matchesStatus;
    });
  }, [projects, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <SEO title="Projects" description="Security and AI tooling projects built by Sreelesh SK." path="/projects" />

      <Section className="pb-0">
        <PageHeader
          eyebrow="Projects"
          title="Things I've built"
          description="Real tools, not tutorials followed line by line. Filter by status, or search by name and tech stack."
        />
      </Section>

      <Section>
        <div className="mb-7 flex flex-wrap items-center gap-3">
          <div className="glass flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2.5 sm:max-w-xs">
            <FiSearch size={15} color="var(--color-text-faint)" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-faint"
            />
          </div>
          <Dropdown
            label="Status"
            options={STATUS_OPTIONS}
            selectedId={statusFilter}
            onSelect={(id) => {
              setStatusFilter(id);
              setPage(1);
            }}
          />
        </div>

        {isLoading && <Loader label="Loading projects" />}

        {!isLoading && paginated.length === 0 && (
          <p className="py-16 text-center text-sm text-text-faint">No projects match your filters.</p>
        )}

        {!isLoading && paginated.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </Section>
    </>
  );
}
