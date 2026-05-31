import { createContext, useContext, useState, useCallback } from "react";

export type PageName = "home" | "about";

interface NavigationContextValue {
  page: PageName;
  navigate: (to: PageName, anchor?: string) => void;
}

const NavigationContext = createContext<NavigationContextValue>({
  page: "home",
  navigate: () => {},
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<PageName>("home");

  const navigate = useCallback((to: PageName, anchor?: string) => {
    setPage(to);
    if (anchor && to === "home") {
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <NavigationContext.Provider value={{ page, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
