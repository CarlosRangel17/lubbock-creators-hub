import { motion } from "motion/react";
import { MapPin, ArrowRight, ChevronDown, Linkedin, Github } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { GradientText } from "./GradientText";
import carlosPhoto from '../assets/carlos-luna-2.jpg'

export function Hero() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 pt-24 pb-16"
      style={{ background: tokens.canvasBg, fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.35s ease" }}
    >
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: "640px", height: "420px",
        background: `radial-gradient(ellipse at center, ${tokens.glowBlue} 0%, transparent 70%)`,
        filter: "blur(50px)",
      }} />
      <div className="absolute bottom-1/4 right-0 pointer-events-none" style={{
        width: "320px", height: "320px",
        background: `radial-gradient(ellipse at center, ${tokens.glowAmber} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }} />

      {/* Subtle dot grid - only in dark */}
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }} />
      )}
      {/* Light mode: faint ruled lines */}
      {isLight && (
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(${tokens.divider} 1px, transparent 1px)`,
          backgroundSize: "100% 64px",
          opacity: 0.5,
        }} />
      )}

      <div className="relative max-w-lg mx-auto w-full">
        {/* Location badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 mb-6">
          <div style={{
            background: tokens.accentBlueBg,
            border: `1px solid ${tokens.accentBlueBorder}`,
            borderRadius: "100px",
            padding: "6px 14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: tokens.accentBlue,
              boxShadow: `0 0 8px ${tokens.accentBlue}`,
              animation: "pulse-dot 2s ease-in-out infinite",
            }} />
            <MapPin size={12} color={tokens.accentBlue} />
            <span style={{ color: tokens.accentBlueText, fontSize: "11px", letterSpacing: "0.06em", fontWeight: 700 }} className="uppercase">
              Based in Lubbock, TX
            </span>
          </div>
        </motion.div>

        {/* Hero Content Grid with Asymmetrical Photo */}
        <div className="flex gap-6 items-start mb-5">
          {/* Text Content */}
          <div className="flex-1 min-w-0">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5"
              style={{
                fontSize: "clamp(2rem, 7vw, 3.2rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                color: tokens.headingColor,
                transition: "color 0.35s ease",
              }}
            >
               I refuse to build{" "}
              <GradientText>boring</GradientText>
              <br />websites.
            </motion.h1>
          </div>

          {/* Professional Headshot - Asymmetrical Placement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative shrink-0"
            style={{
              width: "140px",
              height: "140px",
              marginTop: "-12px",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(217,119,6,0.1) 100%)",
                border: `3px solid ${tokens.accentBlue}`,
                boxShadow: `0 12px 32px rgba(239,68,68,0.18), 0 0 0 1px ${tokens.cardBorder}`,
                transform: "rotate(-2deg)",
              }}
            >
              {/* <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Professional Headshot"
                className="w-full h-full object-cover"
                style={{ transform: "rotate(2deg) scale(1.1)" }}
              /> */}
              <img 
                src={carlosPhoto} 
                alt="carlos-luna" 
                className="w-full h-full object-cover" 
              />
            </div>
          </motion.div>
        </div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: tokens.bodyColor, fontSize: "15px", lineHeight: 1.78, marginBottom: "28px", transition: "color 0.35s ease" }}
        >
          Senior E-Commerce Engineer with{" "}
          <span style={{ color: tokens.headingColor, fontWeight: 700 }}>11+ years</span> building enterprise-scale platforms at{" "}
          <span style={{ color: tokens.accentBlue, fontWeight: 700 }}>Mattress Firm</span>. By night — hackathon builder, Next.js performance obsessive, and{" "}
          <span style={{ color: tokens.accentAmber, fontWeight: 700 }}>professional mariachi musician</span>{" "}
          who brings the same passion to every line of code as a live performance.
        </motion.p>

        {/* Social links */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="flex items-center gap-3 mb-8">
          {[{ icon: <Linkedin size={15} />, label: "LinkedIn", url: 'https://www.linkedin.com/in/carlos-r-rangel/' }, { icon: <Github size={15} />, label: "GitHub", url:  "https://github.com/CarlosRangel17/" }].map((s) => (
            <a
              key={s.label}
              href={s.url} 
              aria-label={s.label}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
              style={{
                background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.07)",
                border: `1px solid ${tokens.cardBorder}`,
                color: tokens.bodyColor,
              }}
            >
              {s.icon}
            </a>
          ))}
          <div style={{ height: "1px", flex: 1, background: tokens.divider }} />
          <span style={{ color: tokens.subtleColor, fontSize: "10px", letterSpacing: "0.09em", fontWeight: 600 }} className="uppercase">Open to work</span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-3">
          <button
            onClick={() => handleScroll("#contact")}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-sm transition-all"
            style={{
              background: tokens.btnPrimary,
              color: tokens.btnPrimaryText,
              boxShadow: `0 8px 28px ${tokens.btnPrimaryGlow}, 0 0 0 1px ${tokens.accentBlueBorder}`,
              letterSpacing: "0.025em",
            }}
          >
            Let's Build Something Bold
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => handleScroll("#local")}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-sm transition-all"
            style={{
              background: "transparent",
              border: `1.5px solid ${tokens.btnSecondaryBorder}`,
              color: tokens.btnSecondaryText,
              letterSpacing: "0.025em",
            }}
          >
            Explore Local Art Trail Solutions
            <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="grid grid-cols-3 gap-3 mt-10"
        >
          {[{ value: "11+", label: "Years Exp." }, { value: "50+", label: "Projects" }, { value: "∞", label: "Coffee Cups" }].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-4 rounded-2xl"
              style={{
                background: tokens.cardBg,
                border: `1px solid ${tokens.cardBorder}`,
                boxShadow: isLight ? "0 1px 4px rgba(15,23,42,0.06)" : "none",
                transition: "all 0.35s ease",
              }}
            >
              <span style={{ color: tokens.accentBlue, fontSize: "22px", fontWeight: 800, letterSpacing: "-0.03em" }}>{stat.value}</span>
              <span style={{ color: tokens.subtleColor, fontSize: "10px", letterSpacing: "0.06em", fontWeight: 600, marginTop: "4px" }} className="uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: tokens.subtleColor }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.1em", fontWeight: 600 }} className="uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <ChevronDown size={15} />
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </section>
  );
}
