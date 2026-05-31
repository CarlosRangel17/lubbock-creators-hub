import { motion } from "motion/react";
import { GraduationCap, Award, ExternalLink } from "lucide-react";
import { useTheme } from "./ThemeContext";

const education = [
  {
    institution: "University of Texas at Arlington",
    degree: "BS Information Systems",
    date: "Dec 2015",
    gpa: "3.41 / 4.0",
    abbr: "UTA",
    accentLight: "#b45309",
    accentDark: "#fbbf24",
  },
  {
    institution: "Texas Tech University",
    degree: "N/A — Electrical & Electronics Engineering",
    date: "Fall 2011 – Dec 2013",
    gpa: "3.41 / 4.0",
    abbr: "TTU",
    accentLight: "#991b1b",
    accentDark: "#fca5a5",
  },
];

const licenses = [
  {
    name: "Enterprise Design Thinking Practitioner",
    issuer: "IBM",
    date: "Oct 2020",
    accentLight: "#1e40af",
    accentDark: "#60a5fa",
  },
  {
    name: "Microsoft 70-480: Programming in HTML5 with JS & CSS3",
    issuer: "Microsoft",
    date: "Apr 2019",
    accentLight: "#0369a1",
    accentDark: "#38bdf8",
  },
  {
    name: "LFS171x: Blockchain for Business — Hyperledger Technologies",
    issuer: "edX",
    date: "Sep 2018",
    accentLight: "#9d174d",
    accentDark: "#f9a8d4",
  },
];

export function Education() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";

  const sectionLabel = (
    <div style={{
      background: tokens.accentBlueBg,
      border: `1px solid ${tokens.accentBlueBorder}`,
      borderRadius: "100px", padding: "4px 12px",
      display: "inline-flex", alignItems: "center", gap: "6px",
    }}>
      <GraduationCap size={11} color={tokens.accentBlue} />
      <span style={{ color: tokens.accentBlueText, fontSize: "10px", letterSpacing: "0.07em", fontWeight: 700 }} className="uppercase">Credentials</span>
    </div>
  );

  return (
    <section
      id="education"
      className="relative px-4 py-16"
      style={{ background: tokens.canvasBg, fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.35s ease" }}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="mb-3">{sectionLabel}</div>
          <h2 style={{ color: tokens.headingColor, fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.025em", transition: "color 0.35s ease" }}>
            Education &{" "}
            <span style={{ color: tokens.accentBlue }}>Licenses</span>
          </h2>
        </motion.div>

        {/* Education */}
        <div className="mb-8">
          <p style={{ color: tokens.subtleColor, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "14px" }} className="uppercase">Education</p>
          <div className="relative flex flex-col">
            <div className="absolute left-5 top-5 bottom-5" style={{ width: 1, background: tokens.divider }} />
            {education.map((edu, i) => {
              const color = isLight ? edu.accentLight : edu.accentDark;
              return (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative flex items-start gap-4 py-4 pl-2"
                >
                  <div
                    className="relative z-10 flex items-center justify-center rounded-xl shrink-0"
                    style={{ width: 36, height: 36, background: `${color}15`, border: `1.5px solid ${color}35` }}
                  >
                    <span style={{ color, fontSize: "8px", fontWeight: 800, letterSpacing: "0.02em" }}>{edu.abbr}</span>
                  </div>
                  <div className="flex-1 pb-4" style={{ borderBottom: i < education.length - 1 ? `1px solid ${tokens.divider}` : "none" }}>
                    <p style={{ color: tokens.headingColor, fontSize: "14px", fontWeight: 600, lineHeight: 1.3, transition: "color 0.35s ease" }}>{edu.institution}</p>
                    <p style={{ color: tokens.bodyColor, fontSize: "12px", marginTop: "3px", transition: "color 0.35s ease" }}>{edu.degree}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span style={{ background: `${color}12`, border: `1px solid ${color}28`, color, fontSize: "10px", borderRadius: "6px", padding: "2px 7px", fontWeight: 700 }}>
                        GPA {edu.gpa}
                      </span>
                      <span style={{ color: tokens.subtleColor, fontSize: "11px" }}>{edu.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Licenses */}
        <div>
          <p style={{ color: tokens.subtleColor, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "14px" }} className="uppercase">Licenses & Certifications</p>
          <div className="flex flex-col gap-3">
            {licenses.map((lic, i) => {
              const color = isLight ? lic.accentLight : lic.accentDark;
              return (
                <motion.div
                  key={lic.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{
                    background: tokens.cardBg,
                    border: `1px solid ${tokens.cardBorder}`,
                    boxShadow: isLight ? "0 1px 6px rgba(15,23,42,0.05)" : "none",
                    transition: "all 0.35s ease",
                  }}
                >
                  <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: `${color}12`, border: `1.5px solid ${color}28` }}>
                    <Award size={16} color={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p style={{ color: tokens.headingColor, fontSize: "13px", fontWeight: 600, lineHeight: 1.4, flex: 1, transition: "color 0.35s ease" }}>{lic.name}</p>
                      <button className="shrink-0 flex items-center justify-center mt-0.5" style={{ color: tokens.subtleColor }} aria-label="View credential">
                        <ExternalLink size={13} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span style={{ background: `${color}10`, border: `1px solid ${color}25`, color, fontSize: "10px", borderRadius: "6px", padding: "2px 7px", fontWeight: 700 }}>
                        {lic.issuer}
                      </span>
                      <span style={{ color: tokens.subtleColor, fontSize: "11px" }}>{lic.date}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
