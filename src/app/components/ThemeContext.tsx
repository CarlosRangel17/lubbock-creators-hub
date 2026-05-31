import { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeTokens {
  mode: ThemeMode;

  // Canvas
  canvasBg: string;
  canvasBgAlt: string;

  // Cards & surfaces
  cardBg: string;
  cardBorder: string;
  badgeBg: string;
  insetBg: string;

  // Typography
  headingColor: string;
  bodyColor: string;
  mutedColor: string;
  subtleColor: string;

  // Brand anchors (constant feel, adjusted for contrast)
  accentBlue: string;
  accentBlueHover: string;
  accentBlueBg: string;
  accentBlueBorder: string;
  accentBlueText: string;

  accentAmber: string;
  accentAmberBg: string;
  accentAmberBorder: string;
  accentAmberText: string;

  // Nav
  navBg: string;
  navBorder: string;
  navText: string;

  // Tag chips
  tagBg: string;
  tagBorder: string;
  tagText: string;

  // Input
  inputBg: string;
  inputBorder: string;
  inputFocusBorder: string;

  // Divider
  divider: string;

  // Glow (subtle in light, vivid in dark)
  glowBlue: string;
  glowAmber: string;

  // CTA primary button
  btnPrimary: string;
  btnPrimaryText: string;
  btnPrimaryGlow: string;

  // Secondary/outline button
  btnSecondaryBorder: string;
  btnSecondaryText: string;
}

const lightTokens: ThemeTokens = {
  mode: "light",

  canvasBg: "#fcfbf9",
  canvasBgAlt: "#f8f7f5",

  cardBg: "#ffffff",
  cardBorder: "#e2e8f0",
  badgeBg: "#f8f7f5",
  insetBg: "#fcfbf9",

  headingColor: "#0f172a",
  bodyColor: "#475569",
  mutedColor: "#64748b",
  subtleColor: "#94a3b8",

  accentBlue: "#ef4444",
  accentBlueHover: "#dc2626",
  accentBlueBg: "rgba(239,68,68,0.08)",
  accentBlueBorder: "rgba(239,68,68,0.25)",
  accentBlueText: "#ef4444",

  accentAmber: "#d97706",
  accentAmberBg: "rgba(217,119,6,0.08)",
  accentAmberBorder: "rgba(217,119,6,0.25)",
  accentAmberText: "#d97706",

  navBg: "rgba(252,251,249,0.92)",
  navBorder: "#e2e8f0",
  navText: "#334155",

  tagBg: "#f8f7f5",
  tagBorder: "#e2e8f0",
  tagText: "#475569",

  inputBg: "#ffffff",
  inputBorder: "#e2e8f0",
  inputFocusBorder: "#ef4444",

  divider: "#e2e8f0",

  glowBlue: "rgba(239,68,68,0.07)",
  glowAmber: "rgba(217,119,6,0.06)",

  btnPrimary: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
  btnPrimaryText: "#ffffff",
  btnPrimaryGlow: "rgba(239,68,68,0.28)",

  btnSecondaryBorder: "rgba(217,119,6,0.5)",
  btnSecondaryText: "#d97706",
};

const darkTokens: ThemeTokens = {
  mode: "dark",

  canvasBg: "#0b0f19",
  canvasBgAlt: "#111827",

  cardBg: "#111827",
  cardBorder: "rgba(255,255,255,0.07)",
  badgeBg: "#1f2937",
  insetBg: "#0b0f19",

  headingColor: "#f8fafc",
  bodyColor: "rgba(255,255,255,0.6)",
  mutedColor: "rgba(255,255,255,0.45)",
  subtleColor: "rgba(255,255,255,0.25)",

  accentBlue: "#f87171",
  accentBlueHover: "#ef4444",
  accentBlueBg: "rgba(248,113,113,0.12)",
  accentBlueBorder: "rgba(248,113,113,0.3)",
  accentBlueText: "#fca5a5",

  accentAmber: "#fbbf24",
  accentAmberBg: "rgba(251,191,36,0.1)",
  accentAmberBorder: "rgba(251,191,36,0.25)",
  accentAmberText: "#fbbf24",

  navBg: "rgba(11,15,25,0.92)",
  navBorder: "rgba(248,113,113,0.12)",
  navText: "rgba(255,255,255,0.75)",

  tagBg: "rgba(255,255,255,0.06)",
  tagBorder: "rgba(255,255,255,0.1)",
  tagText: "rgba(255,255,255,0.65)",

  inputBg: "rgba(255,255,255,0.04)",
  inputBorder: "rgba(255,255,255,0.1)",
  inputFocusBorder: "rgba(248,113,113,0.5)",

  divider: "rgba(255,255,255,0.07)",

  glowBlue: "rgba(248,113,113,0.12)",
  glowAmber: "rgba(251,191,36,0.07)",

  btnPrimary: "linear-gradient(135deg, #f87171 0%, #ef4444 100%)",
  btnPrimaryText: "#ffffff",
  btnPrimaryGlow: "rgba(248,113,113,0.4)",

  btnSecondaryBorder: "rgba(251,191,36,0.4)",
  btnSecondaryText: "#fbbf24",
};

interface ThemeContextValue {
  tokens: ThemeTokens;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  tokens: lightTokens,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cr-theme") as ThemeMode) ?? "light";
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("cr-theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));
  const tokens = mode === "light" ? lightTokens : darkTokens;

  return (
    <ThemeContext.Provider value={{ tokens, toggle }}>
      <div
        style={{
          background: tokens.canvasBg,
          minHeight: "100vh",
          transition: "background 0.35s ease, color 0.35s ease",
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
