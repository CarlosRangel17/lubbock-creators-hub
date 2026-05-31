import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2 } from "lucide-react";
import { useTheme } from "./ThemeContext";

type FormField = "firstName" | "lastName" | "email" | "message";
type FormState = Record<FormField, string>;
type FocusState = Record<FormField, boolean>;

export function ContactForm() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";

  const [form, setForm] = useState<FormState>({ firstName: "", lastName: "", email: "", message: "" });
  const [focused, setFocused] = useState<FocusState>({ firstName: false, lastName: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: FormField, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const handleFocus = (field: FormField) => setFocused((p) => ({ ...p, [field]: true }));
  const handleBlur = (field: FormField) => setFocused((p) => ({ ...p, [field]: false }));
  const isFloating = (field: FormField) => focused[field] || form[field].length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const registryBg = isLight ? "#fcfbf9" : "#0a0e18";
  const registryBorder = isLight ? "#c8cdd6" : "rgba(255,255,255,0.1)";
  const inkColor = isLight ? "#0f172a" : "#f8fafc";
  const inkMuted = isLight ? "#64748b" : "rgba(255,255,255,0.5)";
  const inkSubtle = isLight ? "#94a3b8" : "rgba(255,255,255,0.22)";
  const fieldLine = isLight ? "#cbd5e1" : "rgba(255,255,255,0.12)";
  const fieldFocusLine = isLight ? "#0f172a" : "rgba(255,255,255,0.6)";

  const fieldStyle = (field: FormField): React.CSSProperties => ({
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

  const floatLabel = (field: FormField): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    top: isFloating(field) ? "4px" : "22px",
    fontSize: isFloating(field) ? "9px" : "13px",
    letterSpacing: isFloating(field) ? "0.12em" : "0.01em",
    color: isFloating(field)
      ? focused[field] ? inkColor : inkSubtle
      : inkMuted,
    transition: "all 0.18s ease",
    pointerEvents: "none",
    fontWeight: isFloating(field) ? 700 : 400,
    textTransform: isFloating(field) ? "uppercase" : "none",
    fontFamily: "'Space Grotesk', sans-serif",
  });

  return (
    <section
      id="contact"
      className="relative px-4 py-20 overflow-hidden"
      style={{ background: tokens.canvasBgAlt, fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.35s ease" }}
    >
      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: "500px", height: "200px",
        background: `radial-gradient(ellipse at bottom, ${tokens.glowBlue} 0%, transparent 65%)`,
        filter: "blur(50px)",
      }} />

      <div className="relative max-w-lg mx-auto">
        {/* Museum-style section label */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <p style={{
            color: inkSubtle,
            fontSize: "9px",
            letterSpacing: "0.2em",
            fontWeight: 700,
            marginBottom: "16px",
          }} className="uppercase">
            Gallery of Lubbock · Contact
          </p>
          <h2 style={{
            color: inkColor,
            fontSize: "clamp(1.8rem, 6vw, 2.6rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            transition: "color 0.35s ease",
            marginBottom: "12px",
          }}>
            Let's build something{" "}
            <span style={{
              background: isLight
                ? "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)"
                : "linear-gradient(135deg, #f87171 0%, #f97316 50%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              extraordinary
            </span>
          </h2>
          <p style={{ color: inkMuted, fontSize: "14px", lineHeight: 1.75 }}>
            Have a project in mind? Leave your details below — I respond within 24 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-16 text-center"
            style={{
              background: registryBg,
              border: `1px solid ${registryBorder}`,
              borderRadius: "2px",
            }}
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
            <h3 style={{ color: inkColor, fontSize: "17px", fontWeight: 600, letterSpacing: "-0.01em", marginBottom: "8px" }}>
              Entry recorded.
            </h3>
            <p style={{ color: inkMuted, fontSize: "13px", maxWidth: "220px", lineHeight: 1.7 }}>
              Thank you for signing the registry. I'll be in touch within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", message: "" }); }}
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
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
          >
            {/* Registry sheet container */}
            <div style={{
              background: registryBg,
              border: `1px solid ${registryBorder}`,
              borderRadius: "2px",
              transition: "all 0.35s ease",
              overflow: "hidden",
            }}>
              {/* Registry header bar */}
              <div style={{
                borderBottom: `1px solid ${registryBorder}`,
                padding: "18px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div>
                  <p style={{
                    fontSize: "8px",
                    letterSpacing: "0.22em",
                    fontWeight: 800,
                    color: inkSubtle,
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}>
                    Visitor Registry
                  </p>
                  <p style={{ fontSize: "11px", color: inkMuted }}>
                    Carlos Rangel · Lubbock, TX
                  </p>
                </div>
                {/* Decorative registry number watermark */}
                <span style={{
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: inkSubtle,
                  fontVariantNumeric: "tabular-nums",
                  opacity: 0.6,
                }}>
                  #CR–2026
                </span>
              </div>

              {/* Form fields */}
              <div className="p-6 flex flex-col gap-6">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-6">
                  {(["firstName", "lastName"] as FormField[]).map((field) => (
                    <div key={field} className="relative" style={{ paddingTop: "4px" }}>
                      <label style={floatLabel(field)}>
                        {field === "firstName" ? "First Name" : "Last Name"}
                      </label>
                      <input
                        type="text"
                        value={form[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        onFocus={() => handleFocus(field)}
                        onBlur={() => handleBlur(field)}
                        style={fieldStyle(field)}
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div className="relative" style={{ paddingTop: "4px" }}>
                  <label style={floatLabel("email")}>Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    style={fieldStyle("email")}
                    required
                  />
                </div>

                {/* Message */}
                <div className="relative" style={{ paddingTop: "4px" }}>
                  <label style={{
                    ...floatLabel("message"),
                    top: isFloating("message") ? "4px" : "8px",
                    transform: "none",
                  }}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
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
                  />
                </div>

                {/* Divider before submit */}
                <div style={{ borderTop: `1px solid ${fieldLine}`, marginTop: "4px" }} />

                {/* Submit */}
                <div className="flex items-center justify-between">
                  <p style={{ fontSize: "10px", color: inkSubtle, letterSpacing: "0.06em" }} className="uppercase">
                    All inquiries answered within 24h
                  </p>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 transition-all"
                    style={{
                      background: isLight ? inkColor : "rgba(255,255,255,0.9)",
                      color: isLight ? "#ffffff" : "#0f172a",
                      borderRadius: "2px",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                    }}
                  >
                    <Send size={12} />
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
