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
      const now = new Date();
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "America/Toronto",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        };
        const str = new Intl.DateTimeFormat(lang === "fr" ? "fr-CA" : "en-US", options).format(now);
        setTimeString(str);

        const tzString = now.toLocaleString("en-US", { timeZone: "America/Toronto" });
        const tzDate = new Date(tzString);
        const hours = tzDate.getHours();
        const minutes = tzDate.getMinutes();

        setHourAngle(((hours % 12) + minutes / 60) * 30);
        setMinuteAngle(minutes * 6);
      } catch (e) {
        setTimeString("UTC-4");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [lang]);

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
    </section>
  );
};
