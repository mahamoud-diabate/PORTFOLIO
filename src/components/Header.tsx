"use client";

import React, { useState } from "react";
import { Search, Sun, Moon } from "lucide-react";
import { usePreferences } from "@/lib/preferences";

const NAV_ITEMS = [
  { href: "#projets", label: { fr: "Projets", en: "Projects" } },
  { href: "#experience", label: { fr: "Expérience", en: "Experience" } },
  { href: "#stack", label: { fr: "Stack", en: "Stack" } },
  { href: "#formation", label: { fr: "Formation", en: "Education" } },
  { href: "#contact", label: { fr: "Contact", en: "Contact" } },
] as const;

export const Header: React.FC = () => {
  const { lang, theme, toggleLang, toggleTheme, openPalette } = usePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-line bg-background/85 px-4 backdrop-blur-md">
      <a
        href="#top"
        className="flex items-center gap-2.5 text-sm font-semibold tracking-tight transition-opacity hover:opacity-85"
      >
        <span className="flex size-7 items-center justify-center rounded-md border border-line-strong bg-surface font-mono text-xs font-bold text-foreground shadow-sm">
          MD
        </span>
        <span>Mahamoud Diabate</span>
      </a>

      <nav
        className={
          mobileMenuOpen
            ? "absolute left-0 right-0 top-14 flex flex-col gap-2 border-b border-line bg-background p-4"
            : "hidden items-center gap-1 md:flex"
        }
        aria-label="Navigation"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-surface hover:text-foreground"
          >
            {item.label[lang]}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-1.5">
        <button
          onClick={openPalette}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-muted-foreground transition hover:border-line-strong hover:bg-surface-hover hover:text-foreground"
          aria-label={lang === "fr" ? "Ouvrir la palette de commandes" : "Open command menu"}
        >
          <Search size={12} />
          <span className="hidden sm:inline">{lang === "fr" ? "Recherche" : "Search"}</span>
          <kbd className="rounded border border-line bg-background px-1 py-0.5 font-mono text-[10px] text-faint">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={toggleLang}
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface font-mono text-xs font-semibold text-muted-foreground transition hover:border-line-strong hover:bg-surface-hover hover:text-foreground"
          aria-label={lang === "fr" ? "Passer en anglais" : "Switch to French"}
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>

        <button
          onClick={toggleTheme}
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface text-muted-foreground transition hover:border-line-strong hover:bg-surface-hover hover:text-foreground"
          aria-label={
            theme === "dark"
              ? lang === "fr"
                ? "Passer au thème clair"
                : "Switch to light theme"
              : lang === "fr"
                ? "Passer au thème sombre"
                : "Switch to dark theme"
          }
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="flex size-8 flex-col items-center justify-center gap-1 text-foreground md:hidden"
          aria-label={lang === "fr" ? "Ouvrir le menu" : "Toggle mobile menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`block h-[1.5px] w-4 bg-current transition ${
              mobileMenuOpen ? "translate-y-1 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-current transition ${
              mobileMenuOpen ? "-translate-y-0.5 -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
};
