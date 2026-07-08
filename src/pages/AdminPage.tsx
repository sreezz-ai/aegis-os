import { FiUsers, FiEye, FiBell, FiSettings } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Loader } from "@/components/feedback/Loader";
import { useAsyncData } from "@/hooks/useAsyncData";
import { analyticsService } from "@/services/analyticsService";
import { visitorService } from "@/services/visitorService";
import { SITE } from "@/constants/site";

export function AdminPage(): JSX.Element {
  const { data: snapshot, isLoading: loadingSnapshot } = useAsyncData(() => analyticsService.getSnapshot(), []);
  const { data: visitors, isLoading: loadingVisitors } = useAsyncData(() => visitorService.getRecent(), []);

  const maxViews = Math.max(1, ...(snapshot?.topPages.map((p) => p.views) ?? [1]));

  return (
    <>
      <SEO title="Admin" description="Internal admin dashboard (UI only)." path="/admin" />

      <Section className="pb-0">
        <div className="flex items-center justify-between gap-4">
          <PageHeader eyebrow="Admin" title="Dashboard" description="UI only — no live data is collected yet." />
          <Avatar name={SITE.owner} />
        </div>
      </Section>

      <Section>
        {loadingSnapshot ? (
          <Loader label="Loading analytics" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <FiUsers size={17} color="var(--color-accent)" aria-hidden="true" />
              <p className="mt-3 font-mono text-[11px] uppercase text-text-faint">Visitors today</p>
              <p className="mt-1 font-display text-xl font-semibold">{snapshot?.visitorsToday}</p>
            </Card>
            <Card>
              <FiEye size={17} color="var(--color-accent)" aria-hidden="true" />
              <p className="mt-3 font-mono text-[11px] uppercase text-text-faint">Visitors this week</p>
              <p className="mt-1 font-display text-xl font-semibold">{snapshot?.visitorsThisWeek}</p>
            </Card>
            <Card>
              <FiBell size={17} color="var(--color-accent)" aria-hidden="true" />
              <p className="mt-3 font-mono text-[11px] uppercase text-text-faint">Notifications</p>
              <p className="mt-1 font-display text-xl font-semibold">0</p>
            </Card>
            <Card>
              <FiSettings size={17} color="var(--color-accent)" aria-hidden="true" />
              <p className="mt-3 font-mono text-[11px] uppercase text-text-faint">Status</p>
              <p className="mt-1 font-display text-xl font-semibold">Operational</p>
            </Card>
          </div>
        )}
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card padding="lg">
            <h2 className="font-display text-base font-semibold">Top pages</h2>
            <div className="mt-5 flex flex-col gap-3.5">
              {snapshot?.topPages.map((page) => (
                <div key={page.path}>
                  <div className="mb-1 flex items-center justify-between font-mono text-xs text-text-muted">
                    <span>{page.path}</span>
                    <span>{page.views}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${(page.views / maxViews) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <h2 className="font-display text-base font-semibold">Recent visitors</h2>
            {loadingVisitors ? (
              <Loader label="Loading visitors" />
            ) : (
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border-soft text-xs uppercase text-text-faint">
                    <th className="pb-2 font-mono font-normal">Location</th>
                    <th className="pb-2 font-mono font-normal">Page</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors?.map((visitor) => (
                    <tr key={visitor.id} className="border-b border-border-soft last:border-none">
                      <td className="py-2.5 text-text-primary">{visitor.location}</td>
                      <td className="py-2.5 font-mono text-xs text-text-muted">{visitor.page}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
}
