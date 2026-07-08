export interface AnalyticsSnapshot {
  visitorsToday: number;
  visitorsThisWeek: number;
  topPages: Array<{ path: string; views: number }>;
}

const MOCK_SNAPSHOT: AnalyticsSnapshot = {
  visitorsToday: 12,
  visitorsThisWeek: 84,
  topPages: [
    { path: "/", views: 51 },
    { path: "/projects", views: 22 },
    { path: "/about", views: 11 },
  ],
};

export const analyticsService = {
  async getSnapshot(): Promise<AnalyticsSnapshot> {
    return Promise.resolve(MOCK_SNAPSHOT);
  },
};
