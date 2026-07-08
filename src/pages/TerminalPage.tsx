import { FiTerminal } from "react-icons/fi";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useNavigationState } from "@/contexts/NavigationContext";

export function TerminalPage(): JSX.Element {
  const { openTerminal } = useNavigationState();

  return (
    <>
      <SEO title="Terminal" description="Launch AEGIS OS terminal mode." path="/terminal" />

      <Section className="pb-0">
        <PageHeader
          eyebrow="Terminal Mode"
          title="Navigate this site like a shell"
          description={
            <>
              Press{" "}
              <kbd className="rounded border border-border-soft px-1.5 py-0.5 font-mono text-xs">Ctrl+Shift+T</kbd>{" "}
              anywhere on the site, or use the button below.
            </>
          }
        />
      </Section>

      <Section>
        <Card padding="lg" className="flex flex-col items-start gap-4">
          <FiTerminal size={22} color="var(--color-accent)" aria-hidden="true" />
          <p className="text-sm text-text-muted">
            Try commands like <code className="font-mono text-accent">whoami</code>,{" "}
            <code className="font-mono text-accent">projects</code>, or{" "}
            <code className="font-mono text-accent">sudo hire sreelesh</code>.
          </p>
          <Button onClick={openTerminal} icon={<FiTerminal size={14} />}>
            Open terminal
          </Button>
        </Card>
      </Section>
    </>
  );
}
