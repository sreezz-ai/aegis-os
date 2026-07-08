import { useParams, Navigate, Link } from "react-router-dom";
import { FiArrowLeft, FiClock } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { blogPostJsonLd } from "@/seo/jsonld";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Loader } from "@/components/feedback/Loader";
import { useAsyncData } from "@/hooks/useAsyncData";
import { blogService } from "@/services/blogService";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/utils/formatDate";

export function BlogPostPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useAsyncData(
    () => (slug ? blogService.getBySlug(slug) : Promise.resolve(null)),
    [slug],
  );

  if (isLoading) return <Loader label="Loading post" />;
  if (!post) return <Navigate to={ROUTES.notFound} replace />;

  return (
    <>
      <SEO title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} jsonLd={blogPostJsonLd(post)} />

      <Section>
        <Link to={ROUTES.blog} className="focus-ring mb-6 inline-flex items-center gap-2 text-sm text-text-muted no-underline hover:text-accent">
          <FiArrowLeft size={14} /> Back to blog
        </Link>
        <Eyebrow>{post.category}</Eyebrow>
        <h1 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight">{post.title}</h1>
        <div className="mt-3 flex items-center gap-3 font-mono text-xs text-text-faint">
          <span>{formatDate(post.publishedOn)}</span>
          <span className="flex items-center gap-1">
            <FiClock size={11} /> {post.readingTimeMinutes} min read
          </span>
        </div>
        <div className="mt-8 max-w-2xl text-[15px] leading-relaxed text-text-muted">
          <p>{post.content}</p>
        </div>
      </Section>
    </>
  );
}
