"use client";

import React from "react";
import { Volume2, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePreferences } from "@/lib/preferences";

export const ProfileHeader: React.FC = () => {
  const { lang } = usePreferences();

  const pronounceName = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(PORTFOLIO_DATA.profile.name);
    utter.lang = "fr-FR";
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  };

  return (
    <section className="p-5 md:p-6">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_1fr] sm:gap-5">
        <div className="relative size-[72px]">
          <img
            src="/images/avatar.png"
            alt={PORTFOLIO_DATA.profile.name}
            width={72}
            height={72}
            className="size-full rounded-full border border-line-strong object-cover shadow-md"
          />
          <div className="pointer-events-none absolute -inset-1 animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-accent opacity-60" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {PORTFOLIO_DATA.profile.name}
            </h1>
            <span
              className="inline-flex items-center text-accent"
              title={lang === "fr" ? "Profil vérifié" : "Verified profile"}
            >
              <CheckCircle2 size={16} className="fill-accent text-background" />
            </span>
            <button
              onClick={pronounceName}
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition hover:border-line-strong hover:text-foreground"
              title={lang === "fr" ? "Écouter la prononciation" : "Hear the pronunciation"}
            >
              <Volume2 size={11} />
              <span>/ma.ha.mud/</span>
            </button>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            <span className="shimmer-text">{PORTFOLIO_DATA.profile.tagline[lang]}</span>
          </p>

          <div className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success/15 px-2.5 py-0.5 font-mono text-[11px] text-success">
            <span className="size-1.5 animate-pulse rounded-full bg-success shadow-[0_0_6px_currentColor]" />
            <span>{PORTFOLIO_DATA.profile.status[lang]}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
