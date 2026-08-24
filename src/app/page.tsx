"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ProfileHeader } from "@/components/ProfileHeader";
import { IsometricBlueprint } from "@/components/IsometricBlueprint";
import { OverviewBento } from "@/components/OverviewBento";
import { SocialBar } from "@/components/SocialBar";
import { GithubActivity } from "@/components/GithubActivity";
import { HelloSection } from "@/components/HelloSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ContactSection } from "@/components/ContactSection";
import { FooterBlueprint } from "@/components/FooterBlueprint";
import { CommandPalette } from "@/components/CommandPalette";
import { Toast } from "@/components/Toast";

export default function Home() {
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio_lang");
    if (savedLang === "en" || savedLang === "fr") {
      setLang(savedLang);
    } else {
      const browserLang = (navigator.language || "").toLowerCase();
      if (browserLang.startsWith("en")) setLang("en");
    }

    // Le script d'amorçage du layout a déjà résolu le thème (préférence
    // enregistrée, sinon réglage du système) : on s'aligne sur le résultat.
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "light" || applied === "dark") {
      setTheme(applied);
    }
  }, []);

  // Garde l'attribut lang du document aligné sur la langue affichée
  // (lecteurs d'écran, moteurs de recherche, césure typographique).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopy = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(
          lang === "fr"
            ? "Adresse courriel copiée !"
            : "Email address copied!"
        );
      });
    }
  };

  return (
    <div className="relative z-10 mx-auto min-h-screen max-w-container border-x border-line bg-background shadow-2xl" id="top">
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        openCmd={() => setCmdOpen(true)}
      />

      <main>
        <ProfileHeader lang={lang} />
        <IsometricBlueprint />
        <OverviewBento lang={lang} onCopy={handleCopy} />
        <SocialBar lang={lang} />
        <GithubActivity lang={lang} />

        <div className="stripe-divider" />

        <HelloSection lang={lang} />

        <div className="stripe-divider" />

        <ProjectsSection lang={lang} />

        <div className="stripe-divider" />

        <StackSection lang={lang} />

        <div className="stripe-divider" />

        <ExperienceSection lang={lang} />

        <div className="stripe-divider" />

        <EducationSection lang={lang} />

        <div className="stripe-divider" />

        <ContactSection lang={lang} onCopy={handleCopy} />

        <FooterBlueprint lang={lang} />
      </main>

      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onCopy={handleCopy}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
