/**
 * Shared type definitions for the contact form domain.
 * Imported by contactService, indexedDB, and useContactForm to avoid circular deps.
 */

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  /** Unix timestamp (ms) at submission time */
  timestamp: number;
  /** Identifies which page surface triggered the form */
  source: "portfolio-home" | "portfolio-about";
}

export interface ContactResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface QueuedSubmission {
  /** Auto-incremented IDB key; undefined before insertion */
  id?: number;
  payload: ContactPayload;
  queuedAt: number;
  /** Tracks how many retry attempts have been made */
  attempts: number;
}

export type FormStatus =
  | "idle"
  | "submitting"
  | "success"
  | "offline_queued"
  | "error";
