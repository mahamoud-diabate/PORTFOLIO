"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { SectionHeader } from "@/components/SectionHeader";
import { usePreferences } from "@/lib/preferences";

export const StackSection: React.FC = () => {
  const { lang } = usePreferences();

  return (
    <section className="border-b border-line" id="stack">
      <SectionHeader title="Stack" />

      <div className="flex flex-col divide-y divide-line">
        {PORTFOLIO_DATA.stack.map((cat) => (
          <div
            key={cat.index}
            className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-[160px_1fr] sm:gap-4 sm:p-5"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <span className="font-mono text-[11px] text-muted-foreground">{cat.index}</span>
              <span>{cat.name[lang]}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-xs text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:bg-surface-hover"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
