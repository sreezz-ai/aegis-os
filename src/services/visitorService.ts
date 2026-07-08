export interface VisitorRecord {
  id: string;
  location: string;
  page: string;
  timestamp: string;
}

const MOCK_VISITORS: VisitorRecord[] = [
  { id: "v1", location: "Bengaluru, IN", page: "/projects", timestamp: "2026-07-06T09:12:00Z" },
  { id: "v2", location: "Remote", page: "/", timestamp: "2026-07-06T08:58:00Z" },
];

export const visitorService = {
  async getRecent(): Promise<VisitorRecord[]> {
    return Promise.resolve(MOCK_VISITORS);
  },
};
