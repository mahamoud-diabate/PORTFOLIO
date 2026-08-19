import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mahamouddiabate.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mahamoud Diabate — Développeur Full-Stack & IA",
  description:
    "Portfolio de Mahamoud Diabate, développeur Full-Stack et IA générative à l'Université Laval. Recherche un stage en développement logiciel pour l'été 2027.",
  authors: [{ name: "Mahamoud Diabate", url: "https://github.com/mahamoud-diabate" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Mahamoud Diabate — Développeur Full-Stack & IA",
    description:
      "Étudiant en informatique à l'Université Laval — Recherche de stage été 2027. Python, FastAPI, React, Next.js, C++, RAG.",
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
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
