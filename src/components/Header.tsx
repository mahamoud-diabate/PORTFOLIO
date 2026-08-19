"use client";

import React, { useState } from "react";
import { Search, Sun, Moon } from "lucide-react";

interface HeaderProps {
  lang: "fr" | "en";
  setLang: (lang: "fr" | "en") => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  openCmd: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  theme,
  setTheme,
  openCmd,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
  };

  const toggleLang = () => {
    const nextLang = lang === "fr" ? "en" : "fr";
    setLang(nextLang);
    localStorage.setItem("portfolio_lang", nextLang);
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-line bg-background/85 px-4 backdrop-blur-md">
      <a href="#top" className="flex items-center gap-2.5 font-semibold text-sm tracking-tight hover:opacity-85 transition-opacity">
        <span className="flex size-7 items-center justify-center rounded-md border border-line-strong bg-surface font-mono text-xs font-bold text-foreground shadow-sm">
          MD
        </span>
        <span>Mahamoud Diabate</span>
      </a>

      <nav
        className={`nav-links ${
          mobileMenuOpen
            ? "!flex absolute top-14 left-0 right-0 flex-col bg-background p-4 border-b border-line gap-2"
            : "hidden md:flex items-center gap-1"
        }`}
        aria-label="Navigation"
      >
        <a href="#projets" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-surface hover:text-foreground">
          {lang === "fr" ? "Projets" : "Projects"}
        </a>
        <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-surface hover:text-foreground">
          {lang === "fr" ? "Expérience" : "Experience"}
        </a>
        <a href="#stack" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-surface hover:text-foreground">
          Stack
        </a>
        <a href="#formation" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-surface hover:text-foreground">
          {lang === "fr" ? "Formation" : "Education"}
        </a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-surface hover:text-foreground">
          Contact
        </a>
      </nav>

      <div className="flex items-center gap-1.5">
        <button
          onClick={openCmd}
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 text-xs text-muted-foreground transition hover:bg-surface-hover hover:text-foreground hover:border-line-strong"
          aria-label="Open command menu"
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
          className="inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface font-mono text-xs font-semibold text-muted-foreground transition hover:bg-surface-hover hover:text-foreground hover:border-line-strong"
          aria-label="Toggle language"
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>

        <button
          onClick={toggleTheme}
          type="button"
          className="inline-flex size-8 items-center justify-center rounded-md border border-line bg-surface text-muted-foreground transition hover:bg-surface-hover hover:text-foreground hover:border-line-strong"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="flex size-8 md:hidden flex-col items-center justify-center gap-1 text-foreground"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`block h-[1.5px] w-4 bg-current transition ${mobileMenuOpen ? "rotate-45 translate-y-1" : ""}`} />
          <span className={`block h-[1.5px] w-4 bg-current transition ${mobileMenuOpen ? "-rotate-45 -translate-y-0.5" : ""}`} />
        </button>
      </div>
    </header>
  );
};
