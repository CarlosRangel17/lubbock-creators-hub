import { useEffect } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import { NavigationProvider, useNavigation } from "./components/NavigationContext";
import { AuthProvider } from "./components/auth/AuthContext";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { Footer } from "./components/Footer";
import { useOfflineQueue } from "./hooks/useOfflineQueue";
import { registerServiceWorker } from "./lib/serviceWorkerRegistration";
import { trackPageView } from "./services/analyticsService";

function AppContent() {
  const { page } = useNavigation();

  // Mount offline queue flush handler at app root
  useOfflineQueue();

  // Register service worker once on mount
  useEffect(() => {
    registerServiceWorker().catch(() => {});
  }, []);

  // Track page views on navigation
  useEffect(() => {
    trackPageView(page);
  }, [page]);

  return (
    <div
      style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", overflowX: "hidden" }}
    >
      <Navbar />
      <main>
        {page === "home" ? <HomePage /> : <AboutPage />}
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
