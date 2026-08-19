# Portfolio — Mahamoud Diabate

Portfolio personnel moderne et minimaliste construit avec Next.js 15, TypeScript et Tailwind CSS.

**En ligne :** [portfolio-king2mos-projects.vercel.app](https://portfolio-king2mos-projects.vercel.app/)

## Stack technique

- **Framework :** [Next.js 15](https://nextjs.org/) (App Router)
- **Langage :** [TypeScript](https://www.typescriptlang.org/)
- **Styles :** [Tailwind CSS](https://tailwindcss.com/)
- **Icônes :** [Lucide React](https://lucide.dev/)
- **Hébergement :** [Vercel](https://vercel.com/)

## Fonctionnalités

- **Bilingue FR / EN** — bascule instantanée, persistance du choix et détection automatique.
- **Thème clair / sombre** — mode sombre par défaut, mémorisé sans flash de rendu (FOUC).
- **Palette de commandes** (`Ctrl/Cmd + K`) pour la navigation, la sélection de thème et de langue.
- **Actions rapides** — téléchargement direct du CV en PDF et copie du courriel en un clic.
- **SEO & Référencement** — métadonnées dynamiques, Open Graph et balisage structuré.

## Développement local

```bash
# Installation des dépendances
npm install

# Lancement du serveur local (http://localhost:3000)
npm run dev

# Vérification du build de production
npm run build
```

## Déploiement

Le site est configuré pour un déploiement continu sur **Vercel** :
1. Importer le dépôt GitHub sur Vercel.
2. Tout push sur la branche `main` déclenche automatiquement un nouveau déploiement.

*(Optionnel)* Pour configurer votre propre nom de domaine, définissez la variable d'environnement `NEXT_PUBLIC_SITE_URL` sur votre URL finale.

## Structure du projet

```
src/app/          # Layout racine, page principale et styles globaux
src/components/   # Composants UI (Header, CommandPalette, Bento, Sections...)
src/data/         # Données centralisées du portfolio (portfolio-data.ts)
public/           # Actifs statiques (CV, favicon, og-image, captures)
```

Toutes les informations (profil, projets, compétences, expériences) sont centralisées dans [`src/data/portfolio-data.ts`](src/data/portfolio-data.ts).

## Crédits

Conception visuelle inspirée par [chanhdai.com](https://chanhdai.com) (par Chánh Đại, licence MIT).

## Licence

[MIT](LICENSE) © Mahamoud Diabate

