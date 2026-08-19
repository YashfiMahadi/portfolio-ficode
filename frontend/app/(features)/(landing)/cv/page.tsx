"use client";

import Navbar from "@/app/(features)/(landing)/components/navbar";
import Footer from "@/app/(features)/(landing)/components/footer";

import { useCvData } from "./hooks/use-cv-data";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { SkillsSection } from "./components/skills-section";
import { ProjectsSection } from "./components/projects-section";
import { EducationSection } from "./components/education-section";
import { ExperienceSection } from "./components/experience-section";
import { CertificationsSection } from "./components/certifications-section";
import { ContactSection } from "./components/contact-section";

export default function LandingPage() {
  const {
    profile,
    skillByKategori,
    experiences,
    educations,
    projects,
    certifications,
    loading,
  } = useCvData();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-sm text-gray-400">Memuat portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar profileName={profile?.nama} />

      <HeroSection profile={profile} onScrollTo={scrollTo} />
      <AboutSection profile={profile} />
      <SkillsSection skillByKategori={skillByKategori} />
      <ProjectsSection projects={projects} />
      <EducationSection educations={educations} />
      <ExperienceSection experiences={experiences} />
      <CertificationsSection certifications={certifications} />
      <ContactSection profile={profile} />

      <Footer profileName={profile?.nama} />
    </div>
  );
}
