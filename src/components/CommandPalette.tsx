"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Code2,
  Briefcase,
  Layers,
  Mail,
  Sun,
  Moon,
  Globe,
  Download,
  Copy,
  CornerDownLeft,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePreferences } from "@/lib/preferences";

interface Command {
  id: string;
  group: "nav" | "action";
  label: string;
  icon: React.ReactNode;
  run: () => void;
}

export const CommandPalette: React.FC = () => {
  const {
    lang,
    theme,
    toggleLang,
    toggleTheme,
    paletteOpen,
    openPalette,
    closePalette,
    copyEmail,
  } = usePreferences();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const scrollToSection = useCallback((selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commands = useMemo<Command[]>(() => {
    const nav: Command[] = [
      { id: "projects", target: "#projets", label: lang === "fr" ? "Projets" : "Projects", icon: <Code2 size={14} /> },
      { id: "experience", target: "#experience", label: lang === "fr" ? "Expérience" : "Experience", icon: <Briefcase size={14} /> },
      { id: "stack", target: "#stack", label: "Stack", icon: <Layers size={14} /> },
      { id: "contact", target: "#contact", label: "Contact", icon: <Mail size={14} /> },
    ].map(({ id, target, label, icon }) => ({
      id,
      group: "nav" as const,
      label,
      icon,
      run: () => scrollToSection(target),
    }));

    const actions: Command[] = [
      {
        id: "copy-email",
        group: "action",
        label: `${lang === "fr" ? "Copier le courriel" : "Copy email"} (${PORTFOLIO_DATA.profile.email})`,
        icon: <Copy size={14} />,
        run: copyEmail,
      },
      {
        id: "download-cv",
        group: "action",
        label: lang === "fr" ? "Télécharger le CV" : "Download resume (CV)",
        icon: <Download size={14} />,
        run: () => {
          const a = document.createElement("a");
          a.href = "/cv-mahamoud-diabate.pdf";
          a.download = "cv-mahamoud-diabate.pdf";
          a.click();
        },
      },
      {
        id: "toggle-theme",
        group: "action",
        label: `${lang === "fr" ? "Basculer le thème" : "Toggle theme"} (${theme === "dark" ? "Light" : "Dark"})`,
        icon: theme === "dark" ? <Sun size={14} /> : <Moon size={14} />,
        run: toggleTheme,
      },
      {
        id: "toggle-lang",
        group: "action",
        label: `${lang === "fr" ? "Changer de langue" : "Toggle language"} (${lang === "fr" ? "English" : "Français"})`,
        icon: <Globe size={14} />,
        run: toggleLang,
      },
    ];

    return [...nav, ...actions];
  }, [lang, theme, toggleLang, toggleTheme, copyEmail, scrollToSection]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  const navResults = results.filter((c) => c.group === "nav");
  const actionResults = results.filter((c) => c.group === "action");

  const runCommand = useCallback(
    (command: Command) => {
      closePalette();
      command.run();
    },
    [closePalette]
  );

  // ⌘K / Ctrl+K ouvre la palette, la referme si elle est déjà ouverte.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (paletteOpen) closePalette();
        else openPalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen, openPalette, closePalette]);

  // À l'ouverture : mémorisation du focus courant, réinitialisation de la
  // recherche ; à la fermeture : restitution du focus à son point de départ.
  useEffect(() => {
    if (paletteOpen) {
      lastFocused.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActiveIndex(0);
      inputRef.current?.focus();
    } else {
      lastFocused.current?.focus?.();
    }
  }, [paletteOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Maintient l'élément sélectionné visible dans la liste défilante.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!paletteOpen) return null;

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closePalette();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length === 0) return;
      const delta = e.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => (i + delta + results.length) % results.length);
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const command = results[activeIndex];
      if (command) runCommand(command);
      return;
    }

    // Piège à focus : la tabulation reste à l'intérieur de la palette.
    if (e.key === "Tab") {
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, input, [href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const renderGroup = (label: string, group: Command[]) => {
    if (group.length === 0) return null;
    return (
      <div className="mb-2 last:mb-0">
        <div className="px-2 py-1 font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        {group.map((command) => {
          const index = results.indexOf(command);
          const isActive = index === activeIndex;
          return (
            <button
              key={command.id}
              type="button"
              data-active={isActive}
              onClick={() => runCommand(command)}
              onMouseMove={() => setActiveIndex(index)}
              className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-xs transition ${
                isActive ? "bg-surface text-foreground" : "text-foreground hover:bg-surface"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-muted-foreground">{command.icon}</span>
                <span>{command.label}</span>
              </span>
              {isActive && <CornerDownLeft size={12} className="text-muted-foreground" />}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div
      onClick={closePalette}
      className="fixed inset-0 z-50 flex animate-fade-in items-start justify-center bg-black/70 p-4 pt-[15vh] backdrop-blur-sm"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={lang === "fr" ? "Palette de commandes" : "Command palette"}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onPanelKeyDown}
        className="w-full max-w-lg animate-zoom-in overflow-hidden rounded-xl border border-line-strong bg-background shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <Search size={16} className="text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "fr"
                ? "Rechercher une section, une commande..."
                : "Search sections, actions..."
            }
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label={lang === "fr" ? "Rechercher" : "Search"}
          />
          <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="scrollbar-thin max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-2.5 py-6 text-center font-mono text-xs text-muted-foreground">
              {lang === "fr" ? "Aucun résultat" : "No results"}
            </div>
          ) : (
            <>
              {renderGroup("Navigation", navResults)}
              {renderGroup("Actions", actionResults)}
            </>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-line px-4 py-2 font-mono text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-line bg-surface px-1 py-0.5">↑</kbd>
            <kbd className="rounded border border-line bg-surface px-1 py-0.5">↓</kbd>
            {lang === "fr" ? "naviguer" : "navigate"}
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-line bg-surface px-1 py-0.5">↵</kbd>
            {lang === "fr" ? "sélectionner" : "select"}
          </span>
        </div>
      </div>
    </div>
  );
};
