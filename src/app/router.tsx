import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader } from "@/components/feedback/Loader";
import { ROUTES } from "@/constants/routes";

const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() =>
  import("@/pages/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })),
);
const SkillsPage = lazy(() => import("@/pages/SkillsPage").then((m) => ({ default: m.SkillsPage })));
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage").then((m) => ({ default: m.ExperiencePage })));
const TimelinePage = lazy(() => import("@/pages/TimelinePage").then((m) => ({ default: m.TimelinePage })));
const CertificatesPage = lazy(() =>
  import("@/pages/CertificatesPage").then((m) => ({ default: m.CertificatesPage })),
);
const BlogPage = lazy(() => import("@/pages/BlogPage").then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const ResumePage = lazy(() => import("@/pages/ResumePage").then((m) => ({ default: m.ResumePage })));
const TerminalPage = lazy(() => import("@/pages/TerminalPage").then((m) => ({ default: m.TerminalPage })));
const AdminPage = lazy(() => import("@/pages/AdminPage").then((m) => ({ default: m.AdminPage })));
const MaintenancePage = lazy(() => import("@/pages/MaintenancePage").then((m) => ({ default: m.MaintenancePage })));
const ServerErrorPage = lazy(() => import("@/pages/ServerErrorPage").then((m) => ({ default: m.ServerErrorPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

function withSuspense(element: JSX.Element): JSX.Element {
  return <Suspense fallback={<Loader />}>{element}</Suspense>;
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.home, element: withSuspense(<HomePage />) },
      { path: ROUTES.about, element: withSuspense(<AboutPage />) },
      { path: ROUTES.projects, element: withSuspense(<ProjectsPage />) },
      { path: ROUTES.projectDetail, element: withSuspense(<ProjectDetailPage />) },
      { path: ROUTES.skills, element: withSuspense(<SkillsPage />) },
      { path: ROUTES.experience, element: withSuspense(<ExperiencePage />) },
      { path: ROUTES.timeline, element: withSuspense(<TimelinePage />) },
      { path: ROUTES.certificates, element: withSuspense(<CertificatesPage />) },
      { path: ROUTES.blog, element: withSuspense(<BlogPage />) },
      { path: ROUTES.blogPost, element: withSuspense(<BlogPostPage />) },
      { path: ROUTES.contact, element: withSuspense(<ContactPage />) },
      { path: ROUTES.resume, element: withSuspense(<ResumePage />) },
      { path: ROUTES.terminal, element: withSuspense(<TerminalPage />) },
      { path: ROUTES.admin, element: withSuspense(<AdminPage />) },
      { path: ROUTES.maintenance, element: withSuspense(<MaintenancePage />) },
      { path: ROUTES.serverError, element: withSuspense(<ServerErrorPage />) },
      { path: ROUTES.notFound, element: withSuspense(<NotFoundPage />) },
      { path: ROUTES.wildcard, element: withSuspense(<NotFoundPage />) },
    ],
  },
]);

export function AppRouter(): JSX.Element {
  return <RouterProvider router={router} />;
}
