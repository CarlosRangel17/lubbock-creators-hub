import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext"; // Anchored to your structural layout

// 1. Core Accent Key Definition Mapped Exactly to your Style System
type AccentKey = "amber" | "blue" | "purple" | "green" | "pink" | "cyan";

interface FestivalProject {
  id: string;
  title: string;
  category: string;
  accentKey: AccentKey;
  badges: string[];
}

export default function GalacticonFlyerPOC() {
  // Token system integration matched to your code view
  const { tokens } = useTheme(); 
  const isLight = tokens.mode === "light";

  // Navigation & Gesture Engine States
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Form Queue Mechanics showing offline fail-safe architecture
  const [formData, setFormData] = useState({ name: "", email: "", pitch: "" });
  const [formQueued, setFormQueued] = useState(false);

  // Multi-Color Token Map tracking your precise static vs dark lookup matrices
  const staticAccents: Record<AccentKey, { color: string; bg: string; border: string }> = {
    amber:  { color: "#d97706", bg: "rgba(217,119,6,0.09)",   border: "rgba(217,119,6,0.22)" },
    blue:   { color: "#ef4444", bg: "rgba(239,68,68,0.09)",   border: "rgba(239,68,68,0.22)" }, 
    purple: { color: "#7c3aed", bg: "rgba(124,58,237,0.09)",  border: "rgba(124,58,237,0.22)" },
    green:  { color: "#15803d", bg: "rgba(21,128,61,0.09)",   border: "rgba(21,128,61,0.22)" },
    pink:   { color: "#db2777", bg: "rgba(219,39,119,0.09)",  border: "rgba(219,39,119,0.22)" },
    cyan:   { color: "#0891b2", bg: "rgba(8,145,178,0.09)",   border: "rgba(8,145,178,0.22)" },
  };

  const darkAccents: Record<AccentKey, { color: string; bg: string; border: string }> = {
    amber:  { color: "#fbbf24", bg: "rgba(251,191,36,0.1)",   border: "rgba(251,191,36,0.25)" },
    blue:   { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.3)" },
    purple: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
    green:  { color: "#4ade80", bg: "rgba(74,222,128,0.1)",   border: "rgba(74,222,128,0.25)" },
    pink:   { color: "#f472b6", bg: "rgba(244,114,182,0.1)",  border: "rgba(244,114,182,0.25)" },
    cyan:   { color: "#22d3ee", bg: "rgba(34,211,238,0.1)",   border: "rgba(34,211,238,0.25)" },
  };

  const accents = isLight ? staticAccents : darkAccents;

  const festivalProjects: FestivalProject[] = [
    { id: "p1", title: "Cosmic Keychains Co.", category: "Artisan Maker", accentKey: "amber", badges: ["3D Print", "NFC Tag", "0 Platform Fee"] },
    { id: "p2", title: "Starfighter Smokehouse", category: "Food Truck", accentKey: "blue", badges: ["Offline Engine", "No Cellular Req", "NextJS PWA"] },
    { id: "p3", title: "The Quantize Quintet", category: "Live Musician", accentKey: "purple", badges: ["Mesh Protocol", "Instant Tipping", "Direct Sales"] },
  ];

  // 2. Kinetic Thumb Navigation Logic (Matched directly to your file setup)
  const goTo = (i: number) => setActiveIndex(Math.max(0, Math.min(festivalProjects.length - 1, i)));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(activeIndex + 1) : goTo(activeIndex - 1);
    }
    touchStartX.current = null;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormQueued(true);
    setTimeout(() => {
      setFormQueued(false);
      setFormData({ name: "", email: "", pitch: "" });
      alert("Vendor Lead compiled safely into background sync index loop!");
    }, 1200);
  };

  const currentProject = festivalProjects[activeIndex];
  const activeAccent = accents[currentProject.accentKey];

    return (
    <div 
      style={{ background: tokens.canvasBg, color: tokens.textPrimary, transition: "background 0.35s ease" }}
      className="relative min-h-screen overflow-x-hidden font-sans"
    >
      {/* Absolute Dynamic Neon Ambient Backdrop Glow Vector */}
      <div 
        className="absolute top-0 right-0 pointer-events-none transition-all duration-500"
        style={{
          width: "320px",
          height: "320px",
          background: `radial-gradient(ellipse at top right, ${activeAccent.color}22, transparent 65%)`,
          filter: "blur(60px)",
        }}
      />

      {/* 1. STICKY TOP-BAR HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: tokens.accentBlueBorder }}>
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="text-xs font-black tracking-wider px-2 py-1 rounded text-black" style={{ background: "linear-gradient(135deg, #ef4444, #fbbf24)" }}>
              LCH
            </div>
            <span className="text-xs font-bold font-mono">Lubbock Creators Hub</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-tight bg-slate-900/40 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              BOOTH #404
            </div>
          </div>
        </div>
      </header>

      {/* MAIN MOBILE CONTAINER VIEWPORT */}
      <main className="max-w-md mx-auto px-4 pt-6 pb-16">
        
        {/* 2. THE CONVENTION HEADLINE HOOK (Fixed unclosed tags) */}
        <section className="mb-8">
          <div className="inline-block text-[10px] font-extrabold tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded mb-2">
            CONVENTION SERVICE POC
          </div>
          <h1 className="text-3xl font-black tracking-tight leading-none mb-3">
            Kill The Monthly <br />
            <span style={{ background: "linear-gradient(135deg, #ef4444 0%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Website Tax.
            </span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: tokens.textSecondary }}>
            Stop leaking festival margins into subscription overhead. We craft standalone alternative 
            platforms designed to capture sales offline—even when cell towers drop inside the hall.
          </p>
        </section>

        {/* 3. INTERACTIVE POC TERMINAL LAYER */}
        <section className="mb-8">
          <div className="rounded-2xl border overflow-hidden bg-slate-900/90 shadow-2xl" style={{ borderColor: tokens.cardBorder }}>
            <div className="bg-slate-800/60 px-3 py-2 flex items-center gap-1.5 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono ml-auto opacity-40">MOCK_TRANSACT_LAYER</span>
            </div>

            <div className="p-4 text-center">
              <p className="text-xs text-slate-300 mb-4 font-sans">
                Scan or hit targets below to verify high-speed, local data transaction handling:
              </p>

              {/* Ultra High Contrast Anti-Glare Target Container */}
              <div className="relative w-32 h-32 mx-auto bg-white p-2 rounded-xl mb-4 shadow-xl">
                <div className="w-full h-full bg-black relative">
                  <div className="absolute top-0 left-0 w-8 h-8 bg-white border-4 border-black" />
                  <div className="absolute top-0 right-0 w-8 h-8 bg-white border-4 border-black" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-white border-4 border-black" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-4 border-black" />
                </div>
                <div className="absolute left-0 w-full h-0.5 bg-rose-500 shadow-md shadow-rose-500 animate-bounce top-4" />
              </div>

              <div className="flex flex-col gap-2">
                <button type="button" className="w-full py-3 bg-white text-black font-bold text-sm rounded-lg active:scale-95 transition-transform">
                  ⚡ Instantly Pay via Apple Pay
                </button>
                <button type="button" className="w-full py-3 bg-blue-500 text-white font-bold text-sm rounded-lg active:scale-95 transition-transform">
                  💸 Pay via Venmo Checkout
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE FRAMER-MOTION KINETIC GESTURE SLIDER CONTAINER */}
        <section className="mb-8">
          <div className="flex justify-between items-baseline mb-3">
            <h2 className="text-sm font-extrabold tracking-wide uppercase">Work That Speaks For Itself</h2>
            <span className="text-[10px] opacity-40 font-bold uppercase tracking-wider">
              Swipe Thumb ({activeIndex + 1}/{festivalProjects.length})
            </span>
          </div>

          <div 
            onTouchStart={handleTouchStart} 
            onTouchEnd={handleTouchEnd}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -35 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="rounded-2xl p-5 border backdrop-blur-sm"
                style={{
                  background: tokens.cardBg,
                  borderColor: activeAccent.border,
                  boxShadow: `0 8px 30px ${activeAccent.color}14`
                }}
              >
                <div className="flex flex-col min-h-[130px]">
                  <span 
                    className="text-[10px] font-bold tracking-widest uppercase mb-1" 
                    style={{ color: activeAccent.color }}
                  >
                    {currentProject.category}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight mb-4">{currentProject.title}</h3>
                  
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {currentProject.badges.map((badge, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-bold px-2 py-0.5 rounded border" 
                        style={{ 
                          color: activeAccent.color, 
                          backgroundColor: activeAccent.bg, 
                          borderColor: activeAccent.border 
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          </section>
      
              {/* 5. OFFLINE-RESILIENT PIPELINE LEAD CAPTURE FORM */}
        <section>
          <div className="rounded-2xl p-5 border" style={{ background: tokens.cardBg, borderColor: tokens.cardBorder }}>
            <h3 className="text-lg font-black tracking-tight mb-1">Secure a Custom Blueprint</h3>
            <p className="text-[11px] opacity-50 leading-tight mb-5">
              Lost cell coverage? Submit anyway. Data pipelines auto-cache to local system memory blocks.
            </p>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <div className="relative border-b border-slate-700 focus-within:border-blue-500 py-1">
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-transparent outline-none text-sm pt-4 pb-1 peer"
                />
                <label className="absolute left-0 top-3 text-xs text-slate-500 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-blue-400 transition-all">
                  Vendor Business / Name
                </label>
              </div>

              <div className="relative border-b border-slate-700 focus-within:border-blue-500 py-1">
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent outline-none text-sm pt-4 pb-1 peer"
                />
                <label className="absolute left-0 top-3 text-xs text-slate-500 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-blue-400 transition-all">
                  Email Contact Address
                </label>
              </div>

              <div className="relative border-b border-slate-700 focus-within:border-blue-500 py-1">
                <textarea 
                  required 
                  rows={2}
                  value={formData.pitch}
                  onChange={(e) => setFormData({...formData, pitch: e.target.value})}
                  className="w-full bg-transparent outline-none text-sm pt-4 pb-1 peer resize-none"
                />
                <label className="absolute left-0 top-3 text-xs text-slate-500 peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-blue-400 transition-all">
                  Your Booth Focus / Pitch Idea
                </label>
              </div>

              <button 
                type="submit" 
                disabled={formQueued}
                className="w-full mt-2 py-3 text-sm font-extrabold rounded-lg text-black bg-gradient-to-r from-red-500 to-amber-500 shadow-lg active:scale-98 transition-transform disabled:opacity-50"
              >
                {formQueued ? "Staging Database Cache Layer..." : "Queue Blueprint Offline"}
              </button>
            </form>
          </div>
        </section>

      </main>
    </div>
  );
}
