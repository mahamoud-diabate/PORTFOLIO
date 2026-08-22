"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import realContributionsData from "@/data/github-contributions.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: {
    [year: string]: number;
    lastYear: number;
  };
  contributions: Array<{
    date: string;
    count: number;
    level: number;
  }>;
}

interface GithubActivityProps {
  lang: "fr" | "en";
}

export const GithubActivity: React.FC<GithubActivityProps> = ({ lang }) => {
  const [contributions, setContributions] = useState<ContributionDay[]>(
    realContributionsData.contributions as ContributionDay[]
  );
  const [totalContributions, setTotalContributions] = useState<number>(
    realContributionsData.total.lastYear
  );
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchLiveContributions() {
      try {
        const username = "mahamoud-diabate";
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        if (!res.ok) return;
        const data: ApiResponse = await res.json();

        if (isMounted && data.contributions && data.contributions.length > 0) {
          setContributions(data.contributions);
          const total =
            data.total?.lastYear ||
            data.contributions.reduce((acc, curr) => acc + curr.count, 0);
          if (total > 0) setTotalContributions(total);
        }
      } catch {
        // En cas d'erreur de réseau, conserve les données réelles
      }
    }

    fetchLiveContributions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Découper les contributions en colonnes de 7 jours (semaines)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Obtenir les labels des mois
  const monthNamesFr = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNames = lang === "fr" ? monthNamesFr : monthNamesEn;

  const monthLabels: { label: string; colIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, colIdx) => {
    const firstDay = week[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth && colIdx > 0) {
        monthLabels.push({ label: monthNames[month], colIndex: colIdx });
        lastMonth = month;
      }
    }
  });

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] dark:bg-[#003820] border-[#00552b]";
      case 2:
        return "bg-[#006d32] dark:bg-[#006d32] border-[#008f43]";
      case 3:
        return "bg-[#26a641] dark:bg-[#26a641] border-[#39d353]";
      case 4:
        return "bg-[#39d353] dark:bg-[#39d353] border-[#56e86f]";
      case 0:
      default:
        return "bg-surface-hover/60 dark:bg-[#151921] border-line/40";
    }
  };

  return (
    <section className="border-b border-line bg-background p-4 sm:p-5">
      {/* En-tête / titre compact */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {lang === "fr" ? "Activité GitHub" : "GitHub Activity"}
        </span>
        <span className="font-mono text-xs font-semibold text-foreground">
          {totalContributions} {lang === "fr" ? "contributions la dernière année" : "contributions in the last year"}
        </span>
      </div>

      {/* Grille GitHub */}
      <div className="relative overflow-x-auto pb-1 scrollbar-thin">
        <div className="min-w-[680px]">
          {/* Labels des mois */}
          <div className="relative flex text-[10px] font-mono text-muted-foreground mb-1 ml-6 h-4">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{
                  position: "absolute",
                  left: `${m.colIndex * 13}px`,
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grille avec labels des jours */}
          <div className="flex gap-1.5 items-start">
            <div className="flex flex-col gap-[3px] text-[9px] font-mono text-muted-foreground pt-0.5 select-none w-5">
              <span className="h-[10px] leading-[10px]"></span>
              <span className="h-[10px] leading-[10px]">{lang === "fr" ? "Lun" : "Mon"}</span>
              <span className="h-[10px] leading-[10px]"></span>
              <span className="h-[10px] leading-[10px]">{lang === "fr" ? "Mer" : "Wed"}</span>
              <span className="h-[10px] leading-[10px]"></span>
              <span className="h-[10px] leading-[10px]">{lang === "fr" ? "Ven" : "Fri"}</span>
              <span className="h-[10px] leading-[10px]"></span>
            </div>

            <div className="flex gap-[3px] flex-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      title={`${day.count} contributions on ${day.date}`}
                      className={`size-[10px] sm:size-[11px] rounded-[2px] border transition-transform duration-100 hover:scale-125 cursor-pointer ${getCellColor(
                        day.level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Légende technique façon Blueprint (Fig. 2) */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-2.5 font-mono text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground">Fig. 2.</span>
          <span>
            {hoveredDay
              ? `${hoveredDay.count} ${lang === "fr" ? "contribution(s) le" : "contribution(s) on"} ${hoveredDay.date}`
              : `${totalContributions} contributions · `}
          </span>
          {!hoveredDay && (
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2 hover:text-accent transition"
            >
              Source: GitHub
            </a>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[10px]">
          <span>{lang === "fr" ? "Moins" : "Less"}</span>
          <span className="size-2 rounded-[2px] bg-surface-hover/60 dark:bg-[#151921] border border-line/40" />
          <span className="size-2 rounded-[2px] bg-[#0e4429] dark:bg-[#003820]" />
          <span className="size-2 rounded-[2px] bg-[#006d32]" />
          <span className="size-2 rounded-[2px] bg-[#26a641]" />
          <span className="size-2 rounded-[2px] bg-[#39d353]" />
          <span>{lang === "fr" ? "Plus" : "More"}</span>
        </div>
      </div>
    </section>
  );
};
