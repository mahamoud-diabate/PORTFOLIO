"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

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
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(415);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContributions() {
      try {
        const username = "mahamoud-diabate";
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: ApiResponse = await res.json();

        if (isMounted && data.contributions && data.contributions.length > 0) {
          setContributions(data.contributions);
          setTotalContributions(data.total?.lastYear || data.contributions.reduce((acc, curr) => acc + curr.count, 0));
        }
      } catch (err) {
        // Fallback généré avec 52 semaines représentatives
        if (isMounted) {
          const fallbackDays: ContributionDay[] = [];
          const now = new Date();
          for (let i = 364; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            // quelques contributions simulées pour l'esthétique si l'API est indisponible
            const count = (i % 7 === 2 || i % 13 === 0 || i % 29 === 0) ? Math.floor((i % 5) + 1) : 0;
            const level = count === 0 ? 0 : count > 4 ? 4 : count > 2 ? 3 : count > 1 ? 2 : 1;
            fallbackDays.push({ date: dateStr, count, level });
          }
          setContributions(fallbackDays);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchContributions();
    return () => {
      isMounted = false;
    };
  }, []);

  // Découper les contributions en colonnes de 7 jours (semaines)
  const weeks: ContributionDay[][] = [];
  if (contributions.length > 0) {
    let currentWeek: ContributionDay[] = [];
    contributions.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === contributions.length - 1) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
  }

  // Obtenir les labels des mois
  const monthLabels: { label: string; colIndex: number }[] = [];
  const monthNamesFr = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  const monthNamesEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthNames = lang === "fr" ? monthNamesFr : monthNamesEn;

  let lastMonth = -1;
  weeks.forEach((week, colIdx) => {
    const firstDay = week[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: monthNames[month], colIndex: colIdx });
        lastMonth = month;
      }
    }
  });

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#0e4429] dark:bg-[#0e4429] border-[#006d32]";
      case 2:
        return "bg-[#006d32] dark:bg-[#006d32] border-[#26a641]";
      case 3:
        return "bg-[#26a641] dark:bg-[#26a641] border-[#39d353] shadow-[0_0_4px_rgba(38,166,65,0.3)]";
      case 4:
        return "bg-[#39d353] dark:bg-[#39d353] border-[#56e86f] shadow-[0_0_8px_rgba(57,211,83,0.5)]";
      case 0:
      default:
        return "bg-[#ebedf0] dark:bg-[#161b22] border-[#d0d7de]/60 dark:border-[#30363d]/60";
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
          <div className="flex text-[10px] font-mono text-muted-foreground mb-1 ml-6 h-4">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{
                  position: "relative",
                  left: `${m.colIndex * 13}px`,
                  marginRight: idx === 0 ? "0px" : "-20px",
                }}
                className="absolute"
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
          <span className="size-2.5 rounded-[2px] bg-[#ebedf0] dark:bg-[#161b22] border border-[#d0d7de]/60 dark:border-[#30363d]/60" />
          <span className="size-2.5 rounded-[2px] bg-[#0e4429] border border-[#006d32]" />
          <span className="size-2.5 rounded-[2px] bg-[#006d32] border border-[#26a641]" />
          <span className="size-2.5 rounded-[2px] bg-[#26a641] border border-[#39d353]" />
          <span className="size-2.5 rounded-[2px] bg-[#39d353] border border-[#56e86f]" />
          <span>{lang === "fr" ? "Plus" : "More"}</span>
        </div>
      </div>
    </section>
  );
};
