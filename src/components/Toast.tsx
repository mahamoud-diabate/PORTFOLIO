"use client";

import React from "react";
import { Check } from "lucide-react";
import { usePreferences } from "@/lib/preferences";

export const Toast: React.FC = () => {
  const { toast } = usePreferences();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-slide-up fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-xs font-medium text-foreground shadow-xl"
    >
      <Check size={14} className="text-success" />
      <span>{toast}</span>
    </div>
  );
};
