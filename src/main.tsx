
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { registerServiceWorker } from "./app/lib/serviceWorkerRegistration.ts";
  import "./styles/index.css";

// Register the PWA service worker background layer
registerServiceWorker()
  .then(() => console.log("Lubbock Hub PWA layer active"))
  .catch((err) => console.error("PWA registration offline", err));

createRoot(document.getElementById("root")!).render(<App />);
