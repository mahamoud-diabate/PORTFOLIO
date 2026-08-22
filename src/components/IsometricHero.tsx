"use client";

import React, { useState, useEffect, useRef } from "react";

export const IsometricHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 15, y: -25 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance normalisée par rapport au centre du bloc (-1 à 1)
      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Calcul d'angle doux
      const targetRotY = -25 + normX * 22;
      const targetRotX = 15 - normY * 18;

      setRotation({ x: targetRotX, y: targetRotY });
      setMousePos({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const playClickSound = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not permitted without direct interaction
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={playClickSound}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[260px] sm:h-[300px] border-b border-line bg-background select-none overflow-hidden cursor-pointer group"
    >
      {/* Grille millimétrée de fond */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Lignes directrices diagonales & radiales d'ingénierie */}
      <svg className="absolute inset-0 size-full pointer-events-none opacity-25 stroke-line-strong" fill="none">
        <line x1="0" y1="0" x2="100%" y2="100%" strokeDasharray="3 3" />
        <line x1="100%" y1="0" x2="0" y2="100%" strokeDasharray="3 3" />
        <circle cx="50%" cy="50%" r="90" strokeDasharray="2 4" />
        <circle cx="50%" cy="50%" r="140" strokeDasharray="4 6" opacity="0.6" />
      </svg>

      {/* Répères de coins (+) */}
      <span className="absolute top-2 left-2.5 font-mono text-[10px] text-muted-foreground/60 select-none">+</span>
      <span className="absolute top-2 right-2.5 font-mono text-[10px] text-muted-foreground/60 select-none">+</span>
      <span className="absolute bottom-2 left-2.5 font-mono text-[10px] text-muted-foreground/60 select-none">+</span>
      <span className="absolute bottom-2 right-2.5 font-mono text-[10px] text-muted-foreground/60 select-none">+</span>

      {/* Coordonnées techniques en haut à gauche */}
      <div className="absolute top-3 left-4 font-mono text-[9.5px] text-muted-foreground/80 flex flex-col gap-0.5 pointer-events-none">
        <span className="tracking-wider text-foreground/80 font-semibold">FIG. 1. // ISOMETRIC VIEWPORT</span>
        <span>ROT: [X: {rotation.x.toFixed(1)}°, Y: {rotation.y.toFixed(1)}°]</span>
        <span>POS: [{mousePos.x}px, {mousePos.y}px]</span>
      </div>

      {/* Annotation manuscrite façon chanhdai.com en haut à droite */}
      <div className="absolute top-4 right-4 sm:right-6 flex items-start gap-1.5 font-handwritten text-muted-foreground/90 pointer-events-none select-none -rotate-2">
        <div className="flex flex-col items-end text-right">
          <span className="text-[15px] sm:text-base leading-tight text-foreground/90">
            {isHovered ? "click for sound" : "follow your cursor"}
          </span>
          <span className="text-[11px] font-mono text-muted-foreground opacity-75">fig. 1.a</span>
        </div>
        <svg className="w-5 h-6 stroke-current mt-0.5" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 4 C 12 8, 16 16, 20 20" />
          <path d="M12 20 L20 20 L20 12" />
        </svg>
      </div>

      {/* Structure 3D isométrique interactive */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative transition-transform duration-100 ease-out"
          style={{
            transform: `perspective(900px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${
              clicked ? 0.96 : isHovered ? 1.04 : 1
            })`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Wireframe SVG Isométrique à plusieurs niveaux */}
          <svg
            className="w-[280px] h-[200px] sm:w-[340px] sm:h-[240px] drop-shadow-lg"
            viewBox="0 0 340 240"
            fill="none"
          >
            {/* Ombre portée projetée */}
            <polygon
              points="170,220 290,160 170,100 50,160"
              className="fill-surface-hover/30 dark:fill-surface/40 stroke-line-strong/40"
              strokeDasharray="3 3"
              strokeWidth="1"
            />

            {/* Cube inférieur - Faces filaires */}
            <g className="stroke-line-strong text-foreground transition-all duration-300">
              {/* Face supérieure basse */}
              <polygon
                points="170,150 270,98 170,46 70,98"
                className="fill-surface/60 dark:fill-[#121215]/80 stroke-line-strong group-hover:stroke-accent/70"
                strokeWidth="1.2"
              />

              {/* Face gauche basse */}
              <polygon
                points="70,98 170,150 170,202 70,150"
                className="fill-surface/30 dark:fill-[#0d0d10]/90 stroke-line-strong group-hover:stroke-accent/70"
                strokeWidth="1.2"
              />

              {/* Face droite basse */}
              <polygon
                points="170,150 270,98 270,150 170,202"
                className="fill-surface-hover/40 dark:fill-[#16161b]/90 stroke-line-strong group-hover:stroke-accent/70"
                strokeWidth="1.2"
              />
            </g>

            {/* Cube intérieur en lévitation (Structure supérieure en losange isométrique) */}
            <g className="stroke-foreground transition-colors duration-200">
              {/* Face supérieure du module central */}
              <polygon
                points="170,110 240,74 170,38 100,74"
                className="fill-background/90 dark:fill-[#18181b]/95 stroke-foreground/80 group-hover:stroke-accent"
                strokeWidth="1.5"
              />

              {/* Face gauche du module central */}
              <polygon
                points="100,74 170,110 170,146 100,110"
                className="fill-surface/80 dark:fill-[#121216]/90 stroke-foreground/70 group-hover:stroke-accent"
                strokeWidth="1.5"
              />

              {/* Face droite du module central */}
              <polygon
                points="170,110 240,74 240,110 170,146"
                className="fill-surface-hover/90 dark:fill-[#1c1c22]/90 stroke-foreground/70 group-hover:stroke-accent"
                strokeWidth="1.5"
              />
            </g>

            {/* Lignes d'axes & repères d'élévation */}
            <g className="stroke-accent/60" strokeWidth="1">
              {/* Rayon central vers le haut */}
              <line x1="170" y1="38" x2="170" y2="10" strokeDasharray="2 3" />
              <circle cx="170" cy="10" r="3" className="fill-accent stroke-accent" />

              {/* Rayon gauche */}
              <line x1="100" y1="74" x2="60" y2="54" strokeDasharray="2 3" />
              <circle cx="60" cy="54" r="2.5" className="fill-accent stroke-accent" />

              {/* Rayon droit */}
              <line x1="240" y1="74" x2="280" y2="54" strokeDasharray="2 3" />
              <circle cx="280" cy="54" r="2.5" className="fill-accent stroke-accent" />
            </g>

            {/* Cotations & labels d'angles techniques */}
            <text x="170" y="28" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="8" textAnchor="middle">
              Z-AXIS // 90°
            </text>
            <text x="50" y="48" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="7.5" textAnchor="middle">
              30° ISO
            </text>
            <text x="290" y="48" fill="var(--text-faint)" fontFamily="JetBrains Mono, monospace" fontSize="7.5" textAnchor="middle">
              R_12
            </text>
          </svg>
        </div>
      </div>

      {/* Graduation de règle (Ruler) en bas */}
      <div className="absolute bottom-0 inset-x-0 h-4 border-t border-line/60 bg-surface/20 flex items-center justify-between px-3 font-mono text-[8px] text-muted-foreground/60 overflow-hidden select-none pointer-events-none">
        <span>| 000</span>
        <span className="hidden sm:inline">| 050</span>
        <span>| 100</span>
        <span className="hidden sm:inline">| 150</span>
        <span>| 200</span>
        <span className="hidden sm:inline">| 250</span>
        <span>| 300</span>
        <span className="hidden sm:inline">| 350</span>
        <span>| 400 |</span>
      </div>
    </div>
  );
};
