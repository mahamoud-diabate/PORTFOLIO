"use client";

import React, { useState } from "react";
import { ExternalLink, Box, Activity, Cpu, Code2, Terminal } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio-data";

interface ProjectsSectionProps {
  lang: "fr" | "en";
}

type FilterType = "all" | "systems" | "ai" | "web";

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang }) => {
  const [filter, setFilter] = useState<FilterType>("all");

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "sopauto":
        return <Box size={16} />;
      case "synkortex":
        return <Activity size={16} />;
      case "compare-tech":
        return (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
        );
      default:
        return <Cpu size={16} />;
    }
  };

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "systems") return p.category === "systems" || p.category === "desktop";
    if (filter === "ai") return p.category === "ai";
    if (filter === "web") return p.category === "web";
    return true;
  });

  const filterTabs = [
    { id: "all" as FilterType, label: { fr: "Tous", en: "All" }, count: PORTFOLIO_DATA.projects.length },
    { id: "systems" as FilterType, label: { fr: "Systèmes & Desktop", en: "Systems & Desktop" }, count: 2 },
    { id: "ai" as FilterType, label: { fr: "IA & RAG", en: "AI & RAG" }, count: 1 },
    { id: "web" as FilterType, label: { fr: "Web Full-Stack", en: "Full-Stack Web" }, count: 1 },
  ];

  return (
    <section className="border-b border-line" id="projets">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line bg-surface/30 px-5 py-3.5">
        <h2 className="flex items-center gap-2 font-semibold text-lg text-foreground tracking-tight">
          <span>{lang === "fr" ? "Projets" : "Projects"}</span>
          <span className="font-mono text-xs font-normal text-muted-foreground">
            ({filteredProjects.length})
          </span>
        </h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-xs transition ${
                filter === tab.id
                  ? "bg-foreground text-background font-medium shadow-sm"
                  : "bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-line"
              }`}
            >
              <span>{tab.label[lang]}</span>
              <span className={`text-[10px] opacity-70`}>{tab.count}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="p-4 sm:p-5 flex flex-col gap-4">
        {filteredProjects.map((p) => (
          <article
            key={p.id}
            className="group rounded-xl border border-line bg-surface/30 overflow-hidden transition-all duration-200 hover:border-line-strong hover:bg-surface hover:shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-muted-foreground shadow-sm group-hover:text-foreground group-hover:border-accent transition-colors">
                  {getProjectIcon(p.id)}
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] text-foreground">{p.title[lang]}</h3>
                  <div className="font-mono text-[11px] text-muted-foreground">{p.meta[lang]}</div>
                </div>
              </div>

              {p.badge && (
                <span
                  className={`rounded-full px-2.5 py-0.5 font-mono text-[10.5px] border ${
                    p.badge.featured
                      ? "bg-accent/15 text-accent-text border-accent/30"
                      : "bg-surface text-muted-foreground border-line"
                  }`}
                >
                  {p.badge[lang]}
                </span>
              )}
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-3.5">
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc[lang]}</p>

              {p.image ? (
                <div className="overflow-hidden rounded-lg border border-line bg-background transition-colors hover:border-line-strong">
                  <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-1.5">
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                    <span className="size-2 rounded-full bg-line-strong" />
                    {p.urlLabel && (
                      <span className="ml-2 font-mono text-[11px] text-muted-foreground truncate">
                        {p.urlLabel}
                      </span>
                    )}
                  </div>
                  {p.video ? (
                    <video
                      className="aspect-video w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      poster={p.video.poster}
                      aria-label={p.title[lang]}
                      ref={(el) => {
                        if (el) {
                          el.muted = true;
                          el.defaultMuted = true;
                          const play = el.play();
                          if (play && typeof play.catch === "function") play.catch(() => {});
                        }
                      }}
                    >
                      <source src={p.video.webm} type="video/webm" />
                      <source src={p.video.mp4} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={p.image}
                      alt={p.title[lang]}
                      className="aspect-video w-full object-cover grayscale-[15%] transition-all duration-300 group-hover:grayscale-0"
                      loading="lazy"
                    />
                  )}
                </div>
              ) : (
                /* Interactive Terminal Blueprint for C++ Architecture */
                <div className="overflow-hidden rounded-lg border border-line bg-[#0d1117] text-[#c9d1d9] font-mono text-xs shadow-inner">
                  <div className="flex items-center justify-between border-b border-line/60 bg-[#161b22] px-3 py-1.5 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-[#ff5f56]" />
                      <span className="size-2 rounded-full bg-[#ffbd2e]" />
                      <span className="size-2 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 text-[11px] text-muted-foreground flex items-center gap-1">
                        <Terminal size={11} />
                        fleet_manager_test.cpp — Google Test (GTest)
                      </span>
                    </div>
                    <span className="text-[10px] text-accent">C++20 · CMake · RAII</span>
                  </div>
                  <div className="p-3.5 leading-relaxed overflow-x-auto text-[11.5px]">
                    <div className="text-muted-foreground">// Polymorphic hierarchy &amp; contract enforcement</div>
                    <div><span className="text-[#ff7b72]">TEST</span>(<span className="text-[#a5d6ff]">VehiculeFleetTest</span>, <span className="text-[#a5d6ff]">PolymorphicContractValidation</span>) &#123;</div>
                    <div className="pl-4"><span className="text-[#ff7b72]">auto</span> fleet = std::make_unique&lt;<span className="text-[#79c0ff]">FleetManager</span>&gt;();</div>
                    <div className="pl-4">fleet-&gt;registerVehicule(std::make_unique&lt;<span className="text-[#79c0ff]">Camion</span>&gt;(<span className="text-[#a5d6ff]">&quot;CAM-042&quot;</span>, <span className="text-[#79c0ff]">12000.0</span>));</div>
                    <div className="pl-4"><span className="text-[#ff7b72]">EXPECT_TRUE</span>(fleet-&gt;validateIntegrity());</div>
                    <div className="pl-4"><span className="text-[#ff7b72]">EXPECT_EQ</span>(fleet-&gt;totalCapacity(), <span className="text-[#79c0ff]">12000.0</span>);</div>
                    <div>&#125;</div>
                  </div>
                </div>
              )}

              <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                {p.highlights[lang].map((h, i) => (
                  <li key={i} className="relative pl-3.5 before:content-['•'] before:absolute before:left-0 before:text-accent">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: h.replace(
                          /\*\*(.*?)\*\*/g,
                          '<strong class="text-foreground font-semibold">$1</strong>'
                        ),
                      }}
                    />
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:border-line-strong transition"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {p.links && (
                <div className="flex items-center gap-2 pt-1">
                  {p.links.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-foreground bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
                    >
                      <ExternalLink size={13} />
                      <span>{lang === "fr" ? "Voir la démo" : "Live Demo"}</span>
                    </a>
                  )}
                  {p.links.code && (
                    <a
                      href={p.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-surface-hover hover:border-line-strong"
                    >
                      <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>{lang === "fr" ? "Code source" : "Source Code"}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
