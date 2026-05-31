import { motion } from "motion/react";
import { QrCode, Wifi, ShoppingBag, Sparkles, ArrowRight, Store } from "lucide-react";
import { useTheme } from "./ThemeContext";

const features = [
  {
    icon: QrCode,
    iconColor: "#2563eb",
    title: "Instant QR-to-Wallet Checkouts",
    desc: "Tap, scan, pay. Zero friction digital wallets tailored for market vendors and artisans.",
    tag: "Payments",
    tokenKey: "blue" as const,
  },
  {
    icon: Wifi,
    iconColor: "amber" as const,
    title: "Offline-Resilient Portfolios",
    desc: "PWA-powered storefronts that work flawlessly even when the venue Wi-Fi gives out.",
    tag: "PWA",
    tokenKey: "amber" as const,
  },
  {
    icon: ShoppingBag,
    iconColor: "#7c3aed",
    title: "Zero-Headache Shopify Setup",
    desc: "Done-for-you Shopify storefront: inventory, branding, and launch-ready in days.",
    tag: "E-Commerce",
    tokenKey: "purple" as const,
  },
];

export function LocalSection() {
  const { tokens } = useTheme();
  const isLight = tokens.mode === "light";

  const featureColors = {
    blue: { color: tokens.accentBlue, bg: tokens.accentBlueBg, border: tokens.accentBlueBorder },
    amber: { color: tokens.accentAmber, bg: tokens.accentAmberBg, border: tokens.accentAmberBorder },
    purple: { color: isLight ? "#7c3aed" : "#a78bfa", bg: isLight ? "rgba(124,58,237,0.07)" : "rgba(167,139,250,0.1)", border: isLight ? "rgba(124,58,237,0.2)" : "rgba(167,139,250,0.25)" },
  };

  return (
    <section
      id="local"
      className="relative px-4 py-16 overflow-hidden"
      style={{ background: tokens.canvasBgAlt, fontFamily: "'Space Grotesk', sans-serif", transition: "background 0.35s ease" }}
    >
      {/* Glow accent */}
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{
        width: "400px", height: "300px",
        background: `radial-gradient(ellipse at bottom left, ${tokens.glowAmber} 0%, transparent 65%)`,
        filter: "blur(40px)",
      }} />

      {/* Geometric Watermark - Modern Lightning Bolt Motif */}
      <div className="absolute top-8 right-4 pointer-events-none opacity-20" style={{
        width: "280px",
        height: "280px",
      }}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path d="M100 20 L120 80 L160 90 L110 120 L120 170 L80 140 L40 150 L70 100 L30 70 L80 80 Z"
                stroke={tokens.accentBlue}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.6"/>
          <circle cx="100" cy="100" r="70" stroke={tokens.accentAmber} strokeWidth="1" strokeDasharray="4 4" opacity="0.4"/>
        </svg>
      </div>

      <div className="relative max-w-lg mx-auto">
        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4">
          <div style={{
            background: tokens.accentAmberBg,
            border: `1px solid ${tokens.accentAmberBorder}`,
            borderRadius: "100px",
            padding: "4px 12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <Store size={11} color={tokens.accentAmber} />
            <span style={{ color: tokens.accentAmber, fontSize: "10px", letterSpacing: "0.07em", fontWeight: 700 }} className="uppercase">
              Lubbock Local
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
          style={{ color: tokens.headingColor, fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "12px", transition: "color 0.35s ease" }}
        >
          Built for Lubbock's{" "}
          <span style={{ color: tokens.accentBlue }}>creators & makers</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.14 }}
          style={{ color: tokens.bodyColor, fontSize: "14px", lineHeight: 1.75, marginBottom: "28px", transition: "color 0.35s ease" }}
        >
          Farmers market vendors, Friday Art Trail artists, and small business owners — you deserve
          modern digital infrastructure without the agency price tag.
        </motion.p>

        {/* Feature cards */}
        <div className="flex flex-col gap-3">
          {features.map((feat, i) => {
            const c = featureColors[feat.tokenKey];
            const Icon = feat.icon;
            const iconColor = feat.tokenKey === "blue" ? tokens.accentBlue : feat.tokenKey === "amber" ? tokens.accentAmber : featureColors.purple.color;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-2xl"
                style={{
                  background: tokens.cardBg,
                  border: `1px solid ${tokens.cardBorder}`,
                  boxShadow: isLight ? "0 1px 6px rgba(15,23,42,0.06)" : "none",
                  transition: "all 0.35s ease",
                }}
              >
                <div className="flex items-center justify-center rounded-xl shrink-0" style={{
                  width: 48, height: 48,
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                }}>
                  <Icon size={21} color={iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span style={{ color: tokens.headingColor, fontSize: "14px", fontWeight: 600, transition: "color 0.35s ease" }}>{feat.title}</span>
                    <span style={{
                      background: c.bg, border: `1px solid ${c.border}`,
                      color: iconColor, fontSize: "9px", borderRadius: "6px",
                      padding: "2px 7px", letterSpacing: "0.05em", fontWeight: 700,
                    }} className="uppercase">{feat.tag}</span>
                  </div>
                  <p style={{ color: tokens.bodyColor, fontSize: "13px", lineHeight: 1.65, transition: "color 0.35s ease" }}>{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-8 p-5 rounded-2xl text-center"
          style={{
            background: isLight
              ? "linear-gradient(135deg, rgba(217,119,6,0.06) 0%, rgba(37,99,235,0.05) 100%)"
              : "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(59,130,246,0.07) 100%)",
            border: `1px solid ${tokens.accentAmberBorder}`,
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={15} color={tokens.accentAmber} />
            <span style={{ color: tokens.accentAmber, fontSize: "11px", fontWeight: 700, letterSpacing: "0.07em" }} className="uppercase">
              Limited spots available
            </span>
          </div>
          <p style={{ color: tokens.bodyColor, fontSize: "13px", marginBottom: "14px", lineHeight: 1.65 }}>
            First consultation is always free. Let's chat about what's possible for your business.
          </p>
          <button
            onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all"
            style={{ background: tokens.accentAmber, color: isLight ? "#fff" : "#0b0f19" }}
          >
            Book a Free Consultation
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
