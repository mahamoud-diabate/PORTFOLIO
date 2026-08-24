import React from "react";

interface SectionHeaderProps {
  title: React.ReactNode;
  /** Contenu aligné à droite (compteur, onglets de filtre...). */
  children?: React.ReactNode;
}

/** En-tête de section partagé par Projets, Stack, Expérience et Formation. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children }) => (
  <header
    className={`border-b border-line bg-surface/30 px-5 py-3.5 ${
      children ? "flex flex-col justify-between gap-3 sm:flex-row sm:items-center" : ""
    }`}
  >
    <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
      {title}
    </h2>
    {children}
  </header>
);
