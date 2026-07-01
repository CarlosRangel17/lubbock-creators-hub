/**
 * GalacticonPage.tsx
 * Live-event POC for the Galacticon convention booth.
 * Standalone sci-fi themed page — renders in place of the main portfolio
 * when ?qrcode=live-event is detected AND the festival window is active.
 *
 * Festival window: 2026-07-01 → 2026-07-07 (adjustable via FESTIVAL_* consts)
 * If outside window: EvergreenFallback renders gracefully.
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap, Wifi, WifiOff, CheckCircle2, Send,
  ShoppingBag, ChevronLeft, ChevronRight, X, AlertCircle, ArrowRight
} from "lucide-react";
import { useNavigation } from "./NavigationContext";
import { track } from "../services/analyticsService";
import { useContactForm } from "../hooks/useContactForm";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import styles from "./GalacticonPage.module.css";

// ── Festival window ───────────────────────────────────────────────────────────

const FESTIVAL_START = new Date("2026-06-01T00:00:00").getTime();
const FESTIVAL_END   = new Date("2026-07-07T23:59:59").getTime();

function isWithinFestivalWindow(): boolean {
  const now = Date.now();
  return now >= FESTIVAL_START && now <= FESTIVAL_END;
}

// ── Product data ──────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: "sentinel",
    name: "Galactic Sentinel",
    subtitle: "Articulated Diamond Armor Figure",
    price: "$28",
    material: "PLA+",
    badge: "Dual-Extrusion",
    badgeColor: "#7c3aed",
    badgeBg: "rgba(124,58,237,0.12)",
    badgeBorder: "rgba(124,58,237,0.28)",
    imageUrl:
      "https://images.unsplash.com/photo-1616427030011-214e41469f40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    clipPath: "polygon(0 0, 100% 0, 100% 82%, 88% 100%, 0 100%)",
    tint: "rgba(124,58,237,0.18)",
  },
  {
    id: "keychain",
    name: "Chrono-Chain Pack",
    subtitle: "Custom Laser-Etched Keychains",
    price: "$12 ea",
    material: "PETG",
    badge: "Chrono-Chains",
    badgeColor: "#fbbf24",
    badgeBg: "rgba(251,191,36,0.1)",
    badgeBorder: "rgba(251,191,36,0.28)",
    imageUrl:
      "https://images.unsplash.com/photo-1703694741127-64f46e544971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    clipPath: "polygon(0 0, 86% 0, 100% 20%, 100% 100%, 0 100%)",
    tint: "rgba(251,191,36,0.14)",
  },
  {
    id: "fidget",
    name: "Nexus Fidget Module",
    subtitle: "Precision Flex-Gear Spinner",
    price: "$18",
    material: "TPU Flex",
    badge: "Fidget-Pro",
    badgeColor: "#10B981",
    badgeBg: "rgba(16,185,129,0.1)",
    badgeBorder: "rgba(16,185,129,0.28)",
    imageUrl:
      "https://images.unsplash.com/photo-1497040059851-bd928f851c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    clipPath: "polygon(14% 0, 100% 0, 86% 100%, 0 100%)",
    tint: "rgba(16,185,129,0.14)",
  },
];

// ── Sci-fi background SVG (fixed, 4% opacity) ─────────────────────────────────

function ScifiBg() {
  return (
    <svg
      className={styles.bgCanvas}
      viewBox="0 0 393 852"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Large planetary circles */}
      <circle cx="350" cy="80" r="120" stroke="white" strokeWidth="0.6" fill="none" />
      <circle cx="350" cy="80" r="90" stroke="white" strokeWidth="0.3" fill="none" />
      <circle cx="-40" cy="680" r="160" stroke="white" strokeWidth="0.6" fill="none" />
      <circle cx="-40" cy="680" r="120" stroke="white" strokeWidth="0.3" fill="none" />

      {/* Grid lines — vertical */}
      {[60, 120, 180, 240, 300, 360].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="852" stroke="white" strokeWidth="0.4" />
      ))}
      {/* Grid lines — horizontal */}
      {[120, 240, 360, 480, 600, 720].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="393" y2={y} stroke="white" strokeWidth="0.4" />
      ))}

      {/* Star field */}
      {[
        [30,40],[80,150],[200,60],[310,200],[50,350],[280,420],[160,520],
        [340,600],[70,680],[220,780],[130,90],[370,340],[100,460],[250,700],
      ].map(([cx, cy], i) => (
        <circle key={`s${i}`} cx={cx} cy={cy} r="1" fill="white" />
      ))}

      {/* Abstract geometric alien glyph — top right */}
      <g transform="translate(300, 160)" stroke="white" strokeWidth="0.5" fill="none">
        <polygon points="0,-40 34,20 -34,20" />
        <polygon points="0,-28 24,14 -24,14" />
        <line x1="0" y1="-40" x2="0" y2="20" />
      </g>

      {/* Cross markers */}
      {[[60, 300],[330, 500],[180, 700]].map(([cx, cy], i) => (
        <g key={`c${i}`} transform={`translate(${cx},${cy})`} stroke="white" strokeWidth="0.5">
          <line x1="-8" y1="0" x2="8" y2="0" />
          <line x1="0" y1="-8" x2="0" y2="8" />
        </g>
      ))}

      {/* Angular path — lower left */}
      <path
        d="M 20 750 L 80 680 L 140 720 L 200 660"
        stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="4 4"
      />
    </svg>
  );
}

// ── Mock QR Code SVG ──────────────────────────────────────────────────────────

function MockQR({ size = 156 }: { size?: number }) {
  const cell = size / 21;

  // Deterministic data modules (no Math.random to avoid re-render drift)
  const dataModules = useMemo(() => {
    const modules: [number, number][] = [];
    for (let row = 0; row < 21; row++) {
      for (let col = 0; col < 21; col++) {
        // Skip finder pattern zones (top-left, top-right, bottom-left)
        if (row < 9 && col < 9) continue;
        if (row < 9 && col > 11) continue;
        if (row > 11 && col < 9) continue;
        // Deterministic fill using coordinate hash
        if ((row * 13 + col * 7 + row * col) % 3 !== 0) {
          modules.push([col, row]);
        }
      }
    }
    return modules;
  }, []);

  const renderFinder = (ox: number, oy: number, key: string) => (
    <g key={key} transform={`translate(${ox * cell},${oy * cell})`}>
      <rect width={7 * cell} height={7 * cell} fill="#0b0f19" rx={cell * 0.5} />
      <rect x={cell} y={cell} width={5 * cell} height={5 * cell} fill="white" />
      <rect x={2 * cell} y={2 * cell} width={3 * cell} height={3 * cell} fill="#0b0f19" />
    </g>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Scan QR code to pay"
    >
      <rect width={size} height={size} fill="white" rx={6} />
      {/* Finder patterns */}
      {renderFinder(0, 0, "tl")}
      {renderFinder(14, 0, "tr")}
      {renderFinder(0, 14, "bl")}
      {/* Timing patterns */}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={`tp${i}`}
          x={(8 + i * 2) * cell}
          y={6 * cell}
          width={cell}
          height={cell}
          fill="#0b0f19"
        />
      ))}
      {/* Data modules */}
      {dataModules.map(([col, row]) => (
        <rect
          key={`d${col}-${row}`}
          x={col * cell + 0.5}
          y={row * cell + 0.5}
          width={cell - 1}
          height={cell - 1}
          fill="#0b0f19"
        />
      ))}
    </svg>
  );
}

// ── Evergreen fallback ────────────────────────────────────────────────────────

function EvergreenFallback() {
  const { navigate } = useNavigation();
  return (
    <div className={styles.evergreenRoot}>
      <ScifiBg />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className={styles.evergreenIcon}>
          <Zap size={28} color="#fff" fill="#fff" />
        </div>
        <p style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)", marginBottom: "16px", textTransform: "uppercase" }}>
          Lubbock Creators Hub
        </p>
        <h2 style={{ fontSize: "clamp(1.6rem,8vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "14px" }}>
          The event has ended.
        </h2>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "280px" }}>
          Galacticon 2026 — Thank you for visiting the booth! Check out the full portfolio for custom builds and future collaborations.
        </p>
        <button
          onClick={() => navigate("home")}
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #ef4444 50%, #fbbf24 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "14px 28px",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: "0 auto",
          }}
        >
          View Full Portfolio <ArrowRight size={15} />
        </button>
      </motion.div>
    </div>
  );
}

// ── Main GalacticonPage ───────────────────────────────────────────────────────

export function GalacticonPage() {
  const { navigate } = useNavigation();
  const [isLive] = useState<boolean>(isWithinFestivalWindow);
  const [qrParam, setQrParam] = useState<string>("");
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [cartFlash, setCartFlash] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<Record<string, boolean>>({});

  // Contact form hook
  const { values, status: formStatus, errorMessage, handleChange, handleSubmit, reset } = useContactForm("galacticon-booth");

  // Parse URL params + fire analytics
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qr = params.get("qrcode") ?? "";
    setQrParam(qr);
    track({
      name: "page_view",
      properties: { page: "galacticon", qrcode: qr, festivalLive: isLive },
    });
  }, [isLive]);

  // Cart flash feedback
  const handleAddToCart = (productId: string, productName: string) => {
    setCartItems((p) => [...p, productId]);
    setCartFlash(productName);
    setTimeout(() => setCartFlash(null), 2000);
  };

  if (!isLive) return <EvergreenFallback />;

  return (
    <div className={styles.pageRoot}>
      {/* Sci-fi ambient background */}
      <ScifiBg />

      {/* ── 1. Sticky Nav ───────────────────────────────────────────────── */}
      <nav className={styles.stickyNav}>
        <div className={styles.navLogo}>
          <div className={styles.navLogoBox}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span className={styles.navLogoText}>
            LCH<span style={{ color: "#fbbf24" }}>.</span>
          </span>
        </div>

        <div className={styles.boothBadge}>
          <div className={styles.liveDot} />
          <span className={styles.boothBadgeText}>Booth #404</span>
        </div>

        <button
          onClick={() => navigate("home")}
          style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            padding: "6px 10px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          ← Hub
        </button>
      </nav>

      {/* URL tracker panel */}
      <div className={styles.urlTracker}>
        <div>
          <p className={styles.urlTrackerLabel}>Active Route</p>
          <p className={styles.urlTrackerValue}>
            vercel.app<span style={{ color: "rgba(255,255,255,0.3)" }}>?</span>qrcode=
            <span style={{ color: "#7c3aed" }}>{qrParam || "live-event"}</span>
          </p>
        </div>
        <div className={styles.urlStatusChip}>
          <div className={styles.analyticsPillDot} />
          Active
        </div>
      </div>

      {/* ── 2. Overhead Tax Hook ─────────────────────────────────────────── */}
      <section className={styles.section} style={{ paddingTop: 28 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className={styles.sectionLabel}>
            <div className={styles.liveDot} />
            <span style={{ color: "rgba(255,255,255,0.4)" }}>Vendor POC · Live Demo</span>
          </div>

          <h1 style={{
            fontSize: "clamp(2.2rem, 10vw, 3rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginBottom: "14px",
          }}>
            Kill the{" "}
            <span className={styles.gradientHeadline}>
              Overhead Tax.
            </span>
          </h1>

          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "20px" }}>
            Shopify and Squarespace eat your margins before a single customer walks up.
            A custom <span style={{ color: "#fbbf24", fontWeight: 700 }}>Next.js storefront</span> runs
            for less than a cup of coffee per month — with no platform cut, no feature gates,
            and no 2.9% transaction tax on every sale.
          </p>

          {/* Cost comparison widget */}
          <div className={styles.costGrid}>
            {[
              { platform: "Squarespace", amount: "$276", period: "/year", type: "old" as const },
              { platform: "Shopify", amount: "$468", period: "/year", type: "old" as const },
            ].map((item) => (
              <div key={item.platform} className={`${styles.costCard} ${styles.costCardOld}`}>
                <p className={styles.costPlatform} style={{ color: "rgba(239,68,68,0.7)" }}>
                  {item.platform}
                </p>
                <p className={styles.costAmount} style={{ color: "#ef4444" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500, textDecoration: "line-through", opacity: 0.6 }}>
                    {item.amount}
                  </span>
                </p>
                <p className={styles.costPer}>{item.period} · platform fee</p>
              </div>
            ))}
          </div>

          <div className={styles.costGrid} style={{ marginTop: 10 }}>
            <div className={`${styles.costCard} ${styles.costCardNew}`} style={{ gridColumn: "1 / -1" }}>
              <p className={styles.costPlatform} style={{ color: "#10B981" }}>Custom Next.js Stack</p>
              <p className={styles.costAmount} style={{ color: "#10B981" }}>$36</p>
              <p className={styles.costPer}>/year hosting · you own everything · zero platform cuts</p>
            </div>
          </div>

          <div className={styles.savingsBanner}>
            <div>
              <p className={styles.savingsLabel}>Annual Savings</p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: 2 }}>vs. top platforms</p>
            </div>
            <p className={styles.savingsAmount}>$2,400+ / yr</p>
          </div>
        </motion.div>
      </section>

      <div className={styles.dividerLine} />

      {/* ── 3. Payment Terminal ──────────────────────────────────────────── */}
      <section className={styles.section}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className={styles.sectionLabel}>
            <div className={styles.liveDot} style={{ background: "#7c3aed", boxShadow: "0 0 6px #7c3aed" }} />
            <span style={{ color: "rgba(124,58,237,0.8)" }}>Tableside Terminal</span>
          </div>

          <div className={styles.terminalCard}>
            <div className={styles.qrWrapper}>
              <p className={styles.qrLabel}>⚡ Scan to Skip the Queue</p>
              <div style={{ position: "relative" }}>
                <div className={styles.qrGlow} />
                <div className={styles.qrFrame}>
                  <MockQR size={156} />
                </div>
              </div>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)", textAlign: "center", letterSpacing: "0.04em" }}>
                Booth #404 · Galacticon 2026 · Lubbock Creators Hub
              </p>
            </div>

            <div className={styles.orDivider}>
              <div className={styles.orLine} />
              <span className={styles.orText}>or tap below</span>
              <div className={styles.orLine} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button className={`${styles.payBtn} ${styles.payBtnPrimary}`}>
                🍎 Instantly Pay via Apple Pay
              </button>
              <button className={`${styles.payBtn} ${styles.payBtnSecondary}`}>
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden>
                  <circle cx="14" cy="14" r="14" fill="#3D95CE" />
                  <text x="14" y="19" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">V</text>
                </svg>
                Pay via Venmo / Google Pay
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <div className={styles.dividerLine} />

      {/* ── 4. Product Grid ─────────────────────────────────────────────── */}
      <section className={styles.section}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className={styles.sectionLabel}>
            <div className={styles.liveDot} style={{ background: "#fbbf24", boxShadow: "0 0 6px #fbbf24" }} />
            <span style={{ color: "rgba(251,191,36,0.8)" }}>Live Booth Inventory</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem,6vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            Work That Speaks{" "}
            <span style={{ color: "#fbbf24" }}>for Itself</span>
          </h2>
        </motion.div>

        {/* Swipeable horizontal carousel */}
        <div className={styles.carouselTrack}>
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              className={styles.productCard}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Image with dramatic clip-path */}
              <div className={styles.productImgSlot}>
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.productImg}
                  style={{ clipPath: product.clipPath }}
                />
                {/* Tinted gradient overlay */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  clipPath: product.clipPath,
                  background: `linear-gradient(to bottom, ${product.tint} 0%, transparent 60%)`,
                  pointerEvents: "none",
                }} />
              </div>

              <div className={styles.productBody}>
                <div className={styles.productNameRow}>
                  <p className={styles.productName}>{product.name}</p>
                  <span className={styles.priceToken}>{product.price}</span>
                </div>
                <p className={styles.productSubtitle}>{product.subtitle}</p>

                <div className={styles.chipsRow}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span
                      className={styles.materialChip}
                      style={{
                        background: product.badgeBg,
                        borderColor: product.badgeBorder,
                        color: product.badgeColor,
                      }}
                    >
                      {product.material}
                    </span>
                    <span
                      className={styles.materialChip}
                      style={{
                        background: product.badgeBg,
                        borderColor: product.badgeBorder,
                        color: product.badgeColor,
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(product.id, product.name)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className={styles.carouselHint}>← Swipe to browse · {PRODUCTS.length} items live →</p>

        {/* Cart flash toast */}
        <AnimatePresence>
          {cartFlash && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                marginTop: 16,
                padding: "10px 16px",
                borderRadius: 10,
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.25)",
                color: "#10B981",
                fontSize: 12,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <CheckCircle2 size={14} />
              Added: {cartFlash}
              {cartItems.length > 1 && (
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginLeft: "auto" }}>
                  {cartItems.length} items queued
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className={styles.dividerLine} />

      {/* ── 5. Lead Form ────────────────────────────────────────────────── */}
      <section className={styles.section} style={{ paddingBottom: 100 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className={styles.sectionLabel}>
            <div className={styles.liveDot} style={{ background: "#ef4444", boxShadow: "0 0 6px #ef4444" }} />
            <span style={{ color: "rgba(239,68,68,0.8)" }}>Blueprint Orders</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.4rem,6vw,1.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "20px" }}>
            Commission a{" "}
            <span style={{
              background: "linear-gradient(135deg, #ef4444, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Custom Build
            </span>
          </h2>

          <AnimatePresence mode="wait">
            {formStatus === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={styles.formCard}
              >
                <div className={styles.successPanel}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <CheckCircle2 size={26} color="#10B981" />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc" }}>Transmission received.</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 240 }}>
                    Blueprint order queued. I'll reach out within 24h to scope your commission.
                  </p>
                  <button
                    onClick={reset}
                    style={{
                      marginTop: 8, padding: "8px 20px", background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
                      color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600,
                      cursor: "pointer", letterSpacing: "0.06em",
                    }}
                  >
                    SEND ANOTHER
                  </button>
                </div>
              </motion.div>
            )}

            {formStatus === "offline_queued" && (
              <motion.div
                key="offline"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={styles.formCard}
              >
                <div className={styles.successPanel}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <WifiOff size={26} color="#7c3aed" />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc" }}>Secured offline.</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 260 }}>
                    Venue network dropped — your blueprint is serialized to device storage and will auto-transmit when signal returns.
                  </p>
                  <button onClick={reset} style={{ marginTop: 8, padding: "8px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}>
                    DISMISS
                  </button>
                </div>
              </motion.div>
            )}

            {formStatus === "error" && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.formCard}>
                <div className={styles.successPanel}>
                  <AlertCircle size={28} color="#ef4444" />
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#f8fafc" }}>Transmission failed.</p>
                  {errorMessage && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{errorMessage}</p>}
                  <button onClick={reset} style={{ padding: "8px 20px", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}>
                    RETRY
                  </button>
                </div>
              </motion.div>
            )}

            {(formStatus === "idle" || formStatus === "submitting") && (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
              >
                <div className={styles.formCard}>
                  <div className={styles.formHeader}>
                    <span className={styles.formHeaderLabel}>Blueprint Commission Form</span>
                    <span className={styles.formHeaderId}>#GAL-2026</span>
                  </div>

                  <div className={styles.formFields}>
                    {/* Name */}
                    <div className={styles.fieldGroup}>
                      <input
                        type="text"
                        placeholder="Name"
                        className={styles.fieldInput}
                        value={values.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        required
                        disabled={formStatus === "submitting"}
                      />
                      <label className={styles.fieldLabel}>Your Name</label>
                    </div>

                    {/* Email */}
                    <div className={styles.fieldGroup}>
                      <input
                        type="email"
                        placeholder="Email"
                        className={styles.fieldInput}
                        value={values.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        disabled={formStatus === "submitting"}
                      />
                      <label className={styles.fieldLabel}>Email Address</label>
                    </div>

                    {/* Blueprint ideas */}
                    <div className={styles.fieldGroup}>
                      <textarea
                        placeholder="Ideas"
                        className={styles.fieldTextarea}
                        rows={3}
                        value={values.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        required
                        disabled={formStatus === "submitting"}
                      />
                      <label className={styles.fieldLabel}>Blueprint Proposal Ideas</label>
                    </div>

                    {/* Offline notice */}
                    <div className={styles.offlineNotice}>
                      <Wifi size={12} />
                      <span>
                        Form data securely queued offline if venue network drops
                      </span>
                    </div>
                  </div>

                  <div className={styles.formDivider} />

                  <div className={styles.transmitBtnWrapper}>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={styles.transmitBtn}
                    >
                      <Send size={14} />
                      {formStatus === "submitting" ? "Transmitting…" : "Transmit Blueprint Order"}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Fixed: Analytics pill ────────────────────────────────────────── */}
      <div className={styles.analyticsPill} role="status" aria-label="Analytics status">
        <div className={styles.analyticsPillDot} />
        <span className={styles.analyticsPillText}>
          Vercel Event Captured: &lsquo;{qrParam || "live-event"}&rsquo;
        </span>
      </div>
    </div>
  );
}
