/**
 * serviceWorkerRegistration.ts
 * Handles registration of /sw.js and exposes a Background Sync helper.
 * Gracefully degrades on browsers that don't support either API.
 */

export const CONTACT_SYNC_TAG = "cr-contact-form-sync";

/** Registers the service worker at /sw.js. Returns the registration or null if unsupported. */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return null;
  if (import.meta.env.DEV && import.meta.env.VITE_SW_ENABLED !== "true") {
    console.debug("[SW] Skipped registration in dev mode. Set VITE_SW_ENABLED=true to enable.");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    console.debug("[SW] Registered at scope:", registration.scope);
    return registration;
  } catch (err) {
    console.warn("[SW] Registration failed:", err);
    return null;
  }
}

/**
 * Requests a Background Sync event with the given tag.
 * This tells the service worker to call flushContactQueue() when connectivity returns.
 * No-ops gracefully if Background Sync API is unavailable.
 */
export async function requestBackgroundSync(tag: string): Promise<void> {
  if (!("serviceWorker" in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.ready;

    // Background Sync is currently Chrome-only; typed cast is safe with guard
    type SyncManager = { register: (tag: string) => Promise<void> };
    const syncCapable = registration as ServiceWorkerRegistration & { sync?: SyncManager };

    if (syncCapable.sync) {
      await syncCapable.sync.register(tag);
      console.debug("[SW] Background sync registered:", tag);
    }
  } catch (err) {
    console.debug("[SW] Background sync unavailable:", err);
  }
}
