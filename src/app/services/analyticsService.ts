/**
 * analyticsService.ts
 * Decoupled analytics event emitter mapped directly to the Vercel Analytics network.
 * 
 * Design principles:
 * - Must NEVER throw or block the calling UI thread.
 * - All calls are fire-and-forget.
 * - Guarded by VITE_ANALYTICS_ENABLED env flag for dev safety.
 */
import { track as vercelTrack } from '@vercel/analytics';

const ANALYTICS_ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === "true";

export type AnalyticsEventName =

  | "page_view"
  | "contact_form_opened"
  | "contact_form_submitted"

  | "contact_form_offline_queued"
  | "contact_form_error"
  | "contact_form_reset"

  | "project_card_viewed"
  | "about_page_viewed"
  | "theme_toggled"

  | "auth_modal_opened"
  | "auth_modal_closed"
  | "social_auth_initiated"

  | "offline_queue_flushed";

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean>;
}

/** Lazy session ID — stable for the browser tab lifetime */
const SESSION_ID = Math.random().toString(36).slice(2);

/**
 * Track an analytics event. Silent on failure.
 * Safe to call unconditionally — respects VITE_ANALYTICS_ENABLED.
 */
export function track(event: AnalyticsEvent): void {
  if (!ANALYTICS_ENABLED) {
    if (import.meta.env.DEV) {
      console.debug("[Analytics stub]", event.name, event.properties ?? {});
    }
    return;
  }

  try {
    // Append standard environment metadata to your event properties
    const enrichedProperties = {
      ...event.properties,
      sessionId: SESSION_ID,
      environment: import.meta.env.MODE, // tracks whether event is dev vs production
    };

    // Forward the payload directly to your Vercel Dashboard
    vercelTrack(event.name, enrichedProperties);
  } catch (error) {
    // Graceful fallback to safeguard your main UI execution loop
    if (import.meta.env.DEV) {
      console.error("[Analytics Ingestion Error]", error);
    }
  }
}

/** Convenience: fire a page_view event with optional page metadata */
export function trackPageView(page: string): void {
  track({ name: "page_view", properties: { page } });
}
