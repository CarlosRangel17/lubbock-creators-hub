import { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { NavigationProvider, useNavigation } from "./components/NavigationContext";
import { AuthProvider } from "./components/auth/AuthContext";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { GalacticonPage } from "./components/GalacticonPage";
import GalacticonFlyerPOC from "./components/Galacticon"
import { Footer } from "./components/Footer";
import { useOfflineQueue } from "./hooks/useOfflineQueue";
import { registerServiceWorker } from "./lib/serviceWorkerRegistration";
import { trackPageView } from "./services/analyticsService";

// ── Festival window (mirrors GalacticonPage constants) ───────────────────────
const FESTIVAL_START = new Date("2026-06-01T00:00:00").getTime();
const FESTIVAL_END   = new Date("2026-07-07T23:59:59").getTime();

function AppContent() {
  const { page, navigate } = useNavigation();

  // Mount offline queue flush handler at app root
  useOfflineQueue();

  // Register service worker once on mount
  useEffect(() => {
    registerServiceWorker().catch(() => {});
  }, []);

  // URL parameter detection — ?qrcode=live-event auto-routes to Galacticon
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("qrcode") === "live-event") {
      const now = Date.now();
      if (now >= FESTIVAL_START && now <= FESTIVAL_END) {
        navigate("galacticon");
      }
      // Outside festival window → stay on home (evergreen fallback inside GalacticonPage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  // Track page views on navigation
  useEffect(() => {
    trackPageView(page);
  }, [page]);

  // Galacticon page manages its own full-screen layout + nav
  if (page === "galacticon") {
    return <GalacticonPage />;
  }

  return (
    <div
      style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", overflowX: "hidden" }}
    >
      <Navbar />
      <main>
        {page === "home" ? <HomePage /> : page === "galacticon" ?  <GalacticonFlyerPOC /> : <AboutPage />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NavigationProvider>
    </ThemeProvider>
  );
}
