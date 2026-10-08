"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Language = "en" | "ar";
type SiteContextValue = { language: Language; setLanguage: (value: Language) => void; dark: boolean; setDark: (value: boolean) => void };
const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProviders({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [dark, setDark] = useState(false);
  const themeInitialized = useRef(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage === "ar") setLanguage("ar");
    const refCode = new URLSearchParams(window.location.search).get("ref");
    if (refCode) localStorage.setItem("refCode", refCode);
    const savedRef = localStorage.getItem("refCode");
    if (savedRef && !sessionStorage.getItem("visitorCounted")) {
      void fetch("https://forixa-backend.vercel.app/api/auth/visitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refCode: savedRef })
      }).catch(() => undefined);
      sessionStorage.setItem("visitorCounted", "true");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    if (!themeInitialized.current) {
      themeInitialized.current = true;
      const initialTheme = localStorage.getItem("theme");
      const initialDark = initialTheme === "dark";
      document.documentElement.dataset.theme = initialDark ? "dark" : "light";
      if (initialTheme === null) localStorage.setItem("theme", "light");
      if (initialDark !== dark) setDark(initialDark);
      return;
    }

    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return <SiteContext.Provider value={{ language, setLanguage, dark, setDark }}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used inside SiteProviders");
  return value;
}
