import { ThemeProvider } from "./components/ThemeContext";
import { NavigationProvider, useNavigation } from "./components/NavigationContext";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { Footer } from "./components/Footer";

function AppContent() {
  const { page } = useNavigation();
  return (
    <div style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif", overflowX: "hidden" }}>
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
        <AppContent />
      </NavigationProvider>
    </ThemeProvider>
  );
}
