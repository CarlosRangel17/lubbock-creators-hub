/**
 * useContactForm.ts
 * Fully decoupled contact form state machine.
 * Contains zero JSX — safe to import in Vitest without a DOM renderer.
 *
 * State machine:
 *   idle → submitting → success
 *                    ↘ offline_queued  (network failure + IDB save OK)
 *                    ↘ error           (non-recoverable or IDB also failed)
 */

import { useState, useCallback } from "react";
import { submitContact } from "../services/contactService";
import { enqueueSubmission } from "../lib/indexedDB";
import { requestBackgroundSync, CONTACT_SYNC_TAG } from "../lib/serviceWorkerRegistration";
import { track } from "../services/analyticsService";
import type { ContactPayload, FormStatus } from "../types/contact";

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface UseContactFormReturn {
  /** Current controlled field values */
  values: ContactFormValues;
  /** Submission state machine status */
  status: FormStatus;
  /** Human-readable error string; null when status !== "error" */
  errorMessage: string | null;
  /** Update a single field value */
  handleChange: (field: keyof ContactFormValues, value: string) => void;
  /** Submit handler — call directly from <form onSubmit> */
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  /** Resets the form to idle + clears all fields */
  reset: () => void;
}

const EMPTY_FORM: ContactFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export function useContactForm(
  source: ContactPayload["source"] = "portfolio-home",
): UseContactFormReturn {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(
    (field: keyof ContactFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (status === "submitting") return;

      setStatus("submitting");
      setErrorMessage(null);
      track({ name: "contact_form_submitted" });

      const payload: ContactPayload = {
        ...values,
        timestamp: Date.now(),
        source,
      };

      try {
        await submitContact(payload);
        setStatus("success");
      } catch (err) {
        // Treat AbortError (timeout) and TypeError (no network) as offline
        const isNetworkFailure =
          !navigator.onLine ||
          err instanceof TypeError ||
          (err instanceof DOMException && err.name === "AbortError");

        if (isNetworkFailure) {
          try {
            await enqueueSubmission(payload);
            // Best-effort background sync registration
            await requestBackgroundSync(CONTACT_SYNC_TAG).catch(() => {});
            track({ name: "contact_form_offline_queued" });
            setStatus("offline_queued");
          } catch {
            track({ name: "contact_form_error", properties: { reason: "idb_failure" } });
            setStatus("error");
            setErrorMessage(
              "Unable to save your message offline. Please check storage permissions and try again.",
            );
          }
        } else {
          track({ name: "contact_form_error", properties: { reason: "server_error" } });
          setStatus("error");
          setErrorMessage("Something went wrong on our end. Please try again in a moment.");
        }
      }
    },
    [values, status, source],
  );

  const reset = useCallback(() => {
    setValues(EMPTY_FORM);
    setStatus("idle");
    setErrorMessage(null);
    track({ name: "contact_form_reset" });
  }, []);

  return { values, status, errorMessage, handleChange, handleSubmit, reset };
}
