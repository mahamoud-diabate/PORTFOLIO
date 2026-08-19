"use client";

import React from "react";
import { Check } from "lucide-react";

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full border border-line-strong bg-surface px-4 py-2 text-xs font-medium text-foreground shadow-xl animate-in fade-in slide-in-from-bottom-2">
      <Check size={14} className="text-success" />
      <span>{message}</span>
    </div>
  );
};
