import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Choix assumé : le site sert des images déjà dimensionnées et converties
      // en WebP, et <Image /> ajouterait ~5 ko de JS au premier chargement pour
      // un gain nul ici. Les balises <img> portent width/height et loading.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
