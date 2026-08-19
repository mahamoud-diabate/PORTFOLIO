"use client";

import React from "react";
import { GraduationCap, BookOpen } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface EducationSectionProps {
  lang: "fr" | "en";
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  return (
    <section className="border-b border-line" id="formation">
      <header className="border-b border-line bg-surface/30 px-5 py-3.5">
        <h2 className="font-semibold text-lg text-foreground tracking-tight">
          {lang === "fr" ? "Formation" : "Education"}
        </h2>
      </header>

      <div className="flex flex-col divide-y divide-line">
        {PORTFOLIO_DATA.education.map((edu, idx) => (
          <div key={edu.id} className="p-4 sm:p-5 hover:bg-surface/30 transition-colors">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-muted-foreground shadow-sm">
                  {idx === 0 ? <GraduationCap size={15} /> : <BookOpen size={15} />}
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-foreground">{edu.school}</h3>
                  <div className="text-xs text-muted-foreground">{edu.degree[lang]}</div>
                </div>
              </div>

              <span className="shrink-0 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                {edu.period[lang]}
              </span>
            </div>

            <p className="text-xs sm:text-[13.5px] text-muted-foreground leading-relaxed pl-10 mb-2">
              {edu.desc[lang]}
            </p>

            {edu.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pl-10">
                {edu.tags.map((t, tIdx) => (
                  <span key={tIdx} className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
