/**
 * useOfflineQueue.ts
 * Monitors browser connectivity and flushes the IndexedDB contact queue
 * when the user comes back online. Mount once at the App root.
 */

import { useEffect, useCallback } from "react";
import { getQueuedSubmissions, removeSubmission, incrementAttempts } from "../lib/indexedDB";
import { submitContact } from "../services/contactService";
import { track } from "../services/analyticsService";

const MAX_ATTEMPTS = 5;

export function useOfflineQueue(): void {
  const flushQueue = useCallback(async () => {
    if (!navigator.onLine) return;

    let items;
    try {
      items = await getQueuedSubmissions();
    } catch {
      return; // IDB unavailable — nothing to flush
    }

    if (items.length === 0) return;

    let delivered = 0;
    for (const item of items) {
      if (item.attempts >= MAX_ATTEMPTS) {
        // Give up on items that have exceeded the retry budget
        await removeSubmission(item.id!).catch(() => {});
        continue;
      }

      try {
        await submitContact(item.payload);
        await removeSubmission(item.id!);
        delivered++;
      } catch {
        await incrementAttempts(item.id!).catch(() => {});
      }
    }

    if (delivered > 0) {
      track({ name: "offline_queue_flushed", properties: { count: delivered } });
    }
  }, []);

  // Flush on connectivity restore
  useEffect(() => {
    window.addEventListener("online", flushQueue);
    return () => window.removeEventListener("online", flushQueue);
  }, [flushQueue]);

  // Attempt flush on mount in case app was opened while already online
  useEffect(() => {
    if (navigator.onLine) {
      flushQueue().catch(() => {});
    }
  }, [flushQueue]);
}
