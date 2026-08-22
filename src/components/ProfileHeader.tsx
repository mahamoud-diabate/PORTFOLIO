"use client";

import React from "react";
import { Volume2, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface ProfileHeaderProps {
  lang: "fr" | "en";
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ lang }) => {
  const pronounceName = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance("Mahamoud Diabate");
      utter.lang = "fr-FR";
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <section className="p-5 md:p-6 border-b border-line bg-background relative">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-5 items-center">
        <div className="relative size-[76px] -mt-12 sm:-mt-14 z-20">
          <img
            src="https://avatars.githubusercontent.com/u/190803730?v=4"
            alt={PORTFOLIO_DATA.profile.name}
            className="size-full rounded-full border-2 border-background object-cover shadow-xl ring-1 ring-line-strong"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div className="pointer-events-none absolute -inset-1.5 rounded-full border border-dashed border-accent/60 animate-[spin_32s_linear_infinite]" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <span className="text-accent inline-flex items-center" title="Verified Developer">
              <CheckCircle2 size={16} className="fill-accent text-background" />
            </span>
            <button
              onClick={pronounceName}
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition hover:border-line-strong hover:text-foreground"
              title="Prononciation : /ma.ha.mud/"
            >
              <Volume2 size={11} />
              <span>/ma.ha.mud/</span>
            </button>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            <span className="shimmer-text">{PORTFOLIO_DATA.profile.tagline[lang]}</span>
          </p>

          <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/15 px-2.5 py-0.5 font-mono text-[11px] text-success w-fit">
            <span className="size-1.5 rounded-full bg-success animate-pulse shadow-[0_0_6px_currentColor]" />
            <span>{PORTFOLIO_DATA.profile.status[lang]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
