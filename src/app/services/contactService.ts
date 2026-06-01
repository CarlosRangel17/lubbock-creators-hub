/**
 * contactService.ts
 * Thin HTTP client for the /api/contact proxy route.
 * The proxy is meant to forward payloads to an external Vercel Serverless Function.
 * All environment parameters are injected via VITE_ prefixed stubs — see .env.example.
 */

import type { ContactPayload, ContactResponse } from "../types/contact";

const API_BASE = (import.meta.env.CONTACT_API_BASE_URL as string | undefined) ?? "";
const CONTACT_ENDPOINT = `${API_BASE}/api/contact`;
const API_KEY = (import.meta.env.VITE_CONTACT_API_KEY as string | undefined) ?? "";

/** Default timeout for contact requests (ms) */
const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Submits a contact payload to the local proxy route.
 * Throws on non-2xx responses or network failures (caller decides offline strategy).
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(API_KEY ? { "x-api-key": API_KEY } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({})) as Record<string, unknown>;
      throw new ContactServiceError(
        (body["error"] as string | undefined) ?? `Request failed with status ${response.status}`,
        response.status,
      );
    }

    return response.json() as Promise<ContactResponse>;
  } finally {
    clearTimeout(timeoutId);
  }
}

export class ContactServiceError extends Error {
  constructor(message: string, public readonly statusCode?: number) {
    super(message);
    this.name = "ContactServiceError";
  }
}
