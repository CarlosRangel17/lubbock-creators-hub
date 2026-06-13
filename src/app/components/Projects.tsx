import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronLeft, ChevronRight, Github, MapPin, BedDouble, Layers, Grid3X3, Globe, Code2, Music } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    id: "musicians-creators-hub",
    title: "Musicians Creators Hub",
    subtitle: "Musician Booking Platform",
    description: "A mobile-first UI that enables a visitor frictionless digital booking and tableside song requests.",
    tags: ["Musician", "Digital Booking", "Tableside Song Requests"],
    accentKey: "amber" as const,
    IconComponent: Music,
    imageUrl: "https://images.unsplash.com/photo-1654576205088-6503ad4ffb72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJpYWNoaSUyMGJhbmQlMjBwZXJmb3JtaW5nJTIwbGl2ZSUyMG11c2ljfGVufDF8fHx8MTc3OTY0NDQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    clipPath: "polygon(0 0, 100% 0, 100% 78%, 82% 100%, 0 100%)",
    url: 'https://musician-creators-hub.vercel.app/'
  },
  // {
  //   id: "delivery-tracker",
  //   title: "Delivery Tracker",
  //   subtitle: "Real-Time Shipment Intelligence",
  //   description: "Real-time shipment tracking with an integrated Google Map, customer privacy controls, and security-first API architecture.",
  //   tags: ["React", "Next.js", "SASS", "CSS3", "Google Maps API"],
  //   accentKey: "blue" as const,
  //   IconComponent: MapPin,
  //   imageUrl: "https://images.unsplash.com/photo-1727884014409-8adae3699b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  //   clipPath: "polygon(0 0, 86% 0, 100% 20%, 100% 100%, 0 100%)",
  // },
  // {
  //   id: "mattress-matcher",
  //   title: "MattressMatcher",
  //   subtitle: "AI-Powered Product Recommender",
  //   description: "A quiz and recommendation engine that takes the guesswork out of mattress shopping, matching users to ideal products via Sleep Expert logic.",
  //   tags: ["React", "Next.js", "SASS", "CSS3", "TypeScript"],
  //   accentKey: "purple" as const,
  //   IconComponent: BedDouble,
  //   imageUrl: "https://images.unsplash.com/photo-1556597243-3e1b4a3449a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  //   clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)",
  // },
  // {
  //   id: "mf-component-lib",
  //   title: "MF Component Library",
  //   subtitle: "Enterprise Design System",
  //   description: "Mattress Firm's internal React component library — 50+ accessible components adhering to WCAG 2.1 AA, built for speed and consistency.",
  //   tags: ["React", "TypeScript", "Storybook", "A11y", "SASS"],
  //   accentKey: "green" as const,
  //   IconComponent: Layers,
  //   imageUrl: "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  //   clipPath: "polygon(0 0, 100% 0, 100% 100%, 16% 100%, 0 82%)",
  // },
  // {
  //   id: "tic-tac-toe",
  //   title: "Tic Tac Toe",
  //   subtitle: "Classic 3x3 Strategy Game",
  //   description: "A polished, classic 3x3 game of Tic Tac Toe — play with your friends. Built with React Hooks and SASS. Fun, accessible, and snappy.",
  //   tags: ["React", "SASS", "React Hooks", "CSS Animations"],
  //   accentKey: "pink" as const,
  //   IconComponent: Grid3X3,
  //   imageUrl: "https://images.unsplash.com/photo-1677816156435-e844da620fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  //   clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)",
  // },
  // {
  //   id: "devops-hackathon",
  //   title: "DevOps Hackathon Site",
  //   subtitle: "2020 Cloud Hackathon",
  //   description: "A hackathon site for Sogeti professionals to collaborate and create projects enhancing DevOps unified offerings — quality assurance and cloud-based development.",
  //   tags: ["HTML5", "CSS3", "JavaScript", "Azure", "CI/CD"],
  //   accentKey: "cyan" as const,
  //   IconComponent: Globe,
  //   imageUrl: "https://images.unsplash.com/photo-1561233835-f937539b95b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  //   clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)",
  // },
];

type AccentKey = "amber" | "blue" | "purple" | "green" | "pink" | "cyan";

const staticAccents: Record<AccentKey, { color: string; bg: string; border: string }> = {
  amber:  { color: "#d97706", bg: "rgba(217,119,6,0.09)",   border: "rgba(217,119,6,0.22)"  },
  blue:   { color: "#ef4444", bg: "rgba(239,68,68,0.09)",   border: "rgba(239,68,68,0.22)"  },
  purple: { color: "#7c3aed", bg: "rgba(124,58,237,0.09)",  border: "rgba(124,58,237,0.22)" },
  green:  { color: "#15803d", bg: "rgba(21,128,61,0.09)",   border: "rgba(21,128,61,0.22)"  },
  pink:   { color: "#db2777", bg: "rgba(219,39,119,0.09)",  border: "rgba(219,39,119,0.22)" },
  cyan:   { color: "#0891b2", bg: "rgba(8,145,178,0.09)",   border: "rgba(8,145,178,0.22)"  },
};

const darkAccents: Record<AccentKey, { color: string; bg: string; border: string }> = {
  amber:  { color: "#fbbf24", bg: "rgba(251,191,36,0.1)",   border: "rgba(251,191,36,0.25)" },
  blue:   { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.3)" },
  purple: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
  green:  { color: "#4ade80", bg: "rgba(74,222,128,0.1)",   border: "rgba(74,222,128,0.25)" },
  pink:   { color: "#f472b6", bg: "rgba(244,114,182,0.1)",  border: "rgba(244,114,182,0.25)"},
  cyan:   { color: "#22d3ee", bg: "rgba(34,211,238,0.1)",   border: "rgba(34,211,238,0.25)" },
};

export function Projects() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const accents = isLight ? staticAccents : darkAccents;

  const goTo = (i: number) => setActiveIndex(Math.max(0, Math.min(projects.length - 1, i)));

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goTo(activeIndex + 1) : goTo(activeIndex - 1);
    touchStartX.current = null;
  };

  const project = projects[activeIndex];
  const accent = accents[project.accentKey];
  const Icon = project.IconComponent;

  return (
    <section
      id="projects"
      className="relative px-4 py-16 overflow-hidden"
      style={{ background: tokens.canvasBg, fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.35s ease" }}
    >
      {/* Dynamic glow */}
      <div className="absolute top-0 right-0 pointer-events-none" style={{
        width: "350px", height: "350px",
        background: `radial-gradient(ellipse at top right, ${accent.bg} 0%, transparent 65%)`,
        filter: "blur(50px)", transition: "background 0.5s ease",
      }} />

      <div className="relative max-w-lg mx-auto">
        {/* Section header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div style={{
              background: tokens.accentBlueBg, border: `1px solid ${tokens.accentBlueBorder}`,
              borderRadius: "100px", padding: "4px 12px",
              display: "inline-flex", alignItems: "center", gap: "6px",
            }}>
              <Code2 size={11} color={tokens.accentBlue} />
              <span style={{ color: tokens.accentBlueText, fontSize: "10px", letterSpacing: "0.07em", fontWeight: 700 }} className="uppercase">Recent Projects</span>
            </div>
          </div>
          <h2 style={{ color: tokens.headingColor, fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.025em", transition: "color 0.35s ease" }}>
            Work that speaks<br />
            <span style={{ color: tokens.accentBlue }}>for itself</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden"
              style={{
                background: tokens.cardBg,
                border: `1px solid ${tokens.cardBorder}`,
                borderRadius: "24px",
                boxShadow: isLight ? "0 2px 16px rgba(15,23,42,0.07)" : "none",
                transition: "background 0.35s ease, border-color 0.35s ease",
              }}
            >
              {/* Dramatic angled image slot */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <ImageWithFallback
                  src={project.imageUrl}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    clipPath: project.clipPath,
                    transition: "transform 0.4s ease",
                  }}
                />
                {/* Accent color overlay tint */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  clipPath: project.clipPath,
                  background: `linear-gradient(to bottom, ${accent.bg} 0%, transparent 60%)`,
                  pointerEvents: "none",
                }} />
                {/* Icon badge floating on image */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: tokens.cardBg,
                    border: `1px solid ${accent.border}`,
                    boxShadow: isLight ? "0 4px 12px rgba(15,23,42,0.15)" : "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  <Icon size={18} color={accent.color} />
                </div>
                {/* Project links on image */}
                <div style={{ position: "absolute", bottom: "16px", right: "16px", display: "flex", gap: "8px" }}>
                  {/* <button
                    className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
                    style={{
                      background: tokens.cardBg,
                      border: `1px solid ${tokens.cardBorder}`,
                      color: tokens.mutedColor,
                      boxShadow: isLight ? "0 2px 8px rgba(15,23,42,0.12)" : "0 2px 8px rgba(0,0,0,0.4)",
                    }}
                    aria-label="View source"
                  >
                    <Github size={14} />
                  </button> */}
                  <a
                    href={project.url}
                    target="_blank"
                    className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
                    style={{
                      background: accent.bg,
                      border: `1px solid ${accent.border}`,
                      color: accent.color,
                      boxShadow: isLight ? "0 2px 8px rgba(15,23,42,0.12)" : "0 2px 8px rgba(0,0,0,0.4)",
                    }}
                    aria-label="Open project"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Card body */}
              <div className="px-5 pt-4 pb-4">
                <h3 style={{ color: tokens.headingColor, fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "4px", transition: "color 0.35s ease" }}>
                  {project.title}
                </h3>
                <p style={{ color: accent.color, fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "10px" }} className="uppercase">
                  {project.subtitle}
                </p>
                <p style={{ color: tokens.bodyColor, fontSize: "13px", lineHeight: 1.7, transition: "color 0.35s ease" }}>
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="px-5 py-4 flex flex-wrap gap-2" style={{ borderTop: `1px solid ${tokens.divider}` }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: tokens.badgeBg,
                      border: `1px solid ${tokens.cardBorder}`,
                      color: tokens.mutedColor,
                      fontSize: "11px",
                      borderRadius: "8px",
                      padding: "3px 9px",
                      letterSpacing: "0.02em",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all disabled:opacity-30"
              style={{ background: tokens.cardBg, border: `1px solid ${tokens.cardBorder}`, color: tokens.headingColor, boxShadow: isLight ? "0 1px 4px rgba(15,23,42,0.06)" : "none" }}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === activeIndex ? 20 : 6,
                    height: 6,
                    background: i === activeIndex ? accent.color : tokens.subtleColor,
                    opacity: i === activeIndex ? 1 : 0.5,
                  }}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === projects.length - 1}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all disabled:opacity-30"
              style={{ background: tokens.cardBg, border: `1px solid ${tokens.cardBorder}`, color: tokens.headingColor, boxShadow: isLight ? "0 1px 4px rgba(15,23,42,0.06)" : "none" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <p className="text-center mt-3" style={{ color: tokens.subtleColor, fontSize: "11px", letterSpacing: "0.05em" }}>
            {activeIndex + 1} / {projects.length} — Swipe to explore
          </p>
        </div>
      </div>
    </section>
  );
}
