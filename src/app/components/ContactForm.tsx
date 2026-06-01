/**
 * ContactForm.tsx
 * Museum guest book registry aesthetic.
 * Business logic (submission, offline queue, status) is fully delegated
 * to useContactForm — this component owns only presentation + focus state.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, WifiOff, AlertCircle } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { GradientText } from "./GradientText";
import { useContactForm } from "../hooks/useContactForm";
import type { ContactFormValues } from "../hooks/useContactForm";

type FocusState = Record<keyof ContactFormValues, boolean>;

const EMPTY_FOCUS: FocusState = {
  firstName: false,
  lastName: false,
  email: false,
  message: false,
};

export function ContactForm() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";

  // UI-only state — does not need to live in the hook
  const [focused, setFocused] = useState<FocusState>(EMPTY_FOCUS);

  const { values, status, errorMessage, handleChange, handleSubmit, reset } = useContactForm();

  const handleFocus = (field: keyof ContactFormValues) =>
    setFocused((p) => ({ ...p, [field]: true }));
  const handleBlur = (field: keyof ContactFormValues) =>
    setFocused((p) => ({ ...p, [field]: false }));
  const isFloating = (field: keyof ContactFormValues) =>
    focused[field] || (values[field]?.length ?? 0) > 0;

  // ── Palette tokens ────────────────────────────────────────────────────────
  const registryBg = isLight ? "#fcfbf9" : "#0a0e18";
  const registryBorder = isLight ? "#c8cdd6" : "rgba(255,255,255,0.1)";
  const inkColor = isLight ? "#0f172a" : "#f8fafc";
  const inkMuted = isLight ? "#64748b" : "rgba(255,255,255,0.5)";
  const inkSubtle = isLight ? "#94a3b8" : "rgba(255,255,255,0.22)";
  const fieldLine = isLight ? "#cbd5e1" : "rgba(255,255,255,0.12)";
  const fieldFocusLine = isLight ? "#0f172a" : "rgba(255,255,255,0.6)";

  // ── Style helpers ─────────────────────────────────────────────────────────
  const fieldStyle = (field: keyof ContactFormValues): React.CSSProperties => ({
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused[field] ? fieldFocusLine : fieldLine}`,
    color: inkColor,
    width: "100%",
    padding: "20px 0 8px 0",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "'Space Grotesk', sans-serif",
    borderRadius: 0,
  });

  const floatLabel = (field: keyof ContactFormValues): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    top: isFloating(field) ? "4px" : "22px",
    fontSize: isFloating(field) ? "9px" : "13px",
    letterSpacing: isFloating(field) ? "0.12em" : "0.01em",
    color: isFloating(field) ? (focused[field] ? inkColor : inkSubtle) : inkMuted,
    transition: "all 0.18s ease",
    pointerEvents: "none",
    fontWeight: isFloating(field) ? 700 : 400,
    textTransform: isFloating(field) ? "uppercase" : "none",
    fontFamily: "'Space Grotesk', sans-serif",
  });

  // ── Result panels ─────────────────────────────────────────────────────────
  const resultPanelBase: React.CSSProperties = {
    background: registryBg,
    border: `1px solid ${registryBorder}`,
    borderRadius: "2px",
  };

  return (
    <section
      id="contact"
      className="relative px-4 py-20 overflow-hidden"
      style={{
        background: tokens.canvasBgAlt,
        fontFamily: "'Space Grotesk', sans-serif",
        transition: "background 0.35s ease",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "500px",
          height: "200px",
          background: `radial-gradient(ellipse at bottom, ${tokens.glowBlue} 0%, transparent 65%)`,
          filter: "blur(50px)",
        }}
      />

      <div className="relative max-w-lg mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p
            style={{
              color: inkSubtle,
              fontSize: "9px",
              letterSpacing: "0.2em",
              fontWeight: 700,
              marginBottom: "16px",
            }}
            className="uppercase"
          >
            Gallery of Lubbock · Contact
          </p>
          <h2
            style={{
              color: inkColor,
              fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              transition: "color 0.35s ease",
              marginBottom: "12px",
            }}
          >
            Let's build something{" "}
            <GradientText>extraordinary</GradientText>
          </h2>
          <p style={{ color: inkMuted, fontSize: "14px", lineHeight: 1.75 }}>
            Have a project in mind? Leave your details below — I respond within 24 hours.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── Success state ────────────────────────────────────────────── */}
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center py-16 text-center"
              style={resultPanelBase}
            >
              <div
                className="flex items-center justify-center w-14 h-14 mb-5"
                style={{
                  border: `1px solid ${isLight ? "rgba(21,128,61,0.35)" : "rgba(34,197,94,0.4)"}`,
                  borderRadius: "50%",
                  background: isLight ? "rgba(21,128,61,0.06)" : "rgba(34,197,94,0.08)",
                }}
              >
                <CheckCircle2 size={28} color={isLight ? "#15803d" : "#22c55e"} />
              </div>
              <h3
                style={{
                  color: inkColor,
                  fontSize: "17px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  marginBottom: "8px",
                }}
              >
                Entry recorded.
              </h3>
              <p style={{ color: inkMuted, fontSize: "13px", maxWidth: "220px", lineHeight: 1.7 }}>
                Thank you for signing the registry. I'll be in touch within 24 hours.
              </p>
              <button
                onClick={reset}
                className="mt-8 px-6 py-2 text-sm font-medium transition-all"
                style={{
                  background: "transparent",
                  border: `1px solid ${registryBorder}`,
                  color: inkMuted,
                  borderRadius: "2px",
                  letterSpacing: "0.05em",
                }}
              >
                Sign again
              </button>
            </motion.div>
          )}

          {/* ── Offline queued state ─────────────────────────────────────── */}
          {status === "offline_queued" && (
            <motion.div
              key="offline"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center py-16 text-center"
              style={resultPanelBase}
            >
              <div
                className="flex items-center justify-center w-14 h-14 mb-5"
                style={{
                  border: "1px solid rgba(217,119,6,0.35)",
                  borderRadius: "50%",
                  background: "rgba(217,119,6,0.06)",
                }}
              >
                <WifiOff size={28} color="#d97706" />
              </div>
              <h3
                style={{
                  color: inkColor,
                  fontSize: "17px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  marginBottom: "8px",
                }}
              >
                Saved for later.
              </h3>
              <p style={{ color: inkMuted, fontSize: "13px", maxWidth: "260px", lineHeight: 1.7 }}>
                You appear to be offline. Your message has been securely saved and will be
                delivered automatically when your connection is restored.
              </p>
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: inkSubtle,
                  marginTop: "12px",
                }}
                className="uppercase"
              >
                Stored in local device queue
              </p>
              <button
                onClick={reset}
                className="mt-8 px-6 py-2 text-sm font-medium transition-all"
                style={{
                  background: "transparent",
                  border: `1px solid ${registryBorder}`,
                  color: inkMuted,
                  borderRadius: "2px",
                  letterSpacing: "0.05em",
                }}
              >
                Dismiss
              </button>
            </motion.div>
          )}

          {/* ── Error state ──────────────────────────────────────────────── */}
          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col items-center py-14 text-center px-6"
              style={resultPanelBase}
            >
              <div
                className="flex items-center justify-center w-14 h-14 mb-5"
                style={{
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "50%",
                  background: "rgba(239,68,68,0.06)",
                }}
              >
                <AlertCircle size={28} color="#ef4444" />
              </div>
              <h3
                style={{
                  color: inkColor,
                  fontSize: "17px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  marginBottom: "8px",
                }}
              >
                Submission failed.
              </h3>
              {errorMessage && (
                <p
                  style={{
                    color: inkMuted,
                    fontSize: "13px",
                    maxWidth: "260px",
                    lineHeight: 1.7,
                  }}
                >
                  {errorMessage}
                </p>
              )}
              <button
                onClick={reset}
                className="mt-8 px-6 py-2 text-sm font-medium transition-all"
                style={{
                  background: "transparent",
                  border: `1px solid ${registryBorder}`,
                  color: inkMuted,
                  borderRadius: "2px",
                  letterSpacing: "0.05em",
                }}
              >
                Try again
              </button>
            </motion.div>
          )}

          {/* ── Form (idle | submitting) ─────────────────────────────────── */}
          {(status === "idle" || status === "submitting") && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
            >
              <div
                style={{
                  background: registryBg,
                  border: `1px solid ${registryBorder}`,
                  borderRadius: "2px",
                  transition: "all 0.35s ease",
                  overflow: "hidden",
                }}
              >
                {/* Registry header bar */}
                <div
                  style={{
                    borderBottom: `1px solid ${registryBorder}`,
                    padding: "18px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "8px",
                        letterSpacing: "0.22em",
                        fontWeight: 800,
                        color: inkSubtle,
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      Visitor Registry
                    </p>
                    <p style={{ fontSize: "11px", color: inkMuted }}>
                      Carlos Rangel · Lubbock, TX
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      color: inkSubtle,
                      fontVariantNumeric: "tabular-nums",
                      opacity: 0.6,
                    }}
                  >
                    #CR–2026
                  </span>
                </div>

                {/* Fields */}
                <div className="p-6 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-6">
                    {(["firstName", "lastName"] as const).map((field) => (
                      <div key={field} className="relative" style={{ paddingTop: "4px" }}>
                        <label style={floatLabel(field)}>
                          {field === "firstName" ? "First Name" : "Last Name"}
                        </label>
                        <input
                          type="text"
                          value={values[field]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          onFocus={() => handleFocus(field)}
                          onBlur={() => handleBlur(field)}
                          style={fieldStyle(field)}
                          required
                          disabled={status === "submitting"}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="relative" style={{ paddingTop: "4px" }}>
                    <label style={floatLabel("email")}>Email Address</label>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      style={fieldStyle("email")}
                      required
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div className="relative" style={{ paddingTop: "4px" }}>
                    <label
                      style={{
                        ...floatLabel("message"),
                        top: isFloating("message") ? "4px" : "8px",
                        transform: "none",
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      value={values.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      onFocus={() => handleFocus("message")}
                      onBlur={() => handleBlur("message")}
                      rows={4}
                      style={{
                        ...fieldStyle("message"),
                        padding: "22px 0 8px 0",
                        resize: "none",
                      }}
                      required
                      disabled={status === "submitting"}
                    />
                  </div>

                  <div style={{ borderTop: `1px solid ${fieldLine}`, marginTop: "4px" }} />

                  <div className="flex items-center justify-between">
                    <p
                      style={{ fontSize: "10px", color: inkSubtle, letterSpacing: "0.06em" }}
                      className="uppercase"
                    >
                      {status === "submitting" ? "Sending…" : "All inquiries answered within 24h"}
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="flex items-center gap-2 px-5 py-2 transition-all disabled:opacity-50"
                      style={{
                        background: isLight ? inkColor : "rgba(255,255,255,0.9)",
                        color: isLight ? "#ffffff" : "#0f172a",
                        borderRadius: "2px",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        cursor: status === "submitting" ? "not-allowed" : "pointer",
                      }}
                    >
                      <Send size={12} />
                      {status === "submitting" ? "SENDING" : "SUBMIT"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
