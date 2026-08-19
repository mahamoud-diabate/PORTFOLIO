"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

interface FooterBlueprintProps {
  lang: "fr" | "en";
}

export const FooterBlueprint: React.FC<FooterBlueprintProps> = ({ lang }) => {
  return (
    <>
      {/* Bottom Isometric Architectural Floor Grid (Fig. 2.) */}
      <section className="w-full border-t border-line bg-surface/20 p-5 overflow-hidden" aria-hidden="true">
        <div className="flex h-20 w-full items-center justify-center">
          <svg
            viewBox="0 0 640 80"
            fill="none"
            className="size-full opacity-35 stroke-current"
            strokeWidth="1"
          >
            <path d="M40 70 L320 15 L600 70" strokeDasharray="2 2" />
            <path d="M100 70 L320 28 L540 70" />
            <path d="M160 70 L320 40 L480 70" />
            <path d="M220 70 L320 52 L420 70" />
            <path d="M280 70 L320 64 L360 70" />

            <line x1="320" y1="15" x2="320" y2="75" />
            <line x1="200" y1="36" x2="200" y2="75" strokeDasharray="3 3" />
            <line x1="440" y1="36" x2="440" y2="75" strokeDasharray="3 3" />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-line px-5 py-4 font-mono text-xs text-muted-foreground">
        <div>
          <span>&copy; {new Date().getFullYear()} Mahamoud Diabate</span>
          <span className="ml-2 opacity-60 hidden sm:inline">
            {lang === "fr" ? "· Conçu avec Next.js & Tailwind" : "· Crafted with Next.js & Tailwind"}
          </span>
        </div>

        <a
          href="#top"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>{lang === "fr" ? "Haut de page" : "Back to top"}</span>
          <ArrowUp size={12} />
        </a>
      </footer>
    </>
  );
};
