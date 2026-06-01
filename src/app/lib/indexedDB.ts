/**
 * indexedDB.ts
 * Typed IndexedDB wrapper for the offline contact submission queue.
 * Fully decoupled — no React dependencies. Testable with fake-indexeddb.
 *
 * Database: "cr-portfolio-db" v1
 * Object store: "offline-contact-queue"
 */

import type { ContactPayload, QueuedSubmission } from "../types/contact";

const DB_NAME = "cr-portfolio-db";
const DB_VERSION = 1;
const STORE_NAME = "offline-contact-queue";

let _db: IDBDatabase | null = null;

/** Opens (and upgrades if necessary) the IndexedDB instance. Singleton pattern. */
export async function openDB(): Promise<IDBDatabase> {
  if (_db) return _db;

  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      _db = (event.target as IDBOpenDBRequest).result;

      // Propagate connection drops so callers can retry
      _db.onclose = () => { _db = null; };
      _db.onerror = () => { _db = null; };

      resolve(_db);
    };

    request.onerror = () => reject(request.error);
    request.onblocked = () =>
      reject(new Error("IndexedDB blocked — please close other portfolio tabs"));
  });
}

/** Adds a payload to the offline queue. Returns the auto-incremented IDB key. */
export async function enqueueSubmission(payload: ContactPayload): Promise<number> {
  const db = await openDB();
  const entry: Omit<QueuedSubmission, "id"> = {
    payload,
    queuedAt: Date.now(),
    attempts: 0,
  };

  return new Promise<number>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(entry);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
}

/** Retrieves all queued submissions ordered by insertion (IDB natural order). */
export async function getQueuedSubmissions(): Promise<QueuedSubmission[]> {
  const db = await openDB();
  return new Promise<QueuedSubmission[]>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as QueuedSubmission[]);
    request.onerror = () => reject(request.error);
  });
}

/** Removes a successfully delivered entry from the queue by its IDB key. */
export async function removeSubmission(id: number): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/** Increments the attempt counter on a queued item for diagnostics / retry gating. */
export async function incrementAttempts(id: number): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const item = getReq.result as QueuedSubmission;
      if (!item) return resolve();
      const putReq = store.put({ ...item, attempts: item.attempts + 1 });
      putReq.onsuccess = () => resolve();
      putReq.onerror = () => reject(putReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

/** Clears the entire queue — use only in tests or explicit user action. */
export async function clearQueue(): Promise<void> {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
