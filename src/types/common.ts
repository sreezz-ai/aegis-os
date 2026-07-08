export type ID = string;

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export type Theme = "dark" | "light";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  comingSoon?: boolean;
}

export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: "github" | "linkedin" | "twitter" | "mail" | "instagram";
}
