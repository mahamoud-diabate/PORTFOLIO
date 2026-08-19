"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface StackSectionProps {
  lang: "fr" | "en";
}

export const StackSection: React.FC<StackSectionProps> = ({ lang }) => {
  return (
    <section className="border-b border-line" id="stack">
      <header className="border-b border-line bg-surface/30 px-5 py-3.5">
        <h2 className="font-semibold text-lg text-foreground tracking-tight">Stack</h2>
      </header>

      <div className="flex flex-col divide-y divide-line">
        {PORTFOLIO_DATA.stack.map((cat) => (
          <div key={cat.index} className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 sm:gap-4 p-4 sm:p-5">
            <div className="flex items-center gap-2 font-medium text-xs text-foreground">
              <span className="font-mono text-[11px] text-muted-foreground">{cat.index}</span>
              <span>{cat.name[lang]}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-xs text-foreground transition hover:border-accent hover:bg-surface-hover hover:-translate-y-0.5"
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
