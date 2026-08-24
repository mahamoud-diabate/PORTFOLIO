import React from "react";

/**
 * Rendu du sous-ensemble de Markdown utilisé dans les données du portfolio :
 * `**gras**` et `[libellé](url)`. Produit des noeuds React plutôt que du HTML
 * injecté, ce qui supprime les appels à dangerouslySetInnerHTML.
 */
const PATTERN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

export function renderRichText(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = new RegExp(PATTERN.source, "g");
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [full, bold, linkLabel, linkHref] = match;

    if (bold !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {bold}
        </strong>
      );
    } else if (linkLabel !== undefined && linkHref !== undefined) {
      nodes.push(
        <a
          key={key++}
          href={linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 decoration-line-strong transition hover:decoration-accent"
        >
          {linkLabel}
        </a>
      );
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
