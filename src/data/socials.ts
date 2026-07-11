import type { SocialLink } from "@/types/common";
import { CONTACT } from "@/constants/site";

export const socialLinks: SocialLink[] = [
  { id: "github", label: "GitHub", url: CONTACT.github, icon: "github" },
  { id: "linkedin", label: "LinkedIn", url: CONTACT.linkedin, icon: "linkedin" },
  { id: "mail", label: "Email", url: `mailto:${CONTACT.email}`, icon: "mail" },
];
