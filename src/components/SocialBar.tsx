"use client";

import React from "react";
import { Download } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { GithubIcon } from "@/components/GithubIcon";
import { usePreferences } from "@/lib/preferences";

export const SocialBar: React.FC = () => {
  const { lang } = usePreferences();

  return (
    <section className="flex items-center justify-between p-4 bg-background border-b border-line">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={PORTFOLIO_DATA.profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="relief-btn inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-surface-hover hover:text-foreground hover:border-line-strong hover:-translate-y-0.5"
        >
          <GithubIcon />
          <span>GitHub</span>
        </a>

        <a
          href={PORTFOLIO_DATA.profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="relief-btn inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-surface-hover hover:text-foreground hover:border-line-strong hover:-translate-y-0.5"
        >
          <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
          </svg>
          <span>LinkedIn</span>
        </a>

        <a
          href="/cv-mahamoud-diabate.pdf"
          download
          className="relief-btn inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-surface-hover hover:text-foreground hover:border-line-strong hover:-translate-y-0.5"
        >
          <Download size={13} />
          <span>CV (PDF)</span>
        </a>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 font-handwritten text-lg text-muted-foreground -rotate-3 select-none">
        <span>{lang === "fr" ? "écrivez-moi" : "say hi"}</span>
        <svg className="h-4 w-6 stroke-current" viewBox="0 0 40 30" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22 C 14 18, 22 10, 34 8" />
          <path d="M26 6 L35 8 L32 17" />
        </svg>
      </div>
    </section>
  );
};
