import { useParams, Navigate, Link } from "react-router-dom";
import { FiGithub, FiExternalLink, FiFileText, FiArrowLeft } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { projectJsonLd } from "@/seo/jsonld";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/feedback/Loader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { useAsyncData } from "@/hooks/useAsyncData";
import { projectService } from "@/services/projectService";
import { ROUTES } from "@/constants/routes";

export function ProjectDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading } = useAsyncData(
    () => (slug ? projectService.getBySlug(slug) : Promise.resolve(null)),
    [slug],
  );
  const { data: related } = useAsyncData(
    () => (project ? projectService.getRelated(project) : Promise.resolve([])),
    [project],
  );

  if (isLoading) return <Loader label="Loading project" />;
  if (!project) return <Navigate to={ROUTES.notFound} replace />;

  return (
    <>
      <SEO
        title={project.title}
        description={project.summary}
        path={`/project/${project.slug}`}
        jsonLd={projectJsonLd(project)}
      />

      <Section className="pb-0">
        <Link to={ROUTES.projects} className="focus-ring mb-6 inline-flex items-center gap-2 text-sm text-text-muted no-underline hover:text-accent">
          <FiArrowLeft size={14} /> Back to projects
        </Link>
        <Eyebrow>Case Study</Eyebrow>
        <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">{project.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge tone="accent">{project.status.replace("-", " ")}</Badge>
          <Badge tone="neutral">{project.difficulty}</Badge>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="btn-ghost focus-ring flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm no-underline">
              <FiGithub size={14} /> GitHub
            </a>
          )}
          {project.links.liveDemo && (
            <a href={project.links.liveDemo} target="_blank" rel="noreferrer" className="btn-ghost focus-ring flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm no-underline">
              <FiExternalLink size={14} /> Live demo
            </a>
          )}
          {project.links.documentation && (
            <a href={project.links.documentation} target="_blank" rel="noreferrer" className="btn-ghost focus-ring flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm no-underline">
              <FiFileText size={14} /> Docs
            </a>
          )}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <Card padding="lg">
            <Eyebrow>Architecture</Eyebrow>
            <p className="text-sm leading-relaxed text-text-muted">{project.architecture}</p>
          </Card>
          <Card padding="lg">
            <Eyebrow>Tech Stack</Eyebrow>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech} tone="primary">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Card padding="lg">
            <Eyebrow>Features</Eyebrow>
            <ul className="flex flex-col gap-2 text-sm text-text-primary">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-[5px] w-[5px] shrink-0 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
          <Card padding="lg">
            <Eyebrow>Lessons Learned</Eyebrow>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              {project.lessonsLearned.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </Card>
          <Card padding="lg">
            <Eyebrow>Challenges</Eyebrow>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              {project.challenges.map((challenge) => (
                <li key={challenge}>{challenge}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {related && related.length > 0 && (
        <Section>
          <Eyebrow>Related Projects</Eyebrow>
          <h2 className="mb-6 font-display text-xl font-semibold">You might also like</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((relatedProject) => (
              <ProjectCard key={relatedProject.id} project={relatedProject} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
