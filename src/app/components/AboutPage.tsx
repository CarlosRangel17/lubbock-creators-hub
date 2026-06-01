import { motion } from "motion/react";
import { Bed, MapPin, Heart, GraduationCap, ArrowLeft, Mic2, Star, Spade, Users } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useNavigation } from "./NavigationContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GradientText } from "./GradientText";
import carlosVihuelaPhoto from '../assets/mariachi-new-era-four.png'

const mariachTimeline = [
  {
    era: "Middle School",
    year: "2006",
    accent: "#eb1410",
    title: "First Notes",
    body: "Picked up the guitar in Cavazos Middle School mariachi program and never looked back. The mariachi sound struck something deep — a calling disguised as a school elective.",
  },
  {
    era: "Lubbock High School",
    year: "2007",
    accent: "#ef4444",
    title: "Founding Member — LHS Mariachi",
    body: "Became a first-class founding member of the Lubbock High School mariachi program, helping establish an ensemble that would grow into a cornerstone of West Texas musical culture. Performed alongside lifelong collaborators Alex Garcia, Conrad Bernal, and Jose Casas.",
    ensemble: "Mariachi de Oro",
    members: ["Alex Garcia", "Conrad Bernal", "Jose Casas"],
  },
  {
    era: "Lubbock / TTU",
    year: "2012",
    accent: "#f97316",
    title: "Founding Member — TTU Mariachi",
    body: "After high school, co-founded Mariachi Los Matadores at Texas Tech University — the university's first official mariachi ensemble. Establishing a program that would promote musical diversity, sharing a part of Mexican culture at a collegiate level.",
    ensemble: "Mariachi Los Matadores",
    badge: "TTU Founding",
  },
  {
    era: "DFW / UTA",
    year: "2014",
    accent: "#fbbf24",
    title: "Founding Member — UTA Mariachi",
    body: "After relocating to the Dallas-Fort Worth metroplex, co-founded Mariachi Los Potrillos at the University of Texas at Arlington — the university's first official mariachi ensemble. Bridging two cities, two musical cultures, one unwavering love for the art form.",
    ensemble: "Mariachi Los Potrillos",
    badge: "UTA Founding",
  },
  {
    era: "DFW Professional",
    year: "2016",
    accent: "#d97706",
    title: "Mariachi Nueva Era",
    body: "Joined Mariachi Nueva Era, one of DFW's premier professional groups, touring cross-regionally across Texas and beyond. Known for a bold bilingual showmanship that fuses traditional mariachi reverence with modern pop energy — Bruno Mars, Daft Punk, Frank Sinatra, Guns N' Roses, and Santana delivered in full brass-and-vihuela glory.",
    ensemble: "Mariachi Nueva Era",
    touring: ["Bruno Mars", "Daft Punk", "Frank Sinatra", "Guns N' Roses", "Santana"],
  },
];

export function AboutPage() {
  const { tokens } = useTheme();
  const { navigate } = useNavigation();
  const isLight = tokens.mode === "light";

  const inkColor = tokens.headingColor;
  const inkBody = tokens.bodyColor;
  const inkMuted = tokens.mutedColor;
  const inkSubtle = tokens.subtleColor;
  const rule = tokens.divider;

  return (
    <div style={{ background: tokens.canvasBg, minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ── Editorial header ── */}
      <section
        className="relative px-4 pt-28 pb-16 overflow-hidden"
        style={{ background: tokens.canvasBg }}
      >
        {/* Faint ruled-line background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${rule} 1px, transparent 1px)`,
          backgroundSize: "100% 56px",
          opacity: 0.5,
        }} />

        {/* Back nav */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate("home")}
          className="relative flex items-center gap-2 mb-10 group"
          style={{ color: inkMuted, fontSize: "12px", letterSpacing: "0.06em", fontWeight: 600 }}
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase">Back to Home</span>
        </motion.button>

        <div className="max-w-lg mx-auto relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: inkSubtle, fontSize: "9px", letterSpacing: "0.22em", fontWeight: 700, marginBottom: "20px" }}
            className="uppercase"
          >
            Personal Archive · Carlos Rangel
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontSize: "clamp(2.8rem, 11vw, 5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              color: inkColor,
              marginBottom: "24px",
            }}
          >
            My<br />
            <GradientText>Story.</GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ color: inkBody, fontSize: "16px", lineHeight: 1.75, maxWidth: "400px" }}
          >
            Lubbock native. Engineer by trade. Musician by soul. Father by greatest fortune.
          </motion.p>

          {/* Decorative horizontal rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ height: "1px", background: `linear-gradient(90deg, #ef4444, #fbbf24, transparent)`, marginTop: "32px", transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* ── Section A: The Anchor ── */}
      <section className="relative px-4 py-16 overflow-hidden" style={{ background: tokens.canvasBgAlt }}>
        {/* Section watermark number */}
        <div className="absolute top-6 right-4 pointer-events-none select-none" style={{
          fontSize: "clamp(6rem, 20vw, 10rem)",
          fontWeight: 900,
          color: isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.03)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}>
          01
        </div>

        <div className="relative max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: "#ef4444", fontSize: "9px", letterSpacing: "0.2em", fontWeight: 700, marginBottom: "8px" }} className="uppercase">
              The Anchor
            </p>
            <h2 style={{ color: inkColor, fontSize: "clamp(1.8rem, 7vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
              Lubbock Born<br />&amp; Raised.
            </h2>
          </motion.div>

          {/* Photo + text two-column */}
          <div className="flex flex-col gap-8">
            {/* Family photo - angled frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ position: "relative" }}
            >
              <div style={{
                borderRadius: "4px",
                overflow: "hidden",
                border: `1px solid ${tokens.cardBorder}`,
                boxShadow: isLight ? "0 8px 32px rgba(15,23,42,0.1)" : "0 8px 32px rgba(0,0,0,0.4)",
                transform: "rotate(-1.5deg)",
                maxWidth: "360px",
                margin: "0 auto",
              }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1706601822656-08a1a6ce7c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                  alt="Father and daughter silhouette at sunset"
                  style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }}
                />
                {/* Caption strip */}
                <div style={{
                  background: isLight ? "#f8f7f5" : "#111827",
                  padding: "10px 14px",
                  borderTop: `1px solid ${tokens.cardBorder}`,
                }}>
                  <p style={{ fontSize: "10px", color: inkSubtle, letterSpacing: "0.08em" }} className="uppercase">
                    Lubbock, TX · My greatest work
                  </p>
                </div>
              </div>
              {/* Small Heart badge */}
              <div style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(239,68,68,0.12)",
                border: "1px solid rgba(239,68,68,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Heart size={16} color="#ef4444" fill="rgba(239,68,68,0.4)" />
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              {/* Location badge */}
              <div className="inline-flex items-center gap-2 mb-5" style={{
                background: tokens.accentAmberBg,
                border: `1px solid ${tokens.accentAmberBorder}`,
                borderRadius: "100px",
                padding: "5px 12px",
              }}>
                <MapPin size={11} color={tokens.accentAmber} />
                <span style={{ color: tokens.accentAmber, fontSize: "10px", letterSpacing: "0.07em", fontWeight: 700 }} className="uppercase">
                  West Texas Roots
                </span>
              </div>

              <p style={{ color: inkBody, fontSize: "15px", lineHeight: 1.85, marginBottom: "16px" }}>
                I was born and raised in Lubbock — where the sky goes on forever, the wind never quits, and community runs bone-deep. This city shaped everything: my work ethic, my creativity, and my sense of what truly matters.
              </p>
              <p style={{ color: inkBody, fontSize: "15px", lineHeight: 1.85, marginBottom: "16px" }}>
                Before I was a software engineer, I was a son of the South Plains. Today, I'm a <span style={{ color: inkColor, fontWeight: 700 }}>dedicated husband</span> and a <span style={{ color: "#ef4444", fontWeight: 700 }}>proud father</span> to a daughter who reminds me every single day why I build things that last.
              </p>
              <p style={{ color: inkBody, fontSize: "15px", lineHeight: 1.85 }}>
                No matter where career currents carry me, Lubbock is the anchor. It's home — and it always will be.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section B: The DFW Journey ── */}
      <section className="relative px-4 py-16 overflow-hidden" style={{ background: tokens.canvasBg }}>
        {/* Section watermark number */}
        <div className="absolute top-6 left-4 pointer-events-none select-none" style={{
          fontSize: "clamp(6rem, 20vw, 10rem)",
          fontWeight: 900,
          color: isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.03)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}>
          02
        </div>

        <div className="relative max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: "#f97316", fontSize: "9px", letterSpacing: "0.2em", fontWeight: 700, marginBottom: "8px" }} className="uppercase">
              The DFW Journey
            </p>
            <h2 style={{ color: inkColor, fontSize: "clamp(1.8rem, 7vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "28px" }}>
              Seven Years<br />in DFW.
            </h2>
          </motion.div>

          {/* DFW skyline photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: "32px" }}
          >
            <div style={{
              overflow: "hidden",
              borderRadius: "4px",
              border: `1px solid ${tokens.cardBorder}`,
              clipPath: "polygon(0 0, 100% 0, 100% 88%, 94% 100%, 0 100%)",
            }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578234467412-b0bbdb4c2283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Dallas-Fort Worth skyline at night"
                style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
              />
            </div>
            <p style={{ fontSize: "10px", color: inkSubtle, letterSpacing: "0.07em", marginTop: "8px" }} className="uppercase">
              Dallas–Fort Worth Metroplex
            </p>
          </motion.div>

          {/* Journey narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: "32px" }}
          >
            <p style={{ color: inkBody, fontSize: "15px", lineHeight: 1.85, marginBottom: "16px" }}>
              In pursuit of a degree and a bigger stage, I relocated to the Dallas-Fort Worth metroplex — a move that would define the next chapter of my life personally, academically, and professionally.
            </p>
            <p style={{ color: inkBody, fontSize: "15px", lineHeight: 1.85 }}>
              DFW humbled me and built me simultaneously. I arrived with hustle and left with credentials, a career, and a worldview that only a metropolis of 7 million people can forge.
            </p>
          </motion.div>

          {/* Milestone cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: GraduationCap,
                color: "#fbbf24",
                bg: "rgba(251,191,36,0.08)",
                border: "rgba(251,191,36,0.22)",
                title: "University of Texas at Arlington",
                subtitle: "B.S. Information Systems · Dec 2015 · GPA 3.41",
                body: "Completed my degree while holding down a job, playing mariachi gigs across DFW, and founding UTA's first mariachi ensemble. Graduated with honors and a hunger to build.",
              },
              {
                icon: Star,
                color: "#f97316",
                bg: "rgba(249,115,22,0.08)",
                border: "rgba(249,115,22,0.22)",
                title: "Ayoka Systems",
                subtitle: "Software Engineering Developer · 2015",
                body: "My first professional software role — a Dallas-based custom software firm where I broke into enterprise development. Ayoka taught me to ship production code with care, velocity, and accountability.",
              },
              {
                icon: Spade,
                color: "#1eb5e3",
                bg: "rgba(249,115,22,0.08)",
                border: "rgba(249,115,22,0.22)",
                title: "Sogeti Capgemini",
                subtitle: "Software Engineering Consultant · 2017",
                body: "At Sogeti Capgemini in Dallas, I evolved from a developer into a consultant, navigating complex client landscapes with a focus on Trust and Honesty. It was here I learned that impactful software is as much about the community you build as the code you ship.",
              },
              {
                icon: Bed,
                color: "#d63429",
                bg: "rgba(249,115,22,0.08)",
                border: "rgba(249,115,22,0.22)",
                title: "Mattress Firm",
                subtitle: "Software Engineering Manager · 2022",
                body: "Stepping into the full-time role of Software Engineering Manager, I took ownership of high-stakes e-commerce systems, proving that technical precision and human-centric leadership go hand-in-hand. Today, I lead engineering squads to optimize performance, manage scalable architecture, and deliver bulletproof digital experiences at massive corporate scale."
              },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex gap-4 p-4"
                  style={{
                    background: tokens.cardBg,
                    border: `1px solid ${tokens.cardBorder}`,
                    borderLeft: `3px solid ${item.color}`,
                    borderRadius: "2px",
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: "10px",
                    background: item.bg, border: `1px solid ${item.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <ItemIcon size={20} color={item.color} />
                  </div>
                  <div>
                    <p style={{ color: inkColor, fontSize: "14px", fontWeight: 700, marginBottom: "2px" }}>{item.title}</p>
                    <p style={{ color: item.color, fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", marginBottom: "8px" }} className="uppercase">{item.subtitle}</p>
                    <p style={{ color: inkBody, fontSize: "13px", lineHeight: 1.7 }}>{item.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section C: The Mariachi Legacy ── */}
      <section className="relative px-4 py-16 overflow-hidden" style={{ background: tokens.canvasBgAlt }}>
        {/* Ambient warm glow */}
        <div className="absolute top-0 right-0 pointer-events-none" style={{
          width: "400px", height: "400px",
          background: `radial-gradient(ellipse at top right, rgba(217,119,6,0.08) 0%, transparent 65%)`,
          filter: "blur(60px)",
        }} />

        {/* Section watermark number */}
        <div className="absolute bottom-8 right-4 pointer-events-none select-none" style={{
          fontSize: "clamp(6rem, 20vw, 10rem)",
          fontWeight: 900,
          color: isLight ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.03)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}>
          03
        </div>

        <div className="relative max-w-lg mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: tokens.accentAmber, fontSize: "9px", letterSpacing: "0.2em", fontWeight: 700, marginBottom: "8px" }} className="uppercase">
              The Mariachi Legacy
            </p>
            <h2 style={{ color: inkColor, fontSize: "clamp(1.8rem, 7vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "12px" }}>
              Music in<br />the Blood.
            </h2>
            <p style={{ color: inkBody, fontSize: "15px", lineHeight: 1.8, marginBottom: "32px" }}>
              Long before I wrote a single line of code, I was playing guitar in a mariachi ensemble — and the two passions have always fed each other. Both demand precision, creativity, and a relentless commitment to showing up and performing.
            </p>
          </motion.div>

          {/* Mariachi photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ marginBottom: "40px" }}
          >
            <div style={{
              overflow: "hidden",
              borderRadius: "4px",
              border: `1px solid ${tokens.cardBorder}`,
              clipPath: "polygon(0 0, 84% 0, 100% 16%, 100% 100%, 0 100%)",
            }}>
              {/* <ImageWithFallback
                src="https://images.unsplash.com/photo-1654576205096-33f762a316a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Mariachi musicians performing"
                style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
              /> */}
              <img 
                src={carlosVihuelaPhoto} 
                alt="carlos-vihuela" 
                className="w-full object-cover" 
              />
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative" style={{ paddingLeft: "24px" }}>
            {/* Vertical gradient timeline line */}
            <div style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, #ef4444, #f97316, #fbbf24, #d97706)",
              borderRadius: "2px",
            }} />

            <div className="flex flex-col gap-8">
              {mariachTimeline.map((event, i) => (
                <motion.div
                  key={event.era}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ position: "relative" }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute",
                    left: "-31px",
                    top: "6px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: event.accent,
                    border: `2px solid ${tokens.canvasBgAlt}`,
                    boxShadow: `0 0 10px ${event.accent}55`,
                  }} />

                  {/* Era label + year */}
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{
                      fontSize: "9px",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      color: event.accent,
                      textTransform: "uppercase",
                    }}>
                      {event.era}
                    </span>
                    <span style={{
                      fontSize: "9px",
                      color: inkSubtle,
                      letterSpacing: "0.08em",
                    }}>
                      c. {event.year}
                    </span>
                  </div>

                  {/* Event title */}
                  <h3 style={{
                    color: inkColor,
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    marginBottom: "8px",
                  }}>
                    {event.title}
                  </h3>

                  {/* Body */}
                  <p style={{ color: inkBody, fontSize: "13px", lineHeight: 1.75, marginBottom: event.members || event.touring ? "12px" : 0 }}>
                    {event.body}
                  </p>

                  {/* Members tag strip */}
                  {event.members && (
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "0.1em", color: inkSubtle, marginBottom: "6px" }} className="uppercase">
                        With:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {event.members.map((name) => (
                          <span key={name} style={{
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.2)",
                            color: "#ef4444",
                            fontSize: "11px",
                            borderRadius: "4px",
                            padding: "3px 8px",
                            fontWeight: 600,
                          }}>
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Touring repertoire */}
                  {event.touring && (
                    <div>
                      <p style={{ fontSize: "9px", letterSpacing: "0.1em", color: inkSubtle, marginBottom: "6px" }} className="uppercase">
                        Repertoire:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {event.touring.map((act) => (
                          <span key={act} style={{
                            background: tokens.accentAmberBg,
                            border: `1px solid ${tokens.accentAmberBorder}`,
                            color: tokens.accentAmber,
                            fontSize: "11px",
                            borderRadius: "4px",
                            padding: "3px 8px",
                            fontWeight: 600,
                          }}>
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ensemble badge */}
                  {event.ensemble && (
                    <div className="flex items-center gap-2 mt-3">
                      <Mic2 size={11} color={event.accent} />
                      <span style={{ fontSize: "11px", color: inkMuted, fontWeight: 600, letterSpacing: "0.02em" }}>
                        {event.ensemble}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pull quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 relative"
            style={{
              borderLeft: `3px solid ${tokens.accentAmber}`,
              paddingLeft: "20px",
            }}
          >
            <p style={{
              color: inkColor,
              fontSize: "17px",
              fontWeight: 700,
              lineHeight: 1.55,
              letterSpacing: "-0.01em",
              marginBottom: "10px",
            }}>
              "The same discipline that keeps you in time with a mariachi ensemble keeps your codebase clean."
            </p>
            <p style={{ fontSize: "11px", color: inkSubtle, letterSpacing: "0.06em" }} className="uppercase">
              Carlos Rangel · Engineer · Musician
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA section ── */}
      <section className="relative px-4 py-16 overflow-hidden" style={{ background: tokens.canvasBg }}>
        <div className="max-w-lg mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {/* Decorative music note or icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full mx-auto mb-6" style={{
              background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(251,191,36,0.12) 100%)",
              border: "1px solid rgba(239,68,68,0.2)",
            }}>
              <Users size={22} color={tokens.accentAmber} />
            </div>

            <h2 style={{ color: inkColor, fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "14px" }}>
              Let's build something<br />worth remembering.
            </h2>
            <p style={{ color: inkBody, fontSize: "14px", lineHeight: 1.8, marginBottom: "32px", maxWidth: "340px", margin: "0 auto 32px" }}>
              Whether it's a digital storefront for your market booth or a production-grade enterprise platform — I bring the same passion to every build.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("home", "#contact")}
                className="inline-flex items-center justify-center gap-2 w-full py-4 transition-all"
                style={{
                  background: tokens.btnPrimary,
                  color: "#fff",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  boxShadow: `0 8px 28px ${tokens.btnPrimaryGlow}`,
                }}
              >
                Get in Touch
              </button>
              <button
                onClick={() => navigate("home")}
                className="inline-flex items-center justify-center gap-2 w-full py-4 transition-all"
                style={{
                  background: "transparent",
                  border: `1.5px solid ${tokens.btnSecondaryBorder}`,
                  color: tokens.btnSecondaryText,
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                View My Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
