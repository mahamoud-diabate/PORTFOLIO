"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { usePreferences } from "@/lib/preferences";
import { renderRichText } from "@/lib/rich-text";

export const HelloSection: React.FC = () => {
  const { lang } = usePreferences();
  const [greeting, setGreeting] = useState(lang === "fr" ? "Bonjour" : "Hello");

  useEffect(() => {
    const hours = new Date().getHours();
    if (lang === "fr") {
      setGreeting(hours >= 5 && hours < 18 ? "Bonjour" : "Bonsoir");
    } else if (hours >= 5 && hours < 12) {
      setGreeting("Good morning");
    } else if (hours >= 12 && hours < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [lang]);

  return (
    <section className="border-b border-line" id="hello">
      <header className="border-b border-line bg-surface/30 px-5 py-3.5">
        <h2 className="font-handwritten text-2xl font-bold text-foreground sm:text-3xl">
          {greeting}
        </h2>
      </header>

      <div className="p-5 text-[14.5px] leading-relaxed text-muted-foreground sm:p-6">
        <ul className="flex flex-col gap-2.5">
          {PORTFOLIO_DATA.about[lang].map((point, idx) => (
            <li
              key={idx}
              className="relative pl-4.5 font-mono before:absolute before:left-0 before:text-muted-foreground before:content-['—']"
            >
              <span className="font-sans">{renderRichText(point)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
