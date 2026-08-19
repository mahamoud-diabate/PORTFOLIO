"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface ContactSectionProps {
  lang: "fr" | "en";
  onCopy: (text: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="p-5 sm:p-6" id="contact">
      <header className="mb-4">
        <h2 className="font-semibold text-lg text-foreground tracking-tight">Contact</h2>
      </header>

      <p className="max-w-xl text-sm text-muted-foreground leading-relaxed mb-5">
        {lang === "fr"
          ? "Je recherche un stage en développement logiciel pour l'été 2027. N'hésitez pas à m'écrire directement par courriel — je réponds sous 48 heures."
          : "I am looking for a software engineering internship for Summer 2027. Feel free to reach out directly via email — I reply within 48 hours."}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleCopy}
          type="button"
          className="inline-flex items-center gap-2.5 rounded-md border border-line bg-surface px-3.5 py-2 font-mono text-xs text-foreground transition hover:bg-surface-hover hover:border-line-strong"
        >
          <Mail size={14} className="text-muted-foreground" />
          <span>{PORTFOLIO_DATA.profile.email}</span>
          {copied ? <Check size={13} className="text-success" /> : <Copy size={13} className="text-muted-foreground" />}
        </button>

        <a
          href={`mailto:${PORTFOLIO_DATA.profile.email}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-foreground bg-foreground px-3.5 py-2 text-xs font-medium text-background transition hover:opacity-90"
        >
          <span>{lang === "fr" ? "Écrire un courriel" : "Send an email"}</span>
          <ArrowRight size={13} />
        </a>
      </div>
    </section>
  );
};
