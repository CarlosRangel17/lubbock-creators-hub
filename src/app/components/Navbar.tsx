import { useState, useEffect } from "react";
import { Menu, X, Zap, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeContext";
import { useNavigation } from "./NavigationContext";

const homeLinks = [
  { label: "Local", anchor: "#local" },
  { label: "Projects", anchor: "#projects" },
  { label: "Contact", anchor: "#contact" },
];

export function Navbar() {
  const { tokens, toggle } = useTheme();
  const { page, navigate } = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (anchor: string) => {
    setMenuOpen(false);
    if (page === "home") {
      const el = document.querySelector(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("home", anchor);
    }
  };

  const handleAboutClick = () => {
    setMenuOpen(false);
    navigate("about");
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (page === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("home");
    }
  };

  const isLight = tokens.mode === "light";

  const allNavItems = [
    ...homeLinks.map((l) => ({ label: l.label, onClick: () => handleAnchorClick(l.anchor), isRoute: false })),
    { label: "My Story", onClick: handleAboutClick, isRoute: true },
  ];

  return (
    <>
      <nav
        style={{
          background: scrolled ? tokens.navBg : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? `1px solid ${tokens.navBorder}` : "1px solid transparent",
          transition: "all 0.3s ease",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2"
          >
            <div
              style={{
                background: "linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)",
                borderRadius: "9px",
                padding: "7px",
                boxShadow: `0 0 18px rgba(239,68,68,0.3)`,
              }}
              className="flex items-center justify-center"
            >
              <Zap size={15} color="#fff" fill="#fff" />
            </div>
            <span
              style={{ color: tokens.headingColor, letterSpacing: "-0.02em", fontWeight: 800 }}
              className="text-base"
            >
              CR<span style={{ color: tokens.accentBlue }}>.</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {homeLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleAnchorClick(link.anchor)}
                style={{ color: tokens.navText, fontSize: "14px", letterSpacing: "0.01em" }}
                className="hover:opacity-80 transition-opacity font-medium"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={handleAboutClick}
              style={{
                color: page === "about" ? tokens.accentBlue : tokens.navText,
                fontSize: "14px",
                letterSpacing: "0.01em",
                fontWeight: page === "about" ? 700 : 500,
              }}
              className="hover:opacity-80 transition-opacity"
            >
              My Story
            </button>
            <button
              onClick={() => handleAnchorClick("#contact")}
              style={{
                background: tokens.btnPrimary,
                color: "#fff",
                borderRadius: "9px",
                padding: "8px 16px",
                fontSize: "13px",
              }}
              className="font-semibold hover:opacity-90 transition-opacity"
            >
              Hire Me
            </button>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.88 }}
              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all"
              style={{
                background: isLight ? "#f1f5f9" : "rgba(255,255,255,0.07)",
                border: `1px solid ${isLight ? "#e2e8f0" : "rgba(255,255,255,0.12)"}`,
                color: isLight ? "#d97706" : "#fbbf24",
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLight ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Sun size={16} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Moon size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all"
              style={{
                background: menuOpen ? tokens.accentBlueBg : isLight ? "#f1f5f9" : "rgba(255,255,255,0.07)",
                border: `1px solid ${menuOpen ? tokens.accentBlueBorder : isLight ? "#e2e8f0" : "rgba(255,255,255,0.1)"}`,
                color: tokens.headingColor,
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={17} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: isLight ? "rgba(15,23,42,0.35)" : "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{
                background: tokens.cardBg,
                borderLeft: `1px solid ${tokens.cardBorder}`,
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: isLight ? "-8px 0 32px rgba(15,23,42,0.1)" : "-8px 0 32px rgba(0,0,0,0.4)",
              }}
            >
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: `1px solid ${tokens.divider}` }}
              >
                <span style={{ color: tokens.headingColor, letterSpacing: "-0.02em", fontWeight: 800 }} className="text-base">
                  Carlos Rangel<span style={{ color: tokens.accentBlue }}>.</span>
                </span>
                <button onClick={() => setMenuOpen(false)} style={{ color: tokens.mutedColor }}>
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-1 px-4 pt-6 flex-1">
                {allNavItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={item.onClick}
                    className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative overflow-hidden text-left w-full"
                    style={{ color: tokens.bodyColor, fontSize: "15px" }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ background: tokens.accentBlueBg, opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span
                      className="relative z-10 transition-colors group-hover:text-[#ef4444]"
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.05em",
                        color: tokens.subtleColor,
                        minWidth: "24px",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`relative z-10 transition-colors group-hover:text-[#ef4444] ${item.isRoute ? "font-semibold" : ""}`}>
                      {item.label}
                    </span>
                    {item.isRoute && (
                      <span
                        className="relative z-10 ml-auto"
                        style={{
                          fontSize: "9px",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          color: tokens.accentAmber,
                          border: `1px solid ${tokens.accentAmberBorder}`,
                          borderRadius: "4px",
                          padding: "2px 6px",
                        }}
                      >
                        PAGE
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="px-6 pb-8">
                <button
                  onClick={() => handleAnchorClick("#contact")}
                  className="block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{
                    background: tokens.btnPrimary,
                    color: "#fff",
                    boxShadow: `0 4px 20px ${tokens.btnPrimaryGlow}`,
                  }}
                >
                  Let's Work Together
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
