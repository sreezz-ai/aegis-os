import type { ID } from "./common";

export interface Certificate {
  id: ID;
  title: string;
  issuer: string;
  issuedOn: string;
  category: string;
  credentialUrl?: string;
  downloadUrl?: string;
}
