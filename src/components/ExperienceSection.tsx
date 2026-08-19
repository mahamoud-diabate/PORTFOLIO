"use client";

import React from "react";
import { Mail, ClipboardCheck, Truck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface ExperienceSectionProps {
  lang: "fr" | "en";
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ lang }) => {
  const getJobIcon = (id: string) => {
    switch (id) {
      case "postes-canada":
        return <Mail size={15} />;
      case "wis":
        return <ClipboardCheck size={15} />;
      default:
        return <Truck size={15} />;
    }
  };

  return (
    <section className="border-b border-line" id="experience">
      <header className="border-b border-line bg-surface/30 px-5 py-3.5">
        <h2 className="font-semibold text-lg text-foreground tracking-tight">
          {lang === "fr" ? "Expérience" : "Experience"}
        </h2>
      </header>

      <div className="flex flex-col divide-y divide-line">
        {PORTFOLIO_DATA.experience.map((exp) => (
          <div key={exp.id} className="p-4 sm:p-5 hover:bg-surface/30 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-muted-foreground shadow-sm">
                  {getJobIcon(exp.id)}
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-foreground">{exp.company}</h3>
                  <div className="text-xs text-muted-foreground">{exp.role[lang]}</div>
                </div>
              </div>

              <span className="shrink-0 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                {exp.period[lang]}
              </span>
            </div>

            <p className="text-xs sm:text-[13.5px] text-muted-foreground leading-relaxed pl-10 mb-2.5">
              {exp.desc[lang]}
            </p>

            <div className="flex flex-wrap gap-1.5 pl-10">
              {exp.tags.map((t, idx) => (
                <span key={idx} className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
