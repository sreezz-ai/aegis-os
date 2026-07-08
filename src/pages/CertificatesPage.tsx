import { useMemo, useState } from "react";
import { SEO } from "@/components/seo/SEO";
import { Section } from "@/components/layout/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { CertificateCard } from "@/components/cards/CertificateCard";
import { Dropdown } from "@/components/ui/Dropdown";
import { Reveal } from "@/components/motion/Reveal";
import { Loader } from "@/components/feedback/Loader";
import { useAsyncData } from "@/hooks/useAsyncData";
import { certificateService } from "@/services/certificateService";

export function CertificatesPage(): JSX.Element {
  const { data: certificates, isLoading } = useAsyncData(() => certificateService.getAll(), []);
  const [category, setCategory] = useState("all");

  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set((certificates ?? []).map((c) => c.category)));
    return [{ id: "all", label: "All categories" }, ...unique.map((c) => ({ id: c, label: c }))];
  }, [certificates]);

  const filtered = useMemo(() => {
    if (!certificates) return [];
    return category === "all" ? certificates : certificates.filter((c) => c.category === category);
  }, [certificates, category]);

  return (
    <>
      <SEO title="Certificates" description="Certifications and credentials." path="/certificates" />

      <Section className="pb-0">
        <PageHeader eyebrow="Credentials" title="Certificates" />
      </Section>

      <Section>
        <div className="mb-7">
          <Dropdown label="Category" options={categoryOptions} selectedId={category} onSelect={setCategory} />
        </div>

        {isLoading && <Loader label="Loading certificates" />}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((certificate, i) => (
            <Reveal key={certificate.id} delay={i * 0.07}>
              <CertificateCard certificate={certificate} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
