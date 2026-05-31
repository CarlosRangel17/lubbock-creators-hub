import { motion } from "motion/react";
import { Cpu } from "lucide-react";
import { useTheme } from "./ThemeContext";

type TechEntry = {
  name: string;
  abbr: string;
  lightColor: string;
  darkColor: string;
};

const techs: TechEntry[] = [
  { name: "JavaScript", abbr: "JS",    lightColor: "#d97706", darkColor: "#f7df1e" },
  { name: "HTML5",      abbr: "HTML",  lightColor: "#dc2626", darkColor: "#fb923c" },
  { name: "CSS3",       abbr: "CSS",   lightColor: "#2563eb", darkColor: "#60a5fa" },
  { name: "Sass",       abbr: "Sass",  lightColor: "#db2777", darkColor: "#f472b6" },
  { name: "TypeScript", abbr: "TS",    lightColor: "#2563eb", darkColor: "#60a5fa" },
  { name: "React",      abbr: "React", lightColor: "#0891b2", darkColor: "#22d3ee" },
  { name: "Next.js",    abbr: "Next",  lightColor: "#0f172a", darkColor: "#f8fafc" },
  { name: "Angular",    abbr: "NG",    lightColor: "#dc2626", darkColor: "#f87171" },
  { name: "C#",         abbr: "C#",    lightColor: "#7c3aed", darkColor: "#c4b5fd" },
  { name: "Node.js",    abbr: "Node",  lightColor: "#16a34a", darkColor: "#86efac" },
  { name: "Python",     abbr: "Py",    lightColor: "#1d4ed8", darkColor: "#93c5fd" },
  { name: ".NET Core",  abbr: ".NET",  lightColor: "#7c3aed", darkColor: "#c4b5fd" },
  { name: "SQL Server", abbr: "SQL",   lightColor: "#dc2626", darkColor: "#fca5a5" },
  { name: "GraphQL",    abbr: "GQL",   lightColor: "#db2777", darkColor: "#f9a8d4" },
  { name: "Docker",     abbr: "🐳",    lightColor: "#2563eb", darkColor: "#60a5fa" },
  { name: "Git",        abbr: "Git",   lightColor: "#ea580c", darkColor: "#fb923c" },
];

export function TechStack() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";

  return (
    <section
      id="skills"
      className="relative px-4 py-16"
      style={{ background: tokens.canvasBgAlt, fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.35s ease" }}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div style={{
              background: tokens.accentBlueBg,
              border: `1px solid ${tokens.accentBlueBorder}`,
              borderRadius: "100px", padding: "4px 12px",
              display: "inline-flex", alignItems: "center", gap: "6px",
            }}>
              <Cpu size={11} color={tokens.accentBlue} />
              <span style={{ color: tokens.accentBlueText, fontSize: "10px", letterSpacing: "0.07em", fontWeight: 700 }} className="uppercase">Tech Stack</span>
            </div>
          </div>
          <h2 style={{ color: tokens.headingColor, fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.025em", transition: "color 0.35s ease" }}>
            Tools of the{" "}
            <span style={{ color: tokens.accentBlue }}>craft</span>
          </h2>
        </motion.div>

        {/* Organic Fluid Capsule Badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          {techs.map((tech, i) => {
            const color = isLight ? tech.lightColor : tech.darkColor;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.32, delay: i * 0.04, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full cursor-default select-none"
                style={{
                  background: tokens.cardBg,
                  border: `1px solid ${tokens.cardBorder}`,
                  boxShadow: isLight ? "0 2px 8px rgba(15,23,42,0.06)" : "0 2px 8px rgba(0,0,0,0.3)",
                  transition: "all 0.25s ease",
                }}
              >
                <span style={{
                  color,
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  textShadow: isLight ? "none" : `0 0 12px ${color}40`
                }}>
                  {tech.abbr}
                </span>
                <div style={{
                  width: "1px",
                  height: "14px",
                  background: tokens.divider,
                  opacity: 0.4
                }} />
                <span style={{
                  color: tokens.mutedColor,
                  fontSize: "11px",
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                  fontWeight: 500
                }}>
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.65 }}
          className="mt-6 text-center"
          style={{ color: tokens.subtleColor, fontSize: "12px" }}
        >
          + Azure DevOps · Figma · Jira · Agile/Scrum
        </motion.p>
      </div>
    </section>
  );
}
