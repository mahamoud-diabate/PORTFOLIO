import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
        Error 404 // Not Found
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-3">
        Page introuvable
      </h1>
      <p className="text-sm text-muted-foreground max-w-md mb-6 font-mono text-xs">
        La ressource demandée n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="rounded-md border border-line-strong bg-surface px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-hover transition"
      >
        Retourner à l'accueil
      </Link>
    </div>
  );
}
