"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, GraduationCap, MapPin, Mail, Copy, Check } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface OverviewBentoProps {
  lang: "fr" | "en";
  onCopy: (text: string) => void;
}

export const OverviewBento: React.FC<OverviewBentoProps> = ({ lang, onCopy }) => {
  const [timeString, setTimeString] = useState("--:--");
  const [hourAngle, setHourAngle] = useState(0);
  const [minuteAngle, setMinuteAngle] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Toronto",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setTimeString(formatter.format(now));

        // Calcul précis des angles des aiguilles
        const parts = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Toronto",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        }).formatToParts(now);

        const hours = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
        const minutes = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);

        setHourAngle(((hours % 12) + minutes / 60) * 30);
        setMinuteAngle(minutes * 6);
      } catch {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const h12 = hours % 12 || 12;
        setTimeString(`${h12}:${minutes.toString().padStart(2, "0")} ${ampm}`);
        setHourAngle(((hours % 12) + minutes / 60) * 30);
        setMinuteAngle(minutes * 6);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    onCopy(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const radH = ((hourAngle - 90) * Math.PI) / 180;
  const x2H = 12 + 4.5 * Math.cos(radH);
  const y2H = 12 + 4.5 * Math.sin(radH);

  const radM = ((minuteAngle - 90) * Math.PI) / 180;
  const x2M = 12 + 6.5 * Math.cos(radM);
  const y2M = 12 + 6.5 * Math.sin(radM);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 border-b border-line bg-background">
      {/* Role */}
      <div className="flex items-start gap-3 p-4 border-b sm:border-r border-line hover:bg-surface transition-colors">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-muted-foreground shadow-sm">
          <Briefcase size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {lang === "fr" ? "Rôle" : "Role"}
          </div>
          <div className="truncate font-medium text-sm text-foreground">
            {PORTFOLIO_DATA.profile.role[lang]}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="flex items-start gap-3 p-4 border-b border-line hover:bg-surface transition-colors">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-muted-foreground shadow-sm">
          <GraduationCap size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {lang === "fr" ? "Formation" : "Education"}
          </div>
          <div className="truncate font-medium text-sm text-foreground">
            {PORTFOLIO_DATA.profile.education[lang]}
          </div>
        </div>
      </div>

      {/* Location & Live Clock */}
      <div className="flex items-start gap-3 p-4 border-b sm:border-b-0 sm:border-r border-line hover:bg-surface transition-colors">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-muted-foreground shadow-sm">
          <MapPin size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {lang === "fr" ? "Localisation & Heure locale" : "Location & Local Time"}
          </div>
          <div className="flex items-center gap-2 font-medium text-sm text-foreground">
            <svg className="size-4 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="12" x2={x2H.toFixed(2)} y2={y2H.toFixed(2)} strokeLinecap="round" />
              <line x1="12" y1="12" x2={x2M.toFixed(2)} y2={y2M.toFixed(2)} strokeLinecap="round" />
            </svg>
            <span className="font-mono text-xs">
              {lang === "fr" ? "Québec" : "Quebec City"} — {timeString}
            </span>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3 p-4 hover:bg-surface transition-colors">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-muted-foreground shadow-sm">
          <Mail size={15} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {lang === "fr" ? "Courriel" : "Email"}
          </div>
          <div className="flex items-center justify-between gap-1 font-medium text-sm text-foreground">
            <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
            <button
              onClick={handleCopyEmail}
              type="button"
              className="inline-flex size-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-surface-hover hover:text-foreground transition"
              title={lang === "fr" ? "Copier le courriel" : "Copy email"}
            >
              {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* Engineering Impact Metrics */}
      <div className="col-span-1 sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 border-t border-line bg-surface/20 divide-x divide-y sm:divide-y-0 divide-line">
        {PORTFOLIO_DATA.stats.map((stat, i) => (
          <div key={i} className="p-3 sm:p-4 flex flex-col justify-center hover:bg-surface/40 transition-colors">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {stat.value}
              </span>
            </div>
            <div className="font-mono text-[11px] font-medium text-foreground truncate mt-0.5">
              {stat.label[lang]}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground truncate">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
