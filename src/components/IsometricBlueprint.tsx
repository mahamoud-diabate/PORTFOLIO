"use client";

import React, { useState } from "react";

export const IsometricBlueprint: React.FC = () => {
  const [coords, setCoords] = useState("LOC: 46.8139° N, 71.2080° W");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords(`LOC: 46.8139° N, 71.2080° W | PTR: [${x}, ${y}]`);
  };

  const handleMouseLeave = () => {
    setCoords("LOC: 46.8139° N, 71.2080° W");
  };

  return (
    <div className="border-t border-b border-line bg-background/50 p-4 sm:p-5">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-28 sm:h-32 w-full cursor-crosshair items-center justify-center overflow-hidden rounded-lg border border-dashed border-line bg-surface/40"
      >
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />

        <svg className="absolute inset-0 size-full" viewBox="0 0 720 120" fill="none">
          <g opacity="0.35" stroke="currentColor" strokeWidth="1">
            <line x1="20" y1="20" x2="700" y2="20" strokeDasharray="3 3" />
            <line x1="20" y1="60" x2="700" y2="60" />
            <line x1="20" y1="100" x2="700" y2="100" strokeDasharray="3 3" />
            <line x1="140" y1="10" x2="140" y2="110" strokeDasharray="3 3" />
            <line x1="360" y1="10" x2="360" y2="110" />
            <line x1="580" y1="10" x2="580" y2="110" strokeDasharray="3 3" />
          </g>

          {/* Neural & Distributed RAG System Flow */}
          <g stroke="var(--accent)" strokeWidth="1.5">
            <path d="M100 60 L220 60 L360 30 L500 60 L620 60" stroke="var(--line-strong)" strokeDasharray="4 4" />
            <path d="M220 60 L360 90 L500 60" stroke="var(--line-strong)" strokeDasharray="4 4" />

            <circle cx="100" cy="60" r="5" fill="var(--surface)" stroke="var(--accent)" />
            <circle cx="220" cy="60" r="6" fill="var(--surface)" stroke="var(--info)" />
            <circle cx="360" cy="30" r="7" fill="var(--surface)" stroke="var(--accent)" />
            <circle cx="360" cy="90" r="6" fill="var(--surface)" stroke="var(--success)" />
            <circle cx="500" cy="60" r="6" fill="var(--surface)" stroke="var(--accent)" />
            <circle cx="620" cy="60" r="5" fill="var(--surface)" stroke="var(--success)" />

            <text x="100" y="80" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle">
              CLIENT
            </text>
            <text x="220" y="80" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle">
              FASTAPI
            </text>
            <text x="360" y="18" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle">
              OLLAMA / EMBED
            </text>
            <text x="360" y="110" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle">
              CHROMADB
            </text>
            <text x="500" y="80" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle">
              LANGGRAPH
            </text>
            <text x="620" y="80" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="middle">
              STREAM (SSE)
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span className="font-handwritten text-[16px] text-accent -rotate-2">
          Fig. 1. — Architecture RAG &amp; Systèmes Distribués
        </span>
        <span>{coords}</span>
      </div>
    </div>
  );
};
