import React from "react";
import { PreferencesProvider } from "@/lib/preferences";
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
  return (
    <PreferencesProvider>
      <div
        className="relative z-10 mx-auto min-h-screen max-w-container border-x border-line bg-background shadow-2xl"
        id="top"
      >
        <Header />

        <main>
          <ProfileHeader />
          <IsometricBlueprint />
          <OverviewBento />
          <SocialBar />
          <GithubActivity />

          <div className="stripe-divider" />

          <HelloSection />

          <div className="stripe-divider" />

          <ProjectsSection />

          <div className="stripe-divider" />

          <StackSection />

          <div className="stripe-divider" />

          <ExperienceSection />

          <div className="stripe-divider" />

          <EducationSection />

          <div className="stripe-divider" />

          <ContactSection />

          <FooterBlueprint />
        </main>

        <CommandPalette />
        <Toast />
      </div>
    </PreferencesProvider>
  );
}
