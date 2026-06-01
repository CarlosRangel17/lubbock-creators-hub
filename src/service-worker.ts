/**
 * service-worker.ts — Background Sync + offline contact queue flush
 *
 * BUILD NOTE: Vite does not compile this file automatically.
 * To serve as /sw.js add `vite-plugin-pwa` to vite.config.ts:
 *
 *   import { VitePWA } from "vite-plugin-pwa"
 *   plugins: [ react(), tailwindcss(), VitePWA({ srcDir: "src", filename: "service-worker.ts" }) ]
 *
 * Until then, the offline queue is still fully functional client-side (IndexedDB);
 * only the background-sync auto-retry on reconnect is deferred.
 */

declare const self: ServiceWorkerGlobalScope;

const SYNC_TAG = "cr-contact-form-sync";
const DB_NAME = "cr-portfolio-db";
const STORE_NAME = "offline-contact-queue";
const BASE_URL = "" // "http://localhost:3000/"
const CONTACT_ENDPOINT = `${BASE_URL}/api/contact`;
const API_KEY = ""; // injected at build time via Workbox env substitution

// ── Lifecycle ────────────────────────────────────────────────────────────────

self.addEventListener("install", () => {
  // @ts-expect-error — skipWaiting() exists on service worker scope
  self.skipWaiting();
});

self.addEventListener("activate", (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});

// ── Fetch (pass-through until Workbox strategies are added) ─────────────────

self.addEventListener("fetch", (_event: FetchEvent) => {
  // TODO: Layer Workbox CacheFirst / NetworkFirst strategies here.
});

// ── Background Sync ──────────────────────────────────────────────────────────

self.addEventListener("sync", (event: ExtendableEvent & { tag: string }) => {
  if (event.tag === SYNC_TAG) {
    event.waitUntil(flushContactQueue());
  }
});

async function flushContactQueue(): Promise<void> {
  const db = await openIDB();
  const submissions = await getAllItems(db);
  if (submissions.length === 0) return;

  for (const item of submissions as Array<{ id: number; payload: unknown }>) {
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(API_KEY ? { "x-api-key": API_KEY } : {}),
        },
        body: JSON.stringify(item.payload),
      });

      if (response.ok) {
        await deleteItem(db, item.id);
      }
    } catch {
      // Still offline — leave in queue for next sync event
    }
  }
}

// ── IDB helpers (mirrored from app layer for SW isolation) ───────────────────

function openIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
    req.onerror = () => reject(req.error);
  });
}

function getAllItems(db: IDBDatabase): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function deleteItem(db: IDBDatabase, id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const req = tx.objectStore(STORE_NAME).delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
