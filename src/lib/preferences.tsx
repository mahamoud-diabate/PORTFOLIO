"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PORTFOLIO_DATA, type Lang } from "@/data/portfolio-data";

export type Theme = "dark" | "light";

const LANG_KEY = "portfolio_lang";
const THEME_KEY = "portfolio_theme";
const TOAST_DURATION = 2500;

interface PreferencesValue {
  lang: Lang;
  theme: Theme;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  paletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  toast: string | null;
  copyEmail: () => void;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

/**
 * Source unique de vérité pour la langue, le thème, la palette de commandes et
 * le toast. Évite que chaque composant redéfinisse la même logique de bascule
 * (état React + attribut data-theme + localStorage).
 */
export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>("fr");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reprise des préférences : langue enregistrée sinon langue du navigateur ;
  // le thème a déjà été résolu par le script d'amorçage du layout.
  useEffect(() => {
    const savedLang = localStorage.getItem(LANG_KEY);
    if (savedLang === "en" || savedLang === "fr") {
      setLangState(savedLang);
    } else if ((navigator.language || "").toLowerCase().startsWith("en")) {
      setLangState("en");
    }

    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "light" || applied === "dark") {
      setThemeState(applied);
    }
  }, []);

  // L'attribut lang du document suit la langue affichée (lecteurs d'écran,
  // moteurs de recherche, césure typographique).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(LANG_KEY, next);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(THEME_KEY, next);
  }, []);

  const toggleLang = useCallback(
    () => setLang(lang === "fr" ? "en" : "fr"),
    [lang, setLang]
  );

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), TOAST_DURATION);
  }, []);

  const copyEmail = useCallback(() => {
    if (!navigator.clipboard?.writeText) return;
    navigator.clipboard
      .writeText(PORTFOLIO_DATA.profile.email)
      .then(() =>
        showToast(
          lang === "fr" ? "Adresse courriel copiée !" : "Email address copied!"
        )
      )
      .catch(() => {
        /* le presse-papiers peut être refusé : on n'affiche rien */
      });
  }, [lang, showToast]);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const value = useMemo<PreferencesValue>(
    () => ({
      lang,
      theme,
      setLang,
      setTheme,
      toggleLang,
      toggleTheme,
      paletteOpen,
      openPalette,
      closePalette,
      toast,
      copyEmail,
    }),
    [
      lang,
      theme,
      setLang,
      setTheme,
      toggleLang,
      toggleTheme,
      paletteOpen,
      openPalette,
      closePalette,
      toast,
      copyEmail,
    ]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesValue => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences doit être utilisé dans un PreferencesProvider");
  }
  return ctx;
};
