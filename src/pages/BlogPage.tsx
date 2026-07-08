import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiClock } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { Reveal } from "@/components/motion/Reveal";
import { Loader } from "@/components/feedback/Loader";
import { useAsyncData } from "@/hooks/useAsyncData";
import { blogService } from "@/services/blogService";
import { buildBlogPostPath } from "@/constants/routes";
import { formatDate } from "@/utils/formatDate";

const PAGE_SIZE = 6;

export function BlogPage(): JSX.Element {
  const { data: posts, isLoading } = useAsyncData(() => blogService.getAll(), []);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!posts) return [];
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts;
    return posts.filter(
      (post) => post.title.toLowerCase().includes(normalized) || post.category.toLowerCase().includes(normalized),
    );
  }, [posts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <SEO title="Blog" description="Write-ups, notes, and lessons learned." path="/blog" />

      <Section className="pb-0">
        <PageHeader eyebrow="Writing" title="Blog" description="Notes from labs, tools, and lessons learned along the way." />
      </Section>

      <Section>
        <div className="glass mb-8 flex max-w-sm items-center gap-2.5 rounded-xl px-3.5 py-2.5">
          <FiSearch size={15} color="var(--color-text-faint)" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts..."
            aria-label="Search blog posts"
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-faint"
          />
        </div>

        {isLoading && <Loader label="Loading posts" />}

        {!isLoading && paginated.length === 0 && (
          <p className="py-16 text-center text-sm text-text-faint">No posts match your search.</p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginated.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.06}>
              <Card padding="lg">
                <Link to={buildBlogPostPath(post.slug)} className="no-underline">
                  <div className="flex items-center justify-between">
                    {post.featured && <Badge tone="accent">Featured</Badge>}
                    <span className="flex items-center gap-1 font-mono text-[10.5px] text-text-faint">
                      <FiClock size={11} /> {post.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="mt-3.5 font-display text-lg font-semibold text-text-primary">{post.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-text-muted">{post.excerpt}</p>
                  <p className="mt-4 font-mono text-[11px] text-text-faint">{formatDate(post.publishedOn)}</p>
                </Link>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </Section>
    </>
  );
}
