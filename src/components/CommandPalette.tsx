"use client";

import React, { useState, useEffect } from "react";
import { Search, Code2, Briefcase, Layers, Mail, Sun, Moon, Globe, Download, Copy } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "fr" | "en";
  setLang: (lang: "fr" | "en") => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  onCopy: (text: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  theme,
  setTheme,
  onCopy,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (selector: string) => {
    onClose();
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: lang === "fr" ? "Projets" : "Projects", key: "P", target: "#projets", icon: <Code2 size={14} /> },
    { label: lang === "fr" ? "Expérience" : "Experience", key: "E", target: "#experience", icon: <Briefcase size={14} /> },
    { label: "Stack", key: "S", target: "#stack", icon: <Layers size={14} /> },
    { label: "Contact", key: "C", target: "#contact", icon: <Mail size={14} /> },
  ];

  const actionItems = [
    {
      label: `${lang === "fr" ? "Copier le courriel" : "Copy email"} (${PORTFOLIO_DATA.profile.email})`,
      action: () => onCopy(PORTFOLIO_DATA.profile.email),
      icon: <Copy size={14} />,
    },
    {
      label: lang === "fr" ? "Télécharger le CV" : "Download Resume (CV)",
      action: () => {
        const a = document.createElement("a");
        a.href = "/cv-mahamoud-diabate.pdf";
        a.download = "cv-mahamoud-diabate.pdf";
        a.click();
      },
      icon: <Download size={14} />,
    },
    {
      label: `${lang === "fr" ? "Basculer le thème" : "Toggle theme"} (${theme === "dark" ? "Light" : "Dark"})`,
      action: () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("portfolio_theme", nextTheme);
      },
      key: "T",
      icon: theme === "dark" ? <Sun size={14} /> : <Moon size={14} />,
    },
    {
      label: `${lang === "fr" ? "Changer de langue" : "Toggle language"} (${lang === "fr" ? "English" : "Français"})`,
      action: () => {
        const nextLang = lang === "fr" ? "en" : "fr";
        setLang(nextLang);
        localStorage.setItem("portfolio_lang", nextLang);
      },
      key: "L",
      icon: <Globe size={14} />,
    },
  ];

  const filteredNav = navItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredActions = actionItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 pt-[15vh] backdrop-blur-sm p-4 animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line-strong bg-background shadow-2xl animate-in zoom-in-95"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "fr"
                ? "Rechercher une section, commande..."
                : "Search sections, actions..."
            }
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 scrollbar-thin">
          {filteredNav.length > 0 && (
            <div className="mb-2">
              <div className="px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                Navigation
              </div>
              {filteredNav.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => navigateTo(item.target)}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-xs text-foreground transition hover:bg-surface"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <kbd className="font-mono text-[10px] text-muted-foreground">{item.key}</kbd>
                </button>
              ))}
            </div>
          )}

          {filteredActions.length > 0 && (
            <div>
              <div className="px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                Actions
              </div>
              {filteredActions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-xs text-foreground transition hover:bg-surface"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-muted-foreground">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.key && <kbd className="font-mono text-[10px] text-muted-foreground">{item.key}</kbd>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
