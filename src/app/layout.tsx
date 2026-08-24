import type { Metadata } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mahamoud-diabate.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mahamoud Diabate — Développeur Logiciel & IA",
  description:
    "Portfolio de Mahamoud Diabate, développeur Logiciel & IA à l'Université Laval. Recherche un stage en développement logiciel pour l'hiver ou l'été 2027.",
  authors: [{ name: "Mahamoud Diabate", url: "https://github.com/mahamoud-diabate" }],
  keywords: [
    "Mahamoud Diabate",
    "développeur logiciel",
    "stage informatique",
    "Université Laval",
    "Québec",
    "C++",
    "Python",
    "FastAPI",
    "Next.js",
    "RAG",
  ],
  creator: "Mahamoud Diabate",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Mahamoud Diabate — Développeur Logiciel & IA",
    description:
      "Étudiant en informatique à l'Université Laval — Recherche de stage hiver / été 2027. C++, Python, FastAPI, React, Next.js, RAG.",
    url: siteUrl,
    siteName: "Mahamoud Diabate Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mahamoud Diabate Portfolio",
      },
    ],
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahamoud Diabate — Développeur Logiciel & IA",
    description:
      "Étudiant en informatique à l'Université Laval — Recherche de stage hiver / été 2027. C++, Python, FastAPI, React, Next.js, RAG.",
    images: ["/og-image.png"],
  },
};

// Balisage structuré schema.org : permet aux moteurs de recherche d'associer
// le site à une personne réelle (profils, formation, compétences).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PORTFOLIO_DATA.profile.name,
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  email: `mailto:${PORTFOLIO_DATA.profile.email}`,
  jobTitle: PORTFOLIO_DATA.profile.role.fr,
  description:
    "Étudiant au baccalauréat en informatique à l'Université Laval, développeur logiciel et IA. Recherche un stage pour l'hiver ou l'été 2027.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Québec",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Université Laval",
      sameAs: "https://www.ulaval.ca",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "International University of Grand-Bassam",
    },
  ],
  knowsLanguage: ["fr", "en"],
  knowsAbout: PORTFOLIO_DATA.stack.flatMap((category) => category.skills),
  sameAs: [PORTFOLIO_DATA.profile.github, PORTFOLIO_DATA.profile.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="dark" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('portfolio_theme');
                  if (t === 'light' || t === 'dark') {
                    document.documentElement.setAttribute('data-theme', t);
                  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
