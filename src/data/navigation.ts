import { ROUTES } from "@/constants/routes";
import type { NavItem } from "@/types/common";

export const navItems: NavItem[] = [
  { id: "home", label: "Home", path: ROUTES.home },
  { id: "about", label: "About", path: ROUTES.about },
  { id: "projects", label: "Projects", path: ROUTES.projects },
  { id: "skills", label: "Skills", path: ROUTES.skills },
  { id: "timeline", label: "Timeline", path: ROUTES.timeline },
  { id: "certificates", label: "Certificates", path: ROUTES.certificates },
  { id: "blog", label: "Blog", path: ROUTES.blog },
  { id: "contact", label: "Contact", path: ROUTES.contact },
];
