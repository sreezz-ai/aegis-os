import { FiGithub, FiLinkedin, FiMail, FiTwitter, FiInstagram } from "react-icons/fi";
import type { IconType } from "react-icons";
import { socialLinks } from "@/data/socials";
import { SITE } from "@/constants/site";
import type { SocialLink } from "@/types/common";

const ICONS: Record<SocialLink["icon"], IconType> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  mail: FiMail,
  twitter: FiTwitter,
  instagram: FiInstagram,
};

export function Footer(): JSX.Element {
  return (
    <footer className="relative z-10 border-t border-border-soft px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-text-faint">
          {SITE.name} · {SITE.owner} · {SITE.location}
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                aria-label={link.label}
                className="focus-ring text-text-faint transition-colors hover:text-accent"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
