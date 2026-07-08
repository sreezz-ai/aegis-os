import { FiAward, FiDownload, FiExternalLink } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Certificate } from "@/types/certificate";

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps): JSX.Element {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <FiAward size={18} color="var(--color-accent)" aria-hidden="true" />
        <Badge tone="neutral">{certificate.category}</Badge>
      </div>
      <h3 className="mt-3.5 font-display text-base font-semibold">{certificate.title}</h3>
      <p className="mt-1 text-xs text-text-muted">
        {certificate.issuer} · {certificate.issuedOn}
      </p>
      <div className="mt-4 flex gap-3">
        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-accent"
          >
            Verify <FiExternalLink size={12} />
          </a>
        )}
        {certificate.downloadUrl && (
          <a
            href={certificate.downloadUrl}
            className="focus-ring inline-flex items-center gap-1.5 font-mono text-xs text-text-muted"
          >
            Download <FiDownload size={12} />
          </a>
        )}
      </div>
    </Card>
  );
}
