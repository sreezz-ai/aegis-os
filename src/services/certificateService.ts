import { certificates } from "@/data/certificates";
import type { Certificate } from "@/types/certificate";
import { resolveAfter } from "./apiClient";

export const certificateService = {
  async getAll(): Promise<Certificate[]> {
    return resolveAfter(certificates);
  },
};
