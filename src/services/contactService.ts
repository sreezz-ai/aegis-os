import { resolveAfter } from "./apiClient";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
}

export const contactService = {
  async send(payload: ContactPayload): Promise<ContactResult> {
    if (!payload.name || !payload.email || !payload.message) {
      return resolveAfter(
        { success: false, message: "All fields are required." },
        250,
      );
    }
    return resolveAfter(
      { success: true, message: "Message received. This is a mock endpoint — no email was actually sent." },
      600,
    );
  },
};
