import { resolveAfter } from "./apiClient";

export interface Session {
  isAuthenticated: boolean;
  user: { name: string } | null;
}

export const authService = {
  async getSession(): Promise<Session> {
    return resolveAfter({ isAuthenticated: false, user: null }, 150);
  },
};
