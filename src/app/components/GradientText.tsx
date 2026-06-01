/**
 * GradientText.tsx
 * Renders gradient-clipped text that reliably repaints on theme toggle.
 *
 * The `key={themeKey}` prop forces a full DOM remount when the theme
 * changes, invalidating any cached compositing layer data in the browser.
 * Combined with the CSS module's GPU-promotion rules, this eliminates the
 * "frozen solid gradient block" repaint bug.
 *
 * Usage:
 *   <GradientText>boring</GradientText>
 *   <GradientText gradient="linear-gradient(90deg, #ff0, #f0f)">custom</GradientText>
 */

import styles from "./GradientText.module.css";
import { useTheme } from "./ThemeContext";

export interface GradientTextProps {
  children: React.ReactNode;
  /** Override the default coral→orange→amber theme gradient */
  gradient?: string;
  className?: string;
  /** Inline style overrides (e.g. font-size, letter-spacing) */
  style?: React.CSSProperties;
}

/** Default gradients matched to each theme mode */
const THEME_GRADIENTS = {
  light: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)",
  dark: "linear-gradient(135deg, #f87171 0%, #f97316 50%, #fbbf24 100%)",
} as const;

export function GradientText({ children, gradient, className, style }: GradientTextProps) {
  const { tokens, themeKey } = useTheme();

  const resolvedGradient = gradient ?? THEME_GRADIENTS[tokens.mode];

  return (
    /*
     * key={themeKey} — the critical repaint trigger.
     * When themeKey increments, React unmounts this element and mounts a fresh
     * DOM node, clearing the browser's compositing cache for this layer.
     */
    <span
      key={themeKey}
      className={`${styles.gradientText}${className ? ` ${className}` : ""}`}
      style={{ backgroundImage: resolvedGradient, ...style }}
      aria-hidden="false"
    >
      {children}
    </span>
  );
}
