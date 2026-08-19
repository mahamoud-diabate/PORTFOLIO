"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface HelloSectionProps {
  lang: "fr" | "en";
}

export const HelloSection: React.FC<HelloSectionProps> = ({ lang }) => {
  const [greeting, setGreeting] = useState("Bonjour");

  useEffect(() => {
    const hours = new Date().getHours();
    if (lang === "fr") {
      setGreeting(hours >= 5 && hours < 18 ? "Bonjour" : "Bonsoir");
    } else {
      if (hours >= 5 && hours < 12) setGreeting("Good morning");
      else if (hours >= 12 && hours < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    }
  }, [lang]);

  return (
    <section className="border-b border-line" id="hello">
      <header className="border-b border-line bg-surface/30 px-5 py-3.5">
        <h2 className="font-handwritten text-2xl sm:text-3xl font-bold text-foreground">
          {greeting}
        </h2>
      </header>
      <div className="p-5 sm:p-6 text-[14.5px] leading-relaxed text-muted-foreground">
        <ul className="flex flex-col gap-2.5">
          {PORTFOLIO_DATA.about[lang].map((point, idx) => (
            <li key={idx} className="relative pl-4.5 before:content-['—'] before:absolute before:left-0 before:text-muted-foreground font-mono">
              <span
                className="font-sans"
                dangerouslySetInnerHTML={{
                  __html: point
                    .replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-foreground font-semibold">$1</strong>'
                    )
                    .replace(
                      /\[(.*?)\]\((.*?)\)/g,
                      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-foreground underline underline-offset-4 decoration-line-strong hover:decoration-accent transition">$1</a>'
                    ),
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
