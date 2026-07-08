export const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  projectDetail: "/project/:slug",
  skills: "/skills",
  experience: "/experience",
  timeline: "/timeline",
  certificates: "/certificates",
  blog: "/blog",
  blogPost: "/blog/:slug",
  contact: "/contact",
  resume: "/resume",
  terminal: "/terminal",
  admin: "/admin",
  maintenance: "/maintenance",
  serverError: "/500",
  notFound: "/404",
  wildcard: "*",
} as const;

export function buildProjectPath(slug: string): string {
  return `/project/${slug}`;
}

export function buildBlogPostPath(slug: string): string {
  return `/blog/${slug}`;
}
