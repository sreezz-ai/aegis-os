import { Helmet } from "react-helmet-async";
import { SITE } from "@/constants/site";

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  jsonLd?: Record<string, unknown>;
}

export function SEO({ title, description = SITE.defaultDescription, path = "/", jsonLd }: SEOProps): JSX.Element {
  const fullTitle = title === SITE.name ? title : `${title} · ${SITE.name}`;
  const url = `${SITE.baseUrl}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
