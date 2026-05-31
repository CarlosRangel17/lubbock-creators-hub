import { Linkedin, Github, Zap, Mail } from "lucide-react";
import { useTheme } from "./ThemeContext";

export function Footer() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";

  return (
    <footer
      style={{
        background: isLight ? "#f1f5f9" : "#080c14",
        borderTop: `1px solid ${tokens.divider}`,
        fontFamily: "'Space Grotesk', sans-serif",
        transition: "all 0.35s ease",
      }}
      className="px-4 py-10"
    >
      <div className="max-w-lg mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)",
              borderRadius: "8px",
              padding: "6px",
              boxShadow: `0 0 14px rgba(239,68,68,0.3)`,
            }}
            className="flex items-center justify-center"
          >
            <Zap size={14} color="#fff" fill="#fff" />
          </div>
          <span
            style={{ color: tokens.headingColor, fontWeight: 800, letterSpacing: "-0.02em", transition: "color 0.35s ease" }}
            className="text-sm"
          >
            Carlos Rangel<span style={{ color: tokens.accentBlue }}>.</span>
          </span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {[
            { icon: <Linkedin size={15} />, label: "LinkedIn", href: "https://www.linkedin.com/in/carlos-r-rangel/" },
            { icon: <Github size={15} />, label: "GitHub", href: "https://github.com/CarlosRangel17/" },
            { icon: <Mail size={15} />, label: "Email", href: "mailto:codenamecarlos20@gmail.com" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all"
              style={{
                background: tokens.cardBg,
                border: `1px solid ${tokens.cardBorder}`,
                color: tokens.mutedColor,
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        <p style={{ color: tokens.mutedColor, fontSize: "12px", letterSpacing: "0.04em", transition: "color 0.35s ease" }}>
          codenamecarlos20@gmail.com
        </p>

        <div style={{ borderTop: `1px solid ${tokens.divider}`, paddingTop: "20px", width: "100%" }} className="text-center">
          <p style={{ color: tokens.subtleColor, fontSize: "11px" }}>
            © Carlos Rangel · 2026 · Built with Next.js & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
