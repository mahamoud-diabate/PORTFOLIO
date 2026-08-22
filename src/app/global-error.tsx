"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr" data-theme="dark">
      <body className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#09090b] text-[#f4f4f5] text-center font-sans">
        <div className="font-mono text-xs uppercase tracking-widest text-[#6366f1] mb-2">
          Critical // System Error
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-3">
          Erreur critique du système
        </h2>
        <p className="text-sm text-[#a1a1aa] max-w-md mb-6 font-mono text-xs">
          {error.message || "Une erreur globale a interrompu le rendu de l'application."}
        </p>
        <button
          onClick={() => reset()}
          className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20 transition"
        >
          Recharger
        </button>
      </body>
    </html>
  );
}
