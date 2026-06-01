/**
 * analyticsService.ts
 * Decoupled analytics event emitter. Replace the stub body with your
 * preferred provider (Vercel Analytics, PostHog, Amplitude) at integration time.
 *
 * Design principles:
 *  - Must NEVER throw or block the calling UI thread.
 *  - All calls are fire-and-forget (keepalive: true).
 *  - Guarded by VITE_ANALYTICS_ENABLED env flag for dev safety.
 */

const ANALYTICS_ENABLED = import.meta.env.VITE_ANALYTICS_ENABLED === "true";
const ANALYTICS_ENDPOINT = (import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined) ?? "";

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

interface AnalyticsPayload extends AnalyticsEvent {
  timestamp: number;
  sessionId: string;
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

  const payload: AnalyticsPayload = {
    ...event,
    timestamp: Date.now(),
    sessionId: SESSION_ID,
  };

  if (!ANALYTICS_ENDPOINT) return;

  fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {}); // intentional silent fail
}

/** Convenience: fire a page_view event with optional page metadata */
export function trackPageView(page: string): void {
  track({ name: "page_view", properties: { page } });
}
