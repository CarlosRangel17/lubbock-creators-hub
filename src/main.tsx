
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
import { inject as injectAnalytics } from '@vercel/analytics'; 
import { injectSpeedInsights } from '@vercel/speed-insights'; 
  import { registerServiceWorker } from "./app/lib/serviceWorkerRegistration.ts";

// 1. Initialize custom event metrics and user telemetry pipelines
injectAnalytics();

// 2. Initialize Core Web Vitals monitoring and performance analytics
injectSpeedInsights();

// Register the PWA service worker background layer
registerServiceWorker()
  .then(() => console.log("Lubbock Hub PWA layer active"))
  .catch((err) => console.error("PWA registration offline", err));

createRoot(document.getElementById("root")!).render(<App />);
