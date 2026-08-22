"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground text-center">
      <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
        Error // Code 500
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-3">
        Une erreur inattendue est survenue
      </h2>
      <p className="text-sm text-muted-foreground max-w-md mb-6 font-mono text-xs">
        {error.message || "Une interruption technique a été détectée dans le pipeline de rendu."}
      </p>
      <button
        onClick={() => reset()}
        className="rounded-md border border-line-strong bg-surface px-4 py-2 text-xs font-medium text-foreground hover:bg-surface-hover transition"
      >
        Réinitialiser la vue
      </button>
    </div>
  );
}
