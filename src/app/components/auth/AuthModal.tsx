/**
 * AuthModal.tsx
 * Social authentication entry point — Google + GitHub triggers.
 * Renders as a bottom sheet on mobile, centered modal on desktop.
 * Connects to AuthContext stubs; swap underlying handler implementations
 * for Clerk / Auth0 SDK calls without touching this component.
 */

import { motion, AnimatePresence } from "motion/react";
import { X, Zap, Loader2 } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useAuth, type SocialProvider } from "./AuthContext";
import { track } from "../../services/analyticsService";
import styles from "./AuthModal.module.css";

// ── SVG brand logos (inline for zero-dep, no external icon lib needed) ───────

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubLogo({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { tokens } = useTheme();
  const { signInWith, isLoading, user } = useAuth();
  const isLight = tokens.mode === "light";

  const handleSignIn = (provider: SocialProvider) => {
    track({ name: "social_auth_initiated", properties: { provider } });
    signInWith(provider);
  };

  const panelBg = isLight ? "#ffffff" : "#111827";
  const panelBorder = isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)";
  const headingColor = isLight ? "#0f172a" : "#f8fafc";
  const bodyColor = isLight ? "#64748b" : "rgba(255,255,255,0.6)";
  const subtleColor = isLight ? "#94a3b8" : "rgba(255,255,255,0.28)";

  // Close on authenticated success
  if (user && isOpen) {
    onClose();
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label="Sign in to your account"
        >
          <motion.div
            className={styles.panel}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{ background: panelBg, border: `1px solid ${panelBorder}` }}
          >
            {/* Mobile drag handle */}
            <div className={styles.dragHandle} style={{ color: subtleColor }} />

            {/* Close button */}
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close sign in"
              style={{
                background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.07)",
                color: bodyColor,
              }}
            >
              <X size={15} />
            </button>

            {/* Logo + branding */}
            <div className={styles.logoRow}>
              <div className={styles.logoBox}>
                <Zap size={16} color="#fff" fill="#fff" />
              </div>
              <span style={{ color: headingColor, fontWeight: 800, letterSpacing: "-0.02em" }}>
                CR<span style={{ color: tokens.accentBlue }}>.</span>
              </span>
            </div>

            <h2 className={styles.heading} style={{ color: headingColor }}>
              Sign in to continue
            </h2>
            <p className={styles.subtext} style={{ color: bodyColor }}>
              Access your saved projects, consultation history, and exclusive
              Lubbock creator resources.
            </p>

            {/* Loading state overlay */}
            {isLoading && (
              <div
                className="flex flex-col items-center gap-3 py-8"
                style={{ color: bodyColor }}
              >
                <Loader2 size={24} className="animate-spin" />
                <p style={{ fontSize: "13px" }}>Connecting…</p>
              </div>
            )}

            {!isLoading && (
              <>
                <div className={styles.divider}>
                  <div
                    className={styles.dividerLine}
                    style={{ background: panelBorder }}
                  />
                  <span className={styles.dividerLabel} style={{ color: subtleColor }}>
                    Continue with
                  </span>
                  <div
                    className={styles.dividerLine}
                    style={{ background: panelBorder }}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  {/* Google */}
                  <button
                    className={styles.socialButton}
                    onClick={() => handleSignIn("google")}
                    disabled={isLoading}
                    style={{
                      background: isLight ? "#ffffff" : "#1f2937",
                      border: `1px solid ${panelBorder}`,
                      color: headingColor,
                      boxShadow: isLight ? "0 1px 4px rgba(15,23,42,0.08)" : "none",
                    }}
                  >
                    <GoogleLogo />
                    Continue with Google
                  </button>

                  {/* GitHub */}
                  <button
                    className={styles.socialButton}
                    onClick={() => handleSignIn("github")}
                    disabled={isLoading}
                    style={{
                      background: isLight ? "#24292f" : "#f0f6fc",
                      color: isLight ? "#ffffff" : "#24292f",
                      border: `1px solid ${isLight ? "#24292f" : "#e2e8f0"}`,
                    }}
                  >
                    <GitHubLogo color={isLight ? "#ffffff" : "#24292f"} />
                    Continue with GitHub
                  </button>
                </div>

                <p className={styles.disclaimer} style={{ color: subtleColor }}>
                  By continuing, you agree to the Terms of Service and Privacy Policy.
                  <br />
                  Authentication is powered by{" "}
                  <span style={{ color: bodyColor, fontWeight: 600 }}>Clerk / Auth0</span>.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
