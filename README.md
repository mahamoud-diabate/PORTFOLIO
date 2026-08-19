# Portfolio — Mahamoud Diabate

Portfolio personnel construit avec Next.js, TypeScript et Tailwind CSS, exporté en site statique.

**En ligne :** https://mahamoud-diabate.github.io/portfolio/

## Stack

- **Next.js 15** en App Router, export statique (`output: "export"`)
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** pour les icônes

## Fonctionnalités

- **Bilingue FR / EN** — bascule instantanée, choix mémorisé, détection de la langue du navigateur
- **Thème clair / sombre** — sombre par défaut, sans flash au chargement
- **Palette de commandes** (`Ctrl/Cmd + K`) pour naviguer, changer de langue ou de thème
- **Copie du courriel** en un clic
- Balises Open Graph et JSON-LD pour le partage et le référencement

## Développement

```bash
npm install
npm run dev
```

Le site tourne sur http://localhost:3000. En développement le préfixe d'URL est vide ; à la compilation il devient `/portfolio` pour correspondre à GitHub Pages.

```bash
npm run build
```

L'export statique est généré dans `out/`.

## Déploiement

Le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) compile et publie sur GitHub Pages à chaque envoi sur `main`. Il faut activer Pages en source **GitHub Actions** dans les réglages du dépôt.

Le fichier `public/.nojekyll` est indispensable : sans lui, Jekyll ignore le dossier `_next/` et tous les scripts et styles renvoient une erreur 404.

## Structure

```
src/app/          layout, page, styles globaux
src/components/   composants de section
src/data/         contenu du portfolio, centralisé et bilingue
public/images/    captures des projets (WebP avec repli JPEG)
backup-vanilla/   anciennes versions en HTML/CSS/JS
```

Tout le contenu — profil, projets, expérience, formation, stack — vit dans [`src/data/portfolio-data.ts`](src/data/portfolio-data.ts). C'est le seul fichier à modifier pour mettre le portfolio à jour.

## Captures des projets

Les captures de SODIPAC proviennent d'une base de démonstration à données fictives : aucune donnée client réelle n'est exposée.

## Crédits

La mise en page s'inspire de [chanhdai.com](https://chanhdai.com) par Chánh Đại ([ncdai/chanhdai.com](https://github.com/ncdai/chanhdai.com)), sous licence MIT. Conformément à la demande de l'auteur, aucune de ses informations personnelles ni de sa marque n'est reprise.

## Licence

MIT — voir [LICENSE](LICENSE).
